"use client";

import { FaHandsClapping } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PopulatedComment } from "@/types";
import { handleLikeAction, postReply } from "@/lib/actions/comment.action";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const CommentControls = ({
  comment,
  postSlug,
  postId,
}: {
  comment: PopulatedComment;
  postSlug: string;
  postId: string;
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [hideReply, setHideReply] = useState<boolean>(true);
  const [reply, setReply] = useState<string>("");

  const handleLike = async () => {
    const res = await handleLikeAction({
      postId: postId,
      postSlug: postSlug,
      commentId: comment._id as string,
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setLiked(res.isLiked);
  };

  const handleReply = async () => {
    const res = await postReply({
      postId: postId,
      postSlug: postSlug,
      commentId: comment._id,
      reply,
    });

    if (!res.success) {
      toast.error(res.message);
      console.log(res.message);
      return;
    }

    toast.success(res.message);
    setReply("");
    setHideReply(true);
  };

  const handleOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleReply();
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="w-full">
        <div className="flex items-center gap-x-2">
          <Button variant={"ghost"} type="button" onClick={handleLike}>
            {liked ? <FaHandsClapping /> : <PiHandsClapping />}{" "}
            {comment.likedBy.length}{" "}
          </Button>
          <Button
            variant={"link"}
            onClick={() => setHideReply((prev) => !prev)}
          >
            Reply
          </Button>
        </div>
      </div>

      <div className="mt-2">
        {!hideReply && (
          <div className="ml-4 pl-5">
            <Textarea
              className="resize-none w-full h-25 overflow-y-auto"
              placeholder={`Replying to user ${comment.userId.name ?? "undefined user"}`}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={handleOnEnter}
            />
            <div className="flex items-center gap-x-2 mt-4">
              <Button
                variant={"outline"}
                onClick={handleReply}
                size={"sm"}
                type="button"
              >
                Reply
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  setHideReply(true);
                  setReply("");
                }}
                type="button"
                size={"sm"}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentControls;
