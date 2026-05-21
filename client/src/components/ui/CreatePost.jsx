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

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CreatePost({ post, setPost }) {
  const { mutate } = useCreatePost();
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
  const preview = watchedImages
    ? Array.from(watchedImages).map((file) => URL.createObjectURL(file))
    : [];

  function removeImage(imageIndex) {
    console.log(imageIndex);
    const current = Array.from(watchedImages);
    const updated = current.filter((_, i) => i !== imageIndex);

    const dt = new DataTransfer();

    updated.forEach((file) => dt.items.add(file));
    setValue("images", dt.files, { shouldValidate: true });
  }

  function onSubmit(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }
    console.log(formData);
    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        setPost(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
    reset();
  }

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
                placeholder="What's happening?"
                className="w-full h-[300px] focus:border-none border-none outline-none bg-slate-100 dark:bg-zinc-950 p-2 rounded-xl"
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
              <p>{errors?.images?.message}</p>
              {preview.length > 0 && (
                <div className="mt-2 relative">
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={8}
                    slidesPerView={1}
                    className="rounded-xl overflow-hidden"
                  >
                    {preview.map((src, i) => (
                      <SwiperSlide key={i}>
                        <div className="relative">
                          <img
                            src={src}
                            alt={`preview-${i}`}
                            className="w-full h-52 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-2 right-2 bg-black/60 rounded-full p-0.5"
                          >
                            <X size={14} className="text-white" />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {preview.length}/4 images
                  </span>
                </div>
              )}
              <Button value={"Post"} />
            </form>
          </div>
          {/* <div className="border-t border-light-border dark:border-dark-border p-2 flex justify-between items-center">
            <div></div>
            <div></div>
          </div> */}
        </Modal>
      )}
    </>
  );
}
