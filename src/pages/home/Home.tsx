import { Link } from "react-router-dom";



function Home() {
  return (
    <div className="w-full flex flex-col">

      {/* HERO COM VÍDEO */}
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">

        {/* VÍDEO DE FUNDO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="https://ik.imagekit.io/codequeens/NEXUM%20RH/videoHome.mp4?updatedAt=1764884167851"
        />


        {/* EFEITO NO VÍDEO - BLUR*/}
        <div className="absolute inset-0 backdrop-blur-[1px] md:backdrop-blur-[2px]"></div>

        {/* EFEITO NO VÍDEO - CONTRASTE */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* TEXTO VÍDEO */}
        <div className="relative z-10 text-center px-4 max-w-3xl text-white flex flex-col gap-6 animate-fadein">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
            Plataforma completa de RH para empresas que valorizam pessoas
          </h1>

          <p className="text-lg md:text-2xl font-light text-gray-200">
            Conectando pessoas, fortalecendo talentos.
          </p>

          <div className="flex justify-center mt-6 gap-4">
            <a
              href="https://github.com/CodeQueensjava83"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-orange-500"
            >
              Experimentar grátis
            </a>

            <a
              href="/chat"
              className="bg-sky-800 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-orange-500 transition"
            >
              Falar com o time
            </a>
          </div>
        </div>

      </section>

      {/* SOLUÇÕES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">

          {/* TÍTULO */}
          <h2 className="text-4xl font-extrabold text-center text-[#0A2A43] mb-16 tracking-tight">
            Soluções NexumRH
          </h2>

          {/* GRID DE CARDS */}
          <div className="grid md:grid-cols-3 gap-10">

            {/* CARD 1 */}
            <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md
                      hover:shadow-xl hover:-translate-y-2 hover:border-orange-500
                      transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Pessoas</h3>
              <p className="text-gray-600 leading-relaxed">
                Gerencie os talentos da empresa com inteligência, organização e fluidez.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md
                      hover:shadow-xl hover:-translate-y-2 hover:border-orange-500
                      transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Departamento</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize processos internos e conecte equipes de forma clara e eficiente.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md
                      hover:shadow-xl hover:-translate-y-2 hover:border-orange-500
                      transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Processos Automatizados</h3>
              <p className="text-gray-600 leading-relaxed">
                Fluxos automáticos para documentos, cadastros e informações internas.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* DEPOIMENTOS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#0A2A43] mb-14">
            O que dizem sobre o Nexum RH
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* CARDS */}


            {/* CARD 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200
                        hover:shadow-xl hover:-translate-y-1 hover:shadow-orange-200/60
                        transition-all duration-300">
              <p className="text-xl italic text-orange-600 mb-4">
                “O Nexum é simples e intuitivo, eficiente para a nossa rotina em RH.”
              </p>
              <span className="text-gray-700">— Adriana Leite, Coordenadora de RH</span>
            </div>

            {/* CARD 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200
                        hover:shadow-xl hover:-translate-y-1 hover:shadow-orange-200/60
                        transition-all duration-300">
              <p className="text-xl italic text-orange-600 mb-4">
                “Ferramentas eficientes e suporte incrível!”
              </p>
              <span className="text-gray-700">— Aimeé Ferreira, Diretora de Talentos</span>
            </div>

            {/* CARD 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200
                        hover:shadow-xl hover:-translate-y-1 hover:shadow-orange-200/60
                        transition-all duration-300">
              <p className="text-xl italic text-orange-600 mb-4">
                “A plataforma trouxe organização e clareza aos nossos processos.”
              </p>
              <span className="text-gray-700">— Rafael Queiroz, Diretor Executivo</span>
            </div>

            {/* CARD 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200
                        hover:shadow-xl hover:-translate-y-1 hover:shadow-orange-200/60
                        transition-all duration-300">
              <p className="text-xl italic text-orange-600 mb-4">
                “Finalmente conseguimos centralizar todas as informações do time.”
              </p>
              <span className="text-gray-700">— Camila Evangelista, Diretora de Empregabilidade</span>
            </div>




          </div>
        </div>
      </section>
    </div>

  );
}

export default Home;
