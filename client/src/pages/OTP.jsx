import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useResendOTP } from "../hooks/useAuthQuery";

//Zustand
import { useToken } from "../store/useAuthStore";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;
const MAX_RESEND = 2;

export default function OTP() {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);
  const [resendCount, setResendCount] = useState(0);
  const inputsRef = useRef([]);

  const { mutate, isPending } = useResendOTP();
  const otpToken = useToken((state) => state.otpToken);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    clearErrors("otp");

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }

    setValue("otp", newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (resendCount >= MAX_RESEND) return;
    console.log(otpToken);
    mutate(otpToken, {
      onSuccess: (data) => {
        console.log("success", data.message);
        setResendCount((prev) => prev + 1);
        setTimer(RESEND_TIME);

        setOtp(Array(OTP_LENGTH).fill(""));
        inputsRef.current[0].focus();
      },
      onError: (error) => {
        console.log("error:", error.response.data.message);
        setError("otp", { message: error.response.data.message });
      },
    });
  };

  const onSubmit = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== OTP_LENGTH) {
      setError("otp", { message: "Enter complete OTP" });
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1500));

      if (enteredOtp !== "123456") {
        throw new Error("Invalid OTP");
      }

      alert("OTP Verified ✅");
    } catch (err) {
      setError("otp", { message: err.message });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={isSubmitting}
              className="w-12 h-12 text-center form-input"
            />
          ))}
        </div>

        {errors.otp && (
          <p className="text-red-500 text-sm text-center">
            {errors.otp.message}
          </p>
        )}
        <div className="text-sm text-center mt-2">
          {timer > 0 ? (
            <p>Resend OTP in {timer}s</p>
          ) : resendCount < MAX_RESEND ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-accent cursor-pointer"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-red-500">Max resend limit reached</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent mt-4 text-center  text-white px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}
