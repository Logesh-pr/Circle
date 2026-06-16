import { Navigate } from "react-router-dom";

import { useFetchUser } from "../hooks/useAuthQuery";

export default function PublicLayout({ children }) {
  const { isSuccess } = useFetchUser();

  // If user is already authenticated, redirect to home
  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  // Show login/signup page immediately without waiting for auth check
  return children;
}
