import { User as UserType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuggestedUserCard = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full flex-between">
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

      <Button variant={"outline"} size={"sm"} type="button">
        Follow
      </Button>
    </div>
  );
};

export default SuggestedUserCard;
