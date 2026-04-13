import { NavItems } from "../utils/NavItems";

//react router
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  console.log(location.pathname);
  return (
    <>
      {/* Desktop navbar */}
      <div className="hidden md:block w-full h-full p-4 ">
        <div className=" flex flex-col gap-y-4 items-start mt-12">
          {NavItems.map((items, index) => {
            return (
              <button
                key={index}
                className={`flex gap-x-3 cursor-pointer w-full p-3 rounded-xl ${isActive(items.path) ? "bg-accent-light text-accent dark:bg-dark-accent-shade/30 font-semibold " : "hover:text-accent font-medium "}`}
              >
                <span>{items.icon}</span> {items.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden w-full flex justify-between items-center">
        {NavItems.map((items, index) => {
          return (
            <button
              key={index}
              className={`flex flex-col items-center text-sm font-medium cursor-pointer p-3  ${isActive(items.path) ? " text-accent border-t-4 border-accent font-semibold" : "hover:text-accent font-medium"}`}
            >
              <span className="text-[18px]">{items.icon}</span> {items.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
