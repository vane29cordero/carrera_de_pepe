import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ producto, onClick }) {
  const { agregarAlCarrito } = useCart();

  const manejarAgregarCarrito = (e) => {
    e.stopPropagation();
    agregarAlCarrito(producto);
    toast.success(`¡${producto.title || producto.name} añadido al carrito!`);
  };

  const nombre = producto.title || producto.name;
  const imagen = producto.thumbnail || producto.image;
  const categoria = producto.category || producto.brand || "Accesorios";
  const precio = producto.price || producto.precio || 0;

  return (
    <article
      onClick={onClick}
      className="group bg-white dark:bg-[#08182b] border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Imagen del producto con badge de categoría */}
        <div className="relative w-full h-52 bg-slate-50 dark:bg-slate-900/50 p-3 overflow-hidden flex items-center justify-center">
          <img
            src={imagen}
            alt={nombre}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 text-cyan-300 backdrop-blur-xs border border-cyan-500/30">
            {categoria}
          </span>
          <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5">
              <Eye size={14} className="text-cyan-600 dark:text-cyan-400" />
              Ver detalle
            </span>
          </div>
        </div>

        {/* Información del producto */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {nombre}
            </h3>
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">
              #{producto.id}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {producto.description}
          </p>
        </div>
      </div>

      {/* Precio y Botón de Carrito */}
      <div className="p-4 pt-0 mt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
        <div className="pt-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">
            Precio
          </span>
          <span className="text-cyan-700 dark:text-cyan-400 font-extrabold text-lg">
            $ {producto.price}
          </span>
        </div>

        <button
          type="button"
          onClick={manejarAgregarCarrito}
          className="mt-3 p-2.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-105 active:scale-95 shadow-sm shadow-amber-400/25 transition-all cursor-pointer"
          title="Agregar al carrito"
          aria-label="Agregar al carrito"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </article>
  );
}