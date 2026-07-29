"use client";

import { User as UserType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleUserFollow } from "@/lib/actions/user.action";
import { toast } from "sonner";
import Link from "next/link";

const SuggestedUserCard = ({ user }: { user: UserType }) => {
  const handleFollow = async () => {
    const res = await handleUserFollow({
      followedUserId: user._id,
      postSlug: "/profile/followings/suggestions",
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };
  return (
    <div className="w-full flex-between">
      <Link href={`/profile/user/${user.username}`}>
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage
              src={user.image as string}
              alt={`Image of the user ${user.name}`}
            />
            <AvatarFallback>
              {" "}
              <User />{" "}
            </AvatarFallback>
          </Avatar>
          <div>
            <p> {user.name} </p>
            <span className="text-sm text-muted-foreground"> {user.bio} </span>
          </div>
        </div>
      </Link>

      <Button
        variant={"outline"}
        size={"sm"}
        type="button"
        onClick={handleFollow}
      >
        Follow
      </Button>
    </div>
  );
};

export default SuggestedUserCard;
