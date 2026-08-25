//icons
import { House, Search, Bell, User, Bookmark } from "lucide-react";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export function useNavItems() {
  const { user } = useAuthStore();

  return [
    {
      path: "/",
      name: "Home",
      icon: <House />,
    },
    {
      path: "/search",
      name: "Search",
      icon: <Search />,
    },
    // {
    //   path: "/notification",
    //   name: "Notification",
    //   icon: <Bell />,
    // },
    {
      path: "/bookmark",
      name: "Bookmarks",
      icon: <Bookmark />,
    },
    {
      path: `/profile/${user?.username}`,
      name: "Profile",
      icon: <User />,
    },
  ];
}
