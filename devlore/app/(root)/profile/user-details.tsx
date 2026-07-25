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

const UserDetails = ({ user }: { user: User }) => {
  const initialName = user.name.charAt(0).toUpperCase();
  return (
    <div className="flex-center flex-col space-y-4">
      <div className="mt-10 w-100 flex-center">
        <div className="relative">
          <div className="absolute inset-0 top-2 left-24 transition-opacity z-20 ">
            <ProfileAvatarDropdown
              userImage={user.image as string}
              userId={user._id as string}
            />
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.image as string} />
            <AvatarFallback> {initialName} </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Card className="ring-0 shadow-none">
        <CardHeader className="text-center flex-center">
          <div>
            <EditUserDialog user={user} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-200 flex-center flex-col space-y-4">
            <div className="flex-between w-[60%] px-3 border-b pb-2">
              <span>Name: </span>
              {user.name}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2">
              <span>Username: </span>
              {user.username}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2">
              <span>Email: </span>
              {user.email}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2">
              <span>Email Verified: </span>
              {user.emailVerified ? "Yes" : "No"}
            </div>
            <div className="flex-between w-[60%] px-3 border-b pb-2">
              <span>Gender: </span>
              {user.gender || "Not specified"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
