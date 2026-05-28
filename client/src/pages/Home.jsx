//components
import PostCard from "../components/PostCard";
import Loader from "../components/ui/Loader";
import Feed from "../components/ui/Feed";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//react query
import { useFetchAllPost } from "../hooks/usePostQuery";

export default function Home() {
  const { data: post, isLoading } = useFetchAllPost();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Feed>
        {post?.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </Feed>
    </>
  );
}
