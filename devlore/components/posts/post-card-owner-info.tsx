import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";

const PostOwner = ({ user }: { user: User }) => {
  const initialName = user.name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src={user.image} alt="Image of a user" />
        <AvatarFallback> {initialName} </AvatarFallback>
      </Avatar>
      <div>
        <span> {user.name} | </span>
        <span className="text-muted-foreground">
          {" "}
          {moment(user.createdAt, "YYYYMMDD").fromNow()}{" "}
        </span>
      </div>
    </div>
  );
};

export default PostOwner;
