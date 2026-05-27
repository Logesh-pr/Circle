//components
import ProfilePic from "./ProfilePic";
export default function SearchCard({ user }) {
  return (
    <div className="w-full flex justify-between items-center  ">
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
    </div>
  );
}
