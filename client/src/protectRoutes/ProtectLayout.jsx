//custom hooks
import { useFetchUser } from "../hooks/useAuthQuery";

//react router
import { useNavigate } from "react-router-dom";

//components
import Loader from "../components/ui/Loader";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectLayout({ children }) {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { data, isError, isSuccess, isPending } = useFetchUser();

  if (isError) {
    console.log(isError);
    // navigate("auth/login", { replace: true });
  }

  if (isPending) {
    return <Loader />;
  }

  if (isSuccess) {
    console.log(data);
    return children;
  }
}
