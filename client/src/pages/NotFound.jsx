//react router
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-light dark:bg-dark flex flex-col gap-y-4 justify-center items-center">
      <h5 className="font-bold text-light-primary dark:text-dark-primary text-7xl">
        404
      </h5>
      <p className="font-semibold">Not found</p>
      <button
        onClick={() => navigate("/", { replace: true })}
        className=" px-8 py-2 bg-accent text-light rounded-lg font-semibold hover:bg-accent/90 transition-colors cursor-pointer"
      >
        Home
      </button>
    </div>
  );
}
