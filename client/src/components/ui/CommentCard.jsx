//components
import ProfilePic from "./ProfilePic";

//libs
import formatCreatedAt from "../../utils/FormatCreatedAt";

export default function CommentCard({ comment }) {
  const formatTime = formatCreatedAt(comment?.createdAt);
  return (
    <div className="w-full flex items-start gap-x-2">
      <ProfilePic avator={comment?.user.avator} width={35} height={35} />
      <div className="w-full">
        <div className="w-full rounded-xl p-2 bg-slate-100 dark:bg-zinc-900 ">
          <p className="text-light-primary dark:text-dark-primary text-sm ">
            {comment?.user?.name}
          </p>
          <p className="text-xs mt-1 text-light-secondary dark:text-dark-secondary">
            @{comment?.user?.username}
          </p>
          <p className="text-light-primary dark:text-dark-primary font-normal text-sm mt-2">
            {comment.content}
          </p>
        </div>
        <div className="mt-1 text-xs">
          <p>{formatTime}</p>
        </div>
      </div>
    </div>
  );
}
