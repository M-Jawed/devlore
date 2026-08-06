"use client";

import type { Session } from "@/types";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { User, DoorOpen, BookMarked, Home } from "lucide-react";
import Link from "next/link";

const UserAvatar = ({
  session,
  userImage,
}: {
  session: Session;
  userImage: string;
}) => {
  const initialName = session?.user.name.charAt(0);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={userImage}
            alt="Avatar of the user"
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{initialName}</AvatarFallback>
          <AvatarBadge className="bg-green-600" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuLabel className="text-xs truncate">
          {" "}
          {session?.user.email}{" "}
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={"/posts"} className="w-full">
            Home
          </Link>
          <DropdownMenuShortcut>
            {" "}
            <Home />{" "}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/profile"} className="w-full">
            Profile
          </Link>
          <DropdownMenuShortcut>
            {" "}
            <User />{" "}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/bookmarks"} className="w-full">
            Bookmarks
          </Link>
          <DropdownMenuShortcut>
            <BookMarked />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSignOut()}>
          Sign Out
          <DropdownMenuShortcut>
            {" "}
            <DoorOpen />{" "}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
