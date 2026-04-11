//form hook
import { useForm } from "react-hook-form";

//custom hooks
import { useSignup } from "../hooks/useAuthQuery";

//components
import FormField from "../components/ui/FormField";
import StepIndicator from "../components/ui/StepIndicator";

//zustand
import {
  useResendOTPStore,
  useStepIndicatorStore,
} from "../store/useAuthStore";

//react router
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();
  const setResendData = useResendOTPStore((state) => state.setResendData);
  const { setStepIndicator } = useStepIndicatorStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm({ mode: "onchange" });
  const checkConfirmPassword = watch("password");

  async function onSubmit(user) {
    clearErrors("common");
    mutate(user, {
      onSuccess: (data) => {
        console.log("success:", data.data, data.token);
        setResendData(data.data.resendAvailableAt, data.data.resendAttempts);
        setStepIndicator("otp");
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
        <h5 className="font-bold text-start text-xl">Create your account</h5>
        <p className="text-start text-sm font-semibold text-zinc-300  mt-2 ">
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
              showValidation={true}
              validation={{
                required: "Please enter the password",
                minLength: {
                  value: 6,
                  message: "Password must contain 6 characters",
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

            <div className="w-full text-center">
              <input
                type="submit"
                value={isPending ? "Signing in..." : "Signup"}
                disabled={isPending}
                className={`mt-6  px-8 py-2 bg-accent hover:bg-accent/90 transition-colors rounded-lg font-semibold cursor-pointer ${isPending && "opacity-50 cursor-not-allowed"} `}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
