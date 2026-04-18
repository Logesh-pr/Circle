import { useEffect } from "react";

//components
import Modal from "./Modal";
import ProfilePic from "./ProfilePic";
import Button from "./Button";

//react hook form
import { useForm } from "react-hook-form";

//icons
import { Images } from "lucide-react";

//react query
import { useCreatePost } from "../../hooks/usePostQuery";

export default function CreatePost({ post, setPost }) {
  const { mutate } = useCreatePost();
  const {
    register,
    clearError,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const watchPost = watch("content");

  function onSubmit(data) {
    console.log(data);
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
    reset();
  }

  //   useEffect(()=> {

  //   },[watchPost])

  return (
    <>
      {post && (
        <Modal closeBtn={setPost} title={"Create a post"}>
          <div className="p-6 flex flex-col gap-y-2">
            <div className="">
              <ProfilePic width={45} height={45} />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="w-full"
            >
              <textarea
                placeholder="Please type here"
                className="w-full focus:border-none border-none outline-none"
                {...register("content")}
              />
              <Button value={"Post"} />
            </form>
          </div>
          <div className="border-t border-light-border dark:border-dark-border p-2 flex justify-between items-center">
            <div>
              <Images size={20} className="text-accent" />
            </div>
            <div></div>
          </div>
        </Modal>
      )}
    </>
  );
}
