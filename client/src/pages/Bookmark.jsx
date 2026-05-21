//custom hooks
import { useGetAllBookmarks } from "../hooks/usePostQuery";

//components
import PostCard from "../components/PostCard";
import Loader from "../components/ui/Loader";
import Feed from "../components/ui/Feed";

export default function Bookmark() {
  const { data: bookmark, isLoading } = useGetAllBookmarks();
  console.log(bookmark);
  if (isLoading) return <Loader />;
  return (
    <Feed>
      {bookmark?.map((bookmark, id) => (
        <PostCard post={bookmark} key={id} />
      ))}
    </Feed>
  );
}
