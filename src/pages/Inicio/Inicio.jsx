import { Link } from "react-router-dom";
import { Waves, Sparkles, Code2, Compass as CompassIcon, Cpu, Layers } from "lucide-react";
import pepe from "../../assets/pepe.jpg";
import hero from "../../assets/hero.png";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";
import reactRouter from "../../assets/react-router.svg";
import tailwindcss from "../../assets/Tailwind_CSS_Logo.svg";

function Inicio() {
  const tecnologias = [
    {
      nombre: "React",
      descripcion: "Biblioteca para construir interfaces de usuario declarativas y reactivas.",
      imagen: reactLogo,
    },
    {
      nombre: "Vite",
      descripcion: "Herramienta moderna de alto rendimiento para desarrollo frontend veloz.",
      imagen: viteLogo,
    },
    {
      nombre: "Tailwind CSS",
      descripcion: "Framework CSS utilitario para diseño moderno y completamente responsivo.",
      imagen: tailwindcss,
    },
    {
      nombre: "React Router",
      descripcion: "Librería estándar para navegación fluida y arquitectura SPA multi-ruta.",
      imagen: reactRouter,
    },
  ];

  return (
    <div className="w-full text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* SECCIÓN HERO PRINCIPAL CON ESTÉTICA SURF / OCÉANO REALISTA */}
      <section className="bg-sky-50/50 dark:bg-slate-900 text-slate-800 dark:text-white border-b border-sky-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <img
              src={hero}
              alt="React705"
              className="w-40 h-40 object-contain mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              ¡Bienvenidos a React705!
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
              Un espacio creado para aprender a desarrollar aplicaciones
              web modernas utilizando React y Vite.
            </p>
            <p className="max-w-3xl text-slate-500 dark:text-slate-400 mb-8">
              Durante este proyecto exploraremos componentes, navegación,
              consumo de APIs, estilos y diferentes herramientas del
              ecosistema de React.
            </p>
            <button
              type="button"
              className="
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                font-semibold
                px-8
                py-3
                rounded-lg
                transition
                duration-300
                cursor-pointer
              "
            >
              Comenzar a aprender
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN TECNOLOGÍAS */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Stack Tecnológico
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tecnologías Utilizadas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Este proyecto integra las mejores herramientas del desarrollo frontend para construir una experiencia fluida y reactiva.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tecnologia) => (
            <div
              key={tecnologia.nombre}
              className="bg-white/80 dark:bg-[#08182b]/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 text-center shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-xs flex flex-col justify-between group"
            >
              <div>
                <div className="h-20 flex items-center justify-center mb-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={tecnologia.imagen}
                    alt={tecnologia.nombre}
                    className="max-h-12 max-w-full w-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {tecnologia.nombre}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {tecnologia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN APRENDIZAJE */}
      <section className="bg-sky-50/60 dark:bg-[#05111e]/70 border-t border-sky-100 dark:border-cyan-950/40 py-16 sm:py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Objetivos de Aprendizaje
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ¿Qué Aprenderemos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/90 dark:bg-[#08182b]/90 p-6 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Componentes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Aprenderemos a dividir nuestra aplicación en componentes modulares, limpios y altamente reutilizables.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-[#08182b]/90 p-6 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                <CompassIcon size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Navegación
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Utilizaremos React Router para diseñar rutas seguras, enlaces activos y navegación declarativa sin recargas.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-[#08182b]/90 p-6 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                APIs & Estado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Consumiremos información desde servicios REST externos y centralizaremos datos con Context API y custom hooks.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-[#08182b]/90 p-6 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Code2 size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Tailwind CSS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Diseñaremos interfaces estéticas, modo oscuro y transiciones suaves con la potencia de Tailwind CSS v4.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Inicio;