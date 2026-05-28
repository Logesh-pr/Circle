//components
import ProfilePic from "./ui/ProfilePic";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//custom hooks
import { useFollowUserQuery } from "../hooks/useUserQuery";

export default function ProfileCard({ user }) {
  const { mutate: followUser } = useFollowUserQuery();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center md:items-start">
        <ProfilePic avator={user?.avator} width={100} height={100} />
        <div className="text-center md:text-start flex flex-col gap-y-2">
          <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">
            {user?.username}
          </p>
          <p className="text-sm font-semibold text-light-secondary dark:text-dark-secondary">
            {user?.email}
          </p>
          {user?.bio && (
            <p className="text-sm text-light-primary dark:text-dark-primary">
              {user.bio}
            </p>
          )}

          {/* <Logout /> */}
          <div className="flex gap-x-4 text-light-primary dark:text-dark-primary text-sm">
            <p className="flex items-center">
              Following {user?.followingCounts}
            </p>
            <p>Followers {user?.followersCounts}</p>
          </div>

          <div className="mt-2">
            {!user?.isOwnProfile && !user?.isFollowing && (
              <button
                onClick={() => followUser(user?.username)}
                className="bg-accent w-full px-4 py-2 rounded-lg text-light font-semibold text-sm hover:bg-accent/90 transition-colors cursor-pointer"
              >
                Follow
              </button>
            )}

            {user?.isFollowing && (
              <button
                onClick={() => followUser(user?.username)}
                className="bg-transparent border border-accent w-full px-4 py-2 rounded-lg text-light font-semibold text-sm  transition-colors cursor-pointer"
              >
                Un follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
