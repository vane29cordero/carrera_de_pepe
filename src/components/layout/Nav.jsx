import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  const esActivo = (ruta) => location.pathname === ruta;

  const enlaces = [
    { ruta: "/inicio", etiqueta: "Inicio", },
    { ruta: "/juego", etiqueta: "Juego", },
    { ruta: "/productos", etiqueta: "Catálogo" },
    { ruta: "/contacto", etiqueta: "Contáctanos" },
  ];

  return (
    <nav className="w-full bg-linear-to-r from-sky-700 via-cyan-700 to-sky-800 dark:from-[#061424] dark:via-[#092138] dark:to-[#061424] border-b border-cyan-600/30 dark:border-cyan-900/40 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 list-none m-0 p-0">
          {enlaces.map(({ ruta, etiqueta, icono: Icono }) => {
            const activo = esActivo(ruta);
            return (
              <li key={ruta}>
                <Link
                  to={ruta}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activo
                      ? "bg-white text-cyan-900 dark:bg-cyan-500 dark:text-slate-950 font-bold shadow-md shadow-black/10 scale-102"
                      : "text-sky-100 hover:text-white hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>{etiqueta}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;