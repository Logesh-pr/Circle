export default function FormField({
  label,
  name,
  type,
  register,

  error,
  validation,
  disabled,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-y-2 mb-2">
      <label htmlFor="" className="form label">
        {label}
      </label>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        className={`form-input placeholder:text-sm placeholder:text-zinc-600 ${error && "border-red-500"} ${disabled && "opacity-50 cursor-not-allowed"}`}
      />
      <div className="">
        <p className="error-message">{error && error.message}</p>
      </div>
    </div>
  );
}
