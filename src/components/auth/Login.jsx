import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { X, Waves, Lock, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login({ isOpen, onClose }) {
  const { iniciarSesion } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (datos) => {
    iniciarSesion(datos);
    toast.success("¡Bienvenido! Sesión iniciada correctamente.");
    reset();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#08182b] border border-cyan-100 dark:border-cyan-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ingresa a tu cuenta
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="correo" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              </span>
              <input
                type="email"
                id="correo"
                placeholder=""
                {...register("correo", { required: "El correo es obligatorio" })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            {errors.correo && (
              <span className="block mt-1 text-xs font-semibold text-rose-500">
                {errors.correo.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="contraseña" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                id="contraseña"
                placeholder=""
                {...register("contraseña", { required: "La contraseña es obligatoria" })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            {errors.contraseña && (
              <span className="block mt-1 text-xs font-semibold text-rose-500">
                {errors.contraseña.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-[0.99] shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Iniciar Sesión</span>
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Crea tu cuenta{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold cursor-pointer hover:underline">
              Regístrate
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;