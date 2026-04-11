import { NavItems } from "../utils/NavItems";

export default function NavBar() {
  return (
    <>
      {/* Desktop navbar */}
      <div className="hidden md:block w-full h-full p-4 border-r border-border ">
        <div className=" flex flex-col gap-y-12 items-start mt-12 font-semibold">
          {NavItems.map((items, index) => {
            return (
              <button key={index} className=" flex gap-x-3">
                <span>{items.icon}</span> {items.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile navbar */}
    </>
  );
}
