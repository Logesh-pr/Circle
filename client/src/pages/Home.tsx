import { useState } from "react";

//components
import PostCard from "../components/PostCard";
import Loader from "../components/ui/Loader";
import Feed from "../components/ui/Feed";
import CreatePost from "../components/ui/CreatePost";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//react query
import { useFetchAllPost } from "../hooks/usePostQuery";

export default function Home() {
  const { data: post, isLoading } = useFetchAllPost();
  const [createPost, setCreatePost] = useState(false);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="relative ">
      <Feed>
        {post?.map((posts, index) => (
          <PostCard post={posts} key={index} />
        ))}
      </Feed>
      <button
        onClick={() => setCreatePost(true)}
        className="md:hidden z-50 fixed hover:bg-accent/80 cursor-pointer bottom-[100px] right-[30px] w-[50px] h-[50px] rounded-full bg-accent flex items-center justify-center"
      >
        +
      </button>
      <CreatePost post={createPost} setPost={setCreatePost} />
    </div>
  );
}
