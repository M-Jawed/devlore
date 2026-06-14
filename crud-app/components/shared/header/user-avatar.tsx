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
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/actions/user.action";
import { User, DoorOpen, BookMarked } from "lucide-react";
import Link from "next/link";

const UserAvatar = ({ session }: { session: Session }) => {
  const initialName = session?.user.name.charAt(0);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await signOutAction();
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session?.user.image as string}
            alt="Avatar of the user"
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
          Profile
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
