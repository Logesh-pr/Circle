import { Navigate } from "react-router-dom";

//react query
import { useSignupStatus } from "../hooks/useAuthQuery";

//components
import Loader from "../components/ui/Loader";

export default function SignupProtect({ allowedStep, children }) {
  const { data, isError, isLoading } = useSignupStatus();

  if (isLoading) return <Loader />;

  if (isError || !data || data.step === "none")
    return <Navigate to="/auth/signup" replace />;

  if (data.step !== allowedStep) {
    const redirectMap = {
      otp: "/auth/otp",
      username: "/auth/username",
    };

    return <Navigate to={redirectMap[data.step] || "/auth/signup"} replace />;
  }

  return children;
}
