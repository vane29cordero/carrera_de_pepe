import { forwardRef } from "react";

const FormSelect = forwardRef(function FormSelect(
  {
    label,
    name,
    options = [],
    required = false,
    error = "",
    ...rest
  },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>

      <select
        id={name}
        name={name}
        required={required}
        ref={ref}
        {...rest}
        className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option} value={option} className="dark:bg-slate-900 text-slate-900 dark:text-white">
            {option}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs font-semibold text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
});

export default FormSelect;
