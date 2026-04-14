//framer motion
import { motion } from "motion/react";

//react router
import { useLocation } from "react-router-dom";

const SETPS = ["/auth/signup", "/auth/otp", "/auth/username"];
export default function StepIndicator() {
  const location = useLocation();
  const currentLocation = location.pathname;
  console.log(currentLocation);

  return (
    <div className={` w-[100px] flex gap-x-2`}>
      {SETPS.map((step, index) => (
        <motion.div
          key={index}
          className={`h-[6px] ${step === currentLocation ? " w-[25px] rounded-lg bg-accent" : " w-[8px] rounded-lg bg-zinc-700"}`}
        />
      ))}
    </div>
  );
}
