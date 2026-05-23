//zustand
import { useAuthStore } from "../store/useAuthStore";

//components
import ProfilePic from "../components/ui/ProfilePic";
import Logout from "../components/ui/Logout";
import Feed from "../components/ui/Feed";
import PostCard from "../components/PostCard";
import Loader from "../components/ui/Loader";

//custom hook
import { useFetchAllPostByProfile } from "../hooks/usePostQuery";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  const { user } = useAuthStore();
  const { data: post, isPending } = useFetchAllPostByProfile();
  return (
    <>
      <div className="px-4 py-6 border-b border-light-border dark:border-dark-border">
        <ProfileCard />
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : (
          <Feed>
            {post?.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </Feed>
        )}
      </div>
    </>
  );
}
