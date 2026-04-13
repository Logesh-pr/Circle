import { useRef, useEffect } from "react";

//icons
import { Search } from "lucide-react";

//components
import UserProfile from "../components/UserProfile";

export default function SearchPage() {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="mt-6">
      <form>
        <div className="relative">
          <input
            ref={searchRef}
            placeholder="Search by people"
            className="w-full border border-light-border dark:border-dark-border  py-3 ps-12 rounded-full placeholder:text-sm placeholder:text-light-primary focus:border-dark-secondary"
          />
          <div className="absolute top-[15px] left-[20px] text-light-primary  ">
            <Search size={20} />
          </div>
        </div>
      </form>

      <div className="mt-6 w-full border rounded-xl border-light-border dark:border-dark-border ">
        <div className="p-4 font-semibold text-lg border-b border-light-border dark:border-dark-border">
          <p>People</p>
        </div>
        <div className="p-2">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
