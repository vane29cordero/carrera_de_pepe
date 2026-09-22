import { useState } from "react";
import { User, Mail, ArrowLeft, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function PerfilPage() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [confirmandoSalida, setConfirmandoSalida] = useState(false);

  const manejarCerrarSesion = () => {
    cerrarSesion();
    toast.success("Has cerrado sesión.");
    navigate("/inicio");
  };

  if (!usuario) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center mb-4">
          <User size={32} />
        </div>
        <p className="text-slate-800 dark:text-slate-200 text-lg mb-4 font-semibold">
          No has iniciado sesión todavía.
        </p>
        <button
          onClick={() => navigate("/inicio")}
          className="px-6 py-2.5 bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-bold hover:brightness-105 shadow-md shadow-amber-400/20 transition-all uppercase tracking-wider text-xs cursor-pointer"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  // Búsqueda dinámica del correo en múltiples propiedades
  const correoUsuario =
    usuario.correo ||
    usuario.email ||
    usuario.user_email ||
    usuario.mail ||
    usuario.user?.email ||
    usuario.user?.correo ||
    "correo@ejemplo.com";

  // Búsqueda dinámica del nombre
  const nombreUsuario =
    usuario.nombre ||
    usuario.username ||
    usuario.name ||
    usuario.user?.nombre ||
    usuario.user?.name ||
    (correoUsuario !== "correo@ejemplo.com" ? correoUsuario.split("@")[0] : "Usuario Registrado");

  return (
    <div className="py-10 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors font-medium text-sm cursor-pointer"
        >
          <ArrowLeft size={18} className="text-cyan-600 dark:text-cyan-400" />
          Volver
        </button>

        {/* Tarjeta Principal de Perfil */}
        <div className="bg-white/95 dark:bg-[#08182b]/95 border border-cyan-100 dark:border-cyan-900/40 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md transition-colors duration-300">
          
          {/* Cabecera del usuario */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-linear-to-tr from-cyan-600 to-sky-500 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg shrink-0">
                <User size={46} className="text-white" />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight capitalize">
                {nombreUsuario}
              </h1>
            </div>
          </div>

          {/* Detalles del usuario */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Información de la Cuenta
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Correo */}
              <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 bg-cyan-100 dark:bg-cyan-950/60 rounded-xl text-cyan-700 dark:text-cyan-300 shadow-xs">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Correo Electrónico</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate" title={correoUsuario}>
                    {correoUsuario}
                  </p>
                </div>
              </div>

              {/* Rol / Nivel si está presente */}
              {(usuario.rol || usuario.role) && (
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl text-emerald-700 dark:text-emerald-300 shadow-xs">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Rol del Usuario</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate capitalize">
                      {usuario.rol || usuario.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Acciones & Cierre de Sesión con Confirmación */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            {confirmandoSalida ? (
              <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-2xl border border-rose-200 dark:border-rose-900/50">
                <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                  ¿Seguro que deseas salir?
                </span>
                <button
                  type="button"
                  onClick={() => setConfirmandoSalida(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={manejarCerrarSesion}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
                >
                  Confirmar Salida
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmandoSalida(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl transition-all cursor-pointer uppercase tracking-wider border border-rose-200/60 dark:border-rose-900/40"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default PerfilPage;