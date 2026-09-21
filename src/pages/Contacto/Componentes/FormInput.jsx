import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  {
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
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

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
        {...rest}
      />
      {error && (
        <span className="text-xs font-semibold text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
});

export default FormInput;
