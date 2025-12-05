{/* HERO */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src="https://ik.imagekit.io/codequeens/NEXUM%20RH/istockphoto-2165896441-640_adpp_is%20(2).mp4"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow">
            Plataforma completa de RH
            <br />
            para empresas que valorizam pessoas
          </h1>

          <p className="text-lg md:text-2xl font-light text-neutral-200 max-w-3xl">
            Recrutamento, seleção e gestão de talentos em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="/login"
              className="px-10 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow transition-all"
            >
              Experimentar grátis
            </a>

            <a
              href="/contato"
              className="px-10 py-3 rounded-xl bg-white/90 text-sky-900 font-semibold shadow hover:bg-white transition-all"
            >
              Falar com o time
            </a>
          </div>
        </div>
      </section>