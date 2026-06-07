import { useEffect } from "react";

//components
import Modal from "./Modal";
import ProfilePic from "./ProfilePic";
import Button from "./Button";

//react hook form
import { useForm } from "react-hook-form";

//icons
import { Images, X } from "lucide-react";

//react query
import { useCreatePost } from "../../hooks/usePostQuery";

//zustand
import { useAuthStore } from "../../store/useAuthStore";

//toast
import toast from "react-hot-toast";

export default function CreatePost({ post, setPost }) {
  const { mutate } = useCreatePost();
  const { user } = useAuthStore();
  const {
    register,
    clearError,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const watchedImages = watch("images");
  const watchedContent = watch("content");

  const preview = watchedImages
    ? Array.from(watchedImages).map((file) => URL.createObjectURL(file))
    : [];

  function removeImage(imageIndex) {
    const current = Array.from(watchedImages);
    const updated = current.filter((_, i) => i !== imageIndex);

    const dt = new DataTransfer();

    updated.forEach((file) => dt.items.add(file));
    setValue("images", dt.files, { shouldValidate: true });
  }

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }
    mutate(formData, {
      onSuccess: (data) => {
        setPost(false);
        toast.success("Post created successfully");
      },
      onError: (error) => {
        toast.errro();
      },
    });
    reset();
  }

  return (
    <>
      {post && (
        <Modal closeBtn={setPost} title={"Create a post"}>
          <div className="p-6 flex flex-col gap-y-2">
            <div className=" flex gap-x-3">
              <ProfilePic avator={user?.avator} width={45} height={45} />
              <div>
                <p className="text-sm font-semibold  text-light-primary dark:text-dark-primary">
                  {user?.name}
                </p>
                <p className="text-xs mt-1 font-semibold text-light-secondary dark:text-dark-secondary">
                  @{user?.username}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="w-full"
            >
              <textarea
                placeholder="What's happening?"
                className="w-full h-[200px] placeholder:text-zinc-600 focus:border-none border-none outline-none bg-slate-100 dark:bg-zinc-950 p-2 rounded-xl"
                {...register("content")}
              />
              <label
                htmlFor="images"
                className="cursor-pointer flex gap-x-2  px-4 py-3 w-fit mt-2 rounded-full dark:bg-zinc-900"
              >
                <p className="text-sm font-semibold">Add images</p>
                <Images size={20} className="" />
              </label>
              <input
                type="file"
                id="images"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                {...register("images", {
                  validate: {
                    maxFiles: (files) =>
                      !files ||
                      files.length <= 4 ||
                      files.length === 0 ||
                      "you can upload maximum 4 images",
                    fileType: (files) => {
                      const allowed = ["image/jpeg", "image/png", "image/webp"];
                      const allValid = Array.from(files).every((file) =>
                        allowed.includes(file.type),
                      );
                      return (
                        allValid || "Only JPEG, PNG, or WebP files are allowed"
                      );
                    },
                  },
                })}
              />
              {errors?.images && (
                <p className="error-message">{errors?.images?.message}</p>
              )}

              {/* Image previews */}
              {preview.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {preview.map((src, i) => (
                    <div key={i} className="relative w-[100px]">
                      <img
                        src={src}
                        alt={`preview-${i}`}
                        className="w-full h-28 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 cursor-pointer"
                      >
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                value={"Post"}
                disabled={
                  !watchedContent?.trim() &&
                  (!watchedImages || watchedImages.length === 0)
                }
                btnLogic={
                  !watchedContent?.trim() &&
                  (!watchedImages || watchedImages.length === 0)
                }
              />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
