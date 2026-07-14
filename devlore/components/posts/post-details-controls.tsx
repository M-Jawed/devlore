"use client";

import { FaHandsClapping } from "react-icons/fa6";
import { TbSparkles2Filled } from "react-icons/tb";
import { MessageSquareText } from "lucide-react";
import { Button } from "../ui/button";
import BookmarkButton from "./add-to-bookmark";
import { PopulatedPost } from "@/types";

const PostDetailsControls = ({ post }: { post: PopulatedPost }) => {
  return (
    <div className="w-full flex-between border-t border-b py-2">
      <div className="w-[13%] flex-between gap-x-5">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex items-center gap-x-2"
        >
          <FaHandsClapping size={7} /> {post.likes}
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex items-center gap-x-2"
        >
          <MessageSquareText size={9} /> {post.comments.length}
        </Button>
      </div>

      <BookmarkButton id={post._id} />
    </div>
  );
};

export default PostDetailsControls;
