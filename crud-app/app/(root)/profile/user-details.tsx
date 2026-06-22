import { EllipsisVertical } from "lucide-react";
import type { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserDetails = ({ user }: { user: User }) => {
  const initialName = user.name.charAt(0).toUpperCase();
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10">
        <div className="relative">
          <div className="absolute inset-0 top-2 left-11 opacity-0 transition-opacity hover:opacity-100 z-20">
            <EllipsisVertical size={20} className="text-white" />
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.image} />
            <AvatarFallback> {initialName} </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
