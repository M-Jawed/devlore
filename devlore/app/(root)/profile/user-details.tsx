import { SquareActivity, SquarePen } from "lucide-react";
import type { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileAvatarDropdown from "./avatar-dropdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import EditUserDialog from "./edit-user-details-dialog";
import DisplayFollows from "@/components/profile/follow-info";

const UserDetails = ({
  user,
  currentUserId,
}: {
  user: User;
  currentUserId: string;
}) => {
  const initialName = user?.name?.charAt(0).toUpperCase();

  const isProfileOwner = user?._id?.toString() === currentUserId.toString();

  return (
    <div className="flex-center flex-col space-y-4">
      <div className="mt-10 w-100 flex-center flex-col max-sm:w-full">
        <div className="relative">
          <div className="absolute inset-0 top-2 left-24 transition-opacity z-20">
            {isProfileOwner && (
              <ProfileAvatarDropdown
                userImage={user.image as string}
                userId={user._id as string}
              />
            )}
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.image as string} />
            <AvatarFallback> {initialName} </AvatarFallback>
          </Avatar>
        </div>
        <div className="pt-6 max-w-80">
          <p> {user.bio ?? "No bio yet"} </p>
        </div>
      </div>
      <Card className="ring-0 shadow-none max-sm:w-full">
        <CardHeader className="text-center flex-center">
          <DisplayFollows followers={user.followers as string[]} />
          {isProfileOwner && (
            <div>
              <EditUserDialog user={user} />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="w-200 flex-center flex-col space-y-4 max-sm:w-full">
            <div className="flex-between w-[60%] px-3 border-b pb-2 max-sm:w-full">
              <span className="text-muted-foreground">Name: </span>
              {user.name}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2 max-sm:w-full">
              <span className="text-muted-foreground">Username: </span>
              {user.username}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2 max-sm:w-full">
              <span className="text-muted-foreground">Email: </span>
              {user.email}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2 max-sm:w-full">
              <span className="text-muted-foreground">Email Verified: </span>
              {user.emailVerified ? "Yes" : "No"}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2 max-sm:w-full">
              <span className="text-muted-foreground">Gender: </span>
              {user.gender || "Not specified"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
