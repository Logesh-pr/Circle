//zustand
import { useAuthStore } from "../store/useAuthStore";

//components
import ProfilePic from "../components/ui/ProfilePic";
import Logout from "../components/ui/Logout";

export default function Profile() {
  const { user } = useAuthStore();
  return (
    <div className="px-4 py-6 border-b border-light-border dark:border-dark-border">
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center md:items-start">
        <ProfilePic width={100} height={100} />
        <div className="text-center md:text-start">
          <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">
            {user?.username}
          </p>
          <p className="text-sm font-semibold text-light-secondary dark:text-dark-secondary">
            {user?.email}
          </p>
          <Logout />
        </div>
      </div>
    </div>
  );
}
