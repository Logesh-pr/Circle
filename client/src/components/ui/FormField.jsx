export default function FormField({
  label,
  name,
  type,
  register,
  icons,
  isChecking,
  error,
  validation,
  disabled,
  placeholder,
  usernameAvailable,
  showValidation,
  showIcons,
}) {
  return (
    <div className="flex flex-col gap-y-2 mb-2 relative">
      <label htmlFor="" className="form label">
        {label}
      </label>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        className={`form-input placeholder:text-sm placeholder:text-zinc-600 ${error && "border-red-500"} ${disabled && "opacity-50 cursor-not-allowed"}`}
      />

      {showValidation && (
        <div className="">
          {isChecking && <p className="checking-message">Checking...</p>}
          {usernameAvailable && !error && !isChecking && (
            <p className="success-message">username is available</p>
          )}
          {error && <p className="error-message">{error.message}</p>}
        </div>
      )}

      {showIcons && (
        <div className=" absolute right-[10px] top-[40px]">
          {(icons && usernameAvailable && icons.iconSuccess) ||
            (error && icons.iconError)}
        </div>
      )}
    </div>
  );
}
