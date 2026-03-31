//form hook
import { useForm } from "react-hook-form";

//custom hooks
import { useSignup } from "../hooks/useAuthQuery";

export default function Signup() {
  const { mutate, isError, isSuccess } = useSignup();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setError,
  } = useForm();
  const checkConfirmPassword = watch("password");

  async function onSubmit(data) {
    mutate(data, {
      onSuccess: (data) => {
        console.log("success:", data);
        reset();
      },
      onError: (error) => {
        console.log("error:", error.response.data.message);
        if (
          error.response.data.message === "There is an account in this email"
        ) {
          setError("email", {
            type: "manual",
            message: error.response.data.message,
          });
        }
      },
    });

    console.log(data);
  }
  return (
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
        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="" className="form label">
            Email
          </label>
          <input
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
              setValueAs: (value) => value.toLowerCase().trim(),
            })}
            type="text"
            className={`form-input ${errors.email && "border-red-500"}`}
          />
          <div className="">
            <p className="error-message">
              {errors.email && errors.email.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="" className="form label">
            Password
          </label>
          <input
            {...register("password", {
              required: "Please enter the password",
              minLength: {
                value: 6,
                message: "Password must contain 6 characters",
              },
            })}
            type="Password"
            className={`form-input ${errors.password && "border-red-500"}`}
          />
          <div className="">
            <p className="error-message">
              {errors.password && errors.password.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="form label">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (password) =>
                checkConfirmPassword === password || "password not match",
            })}
            type="Password"
            className={`form-input ${errors.confirmPassword && "border-red-500"}`}
          />
          <div className="">
            <p className="error-message">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>
        </div>

        <input
          type="submit"
          value={"Signup"}
          className="mt-6 px-4 py-2 bg-accent hover:bg-accent/90 transition-colors rounded-lg font-semibold cursor-pointer"
        />
      </form>
    </div>
  );
}
