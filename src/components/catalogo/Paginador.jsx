import { ChevronLeft, ChevronRight } from "lucide-react";

function construirRangoPaginas(paginaActual, totalPaginas) {
  const rango = [];
  const delta = 1;

  const inicio = Math.max(2, paginaActual - delta);
  const fin = Math.min(totalPaginas - 1, paginaActual + delta);

  rango.push(1);
  if (inicio > 2) rango.push("...");
  for (let i = inicio; i <= fin; i++) rango.push(i);
  if (fin < totalPaginas - 1) rango.push("...");
  if (totalPaginas > 1) rango.push(totalPaginas);

  return rango;
}

function Paginador({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  const paginas = construirRangoPaginas(paginaActual, totalPaginas);

  return (
    <nav className="flex items-center justify-center gap-1.5 sm:gap-2" aria-label="Paginación del catálogo">
      
      {/* Botón Página Anterior */}
      <button
        type="button"
        disabled={paginaActual === 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-50 dark:hover:bg-slate-700 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
        title="Página anterior"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de Página */}
      <div className="flex items-center gap-1">
        {paginas.map((pagina, indice) =>
          pagina === "..." ? (
            <span key={`puntos-${indice}`} className="px-2 text-slate-400 select-none text-xs">
              …
            </span>
          ) : (
            <button
              key={pagina}
              type="button"
              onClick={() => onCambiarPagina(pagina)}
              className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                pagina === paginaActual
                  ? "bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md shadow-cyan-500/25 scale-105"
                  : "bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-cyan-50 dark:hover:bg-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700"
              }`}
            >
              {pagina}
            </button>
          )
        )}
      </div>

      {/* Botón Página Siguiente */}
      <button
        type="button"
        disabled={paginaActual === totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-50 dark:hover:bg-slate-700 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
        title="Página siguiente"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight size={16} />
      </button>

    </nav>
  );
}

export default Paginador;