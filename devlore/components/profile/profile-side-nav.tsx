"use client";

import { User, Book } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ProfileNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="w-[60%] mx-auto border-b max-sm:w-full">
      <div>
        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className={cn(
            "font-medium rounded-none border-0 text-muted-foreground",
            pathname === "/profile" &&
              "font-bold border-b-2 border-black tracking-wide text-md pb-1 text-primary",
          )}
        >
          <Link href={"/profile"}>Profile</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className={cn(
            "font-medium rounded-none border-0 text-muted-foreground",
            pathname === "/profile/posts" &&
              "font-black border-b-2 border-black tracking-wide text-md pb-1 text-primary",
          )}
        >
          <Link href={"/profile/posts"}>Your posts</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className={cn(
            "font-medium rounded-none border-0 text-muted-foreground",
            pathname === "/profile/followings" &&
              "font-black border-b-2 border-black tracking-wide text-md pb-1 text-primary",
          )}
        >
          <Link href={"/profile/followings"}>Followings</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className={cn(
            "font-medium rounded-none border-0 text-muted-foreground",
            pathname === "/profile/followings/suggestions" &&
              "font-black border-b-2 border-black tracking-wide text-md pb-1 text-primary",
          )}
        >
          <Link href={"/profile/followings/suggestions"}>Suggestions</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileNavigation;
