import { Navigate } from "react-router-dom";

import { useTokenStore } from "../store/useAuthStore";
import { useCheckOTPStatus } from "../hooks/useAuthQuery";

export default function OTPRoute({ children }) {
  const { isPending, isError, isSuccess } = useCheckOTPStatus();
  if (isError) return <Navigate to="/signup" replace />;

  return children;
}
