"use client";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, UserRound } from "lucide-react";
import Link from "next/link";
import { User as UserType } from "@/types";
import { Button } from "../ui/button";
import { handleUserFollow } from "@/lib/actions/user.action";
import { toast } from "sonner";

const UserSearchCard = ({
  user,
  isFollowing,
  search,
  type,
}: {
  user: UserType;
  isFollowing: boolean;
  search: string;
  type: string;
}) => {
  const handleFollow = async () => {
    const res = await handleUserFollow({
      followedUserId: user._id,
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };
  return (
    <Link href={"/test"}>
      <Card className="text-center">
        <CardHeader className="w-full text-center">
          <Avatar size="lg" className="mx-auto">
            <AvatarImage
              src={user.image ?? ""}
              alt="Profile picture of a user"
            />
            <AvatarFallback>
              {" "}
              <User />{" "}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <h1> {user.name ?? "Undefined User"} </h1>
          <p> {user.bio ?? ""} </p>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant={"outline"}
            className="mx-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFollow();
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default UserSearchCard;
