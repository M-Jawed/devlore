"use client";

import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";
import { Button } from "../ui/button";
import { handleUserFollow } from "@/lib/actions/user.action";
import { toast } from "sonner";
import Link from "next/link";

const PostOwner = ({
  user,
  createdAt,
  isFollowing,
  isAuthor,
  postSlug,
  type = "card",
}: {
  user: User;
  createdAt?: Date;
  isFollowing: boolean;
  isAuthor: boolean;
  postSlug?: string;
  type?: "card" | "details";
}) => {
  const initialName = user?.name?.charAt(0).toUpperCase() || "U";

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
        <Button variant={"link"} size={"sm"} asChild>
          <Link href={`/profile/user/${user.username}`}>
            {user.name || "User"}
          </Link>
        </Button>
        |
        <span className="text-muted-foreground ml-2">
          {" "}
          {moment(createdAt, "YYYYMMDD").fromNow()}{" "}
        </span>
      </div>

      {!isAuthor && (
        <div className="max-sm:hidden">
          {type === "card" ? (
            <Button
              variant={"ghost"}
              disabled
              type="button"
              size={"sm"}
              onClick={handleFollow}
            >
              {isFollowing && "Following"}
            </Button>
          ) : (
            <Button
              variant={"outline"}
              type="button"
              size={"sm"}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostOwner;
