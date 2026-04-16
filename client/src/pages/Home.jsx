//components
import PostCard from "../components/PostCard";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export default function Home() {
  return (
    <>
      <div className="py-5">
        <PostCard />
      </div>
    </>
  );
}
