//icons
import { Send } from "lucide-react";

//components
import ProfilePic from "./ui/ProfilePic";

//react hook
import { useForm } from "react-hook-form";
import { useCommentPost } from "../hooks/usePostQuery";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export default function CommentForm({ postId }) {
  const { user } = useAuthStore();
  const { mutate } = useCommentPost();
  const {
    handleSubmit,
    register,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ mode: "onchange" });
  console.log(user);

  const commentValue = watch("comment");

  function onSubmit(data) {
    console.log(data);
    reset();
    mutate({ postId, comment: data.comment });
  }
  return (
    <div className="w-full flex gap-x-2 items-center">
      <ProfilePic avator={user?.avator} width={35} height={35} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-x-2"
        onChange={() => clearErrors("comment")}
      >
        <input
          name="comment"
          type="text"
          placeholder="Type your comment"
          className={`w-full rounded-2xl text-light-primary dark:text-dark-primary border ${errors.comment ? "border-red-500" : "border-light-border dark:border-dark-border placeholder:text-light-primary focus:border-dark-secondary"}  p-2`}
          {...register("comment", {
            required: "Please type the comment",
            maxLength: {
              value: 150,
              message: "Max 150 character are required",
            },
          })}
        />

        <button
          disabled={!commentValue || commentValue.length < 1}
          className={`bg-accent p-2 text-light rounded-full text-xs  ${!commentValue || commentValue.length < 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        >
          <Send />
        </button>
      </form>
    </div>
  );
}
