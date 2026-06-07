import { useState, useEffect } from "react";

//components
import ProfilePic from "./ui/ProfilePic";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//custom hookss
import { useFollowUserQuery } from "../hooks/useUserQuery";
import ShowFollowers from "./ShowFollowers";
import ShowFollowings from "./ShowFollowings";

export default function ProfileCard({ user }) {
  useEffect(() => {
    setFollowings(false);
  }, []);
  const { mutate: followUser } = useFollowUserQuery();
  const [followers, setFollowers] = useState(false);
  const [followings, setFollowings] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center md:items-start">
        <ProfilePic avator={user?.avator} width={100} height={100} />
        <div className="text-center md:text-start flex flex-col gap-y-2">
          <div className="">
            <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">
              {user?.name}
            </p>
            <p className="text-sm text-zinc-500 mt-1">@{user?.username}</p>
          </div>

          {/* <p className="text-sm font-semibold text-light-secondary dark:text-dark-secondary">
            {user?.email}
          </p> */}
          {user?.bio && (
            <p className="text-sm text-light-primary dark:text-dark-primary">
              {user.bio}
            </p>
          )}

          {/* <Logout /> */}
          <div className="flex gap-x-4 text-light-primary dark:text-dark-primary text-sm">
            <p
              onClick={() => setFollowings(true)}
              className=" cursor-pointer flex items-center"
            >
              Following {user?.followingCounts}
            </p>
            {followings && (
              <ShowFollowings
                username={user?.username}
                setFollowings={setFollowings}
              />
            )}

            <p onClick={() => setFollowers(true)} className="cursor-pointer">
              Followers {user?.followersCounts}
            </p>
            {followers && (
              <ShowFollowers
                username={user?.username}
                setFollowers={setFollowers}
              />
            )}
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
