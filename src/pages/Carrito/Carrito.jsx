import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowLeft, 
  Receipt, 
  Calendar, 
  User, 
  Send,
  Waves,
  Tag
} from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    subtotalGeneral,
    iva,
    totalConIva,
  } = useCart();

  const { usuario } = useAuth();
  const [cargando, setCargando] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  // Fecha actual formateada
  const fechaActual = new Date().toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Generador simulado de ID de Orden
  const [ordenId] = useState(() => `SURF-${Math.floor(100000 + Math.random() * 900000)}`);

  const ejecutarEnvio = async () => {
    setCargando(true);
    setModalConfirmacion(false);

    try {
      const respuesta = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Confirmación Pedido ${ordenId} - Reyes de las Olas`,
          ordenId,
          fecha: fechaActual,
          cliente: usuario ? usuario.nombre || usuario.correo : "Cliente Surf Club",
          correo: usuario?.correo || "No registrado",
          pedido: carrito.map((p) => {
            const nom = p.nombre || p.title || p.name;
            const cat = p.categoria || p.category || "Playa";
            const pu = p.precio || p.price || 0;
            return {
              nombre: nom,
              categoria: cat,
              cantidad: p.cantidad,
              precioUnitario: (pu),
              subtotal: (pu * p.cantidad),
            };
          }),
          subtotalNeto: $ (subtotalGeneral),
          iva: $ (iva),
          totalAPagar: $ (totalConIva),
        }),
      });

      if (respuesta.ok) {
        toast.success(`¡Pedido ${ordenId} enviado con éxito! Tu orden de surf está en camino.`);
        vaciarCarrito();
        try {
          localStorage.removeItem("carrito");
        } catch {
          // ignore
        }
      } else {
        toast.error("Hubo un problema al procesar tu pedido con el servidor. Inténtalo nuevamente.");
      }
    } catch {
      toast.error("Error de conexión al enviar el pedido. Verifica tu conexión de red.");
    } finally {
      setCargando(false);
    }
  };

  const manejarClickEnviarPedido = () => {
    if (!usuario) {
      toast.warning("Debes iniciar sesión con tu cuenta de surfer para enviar el pedido.");
      return;
    }

    if (carrito.length === 0) {
      toast.error("Tu carrito está vacío. Agrega artículos desde el catálogo.");
      return;
    }

    // Abre el modal de confirmación requerido por la guía (criterio 5.e)
    setModalConfirmacion(true);
  };

  return (
    <section className="py-10 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Carrito de Productos
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-1">
              Verifica cada ítem, calcula el IVA y envía tu pedido oficial de surf
            </p>
          </div>

          <Link
            to="/productos"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800/90 hover:bg-cyan-50 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 shadow-xs"
          >
            <ArrowLeft size={16} /> Seguir Comprando
          </Link>
        </div>

        {carrito.length === 0 ? (
          /* Carrito Vacío */
          <div className="bg-white/90 dark:bg-[#08182b]/90 backdrop-blur-md rounded-3xl p-10 sm:p-14 text-center shadow-xl border border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              Aún no has agregado tablas ni accesorios del catálogo. ¡Explora los productos y prepara tu equipo!
            </p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-linear-to-r from-amber-400 to-amber-500 hover:brightness-105 active:scale-95 shadow-md shadow-amber-400/20 transition-all text-xs uppercase tracking-wider"
            >
              Ir al Catálogo
            </Link>
          </div>
        ) : (
          /* Grid Principal */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Sección Izquierda: Lista de Productos con todos los datos requeridos (5.a y 5.b) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                  {carrito.length} {carrito.length === 1 ? "artículo en la bolsa" : "artículos en la bolsa"}
                </span>
                <button
                  type="button"
                  onClick={vaciarCarrito}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} /> Vaciar Carrito
                </button>
              </div>

              {carrito.map((producto) => {
                const id = producto.id;
                const nombre = producto.nombre || producto.title || producto.name;
                const imagen = producto.imagen || producto.image || producto.thumbnail;
                const categoria = producto.categoria || producto.category || producto.brand || "Accesorios";
                const precioUnitario = producto.precio || producto.price || 0;
                const subtotalItem = precioUnitario * producto.cantidad;

                return (
                  <div
                    key={id}
                    className="bg-white/90 dark:bg-[#08182b]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all hover:border-cyan-500/40"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      {/* Imagen, Nombre y Categoría */}
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={imagen}
                          alt={nombre}
                          className="w-20 h-20 object-contain rounded-xl bg-slate-50 dark:bg-slate-900/60 p-2 border border-slate-100 dark:border-slate-800 shrink-0"
                        />
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-slate-200/60 dark:border-slate-700">
                            <Tag size={10} /> {categoria}
                          </span>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-1">
                            {nombre}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span>Precio unitario: <strong className="text-slate-700 dark:text-slate-300">$ {(precioUnitario)}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Controles de Cantidad, Subtotal y Eliminar */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                        
                        {/* Selector de Cantidad */}
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/80">
                          <button
                            type="button"
                            onClick={() => cambiarCantidad(id, producto.cantidad - 1)}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                            title="Disminuir"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">
                            {producto.cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() => cambiarCantidad(id, producto.cantidad + 1)}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                            title="Aumentar"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Subtotal por ítem */}
                        <div className="text-right min-w-[90px]">
                          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">
                            Subtotal
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-cyan-700 dark:text-cyan-400">
                            $ {(subtotalItem)}
                          </span>
                        </div>

                        {/* Botón Eliminar */}
                        <button
                          type="button"
                          onClick={() => eliminarDelCarrito(id)}
                          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                          title="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sección Derecha: Ticket / Resumen de Orden (5.c y 5.d) */}
            <div className="bg-white/95 dark:bg-[#08182b]/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800 space-y-5 sticky top-20">
              
              {/* Encabezado del Recibo */}
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 pb-4 text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 mb-2 border border-cyan-200/60 dark:border-cyan-800/40">
                  <Receipt size={22} />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Resumen de Orden
                </h2>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                  {ordenId}
                </span>
              </div>

              {/* Metadatos */}
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500">
                    <Calendar size={13} className="text-cyan-600 dark:text-cyan-400" /> Fecha:
                  </span>
                  <span className="font-bold text-slate-800 dark:text-white">{fechaActual}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500">
                    <User size={13} className="text-cyan-600 dark:text-cyan-400" /> Rider:
                  </span>
                  <span className="font-bold text-slate-800 dark:text-white truncate max-w-[140px]">
                    {usuario ? usuario.nombre || usuario.correo : "Invitado"}
                  </span>
                </div>
              </div>

              {/* Totales y Cálculo de IVA (5.c) */}
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal Neto</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    $ {(subtotalGeneral)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>IVA Incluido (19%)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    $ {(iva)}
                  </span>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">Total a Pagar</span>
                  <span className="text-xl font-black text-cyan-700 dark:text-cyan-400">
                    $ {(totalConIva)}
                  </span>
                </div>
              </div>

              {/* Botón Exacto “Enviar Pedido” (5.d) */}
              <button
                type="button"
                onClick={manejarClickEnviarPedido}
                disabled={cargando}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-[0.99] shadow-md shadow-amber-400/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <Send size={15} />
                {cargando ? "Enviando Pedido..." : "Enviar Pedido"}
              </button>

            </div>

          </div>
        )}
      </div>

      {/* Modal de Solicitud de Confirmación del Usuario (Criterio 5.e) */}
      {modalConfirmacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#08182b] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-cyan-100 dark:border-cyan-900/50 text-center space-y-4">
            
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center mx-auto">
              <Send size={26} />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ¿Confirmar Envío de Pedido?
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Estás a punto de procesar tu orden <strong className="text-cyan-600 dark:text-cyan-400">{ordenId}</strong> por un total de{" "}
              <strong className="text-slate-900 dark:text-white">$ {(totalConIva)}</strong> con {carrito.length} {carrito.length === 1 ? "producto" : "productos"}.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setModalConfirmacion(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={ejecutarEnvio}
                className="px-6 py-2.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 font-bold hover:brightness-105 shadow-md shadow-amber-400/20 text-xs uppercase tracking-wider cursor-pointer"
              >
                Sí, Enviar Pedido
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default Carrito;