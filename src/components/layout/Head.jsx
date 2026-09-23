import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, ShoppingCart, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Perfil from "../perfil/Perfil";
import Login from "../auth/Login";
import pepe from "../../assets/pepe.jpg";
import perfil from "../../assets/descarga (3).jpg"; 

function Header() {
  const { tema, cambiarTema } = useTheme();
  const { totalItems } = useCart();
  const { usuario } = useAuth();

  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [loginAbierto, setLoginAbierto] = useState(false);

  // Botones con estilo moderno de acción rápida
  const estiloBurbujaIcono =
    "relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-100/60 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer border border-transparent hover:border-cyan-200 dark:hover:border-cyan-900/50";

  return (
    <>
      <header className="w-full bg-linear-to-r from-sky-700 via-cyan-700 to-sky-800 dark:bg-none dark:bg-[#07172b]/95 border-b border-sky-100 dark:border-sky-950 shadow-xs transition-colors duration-300 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
          
          {/* Logo y Nombre de Marca */}
          <Link to="/inicio" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={pepe}
                alt="Pepe el Gallo"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-cyan-500/60 shadow-md group-hover:ring-cyan-400 group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Pepe el Gallo
              </span>
            </div>
          </Link>

          {/* Acciones y Perfil */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!usuario ? (
              <button
                type="button"
                onClick={() => setLoginAbierto(true)}
                className="px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-95 shadow-xs shadow-amber-400/30 transition-all duration-200 cursor-pointer uppercase tracking-wider"
              >
                Ingresar
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPerfilAbierto((abierto) => !abierto)}
                  className={`${estiloBurbujaIcono} flex items-center gap-2 px-3`}
                  title="Ver perfil"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    <img className="w-full h-full object-cover rounded-lg" src={perfil} alt="Foto de perfil" />
                  </div>
                  <span className="hidden sm:inline-block text-xs font-bold text-slate-700 dark:text-slate-200 max-w-25 truncate">
                    {usuario?.nombre || usuario?.correo?.split("@")[0] || usuario?.email?.split("@")[0] || "Surfer"}
                  </span>
                </button>
                {perfilAbierto && <Perfil onCerrar={() => setPerfilAbierto(false)} />}
              </div>
            )}

            {/* Botón Carrito con badge */}
            <Link
              to="/carrito"
              className={estiloBurbujaIcono}
              title="Ver carrito de compras"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-[#07172b] shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Botón Modo Oscuro / Claro */}
            <button
              type="button"
              onClick={cambiarTema}
              title={tema === "claro" ? "Activar modo nocturno" : "Activar modo diurno"}
              className={estiloBurbujaIcono}
            >
              {tema === "claro" ? <Moon size={20} /> : <Sun size={20} className="text-amber-400" />}
            </button>
          </div>

        </div>
      </header>

      {/* Modal de Login */}
      <Login isOpen={loginAbierto} onClose={() => setLoginAbierto(false)} />
    </>
  );
}

export default Header;