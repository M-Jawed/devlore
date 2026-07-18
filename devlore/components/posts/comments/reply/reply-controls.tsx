"use client";

import { FaHandsClapping } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleReplyLike } from "@/lib/actions/comment.action";
import { toast } from "sonner";
import { PopulatedReply } from "@/types";

const ReplyControls = ({
  postSlug,
  postId,
  commentId,
  replyId,
  reply,
  isLiked,
}: {
  postSlug: string;
  postId: string;
  commentId: string;
  replyId: string;
  reply: PopulatedReply;
  isLiked: boolean;
}) => {
  const handleLike = async () => {
    const res = await handleReplyLike({ postSlug, postId, commentId, replyId });

    if (!res.success) {
      toast.error(res.message);
      console.error(res.message);
      return;
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center gap-x-2">
        <Button
          variant={"ghost"}
          className="flex items-center gap-x-2"
          type="button"
          size={"icon"}
          onClick={handleLike}
        >
          {isLiked ? <FaHandsClapping /> : <PiHandsClapping />}{" "}
          {reply.likedBy.length}
        </Button>
      </div>
    </div>
  );
};

export default ReplyControls;
