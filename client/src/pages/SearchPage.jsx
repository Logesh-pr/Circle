import { useRef, useEffect, useState } from "react";

//icons
import { Search } from "lucide-react";

//components
import SearchCard from "../components/ui/SearchCard";

//custom hook
import { useSearchQuery } from "../hooks/useUserQuery";

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function SearchPage() {
  const searchRef = useRef();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const { data: users, isPending } = useSearchQuery(debouncedQuery);
  console.log(users);
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="mt-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative overflow-hidden">
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by people"
            className="w-full border border-light-border dark:border-dark-border  py-3 ps-12 rounded-full placeholder:text-sm placeholder:text-light-primary focus:border-dark-secondary"
          />
          <div className="absolute top-[15px] left-[20px] text-light-primary  ">
            <Search size={20} />
          </div>
        </div>
      </form>

      {users && (
        <div className="mt-6 w-full border rounded-xl border-light-border dark:border-dark-border ">
          <div className="p-4 font-semibold text-lg border-b border-light-border dark:border-dark-border">
            <p>People</p>
          </div>
          <div className="">
            {users?.map((user, id) => (
              <SearchCard user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
