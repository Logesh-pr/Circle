import { useState } from "react";
//components
import ProfilePic from "../components/ui/ProfilePic";
import Modal from "./ui/Modal";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import ImageCarousel from "./ui/ImageCarousel";

//icons
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";
import { useBookmarkPost, useLikePost } from "../hooks/usePostQuery";

//libs
import formatCreatedAt from "../utils/FormatCreatedAt";

//react router
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const [comment, setComment] = useState(false);
  const { mutate: likeMutate, isPending } = useLikePost();
  const { mutate: bookmarkMutate, isPending: isBookmarkPending } =
    useBookmarkPost();

  const formatTime = formatCreatedAt(post?.createdAt);

  return (
    <div className="w-full max-w-[500px]   rounded-xl border border-light-border dark:border-dark-border">
      <div className="p-3 flex flex-col gap-y-3 ">
        {/* profile section */}
        <Link
          to={`/profile/${post?.author?.username}`}
          className=" flex gap-x-2 items-start"
        >
          <ProfilePic avator={post?.author?.avator} />
          <div className="flex flex-col">
            <p className="text-sm font-semibold  text-light-primary dark:text-dark-primary">
              {post?.author?.name}
            </p>
            <p className="text-xs mt-1 font-semibold text-light-secondary dark:text-dark-secondary">
              @{post?.author?.username}{" "}
              <span className="ps-2">{formatTime}</span>
            </p>
          </div>
        </Link>

        {/* content section */}
        <div className="mt-2 text-light-primary dark:text-dark-primary font-normal text-sm">
          <p>{post?.content}</p>
        </div>
        <div>
          <ImageCarousel images={post?.images} />
        </div>
      </div>

      <div className="mt-2 border-t border-light-border dark:border-dark-border p-3 flex justify-between text-sm font-semibold text-light-secondary dark:text-dark-secondary ">
        <div className="flex gap-x-5 select-none text-xs">
          <div
            onClick={() => !isPending && likeMutate(post._id)}
            className="flex gap-x-2 items-center cursor-pointer transition-color md:hover:text-red-500  group"
          >
            <Heart
              size={20}
              strokeWidth={post?.isLiked ? 0 : 2}
              className={`transition-all duration-300 ease-out md:group-hover:scale-125 md:group-active:scale-90 ${
                post?.isLiked
                  ? "scale-110 fill-red-500 text-red-500"
                  : "scale-100 "
              }`}
            />{" "}
            <span className={`${post?.isLiked && "text-red-500"}`}>
              {post?.likesCount}
            </span>
          </div>
          <div
            onClick={() => setComment(true)}
            className="flex gap-x-2 items-center cursor-pointer hover:text-accent transition-colors"
          >
            <MessageCircle size={20} /> <span>{post?.commentsCount}</span>
          </div>
          {comment && (
            <Modal closeBtn={setComment} title={"Comments"}>
              {" "}
              <div>
                <div className="w-full  max-h-[350px] p-3 overflow-y-scroll">
                  <Comments postId={post._id} />
                </div>
                <div className="border-t border-light-border dark:border-dark-border p-3">
                  <CommentForm postId={post._id} />
                </div>
              </div>
            </Modal>
          )}
          {/* <div className="flex gap-x-2 items-center cursor-pointer hover:text-green-500">
            <Share size={20} /> <span>100</span>
          </div> */}
        </div>
        <div
          onClick={() => !isBookmarkPending && bookmarkMutate(post._id)}
          className="self-end cursor-pointer hover:text-amber-500"
        >
          <Bookmark
            size={20}
            strokeWidth={post?.isBookmarked ? 0 : 2}
            className={
              post?.isBookmarked ? "fill-amber-500 text-amber-500" : "none"
            }
          />
        </div>
      </div>
    </div>
  );
}
