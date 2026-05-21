//components
import CommentCard from "./ui/CommentCard";

//custom hook
import { useGetAllComments } from "../hooks/usePostQuery";
import Loader from "./ui/Loader";

export default function Comments({ postId }) {
  const { data: comments, isPending } = useGetAllComments(postId);

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-y-4">
      {comments?.data?.map((comment, id) => (
        <CommentCard key={id} comment={comment} />
      ))}
    </div>
  );
}
