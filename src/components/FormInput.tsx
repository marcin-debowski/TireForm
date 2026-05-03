import type { FormInputProps } from "../types/report-form.types";

export const FormInput = ({
  label,
  name,
  value,
  onChange,
  id,
  type = "text",
  autoComplete,
  error,
  placeholder,
  required,
  minLength,
  maxLength,
  pattern,
  warning,
}: FormInputProps) => {
  const inputClass =
    "w-full px-4 py-3 mb-5 rounded-xl border border-gray-300 bg-gray-50/50 " +
    "text-gray-800 text-base placeholder:text-gray-400 " +
    "outline-none transition-all duration-200 hover:border-gray-400 " +
    "focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 " +
    "user-invalid:border-red-500 user-invalid:text-red-600 " +
    "focus:user-invalid:border-red-500 focus:user-invalid:ring-4 focus:user-invalid:ring-red-500/10";

  const inputId = id ?? name;

  return (
    <>
      <label htmlFor={inputId} className='block mb-1.5 text-sm font-semibold text-gray-700 ml-1'>
        {label}{" "}
        {warning && <span className='text-orange-600 text-sm mb-2 font-medium'>{warning}</span>}
      </label>
      {error && <span className='text-red-600 text-sm mb-2 font-medium'>{error}</span>}
      <input
        id={inputId}
        type={type}
        className={inputClass}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={autoComplete ?? "off"}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        placeholder={placeholder}
      />
    </>
  );
};
