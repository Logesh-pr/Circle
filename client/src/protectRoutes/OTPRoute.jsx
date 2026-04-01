import { Navigate } from "react-router-dom";

import { useToken } from "../store/useAuthStore";

export default function OTPRoute({ children }) {
  const otpToken = useToken((state) => state.otpToken);
  if (!otpToken) return <Navigate to="/signup" replace />;

  return children;
}
