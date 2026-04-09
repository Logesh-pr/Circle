//framer motion
import { motion } from "motion/react";

const SETPS = ["signup", "opt", "username"];
export default function StepIndicator({ currentStep = "signup" }) {
  return (
    <div className="w-[100px] flex gap-x-2">
      {SETPS.map((step, index) => (
        <motion.div
          key={index}
          className={`h-[6px] ${step === currentStep ? " w-[25px] rounded-lg bg-accent" : " w-[8px] rounded-lg bg-zinc-700"}`}
        />
      ))}
    </div>
  );
}
