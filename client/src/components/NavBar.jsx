import { useNavItems } from "../utils/NavItems";
import { useState } from "react";

//components
import ProfilePic from "./ui/ProfilePic";
import Logout from "./ui/Logout";
import CreatePost from "./ui/CreatePost";

//react router
import { useLocation, useNavigate } from "react-router-dom";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export default function NavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const NavItems = useNavItems();
  const [post, setPost] = useState(false);

  return (
    <>
      {/* Desktop navbar */}
      <div className="hidden md:flex flex-col justify-between w-full h-full p-4 ">
        <div className=" flex flex-col gap-y-4 items-start mt-12">
          {NavItems.map((items, index) => {
            return (
              <button
                key={index}
                onClick={() => navigate(items.path)}
                className={`flex gap-x-3 cursor-pointer w-full p-3 rounded-xl ${isActive(items.path) ? "bg-accent-light text-accent dark:bg-dark-accent-shade/30 font-semibold " : "hover:text-accent font-normal "}`}
              >
                <span>{items.icon}</span> {items.name}
              </button>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => setPost(true)}
            className="w-full rounded-full text-light text-lg  font-regular bg-accent hover:bg-accent/80 py-2 transition-colors cursor-pointer"
          >
            Post
          </button>
          <CreatePost post={post} setPost={setPost} />
        </div>

        <div className=" flex gap-x-4 border-t border-light-border dark:border-dark-border">
          <div className="flex items-start gap-x-3 mt-3">
            <ProfilePic width={35} height={35} />
            <div>
              <p className="text-semibold text-light-primary dark:text-dark-primary">
                {user?.username}
              </p>

              <Logout />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden w-full flex justify-between items-center">
        {NavItems.map((items, index) => {
          return (
            <button
              key={index}
              onClick={() => navigate(items.path)}
              className={`flex flex-col items-center text-sm font-medium cursor-pointer p-3  ${isActive(items.path) ? " text-accent border-t-4 border-accent font-semibold" : "hover:text-accent font-normal"}`}
            >
              <span className="text-[18px]">{items.icon}</span> {items.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
