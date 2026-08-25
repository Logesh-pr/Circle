import { QueryClient } from "@tanstack/react-query";

//types
import { Post } from "@/types/post";

export default function updatePostInAllCaches(
  queryClient: QueryClient,
  postId: string,
  updater: (post: Post) => Post,
) {
  for (const key of [["posts"], ["bookmarks"]]) {
    queryClient.setQueryData<Post[]>(key, (old) =>
      old?.map((post) => (post && post._id === postId ? updater(post) : post)),
    );
  }

  queryClient.setQueriesData<Post[]>({ queryKey: ["userPosts"] }, (old) =>
    old?.map((post) => (post && post._id === postId ? updater(post) : post)),
  );
}
