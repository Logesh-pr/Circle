import { Navigate } from "react-router-dom";

import { useTokenStore } from "../store/useAuthStore";
import { useCheckOTPStatus } from "../hooks/useAuthQuery";

//components
import { Loader } from "../components/ui/Loader";

export default function OTPRoute({ children }) {
  const { isError, isLoading } = useCheckOTPStatus();
  if (isLoading) return <Loader />;
  if (isError) return <Navigate to="/signup" replace />;

  return children;
}
