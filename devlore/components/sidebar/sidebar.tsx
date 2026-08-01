"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import { Geist } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PiHouseLineFill, PiHouseLineLight } from "react-icons/pi";
import { LuCircleUser } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useTheme } from "next-themes";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

const geist = Geist({
  subsets: ["latin"],
});

const MainSidebar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <Sidebar className={`w-46`}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="-mt-12">
            <Link href={"/"}>
              <Image
                src={
                  theme === "light"
                    ? "/images/logo.png"
                    : "/images/logo-dark.png"
                }
                alt="Image of the logo devlore"
                width={200}
                height={200}
                loading="eager"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenuItem
          className={cn(
            "text-muted-foreground",
            pathname === "/posts" &&
              "border-r-2 border-primary font-medium text-primary",
          )}
        >
          <SidebarMenuButton asChild className="text-lg px-3">
            <Link href={"/posts"}>Home</Link>
          </SidebarMenuButton>
          <SidebarMenuBadge>
            {" "}
            {pathname === "/posts" ? (
              <PiHouseLineFill size={18} />
            ) : (
              <PiHouseLineLight size={18} />
            )}
          </SidebarMenuBadge>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "text-muted-foreground",
            pathname.startsWith("/profile") &&
              "border-r-2 border-primary font-medium text-primary",
          )}
        >
          <SidebarMenuButton asChild className="text-lg px-3">
            <Link href={"/profile"}>Profile</Link>
          </SidebarMenuButton>
          <SidebarMenuBadge>
            {" "}
            {pathname.startsWith("/profile") ? (
              <FaUserCircle size={18} />
            ) : (
              <LuCircleUser size={18} />
            )}
          </SidebarMenuBadge>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "text-muted-foreground",
            pathname === "/bookmarks" &&
              "border-r-2 border-primary font-medium text-primary",
          )}
        >
          <SidebarMenuButton asChild className="text-lg px-3">
            <Link href={"/bookmarks"}>Library</Link>
          </SidebarMenuButton>
          <SidebarMenuBadge>
            {" "}
            {pathname === "/bookmarks" ? (
              <IoBookmark size={18} />
            ) : (
              <IoBookmarkOutline size={18} />
            )}
          </SidebarMenuBadge>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
