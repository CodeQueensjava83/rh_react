export default function SlideLuana() {
  return (
    <div className="relative w-full">

      {/* BANNER */}
      <img
        src="https://ik.imagekit.io/codequeens/NEXUM%20RH/SlideLuana"
        alt="Luana Vicaria"
        className="w-full h-auto object-contain max-h-[700px]"
      />

      {/* BOTÃO SOBRE O BANNER */}
      <a
        href="https://www.linkedin.com/in/luana-borghetti-vicaria//"
        target="_blank"
        className="
          absolute bottom-14 left-1/2 -translate-x-1/2
          px-8 py-3 bg-orange-500 text-white font-semibold 
          rounded-full shadow-lg hover:bg-orange-600 transition
        "
      >
        Saiba mais
      </a>
    </div>
  );
}