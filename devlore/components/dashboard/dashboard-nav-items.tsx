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
            className="text-lg font-medium"
            asChild
            isActive={pathname === "/dashboard"}
          >
            <Link href={"/dashboard"} className="py-5">
              Home
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge className="mt-1">
            <Home />
          </SidebarMenuBadge>
        </SidebarMenuItem>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-lg font-medium"
            asChild
            isActive={pathname === "/dashboard/posts"}
          >
            <Link href={"/dashboard/posts"} className="py-5">
              Posts
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge className="mt-1">
            <StickyNote />
          </SidebarMenuBadge>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-lg font-medium"
            asChild
            isActive={pathname === "/dashboard/users"}
          >
            <Link href={"/dashboard/users"} className="py-5">
              Users
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge className="mt-1">
            <User />
          </SidebarMenuBadge>
        </SidebarMenuItem>
      </SidebarGroup>
    </>
  );
};

export default DashboardNavItems;
