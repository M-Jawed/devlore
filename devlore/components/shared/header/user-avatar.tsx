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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  User,
  DoorOpen,
  BookMarked,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
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
        {session?.user.role === "admin" && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Link href={"/dashboard/posts"}>Posts</Link>
                <DropdownMenuShortcut>
                  <BsFileEarmarkText />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/dashboard/users"}>Users</Link>
                <DropdownMenuShortcut>
                  <FiUsers />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
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
