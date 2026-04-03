import { useState, useRef } from "react";

import { useForm } from "react-hook-form";

export default function OTP() {
  const OTP_LENGTH = 6;

  const [input, setInput] = useState(Array(OTP_LENGTH).fill(""));
  const inputRef = useRef([]);

  const { handleSubmit, setError, setValue, clearErrors } = useForm();
  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const newOTP = [...input];
    newOTP[index] = value;
    setInput(newOTP);

    clearErrors("otp");

    if (value && index < input.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  //   function handleBackButton ( )
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-[450px]   mx-auto rounded-lg border border-card-border p-8 bg-zinc-950 ">
        <h4 className="text-xl font-semibold ">Check your Email</h4>
        <p className="mt-2 text-sm">
          We send 6 digit code to your email. Enter it below
        </p>
        <form>
          <div className="w-full flex gap-x-3 mt-8">
            {input.map((item, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRef[index] = el)}
                className="w-12 h-12 text-center p-2 rounded-lg border border-card-border focus:border-zinc-500"
                value={item}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>
          <input
            type="submit"
            value={"Verify"}
            className="w-full py-2 bg-accent hover:bg-accent/90   transition-colors cursor-pointer rounded-lg text-white mt-6"
          />
        </form>

        <p className="text-center font-semibold text-sm mt-6">
          Max OTP limit reached
        </p>
      </div>
    </div>
  );
}
