//form hook
import { useForm } from "react-hook-form";

//custom hooks
import { useSignup } from "../hooks/useAuthQuery";

//components
import FormField from "../components/FormField";

//zustand
import { useToken } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();
  const setOTPToken = useToken((state) => state.setOTPToken);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setError,
  } = useForm();
  const checkConfirmPassword = watch("password");

  async function onSubmit(user) {
    mutate(user, {
      onSuccess: (data) => {
        console.log("success:", data.token);
        setOTPToken(data.token);
        navigate("/otp", { replace: true });
        reset();
      },
      onError: (error) => {
        console.log("error:", error.response.data);
        if (
          error.response.data.message === "There is an account in this email"
        ) {
          reset();
          setError("common", {
            type: "manual",
            message: error.response.data.message,
          });
        }
      },
    });

    console.log(user);
  }

  return (
    <div className="w-full min-h-screen max-w-150 mx-auto  flex justify-center items-center">
      <div className="w-full h-auto border border-card-border p-4 rounded-(--border-radius) py-12">
        <div className="w-full">
          <h5 className="font-bold text-center text-xl">Signup</h5>
          <p className="text-center mt-2 text-dark-secondary">
            Create an account to join a Circle community
          </p>
          <form
            action=""
            className="w-full max-w-[300px] mx-auto flex flex-col  mt-12 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset disabled={isPending}>
              <FormField
                label="Email"
                name="email"
                type="email"
                error={errors.email}
                register={register}
                disabled={isPending}
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
                error={errors.password}
                register={register}
                disabled={isPending}
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
                error={errors.confirmPassword}
                register={register}
                disabled={isPending}
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
    </div>
  );
}
