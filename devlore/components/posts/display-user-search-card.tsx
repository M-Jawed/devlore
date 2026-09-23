import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { User as UserType } from "@/types";
import { Button } from "../ui/button";

const UserSearchCard = ({ user }: { user: UserType }) => {
  return (
    <Link href={"/test"}>
      <Card className="text-center">
        <CardHeader className="w-full text-center">
          <Image
            src={user.image ?? ""}
            alt="Profile picture of a user"
            width={200}
            height={120}
            className="rounded-full w-[90%] h-[60%]"
          />
        </CardHeader>
        <CardContent>
          <h1> {user.name ?? "Undefined User"} </h1>
          <p> {user.bio ?? ""} </p>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"}>Follow</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default UserSearchCard;
