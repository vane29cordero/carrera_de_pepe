import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";

function FormFile({
  label,
  name,
  required = false,
  error = "",
  maxSizeMB = 2,
  maxFiles = 3,
  onFilesChange = () => {},
  value = [],
  accept = {
    "application/pdf": [".pdf"],
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  },
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (Array.isArray(value) && value.length === 0 && archivos.length > 0) {
      archivos.forEach((archivo) => {
        if (archivo.preview) URL.revokeObjectURL(archivo.preview);
      });
      setArchivos([]);
    }
  }

  const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;

  useEffect(() => {
    if (!mensaje) return;
    const temporizador = setTimeout(() => setMensaje(""), 3000);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  useEffect(() => {
    return () => {
      archivos.forEach((archivo) => {
        if (archivo.preview) URL.revokeObjectURL(archivo.preview);
      });
    };
  }, [archivos]);

  const eliminarArchivo = (id) => {
    const archivoEliminar = archivos.find((archivo) => archivo.id === id);
    if (archivoEliminar && archivoEliminar.preview) {
      URL.revokeObjectURL(archivoEliminar.preview);
    }

    setArchivos((otros) => {
      const actualizados = otros.filter((archivo) => archivo.id !== id);
      onFilesChange(actualizados.map((a) => a.file));
      return actualizados;
    });

    setMensaje("Archivo eliminado correctamente");
  };

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setErrorMsg("");

    if (rejectedFiles.length > 0) {
      const primerError = rejectedFiles[0].errors[0];
      if (primerError.code === "file-too-large") {
        setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
      } else if (primerError.code === "file-invalid-type") {
        setErrorMsg("Tipo de archivo no permitido (PDF o Imágenes)");
      } else {
        setErrorMsg(primerError.message);
      }
    }

    if (acceptedFiles.length > 0) {
      const espacioDisponible = maxFiles - archivos.length;
      if (espacioDisponible <= 0) {
        setErrorMsg(`Límite máximo de ${maxFiles} archivos alcanzado`);
        return;
      }

      const restantes = acceptedFiles.slice(0, espacioDisponible);
      const nuevosArchivos = restantes.map((file) => ({
        id: generarId(file),
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      }));

      setArchivos((otros) => {
        const actualizados = [...otros, ...nuevosArchivos];
        onFilesChange(actualizados.map((a) => a.file));
        return actualizados;
      });
    }
  };

  const limiteAlcanzado = archivos.length >= maxFiles;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    disabled: limiteAlcanzado,
    maxSize: maxSizeMB * 1024 * 1024,
    accept,
  });

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        {label} {required && archivos.length === 0 && <span className="text-amber-500">*</span>}
      </label>

      {/* Feedback temporal */}
      {mensaje && (
        <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-2 rounded-xl">
          <CheckCircle2 size={14} />
          <span>{mensaje}</span>
        </div>
      )}

      {/* Error de validación */}
      {errorMsg && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs px-3 py-2 rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Contenedor dropZone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
          limiteAlcanzado
            ? "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60"
            : isDragActive
            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 cursor-pointer scale-101"
            : errorMsg
            ? "border-rose-400 bg-rose-50/50 cursor-pointer"
            : "border-slate-300 dark:border-slate-700 hover:border-cyan-500 bg-slate-50 dark:bg-slate-900/50 hover:bg-cyan-50/40 dark:hover:bg-cyan-950/20 cursor-pointer"
        }`}
      >
        <input
          {...getInputProps({
            id: name,
            name,
            required: required && archivos.length === 0,
          })}
        />

        <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-2">
          📎
        </div>

        {limiteAlcanzado ? (
          <p className="text-xs font-semibold text-slate-500">
            Límite alcanzado ({maxFiles} de {maxFiles} archivos)
          </p>
        ) : (
          <>
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
              {isDragActive ? "Suelta tus archivos aquí" : "Arrastra tus fotos o documentos aquí"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              o haz clic para explorar en tu equipo (Máx. {maxFiles} archivos, {maxSizeMB}MB c/u)
            </p>
          </>
        )}
      </div>

      {/* Información de archivos seleccionados */}
      {archivos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
          {archivos.map((archivo) => (
            <div
              key={archivo.id}
              className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl flex flex-col justify-between shadow-xs"
            >
              <button
                type="button"
                onClick={() => eliminarArchivo(archivo.id)}
                className="absolute top-1.5 right-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 text-slate-500 rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Eliminar archivo"
              >
                <X size={12} />
              </button>

              {archivo.preview ? (
                <img
                  src={archivo.preview}
                  alt={archivo.file.name}
                  className="w-full h-20 object-cover rounded-lg border border-slate-100 dark:border-slate-800 mb-2"
                />
              ) : (
                <div className="w-full h-20 bg-slate-100 dark:bg-slate-800/80 rounded-lg mb-2 flex items-center justify-center text-slate-400">
                  <FileText size={24} />
                </div>
              )}

              <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                <p className="font-bold text-slate-800 dark:text-slate-200 truncate" title={archivo.file.name}>
                  {archivo.file.name}
                </p>
                <p className="text-[10px]">{(archivo.file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <span className="text-xs font-semibold text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormFile;
