//framer motion
import { motion } from "motion/react";

//react router
import { useLocation } from "react-router-dom";

const STEPS = ["/auth/signup", "/auth/otp", "/auth/username"];
export default function StepIndicator() {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <div
      className={`${STEPS.includes(currentLocation) ? "flex" : "hidden"} 
      w-[100px]  gap-x-2`}
    >
      {STEPS.map((step, index) => (
        <motion.div
          key={index}
          className={`h-[6px] ${step === currentLocation ? " w-[25px] rounded-lg bg-accent" : " w-[8px] rounded-lg bg-zinc-700"}`}
        />
      ))}
    </div>
  );
}
