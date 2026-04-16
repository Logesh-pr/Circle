import { useEffect } from "react";

//custom hooks
import { useFetchUser } from "../hooks/useAuthQuery";

//react router
import { Navigate } from "react-router-dom";

//components
import Loader from "../components/ui/Loader";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectLayout({ children }) {
  const { setUser } = useAuthStore();

  const { data, isError, isSuccess, isPending } = useFetchUser();

  useEffect(() => {
    setUser(data?.data);
  }, [isSuccess, data, setUser]);

  if (isError) {
    console.log(isError);
    return <Navigate to="/auth/login" replace={true} />;
  }

  if (isPending) {
    return <Loader />;
  }

  if (isSuccess) {
    console.log(data.data);
    return children;
  }
}
