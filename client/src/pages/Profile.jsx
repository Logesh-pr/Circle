//components
import ProfilePic from "../components/ui/ProfilePic";
import Logout from "../components/ui/Logout";
import Feed from "../components/ui/Feed";
import PostCard from "../components/PostCard";
import Loader from "../components/ui/Loader";

//custom hook
import { useFetchAllPostByProfile } from "../hooks/usePostQuery";

//components
import ProfileCard from "../components/ProfileCard";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//react router
import { useParams } from "react-router-dom";
import { useUserProfileQuery } from "../hooks/useUserQuery";

export default function Profile() {
  const { username } = useParams();
  const { data: post, isLoading } = useFetchAllPostByProfile(username);
  const { data: user } = useUserProfileQuery(username);
  return (
    <>
      <div className="px-4 py-6 border-b border-light-border dark:border-dark-border">
        <ProfileCard user={user} />
      </div>
      <div>
        {isLoading ? (
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
