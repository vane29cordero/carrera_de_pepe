import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/catalogo/ProductCard";
import Paginador from "../../components/catalogo/Paginador";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { X, Plus, Minus, ShoppingCart, Tag, DollarSign, Waves, Loader2 } from "lucide-react";

const LIMITE = 12;

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

const PALABRAS_CLAVE_AMPLIAS = [
  "surf", "beach", "summer", "sunglasses", "shorts", "swim", "ocean", "tropical", "sun", "hawaii", "sandals",
  "snack", "drink", "juice", "food", "fruit", "ice", "water", "cocktail", "coconut", "fish", "seafood", "barbecue",
  "bag", "hat", "cap", "cream", "skin", "fragrance", "accessory", "glasses"
];

const CATEGORIAS_EXCLUIDAS = ["automotive", "motorcycle", "furniture", "lighting", "home-decoration"];

function Productos() {
  const { productos, cargando, error, total, skip, setSkip } = useProducts(LIMITE);
  const { agregarAlCarrito } = useCart();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const paginaActual = Math.floor(skip / LIMITE) + 1;
  const totalPaginas = Math.ceil(total / LIMITE);

  const productosFiltrados = productos.filter((producto) => {
    const titulo = (producto.title || producto.name || "").toLowerCase();
    const descripcion = (producto.description || "").toLowerCase();
    const categoria = (producto.category || "").toLowerCase();

    return PALABRAS_CLAVE_AMPLIAS.some(
      (palabra) =>
        titulo.includes(palabra) ||
        descripcion.includes(palabra) ||
        categoria.includes(palabra)
    );
  });

  const productosAMostrar = productosFiltrados.length >= 3 
    ? productosFiltrados 
    : productos.filter((producto) => {
        const categoria = (producto.category || "").toLowerCase();
        return !CATEGORIAS_EXCLUIDAS.some((excluidas) => categoria.includes(excluidas));
      });

  const irAPagina = (numeroPagina) => {
    setSkip((numeroPagina - 1) * LIMITE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setCantidad(1);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
  };

  const manejarAgregarDesdeModal = () => {
    if (!productoSeleccionado) return;

    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(productoSeleccionado);
    }

    const nombre = productoSeleccionado.title || productoSeleccionado.name;
    toast.success(`¡Agregaste ${cantidad} ${cantidad > 1 ? "unidades" : "unidad"} de ${nombre} al carrito!`);

    cerrarModal();
  };

  return (
    <section className="py-10 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Panel Contenedor Principal */}
        <div className="bg-white/90 dark:bg-[#08182b]/90 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
          
          {/* Encabezado Principal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Catálogo 
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-1">
                Accesorios, ropa playera, nutrición y equipo de surf para tus sesiones en el agua
              </p>
            </div>

            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Página {paginaActual} de {totalPaginas || 1}
            </div>
          </div>

          {cargando && (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-600 dark:text-cyan-400">
              <Loader2 size={36} className="animate-spin" />
              <p className="font-semibold text-sm">Cargando catálogo playero...</p>
            </div>
          )}

          {error && (
            <div className="py-12 text-center text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/50 p-6">
              {error}
            </div>
          )}

          {!cargando && !error && (
            <>
              {/* Grid de Productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productosAMostrar.map((producto) => (
                  <ProductCard 
                    key={producto.id} 
                    producto={producto} 
                    onClick={() => abrirModal(producto)} 
                  />
                ))}
              </div>

              {/* Paginación */}
              <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                <Paginador
                  paginaActual={paginaActual}
                  totalPaginas={totalPaginas}
                  onCambiarPagina={irAPagina}
                />
              </div>
            </>
          )}

        </div>
      </div>

      {/* MODAL DETALLE AMPLIADO DEL PRODUCTO */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in" onClick={cerrarModal}>
          <div
            className="bg-white dark:bg-[#08182b] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cierre */}
            <button
              type="button"
              onClick={cerrarModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>

            {/* Cabecera */}
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
              Detalle del Producto
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-4 pr-8">
              {productoSeleccionado.title || productoSeleccionado.name}
            </h2>

            {/* Imagen del Producto */}
            <div className="w-full h-56 bg-slate-50 dark:bg-slate-900/60 rounded-2xl overflow-hidden mb-5 border border-slate-100 dark:border-slate-800 p-4 flex items-center justify-center">
              <img
                src={productoSeleccionado.thumbnail || productoSeleccionado.image}
                alt={productoSeleccionado.title || productoSeleccionado.name}
                className="max-h-full object-contain"
              />
            </div>

            {/* Información Detallada */}
            <div className="space-y-2.5 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-5">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Tag size={16} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="text-xs font-medium">Categoría:</span>
                <span className="text-xs font-bold capitalize text-slate-900 dark:text-white">
                  {productoSeleccionado.category || productoSeleccionado.brand || "Accesorios"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <DollarSign size={16} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="text-xs font-medium">Precio Unitario:</span>
                <span className="text-xs font-extrabold text-cyan-700 dark:text-cyan-400">
                  {formatearPrecio(productoSeleccionado.price || productoSeleccionado.precio || 0)}
                </span>
              </div>
            </div>

            {/* Selección de Cantidad y Subtotal */}
            <div className="flex items-center justify-between mb-6 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Cantidad
                </span>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">
                    {cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCantidad((prev) => prev + 1)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Subtotal
                </span>
                <span className="text-lg font-black text-cyan-700 dark:text-cyan-400">
                  {formatearPrecio((productoSeleccionado.price || productoSeleccionado.precio || 0) * cantidad)}
                </span>
              </div>
            </div>

            {/* Botón Principal (Agregar) */}
            <button
              type="button"
              onClick={manejarAgregarDesdeModal}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-linear-to-r from-amber-400 to-amber-500 hover:brightness-105 active:scale-[0.99] shadow-md shadow-amber-400/20 transition-all cursor-pointer uppercase tracking-wider text-xs flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Agregar {cantidad} {cantidad > 1 ? "unidades" : "unidad"} al Carrito
            </button>

          </div>
        </div>
      )}
    </section>
  );
}

export default Productos;