import { Outlet } from "react-router-dom";
import StepIndicator from "../components/ui/StepIndicator";

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen flex  justify-center items-center">
      <div className="w-full max-w-[450px] h-fit mx-auto border border-card-border bg-zinc-950 px-10 rounded-(--border-radius) py-8">
        <StepIndicator />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
