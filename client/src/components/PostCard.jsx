//components
import { useState } from "react";
import ProfilePic from "../components/ui/ProfilePic";
import Modal from "./ui/Modal";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//icons
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";

export default function PostCard({ post }) {
  const [comment, setComment] = useState(false);
  const [like, setLike] = useState(false);
  return (
    <div className="w-full  rounded-xl border border-light-border dark:border-dark-border">
      <div className="p-3">
        {/* profile section */}
        <div className=" flex gap-x-2 items-start">
          <ProfilePic />
          <div className="flex flex-col">
            <p className="text-sm font-semibold  text-light-primary dark:text-dark-primary">
              {post.author.username}
            </p>
            <p className="text-xs text-light-secondary dark:text-dark-secondary">
              @kevin_ken <span>. 2h ago</span>
            </p>
          </div>
        </div>

        {/* content section */}
        <div className="mt-2 text-light-primary dark:text-dark-primary font-normal text-sm">
          <p>{post?.content}</p>
        </div>
      </div>

      <div className="mt-2 border-t border-light-border dark:border-dark-border p-3 flex justify-between text-sm font-semibold text-light-secondary dark:text-dark-secondary ">
        <div className="flex gap-x-5 select-none text-xs">
          <div
            onClick={() => setLike((pre) => !pre)}
            className="flex gap-x-2 items-center cursor-pointer transition-color hover:text-red-500  "
          >
            <Heart
              size={20}
              fill={like ? "red" : "none"}
              strokeWidth={like ? 0 : 2}
              className="group-hover:"
            />{" "}
            <span>{post.likesCount}</span>
          </div>
          <div
            onClick={() => setComment(true)}
            className="flex gap-x-2 items-center cursor-pointer hover:text-accent transition-colors"
          >
            <MessageCircle size={20} /> <span>{post.commentsCount}</span>
          </div>
          {comment && (
            <Modal closeBtn={setComment} title={"Comments"}>
              {" "}
              <div>
                <div className="p-3 overflow-y-scroll">
                  <Comments />
                </div>
                <div className="border-t border-light-border dark:border-dark-border p-3">
                  <CommentForm />
                </div>
              </div>
            </Modal>
          )}
          <div className="flex gap-x-2 items-center cursor-pointer hover:text-green-500">
            <Share size={20} /> <span>100</span>
          </div>
        </div>
        <div className="self-end cursor-pointer hover:text-amber-500">
          <Bookmark size={20} />
        </div>
      </div>
    </div>
  );
}
