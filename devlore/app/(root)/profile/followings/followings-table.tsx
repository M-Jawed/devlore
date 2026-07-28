"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, UserX } from "lucide-react";
import moment from "moment";
import { handleUserFollow } from "@/lib/actions/user.action";
import { toast } from "sonner";

type PopulatedFollowings = {
  userId: {
    _id?: string;
    name?: string;
    username?: string;
    image?: string;
  };
  followedAt: Date;
};

const FollowingsTable = ({
  followings,
}: {
  followings: PopulatedFollowings[];
}) => {
  const handleUnfollow = async (followedUserId: string) => {
    const res = await handleUserFollow({
      followedUserId,
      postSlug: "/profile/followings",
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };

  return (
    <Table suppressHydrationWarning>
      <TableCaption>People you follow</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Followed on</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {followings
          .filter((item) => item?.userId)
          .map((item) => (
            <TableRow key={item.userId._id}>
              <TableCell>
                <div className="flex items-center gap-x-2">
                  <Avatar>
                    <AvatarImage
                      src={item.userId.image ?? ""}
                      alt={`Profile picture of the user ${item.userId.name}`}
                    />
                    <AvatarFallback>
                      {" "}
                      <User />{" "}
                    </AvatarFallback>
                  </Avatar>
                  <span> {item.userId.name} </span>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                {moment(item.followedAt).format("LL") || "undefined date"}{" "}
              </TableCell>

              <TableCell>
                {" "}
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  type="button"
                  onClick={() => handleUnfollow(item.userId._id as string)}
                >
                  Unfollow <UserX />
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default FollowingsTable;
