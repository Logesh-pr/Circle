export default function FormField({
  label,
  name,
  type,
  register,
  error,
  validation,
  disabled,
}) {
  return (
    <div className="flex flex-col gap-y-2 mb-2">
      <label htmlFor="" className="form label">
        {label}
      </label>
      <input
        {...register(name, validation)}
        type={type}
        className={`form-input ${error && "border-red-500"} ${disabled && "opacity-50 cursor-not-allowed"}`}
      />
      <div className="">
        <p className="error-message">{error && error.message}</p>
      </div>
    </div>
  );
}
