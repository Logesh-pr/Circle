//components
import Modal from "./Modal";
import ProfilePic from "./ProfilePic";
import Button from "./Button";

//react hook form
import { useForm } from "react-hook-form";

//icons
import { Images } from "lucide-react";

export default function CreatePost({ post, setPost }) {
  const {
    register,
    clearError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      {post && (
        <Modal closeBtn={setPost} title={"Create a post"}>
          <div className="p-6 flex flex-col gap-y-2">
            <div className="">
              <ProfilePic width={45} height={45} />
            </div>

            <form action="" className="w-full">
              <textarea
                placeholder="Please type here"
                className="w-full focus:border-none border-none outline-none"
              ></textarea>
            </form>
          </div>
          <div className="border-t border-light-border dark:border-dark-border p-2 flex justify-between items-center">
            <div>
              <Images size={20} className="text-accent" />
            </div>
            <div>
              <Button value={"Post"} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
