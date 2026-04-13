//components
import { useState } from "react";
import ProfilePic from "../components/ui/ProfilePic";
import CommentModel from "./CommentModel";

//icons
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";

export default function PostCard() {
  const [comment, setComment] = useState(false);
  return (
    <div className="w-full  rounded-xl border-2 border-light-border dark:border-dark-border">
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
        <div className="mt-2 text-light-primary dark:text-dark-primary text-base">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            blanditiis quod dolorem alias, ea beatae laborum velit amet dolore
            nulla veritatis nostrum, reiciendis, explicabo numquam maiores
            officia animi corrupti. Illum.
          </p>
        </div>
      </div>

      <div className="mt-2 border-t-2 border-light-border dark:border-dark-border p-3 flex justify-between text-sm font-semibold text-light-secondary dark:text-dark-secondary ">
        <div className="flex gap-x-5">
          <div className="flex gap-x-2 items-center cursor-pointer">
            <Heart /> <span>200</span>
          </div>
          <div
            onClick={() => setComment(true)}
            className="flex gap-x-2 items-center cursor-pointer"
          >
            <MessageCircle /> <span>90</span>
          </div>
          {comment && <CommentModel setComment={setComment} />}
          <div className="flex gap-x-2 items-center cursor-pointer">
            <Share className="text-[12px]" /> <span>100</span>
          </div>
        </div>
        <div className="self-end cursor-pointer">
          <Bookmark />
        </div>
      </div>
    </div>
  );
}
