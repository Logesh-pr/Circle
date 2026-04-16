import { Navigate } from "react-router-dom";

import { useFetchUser } from "../hooks/useAuthQuery";
import Loader from "../components/ui/Loader";

export default function PublicLayout({ children }) {
  const { isSuccess, isPending } = useFetchUser();

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  if (isPending) {
    return <Loader />;
  }

  return children;
}
