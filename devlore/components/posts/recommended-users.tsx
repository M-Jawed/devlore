"use client";

import { User as UserType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { handleUserFollow } from "@/lib/actions/user.action";
import { toast } from "sonner";

const RecommendedUsers = ({
  users,
  currentUser,
}: {
  users: UserType[];
  currentUser: UserType;
}) => {
  const handleFollow = async ({
    followedUserId,
  }: {
    followedUserId: string;
  }) => {
    const res = await handleUserFollow({ followedUserId });

    if (!res.success) {
      toast.error(res.message);
      console.error(res.message);
      return;
    }

    toast.success(res.message);
  };

  const followingIds = (currentUser.following ?? []).map(
    (item: { userId: string }) => item.userId.toString(),
  );

  const unfollowedUsers = users
    .filter((user: UserType) => !followingIds.includes(user._id.toString()))
    .slice(0, 3);

  return (
    <div>
      {" "}
      <h1 className="font-medium text-lg tracking-wide">Who to follow</h1>
      <div className="space-y-4 mt-5">
        {unfollowedUsers.length === 0 ? (
          <h1>No users found</h1>
        ) : (
          unfollowedUsers.map((user: UserType) => {
            return (
              <div key={user.username} className="flex-between">
                <div className="flex items-center gap-x-2">
                  <Avatar>
                    <AvatarImage src={user.image as string} />
                    <AvatarFallback>
                      <User />{" "}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm"> {user.name} </span>
                </div>
                <Button
                  variant={"outline"}
                  size={"xs"}
                  type="button"
                  className="tracking-wide"
                  onClick={() =>
                    handleFollow({ followedUserId: user?._id?.toString() })
                  }
                >
                  Follow <Plus />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecommendedUsers;
