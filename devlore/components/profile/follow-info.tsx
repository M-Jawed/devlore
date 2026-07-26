import { UserCheck } from "lucide-react";

const DisplayFollows = ({ followers }: { followers: string[] }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-x-2">
        {" "}
        <UserCheck size={16} />{" "}
        <span className="text-muted-foreground tracking-wide font-medium">
          {followers.length} Followers
        </span>{" "}
      </div>
    </div>
  );
};

export default DisplayFollows;
