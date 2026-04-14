import { Outlet } from "react-router-dom";
import StepIndicator from "../components/ui/StepIndicator";

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen flex  justify-center items-center px-4">
      <div className="w-full max-w-[450px] h-fit mx-auto border bg-light dark:bg-dark border-light-border dark:border-dark-border  px-10 rounded-xl py-8">
        <StepIndicator />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
