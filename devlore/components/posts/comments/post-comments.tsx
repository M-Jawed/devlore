"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PopulatedPost, User as UserType } from "@/types";
import { User } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { postComment } from "@/lib/actions/comment.action";
import { toast } from "sonner";
import DisplayComments from "./display-comments";

const PostComments = ({
  user,
  post,
}: {
  user: UserType;
  post: PopulatedPost;
}) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!comment || comment.length === 0) {
      toast.error("Comment cannot be empty");
      return;
    }

    const res = await postComment({
      postSlug: post.slug,
      postId: post._id,
      comment,
    });

    if (!res.success) {
      toast.error(res.message);
      console.log(res.message);
      return;
    }

    setComment("");
    toast.success(res.message);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-medium text-2xl mb-6">
        {" "}
        {post.comments.length > 0
          ? `Comments (${post.comments.length})`
          : "No comments yet"}{" "}
      </h1>
      <div className="flex items-center gap-x-2">
        <Avatar>
          <AvatarImage
            src={user.image as string}
            alt={`Profile picture of the user ${user.name}`}
          />
          <AvatarFallback>
            {" "}
            <User />{" "}
          </AvatarFallback>
        </Avatar>
        {user.name}
      </div>
      <Textarea
        value={comment}
        onKeyDown={handleEnterKey}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What is your comment on this post?"
        className="mt-4 w-full resize-none h-30 overflow-y-auto"
      />
      <Button
        variant={"outline"}
        type="button"
        size={"sm"}
        className="mt-5 mb-7"
        onClick={handleSubmit}
      >
        Send
      </Button>

      <div className="mt-5 pt-10 border-t">
        <DisplayComments post={post} />
      </div>
    </div>
  );
};

export default PostComments;
