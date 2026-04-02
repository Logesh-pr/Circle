import { Navigate } from "react-router-dom";

import { useTokenStore } from "../store/useAuthStore";

export default function OTPRoute({ children }) {
  const otpToken = useTokenStore((state) => state.otpToken);
  if (!otpToken) return <Navigate to="/signup" replace />;

  return children;
}
