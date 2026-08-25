//react query
import { useLogout } from "../../hooks/useAuthQuery";
//zustand
import { useAuthStore } from "../../store/useAuthStore";
export default function Logout() {
  const clearUser = useAuthStore((state) => state.clearUser);
  const { mutate, isPending } = useLogout();

  return (
    <button
      onClick={() => mutate()}
      className="px-4 py-1 text-sm text-white rounded-lg bg-red-500 hover:bg-red-500/70 transition-colors cursor-pointer"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
