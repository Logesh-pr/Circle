//components
import ProfilePic from "./ProfilePic";

//react router
import { Link } from "react-router-dom";
export default function SearchCard({ user }) {
  return (
    <Link
      to={`/profile/${user?.username}`}
      className="w-full flex justify-between items-center cursor-pointer hover:bg-zinc-950 p-2"
    >
      <div className="flex gap-x-4">
        <ProfilePic avator={user?.avator} />
        <div>
          <p className="text-sm text-light-primary dark:text-dark-primary font-semibold">
            {user?.username}
          </p>
          <p className="text-xs text-light-secondary dark:text-dark-secondary">
            @kevin_ken
          </p>
        </div>
      </div>
      <div>
        <button className="bg-accent px-4 py-1 rounded-lg text-light font-semibold text-sm hover:bg-accent/90 transition-colors cursor-pointer">
          Follow
        </button>
      </div>
    </Link>
  );
}
