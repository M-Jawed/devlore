"use client";

import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";
import { Button } from "../ui/button";
import { handleUserFollow } from "@/lib/actions/user.action";
import { toast } from "sonner";

const PostOwner = ({
  user,
  createdAt,
  isFollowing,
  postSlug,
}: {
  user: User;
  createdAt?: Date;
  isFollowing: boolean;
  postSlug?: string;
}) => {
  const initialName = user.name.charAt(0).toUpperCase();

  const handleFollow = async () => {
    const res = await handleUserFollow({ followedUserId: user._id, postSlug });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };
  return (
    <div className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src={user.image as string} alt="Image of a user" />
        <AvatarFallback> {initialName} </AvatarFallback>
      </Avatar>
      <div>
        <span> {user.name} | </span>
        <span className="text-muted-foreground">
          {" "}
          {moment(createdAt, "YYYYMMDD").fromNow()}{" "}
        </span>
      </div>
      <div className="max-sm:hidden">
        <Button
          variant={"ghost"}
          disabled={true}
          type="button"
          size={"sm"}
          onClick={handleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default PostOwner;
