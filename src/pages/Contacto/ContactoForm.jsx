import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Send, Loader2 } from "lucide-react";
import FormInput from "./Componentes/FormInput";
import FormSelect from "./Componentes/FormSelect";
import FormTextArea from "./Componentes/FormTextArea";
import FormFile from "./Componentes/FormFile";
import paises from "./Componentes/Paises";
import ciudades from "./Componentes/Ciudades";

function ContactoForm() {
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      correo: "",
      telefono: "",
      genero: "",
      pais: "",
      ciudad: "",
      mensaje: "",
      archivos: [],
    },
  });

  const onSubmit = async (data) => {
    setCargando(true);

    try {
      const respuesta = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Contacto Surf Club: ${data.primerNombre} ${data.primerApellido}`,
          ...data,
          archivosCount: data.archivos?.length || 0,
        }),
      });

      if (respuesta.ok) {
        toast.success("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
        reset();
      } else {
        toast.error("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch {
      toast.error("Error de conexión. Por favor verifica tu red.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/95 dark:bg-[#08182b]/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Primer Nombre */}
        <FormInput
          label="Primer Nombre"
          placeholder="Escribe tu primer nombre"
          required
          error={errors.primerNombre?.message}
          {...register("primerNombre", {
            required: "El primer nombre es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />

        {/* Segundo Nombre */}
        <FormInput
          label="Segundo Nombre"
          placeholder="Opcional"
          {...register("segundoNombre")}
        />

        {/* Primer Apellido */}
        <FormInput
          label="Primer Apellido"
          placeholder="Escribe tu primer apellido"
          required
          error={errors.primerApellido?.message}
          {...register("primerApellido", {
            required: "El primer apellido es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />

        {/* Segundo Apellido */}
        <FormInput
          label="Segundo Apellido"
          placeholder="Opcional"
          {...register("segundoApellido")}
        />

        {/* Correo */}
        <FormInput
          label="Correo Electrónico"
          type="email"
          placeholder="rider@reyesdelasolas.com"
          required
          error={errors.correo?.message}
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo electrónico válido",
            },
          })}
        />

        {/* Teléfono */}
        <FormInput
          label="Teléfono"
          type="tel"
          placeholder="300 000 0000"
          required
          error={errors.telefono?.message}
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            minLength: { value: 7, message: "Ingresa un número telefónico válido" },
          })}
        />

        {/* Género */}
        <FormSelect
          label="Género"
          options={["Masculino", "Femenino", "Otro"]}
          required
          error={errors.genero?.message}
          {...register("genero", {
            required: "Por favor selecciona una opción",
          })}
        />

        {/* País */}
        <FormSelect
          label="País"
          options={paises}
          required
          error={errors.pais?.message}
          {...register("pais", {
            required: "Por favor selecciona tu país",
          })}
        />
      </div>

      {/* Ciudad */}
      <FormSelect
        label="Ciudad"
        options={ciudades}
        required
        error={errors.ciudad?.message}
        {...register("ciudad", {
          required: "Por favor selecciona tu ciudad",
        })}
      />

      {/* Mensaje */}
      <FormTextArea
        label="Mensaje"
        placeholder="Cuéntanos tus dudas, consultas de tablas o comentarios sobre el club..."
        rows={4}
        required
        error={errors.mensaje?.message}
        {...register("mensaje", {
          required: "El mensaje es obligatorio",
          minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" },
        })}
      />

      {/* Archivos con Dropzone (Controller de react-hook-form) */}
      <Controller
        name="archivos"
        control={control}
        render={({ field }) => (
          <FormFile
            label="Adjuntar Fotos o Documentos (Opcional)"
            name="archivos"
            value={field.value}
            onFilesChange={field.onChange}
            maxSizeMB={3}
            maxFiles={3}
          />
        )}
      />

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={cargando}
        className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-[0.99] shadow-md shadow-amber-400/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2"
      >
        {cargando ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Enviando Mensaje...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Enviar Mensaje</span>
          </>
        )}
      </button>
    </form>
  );
}

export default ContactoForm;