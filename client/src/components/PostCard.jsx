//components
import { useState } from "react";
import ProfilePic from "../components/ui/ProfilePic";
import Modal from "./ui/Modal";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//icons
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";

export default function PostCard() {
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
              Kevin
            </p>
            <p className="text-xs text-light-secondary dark:text-dark-secondary">
              @kevin_ken <span>. 2h ago</span>
            </p>
          </div>
        </div>

        {/* content section */}
        <div className="mt-2 text-light-primary dark:text-dark-primary font-normal text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            blanditiis quod dolorem alias, ea beatae laborum velit amet dolore
            nulla veritatis nostrum, reiciendis, explicabo numquam maiores
            officia animi corrupti. Illum.
          </p>
        </div>
      </div>

      <div className="mt-2 border-t border-light-border dark:border-dark-border p-3 flex justify-between text-sm font-semibold text-light-secondary dark:text-dark-secondary ">
        <div className="flex gap-x-5 select-none text-xs">
          <div
            onClick={() => setLike((pre) => !pre)}
            className="flex gap-x-2 items-center cursor-pointer transition-color  "
          >
            <Heart
              size={20}
              fill={like ? "red" : "none"}
              strokeWidth={like ? 0 : 2}
              className=""
            />{" "}
            <span>200</span>
          </div>
          <div
            onClick={() => setComment(true)}
            className="flex gap-x-2 items-center cursor-pointer"
          >
            <MessageCircle size={20} /> <span>90</span>
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
          <div className="flex gap-x-2 items-center cursor-pointer">
            <Share size={20} /> <span>100</span>
          </div>
        </div>
        <div className="self-end cursor-pointer">
          <Bookmark size={20} />
        </div>
      </div>
    </div>
  );
}
