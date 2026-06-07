export default function updatePostInAllCaches(queryClient, postId, updater) {
  for (const key of [["posts"], ["bookmarks"]]) {
    queryClient.setQueryData(key, (old) =>
      old?.map((post) => (post && post._id === postId ? updater(post) : post)),
    );
  }

  queryClient.setQueriesData({ queryKey: ["userPosts"] }, (old) =>
    old?.map((post) => (post && post._id === postId ? updater(post) : post)),
  );
}
