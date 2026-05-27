import { useQuery } from "@tanstack/react-query";

//axios
import { searchUsers } from "../api/axios";

export function useSearchQuery(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUsers(query),
    enabled: query?.length > 1,
    // staleTime: 2 * 60 * 1000,
    placeholderData: (perv) => perv,
  });
}
