import { useState, useRef, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";

//form hook
import { useForm } from "react-hook-form";

//react query
import {
  useResendOTP,
  useSignupStatus,
  useVerifyOTP,
} from "../hooks/useAuthQuery";

//zustand
import { useResendOTPStore, useTempUserStore } from "../store/useAuthStore";

//custom hooks
import { useResendTimer } from "../hooks/useResedTimer";

export default function OTP() {
  const OTP_LENGTH = 6;

  const navigate = useNavigate();
  const [input, setInput] = useState(Array(OTP_LENGTH).fill(""));
  const inputRef = useRef([]);

  const {
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: { otp: "" } });

  const { data: statusData } = useSignupStatus();
  const { mutate: resendMutate, isPending: isResendPending } = useResendOTP();
  const { mutate: verifyOTP, isPending: isVerifyingPending } = useVerifyOTP();
  const { remainingSeconds, isTimerActive, startTimer } = useResendTimer();
  const { resendAttempts, setResendData, clearResendData } =
    useResendOTPStore();
  const { setTempUsername } = useTempUserStore();

  const email = statusData?.data?.email || "";
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : "your email";

  const otpAttempts = statusData?.data?.otpAttempts || 0;
  const maxOtpAttempts = statusData?.data?.maxOtpAttempts || 3;
  const maxResendOTPAttempts = statusData?.data?.maxResendOTPAttempts || 3;
  const isMaxResendReached = resendAttempts >= maxResendOTPAttempts;
  const isMaxOtpReached = otpAttempts >= maxOtpAttempts;

  useEffect(() => {
    inputRef.current[0]?.focus();
    console.log(inputRef.current);
  }, []);

  function syncFormValue(newOTP) {
    const joined = newOTP.join("");
    setValue("otp", joined, { shouldValidate: false });
    if (joined.length === OTP_LENGTH) clearErrors("otp");
  }

  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const newOTP = [...input];
    newOTP[index] = value;
    setInput(newOTP);
    syncFormValue(newOTP);
    clearErrors("otp");

    if (value && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
  }

  function handleKey(e, index) {
    console.log(e.key === "Backspace" && !input[index] && index > 0);

    if (e.key === "Backspace" && !input[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) return;
    const digits = pasted.slice(0, OTP_LENGTH).split("");
    const newOTP = Array(OTP_LENGTH).fill("");
    digits.forEach((digit, i) => {
      newOTP[i] = digit;
    });
    setInput(newOTP);
    syncFormValue(newOTP);
    const nextEmpty = newOTP.findIndex((v) => !v);
    inputRef.current[nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty]?.focus();
  }

  function resetInputs() {
    const empty = Array(OTP_LENGTH).fill("");
    setInput(empty);
    setValue("otp", "");
    inputRef.current[0]?.focus();
  }

  function onSubmit(data) {
    if (data.otp.length !== OTP_LENGTH) {
      setError("otp", { type: "manual", message: "Please enter all 6 digit" });
      return;
    }

    verifyOTP(
      { otp: data.otp },
      {
        onSuccess: (data) => {
          clearResendData();
          console.log(data.data.tempUsername);
          setTempUsername(data.data.tempUsername);
          navigate("/", { replace: true });
        },
        onError: (err) => {
          const errMessage = err.response.data.message || "Verification failed";
          setError("otp", { type: "server", message: errMessage });
          resetInputs();
        },
      },
    );
  }
  function handleResend() {
    resendMutate(undefined, {
      onSuccess: (data) => {
        setResendData(data.data.resendAvailable, data.data.resendAttempts);
        startTimer(data.data.resendAvailableAt);
        clearErrors("otp");
        resetInputs();
      },
      onError: (err) => {
        setError("otp", {
          type: "server",
          message: err.response?.data?.message || "Failed to resend OTP",
        });
      },
    });
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-[450px]   mx-auto rounded-lg border border-card-border p-8 bg-zinc-950 ">
        <h4 className="text-xl font-semibold ">Check your Email</h4>
        <p className="mt-2 text-sm text-zinc-400">
          We send 6 digit code to your{" "}
          <span className="text-zinc-100">{maskedEmail}</span>. Enter it below
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex gap-x-3 mt-8" onPaste={handlePaste}>
            {input.map((item, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                inputMode="numeric"
                ref={(el) => (inputRef.current[index] = el)}
                className="w-12 h-12 text-center p-2 rounded-lg border border-card-border focus:border-zinc-500 caret-transparent"
                value={item}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKey(e, index)}
                disabled={isResendPending || isMaxOtpReached}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-400 text-sm mt-3 text-center">
              {errors.otp.message}
            </p>
          )}
          <input
            type="submit"
            value={
              (isResendPending && "Sending...") || isVerifyingPending
                ? "Verifying..."
                : "Verify"
            }
            disabled={isResendPending || isMaxOtpReached || isVerifyingPending}
            className={` w-full py-2 bg-accent hover:bg-accent/90   transition-colors cursor-pointer rounded-lg text-white mt-6 ${
              (isResendPending || isMaxOtpReached || isVerifyingPending) &&
              "opacity-50 cursor-not-allowed"
            }`}
          />
        </form>

        <div className="mt-6 text-center">
          {isMaxOtpReached ? (
            <p className="text-red-400 font-semibold text-sm">
              Maximum OTP attempts reached. Please signup again.
            </p>
          ) : isMaxResendReached ? (
            <p className="text-zinc-400 text-sm">
              Maximum resend limit reached
            </p>
          ) : (
            <>
              {isTimerActive ? (
                <p className="text-zinc-400 text-sm">
                  Resend available in{" "}
                  <span className="text-zinc-100 font-semibold">
                    {remainingSeconds}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResendPending || isVerifyingPending}
                  className="text-accent hover:text-accent/80 text-sm font-semibold transition-colors cursor-pointer"
                >
                  {isResendPending ? "Sending..." : "Resend OTP"}
                </button>
              )}
              <p className="text-zinc-500 text-xs mt-1">
                {resendAttempts}/{maxResendOTPAttempts} resends used
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
