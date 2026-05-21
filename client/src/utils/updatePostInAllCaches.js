export default function updatePostInAllCaches(queryClient, postId, updater) {
  for (const key of [["post"], ["userPost"], ["bookmarks"]]) {
    queryClient.setQueryData(key, (old) =>
      old?.map((post) => (post._id === postId ? updater(post) : post)),
    );
  }
}
