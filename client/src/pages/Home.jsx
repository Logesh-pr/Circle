//components
import PostCard from "../components/PostCard";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//react query
import { useFetchAllPost } from "../hooks/usePostQuery";

export default function Home() {
  const { data: post, isPending } = useFetchAllPost();
  console.log(post);
  return (
    <>
      <div className="py-5 flex flex-col gap-y-3">
        {post?.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </>
  );
}
