import CarrosselEquipe from "../../components/carrossel/CarrosselEquipe";

export default function QuemSomos() {
    return (
        <div className="w-full flex flex-col">

            {/* BANNER 01 */}
            <img
                src="https://ik.imagekit.io/sv3txjrcv/imagens_usuarios/NexumRh/Banner_conectandopessoas"
                className="w-full max-h-[420px] md:max-h-[520px] object-cover object-center"
            />

            {/* SEÇÃO DE TEXTO */}
            <section className="max-w-3xl mx-auto px-6 pt-12 pb-16">

                {/* TÍTULO */}
                <h2 className="text-3xl md:text-4xl font-bold text-orange-600 text-center mb-4">
                    Quem Somos
                </h2>

                {/* SEPARADOR */}
                <div className="w-20 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>

                {/* CARD DE TEXTO */}
                <div className="bg-white border border-gray-200 shadow-md rounded-xl px-8 py-10 text-center">
                    <p className="text-gray-700 text-xl leading-relaxed">
                        O <strong>NexumRH</strong> é uma plataforma desenvolvida para centralizar e organizar
                        todas as informações de Recursos Humanos em um só lugar. Com uma experiência
                        intuitiva e moderna, ele apoia a <strong>gestão inteligente de pessoas, processos e departamentos</strong>,
                        reduzindo retrabalho, aumentando a eficiência e fortalecendo a tomada de decisões.
                    </p>
                </div>


            </section>

            {/* BANNER 02 */}
            <img
                src="https://ik.imagekit.io/codequeens/NEXUM%20RH/BannerTime"
                className="w-full max-h-[420px] md:max-h-[520px] object-cover object-center mt-4"
            />

            {/* CARROSSEL EQUIPE */}
            <section className="py-16">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-8">
                    Conecte-se conosco!
                </h3>

                <CarrosselEquipe />
            </section>

        </div>
    );
}
