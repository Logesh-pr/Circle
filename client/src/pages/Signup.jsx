//form hook
import { useForm } from "react-hook-form";

//custom hooks
import { useSignup } from "../hooks/useAuthQuery";

//components
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";

//zustand
import { useResendOTPStore } from "../store/useAuthStore";

//react router
import { useNavigate, Link } from "react-router-dom";

//icons
import { EyeClosed, Eye } from "lucide-react";

export default function Signup() {
  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();
  const setResendData = useResendOTPStore((state) => state.setResendData);
  const passwordIcons = {
    closedEye: <EyeClosed size={20} />,
    eye: <Eye size={20} />,
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm();
  const checkConfirmPassword = watch("password");

  async function onSubmit(user) {
    clearErrors("common");
    mutate(user, {
      onSuccess: (data) => {
        console.log("success:", data.data, data.token);
        setResendData(data.data.resendAvailableAt, data.data.resendAttempts);
        navigate("/auth/otp", { replace: true });
        console.log("navigate");
        reset();
      },
      onError: (error) => {
        console.log("error:", error.response.data);
        if (
          error.response?.data?.message === "There is an account in this email"
        ) {
          reset();
          setError("common", {
            type: "manual",
            message: error.response?.data?.message,
          });
        }
      },
    });

    console.log(user);
  }

  return (
    <div className="w-full ">
      <div className="w-full ">
        <h5 className="font-bold text-start text-xl text-light-primary dark:text-dark-primary">
          Create your account
        </h5>
        <p className="text-start font-semibold text-light-secondary dark:text-dark-secondary text-sm font-mdium  mt-2 ">
          Enter your email and choose your password to get started with circle
        </p>
        <form
          action=""
          className="w-full  mx-auto flex flex-col   mt-6 "
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => clearErrors("common")}
        >
          <fieldset disabled={isPending}>
            <FormField
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              error={errors.name}
              register={register}
              disabled={isPending}
              showValidation={true}
              validation={{
                required: "Please enter your name",
                minLength: {
                  value: 4,
                  message: "Name must contain atleast 4 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Name must contain maximum 10 characters",
                },
              }}
            />
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
                  message: "Password must contain atleast 6 characters",
                },
              }}
            />

            <FormField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              error={errors.confirmPassword}
              register={register}
              disabled={isPending}
              showValidation={true}
              showPasswordIcons={true}
              passwordIcons={passwordIcons}
              validation={{
                required: "confirm password is required",
                validate: (password) =>
                  checkConfirmPassword === password || "password not match",
              }}
            />
            <div className="">
              <p className="error-message text-center">
                {errors.common && errors.common.message}
              </p>
            </div>

            <div className=" w-full text-center">
              <Button
                value={isPending ? "Signing in..." : "Signup"}
                disabled={isPending}
                btnLogic={isPending}
              />
            </div>
          </fieldset>

          <div className="mt-6 text-center text-sm text-light-secondary dark:text-dark-secondary font-semibold">
            <p>
              Already have an account?{" "}
              <Link
                className="text-accent hover:text-accent/80 transition-colors"
                to={"/auth/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
