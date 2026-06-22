"use client";

import { User, Book } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ProfileSideNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-60 px-4">
      <div className="flex flex-col items-center space-y-3">
        <Button
          className="flex items-center gap-x-2 w-40"
          variant={pathname === "/profile" ? "default" : "outline"}
        >
          <Link href={"/profile"} className={cn("w-full flex-between")}>
            Profile
            <User />
          </Link>
        </Button>

        <Button
          className="flex items-center gap-x-2 w-40"
          variant={pathname === "/profile/posts" ? "default" : "outline"}
        >
          <Link href={"/profile/posts"} className={cn("w-full flex-between")}>
            Your Posts
            <Book />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSideNav;
