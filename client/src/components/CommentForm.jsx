//icons
import { Send } from "lucide-react";

//components
import ProfilePic from "./ui/ProfilePic";

//react hook
import { useForm } from "react-hook-form";

export default function CommentForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="w-full flex gap-x-2 items-center">
      <ProfilePic width={35} height={35} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-x-2"
      >
        <input
          name="comment"
          type="text"
          placeholder="Type your comment"
          className={`w-full rounded-2xl border ${errors ? "border-red-500" : "border-light-border dark:border-dark-border"}  p-2`}
          {...register("comment", {
            maxLength: {
              value: 150,
              message: "Max 150 character are required",
            },
          })}
        />

        <button className="bg-accent p-2 text-light rounded-full text-xs cursor-pointer">
          <Send />
        </button>
      </form>
    </div>
  );
}
