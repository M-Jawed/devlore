"use client";

import { FaHandsClapping } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
import { MessageSquareText } from "lucide-react";
import { Button } from "../ui/button";
import BookmarkButton from "./add-to-bookmark";
import { PopulatedPost } from "@/types";
import { handleLikePost } from "@/lib/actions/post.action";
import { toast } from "sonner";
import { useState } from "react";

const PostDetailsControls = ({
  post,
  isLiked,
}: {
  post: PopulatedPost;
  isLiked: string | boolean;
}) => {
  const handleLike = async () => {
    const res = await handleLikePost({ postId: post._id, postSlug: post.slug });

    if (!res.success) {
      toast.error("Something went wrong. please try again");
      return;
    }
  };
  return (
    <div className="w-full flex-between border-t border-b py-2">
      <div className="w-[13%] flex-between gap-x-5">
        <div className="flex-between">
          <Button
            variant={"ghost"}
            onClick={handleLike}
            size={"icon"}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            {isLiked ? (
              <FaHandsClapping size={7} />
            ) : (
              <PiHandsClapping size={7} />
            )}
          </Button>
          {post.likes}
        </div>
        <div className="flex-between">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="flex items-center gap-x-2"
          >
            <MessageSquareText size={9} />
          </Button>
          {post.comments.length}
        </div>
      </div>

      <BookmarkButton id={post._id} />
    </div>
  );
};

export default PostDetailsControls;
