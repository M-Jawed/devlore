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

type PopulatedFollowings = {
  userId: {
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
  return (
    <Table>
      <TableCaption>People you follow</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Followed on</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {followings.map((item) => (
          <TableRow key={item.userId.username}>
            <TableCell>
              <div className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage
                    src={item.userId.image}
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
              <Button variant={"destructive"} size={"sm"}>
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
