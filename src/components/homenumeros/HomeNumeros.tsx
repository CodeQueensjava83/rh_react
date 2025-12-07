import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import CountUp from "react-countup";

export default function NossosNumeros() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [startCount, setStartCount] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setStartCount(true);
    }
  }, [isInView, controls]);

  const stats = [
    {
      value: 3500,
      suffix: "+",
      label: "Colaboradores gerenciados",
      description: "Gestão centralizada de dados, cargos e jornadas.",
      icon: "👥",
    },
    {
      value: 120,
      suffix: "+",
      label: "Departamentos cadastrados",
      description: "Organização clara das áreas da empresa.",
      icon: "🏢",
    },
    {
      value: 35,
      suffix: "%",
      label: "menos retrabalho",
      description: "Processos mais rápidos e com menos erros.",
      icon: "⚡",
    },
    {
      value: 99.3,
      suffix: "%",
      label: "de disponibilidade",
      description: "Estabilidade para o RH não parar um minuto.",
      icon: "🛡️",
    },
  ];

  return (
    <section className="relative w-full bg-gray-50 py-28 overflow-hidden">
      {/* Glow cinematográfico ao fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-white to-teal-400/10 blur-3xl -z-10"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* CABEÇALHO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
          }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-widest text-orange-500 uppercase font-semibold">
            Nossos números
          </span>

          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent mt-3">
            Resultados reais que o Nexum RH entrega
          </h2>

          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>

          <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Indicadores apresentados de forma elegante, dinâmica e impactante —
            como numa montagem cinematográfica.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              className="relative bg-white p-10 rounded-3xl shadow-xl border border-gray-200 
              backdrop-blur-md overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.9,
                    delay: index * 0.25,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
            >
              {/* ÍCONE de fundo aparecendo atrasado */}
              <motion.div
                className="absolute right-3 top-3 text-7xl opacity-10 select-none text-orange-600"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 0.15,
                  scale: 1,
                  transition: { delay: 0.6 + index * 0.25, duration: 0.8 },
                }}
              >
                {item.icon}
              </motion.div>

              {/* NÚMERO COM COUNTUP */}
              <p className="text-5xl font-extrabold text-orange-600 mb-3">
                {startCount ? (
                  <CountUp
                    end={item.value}
                    suffix={item.suffix}
                    duration={2}
                    decimals={item.value % 1 !== 0 ? 1 : 0}
                  />
                ) : (
                  "0"
                )}
              </p>

              {/* TÍTULO */}
              <p className="text-xl font-semibold text-slate-800 mb-2">
                {item.label}
              </p>

              {/* DESCRIÇÃO */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}