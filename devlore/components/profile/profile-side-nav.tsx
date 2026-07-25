"use client";

import { User, Book } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ProfileNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="w-[60%] mx-auto border-b">
      <div>
        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className={cn(
            "font-medium rounded-none border-0",
            pathname === "/profile" &&
              "font-bold border-b-2 border-black tracking-wide text-lg pb-1",
          )}
        >
          <Link href={"/profile"}>Profile</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className={cn(
            "font-medium rounded-none border-0",
            pathname === "/profile/posts" &&
              "font-black border-b-2 border-black tracking-wide text-lg pb-1",
          )}
        >
          <Link href={"/profile/posts"}>Your posts</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileNavigation;
