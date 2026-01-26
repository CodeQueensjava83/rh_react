import { Link } from "react-router-dom";

export default function OQueFazemos() {
  return (
    <div className="w-full flex flex-col">

      {/* HERO / TÍTULO PRINCIPAL */}
      <section className="pt-12 pb-10 text-center px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600">
          O que fazemos
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>

        <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
          O NexumRH transforma informações dispersas em uma plataforma integrada, moderna
          e eficiente — facilitando a gestão inteligente de pessoas, processos e departamentos.
        </p>
      </section>

      {/* BLOCO 1 – O PROBLEMA */}
      <section className="py-24 bg-gray-50 px-4">
        <h3 className="text-2xl font-bold text-center text-orange-600 mb-8">
          Como é o cenário atual
        </h3>

        <div className="max-w-screen-xl mx-auto">
          <img
            src="https://ik.imagekit.io/sv3txjrcv/imagens_usuarios/NexumRh/slide9"
            className="w-full max-h-[580px] object-cover object-center rounded-2xl shadow-lg 
                       hover:scale-[1.01] transition-all duration-300"
          />
        </div>
      </section>

      {/* BLOCO 2 – DADOS DO BRASIL */}
      <section className="py-24 bg-white px-4">
        <h3 className="text-2xl font-bold text-center text-orange-600 mb-8">
          Números que impactam o RH no Brasil
        </h3>

        <div className="max-w-screen-xl mx-auto">
          <img
            src="https://ik.imagekit.io/sv3txjrcv/imagens_usuarios/NexumRh/10.svg"
            className="w-full max-h-[580px] object-cover object-center rounded-2xl shadow-lg
                       hover:scale-[1.01] transition-all duration-300"
          />
        </div>
      </section>

      {/* BLOCO 3 – A SOLUÇÃO */}
      <section className="py-24 bg-gray-50 px-4">
        <h3 className="text-2xl font-bold text-center text-orange-600 mb-8">
          Nossa solução para centralizar o RH
        </h3>

        <div className="max-w-screen-xl mx-auto">
          <img
            src="https://ik.imagekit.io/shaolin/Captura%20de%20tela%202026-01-26%20094839.png"
            className="w-full max-h-[580px] object-cover object-center rounded-2xl shadow-lg
                       hover:scale-[1.01] transition-all duration-300"
          />
        </div>
      </section>

      {/* BLOCO 4 – IMPACTOS */}
      <section className="py-24 bg-white px-4">
        <h3 className="text-2xl font-bold text-center text-orange-600 mb-8">
          Impactos reais para empresas e equipes
        </h3>

        <div className="max-w-screen-xl mx-auto">
          <img
            src="https://ik.imagekit.io/sv3txjrcv/imagens_usuarios/NexumRh/Slide_impactos"
            className="w-full max-h-[580px] object-cover object-center rounded-2xl shadow-lg
                       hover:scale-[1.01] transition-all duration-300"
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold text-orange-600 mb-6">
          Pronto para conhecer o NexumRH?
        </h3>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Entre e veja como nossa plataforma pode transformar a gestão de RH da sua equipe.
        </p>

        <Link
          to="/login"
          className="px-10 py-4 bg-orange-600 text-white rounded-full text-lg font-semibold 
                     shadow-lg hover:bg-orange-700 transition-all"
        >
          Acessar plataforma
        </Link>
      </section>
    </div>
  );
}
