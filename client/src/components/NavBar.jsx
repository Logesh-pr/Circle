import { NavItems } from "../utils/NavItems";
export default function NavBar() {
  return (
    <>
      {/* Desktop navbar */}
      <div className="hidden md:block w-full h-full p-4 border border-r-border ">
        {NavItems.map((items) => {
          return <p className="text-gray-400">{items.name}</p>;
        })}
      </div>

      {/* Mobile navbar */}
    </>
  );
}
