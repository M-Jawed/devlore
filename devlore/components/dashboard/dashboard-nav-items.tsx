"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "../ui/sidebar";
import Link from "next/link";
import { Home, StickyNote, User } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardNavItems = () => {
  const pathname = usePathname();
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={"Home"}
            className="text-lg font-medium"
            asChild
            isActive={pathname === "/dashboard"}
          >
            <Link href={"/dashboard"} className="py-5">
              <Home />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-lg font-medium"
            tooltip={"Posts"}
            asChild
            isActive={pathname === "/dashboard/posts"}
          >
            <Link href={"/dashboard/posts"} className="py-5">
              <StickyNote />
              <span>Posts</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-lg font-medium"
            tooltip={"Users"}
            asChild
            isActive={pathname === "/dashboard/users"}
          >
            <Link href={"/dashboard/users"} className="py-5">
              <User />
              <span>Users</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </>
  );
};

export default DashboardNavItems;
