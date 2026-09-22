import { useState } from "react";
import { User, Mail, LogOut, X, ShieldCheck, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Perfil({ onCerrar }) {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [confirmandoSalida, setConfirmandoSalida] = useState(false);

  const manejarCerrarSesion = () => {
    cerrarSesion();
    if (onCerrar) onCerrar();
    toast.success("Has cerrado sesión.");
  };

  const irAPerfilCompleto = () => {
    if (onCerrar) onCerrar();
    navigate("/perfil");
  };

  if (!usuario) return null;

  // Extraer el correo buscando en cualquier propiedad común
  const correoUsuario =
    usuario.correo ||
    usuario.email ||
    usuario.user_email ||
    usuario.mail ||
    usuario.user?.email ||
    usuario.user?.correo ||
    "correo@ejemplo.com";

  // Extraer el nombre de usuario o fallback a la parte antes del @ del correo
  const nombreUsuario =
    usuario.nombre ||
    usuario.username ||
    usuario.name ||
    usuario.user?.nombre ||
    usuario.user?.name ||
    (correoUsuario !== "correo@ejemplo.com" ? correoUsuario.split("@")[0] : "Usuario Registrado");

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#08182b] rounded-2xl shadow-2xl ring-1 ring-cyan-200/60 dark:ring-cyan-900/50 p-5 z-50 transition-all duration-300 border border-slate-100 dark:border-slate-800">
      
      {/* Botón Cerrar desplegable */}
      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          className="absolute top-3.5 right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Cerrar menú"
        >
          <X size={16} />
        </button>
      )}

      {/* Avatar e Información Principal */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-cyan-600 to-sky-500 flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
            <User size={28} className="text-white" />
          </div>
        </div>

        {/* Muestra dinámicamente el nombre con el que ingresó */}
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white capitalize">
          {nombreUsuario}
        </h3>

        {/* Muestra el correo ingresado */}
        <div className="mt-4 w-full space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/60 rounded-xl px-3 py-2.5 w-full">
            <Mail size={15} className="text-cyan-500 shrink-0" />
            <span className="truncate font-medium" title={correoUsuario}>
              {correoUsuario}
            </span>
          </div>

          {(usuario.rol || usuario.role) && (
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/60 rounded-xl px-3 py-2.5 w-full">
              <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
              <span className="truncate font-medium capitalize">{usuario.rol || usuario.role}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botón Ver perfil completo */}
      <button
        type="button"
        onClick={irAPerfilCompleto}
        className="mt-4 w-full flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 py-2.5 rounded-xl border border-cyan-200/60 dark:border-cyan-800/40 transition-colors cursor-pointer uppercase tracking-wider"
      >
        <ExternalLink size={14} />
        Ver perfil completo
      </button>

      <hr className="my-3.5 border-slate-100 dark:border-slate-800" />

      {/* Diálogo de Confirmación de Cierre de Sesión */}
      {confirmandoSalida ? (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-center space-y-2">
          <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
            ¿Confirmas que deseas cerrar sesión?
          </p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => setConfirmandoSalida(false)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={manejarCerrarSesion}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
            >
              Sí, Salir
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmandoSalida(true)}
          className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 py-2.5 rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
        >
          <LogOut size={15} />
          Cerrar sesión
        </button>
      )}

    </div>
  );
}

export default Perfil;