import { useState } from "react";

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = "https://ik.imagekit.io/codequeens/NEXUM%20RH/dashboard.png";

  // --- Zoom & Pan ---
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  function onWheel(e: { deltaY: number; }) {
    const delta = e.deltaY * -0.001;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  }

  function onMouseDown(e: { clientX: any; clientY: any; }) {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  }

  function onMouseMove(e: { clientX: number; clientY: number; }) {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  }

  function onMouseUp() {
    setIsDragging(false);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function resetView() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setLastPos({ x: 0, y: 0 });
  }

  return (
    <div
      className="relative min-h-screen min-w-full bg-black overflow-hidden select-none"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Loader */}
      {!loaded && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" />
            <span className="text-white text-sm">Carregando dashboard...</span>
          </div>
        </div>
      )}

      {/* Imagem com zoom/pan */}
      <img
        src={imageUrl}
        alt="Dashboard"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "center center",
          cursor: isDragging ? "grabbing" : "grab",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        draggable={false}
      />

      {/* Controles */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleFullScreen}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-3 py-2 rounded-md border border-white/10 text-sm"
        >
          Tela cheia
        </button>

        <button
          onClick={resetView}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-3 py-2 rounded-md border border-white/10 text-sm"
        >
          Resetar zoom
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-50 text-white/70 text-xs">
        Scroll = zoom | Arraste = mover | Esc = sair da tela cheia
      </div>
    </div>
  );
}
