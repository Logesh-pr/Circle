//components
import PostCard from "../components/PostCard";
import Loader from "../components/ui/Loader";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//react query
import { useFetchAllPost } from "../hooks/usePostQuery";

export default function Home() {
  const { data: post, isPending } = useFetchAllPost();
  console.log(post);

  if (isPending) {
    return <Loader />;
  }
  return (
    <>
      <div className="py-5 flex flex-col-reverse gap-y-3">
        {post?.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </>
  );
}
