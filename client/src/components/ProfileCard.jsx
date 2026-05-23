//zustand
import { useAuthStore } from "../store/useAuthStore";

//components
import ProfilePic from "./ui/ProfilePic";

export default function ProfileCard() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center md:items-start">
      <ProfilePic width={100} height={100} />
      <div className="text-center md:text-start">
        <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">
          {user?.username}
        </p>
        <p className="text-sm font-semibold text-light-secondary dark:text-dark-secondary">
          {user?.email}
        </p>
        {/* <Logout /> */}
      </div>
    </div>
  );
}
