import { useState } from "react";

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
  showPasswordIcons,
  passwordIcons,
}) {
  const [password, showPassword] = useState(false);
  return (
    <div className="flex flex-col gap-y-2 mb-2 relative">
      <label
        htmlFor=""
        className="form label text-light-primary dark:text-dark-primary font-semibold"
      >
        {label}
      </label>
      <input
        {...register(name, validation)}
        type={showPasswordIcons && password ? "text" : type}
        placeholder={placeholder}
        className={`form-input border placeholder:text-sm placeholder:text-light-primary focus:border-dark-secondary ${error ? "border-red-500" : "border-light-border dark:border-dark-border"} ${disabled && "opacity-50 cursor-not-allowed"}`}
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

      {showPasswordIcons && (
        <div
          className="absolute right-[10px] top-[45px] "
          onClick={() => showPassword((pre) => !pre)}
        >
          {password ? passwordIcons.eye : passwordIcons.closedEye}
        </div>
      )}

      {showIcons && (
        <div className=" absolute right-[10px] top-[40px]">
          {usernameAvailable && !error && !isChecking && icons?.iconSuccess}
          {error && !isChecking && icons?.iconError}
        </div>
      )}
    </div>
  );
}
