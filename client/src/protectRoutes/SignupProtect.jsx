import { Navigate } from "react-router-dom";

//react query
import { useSignupStatus } from "../hooks/useAuthQuery";

//components
import { Loader } from "../components/ui/Loader";

export default function SignupProtect({ allowedStep, children }) {
  const { data, isError, isLoading } = useSignupStatus();

  if (isLoading) return <Loader />;

  if (isError || !data || data.step === "none")
    return <Navigate to="/signup" replace />;

  if (data.step !== allowedStep) {
    const redirectMap = {
      otp: "/otp",
      username: "/username",
    };

    return <Navigate to={redirectMap[data.setp] || "/signup"} replace />;
  }

  return children;
}
