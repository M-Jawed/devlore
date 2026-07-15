"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PopulatedPost, User as UserType } from "@/types";
import { User } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const PostComments = ({
  user,
  post,
}: {
  user: UserType;
  post: PopulatedPost;
}) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    console.log(comment);
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
    </div>
  );
};

export default PostComments;
