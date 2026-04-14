//react hook form
import { useForm } from "react-hook-form";

//components
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";

//icons
import { Eye, EyeClosed } from "lucide-react";

//react query
import { useLogin } from "../hooks/useAuthQuery";

export default function Login() {
  const { mutate, isPending } = useLogin();
  const passwordIcons = {
    closedEye: <EyeClosed size={20} />,
    eye: <Eye size={20} />,
  };
  const {
    handleSubmit,
    register,
    clearError,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    reset();
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        setError("common", {
          type: "manual",
          message: error.response?.data?.message,
        });
      },
    });
  }
  return (
    <div>
      <div>
        <h5 className="font-bold text-start text-xl text-light-primary dark:text-dark-primary">
          Welcome back
        </h5>
        <p className="text-start font-semibold text-light-secondary dark:text-dark-secondary text-sm font-mdium  mt-2 ">
          Enter your credentials to access your account
        </p>
      </div>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
            error={errors.email}
            register={register}
            disabled={isPending}
            showValidation={true}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
              setValueAs: (value) => value.toLowerCase().trim(),
            }}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            error={errors.password}
            register={register}
            disabled={isPending}
            showIcons={true}
            passwordIcons={passwordIcons}
            showValidation={true}
            showPasswordIcons={true}
            validation={{
              required: "Please enter the password",
              minLength: {
                value: 6,
                message: "Password must contain 6 characters",
              },
            }}
          />
        </fieldset>
        <div className="">
          <p className="error-message text-center">
            {errors.common && errors.common.message}
          </p>
        </div>
        <Button
          value={isPending ? "Logging in..." : "Login"}
          disabled={isPending}
          btnLogic={isPending}
        />
      </form>
    </div>
  );
}
