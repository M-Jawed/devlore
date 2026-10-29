import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import DashboardNavItems from "./dashboard-nav-items";

const DashboardSideNav = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href={"/posts"}>
          <Image
            src={"/images/logo-dark.png"}
            alt="Image of the logo devlore"
            width={400}
            height={130}
            className="-mt-21 dark:block hidden group-data-[collapsible=icon]:hidden"
          />
          <Image
            src={"/images/logo-nobg.png"}
            alt="Image of the logo devlore"
            width={400}
            height={130}
            className="-mt-21 dark:hidden group-data-[collapsible=icon]:hidden"
          />

          <Image
            src={"/images/logo-mark.png"}
            alt="Image of the logo devlore"
            width={500}
            height={160}
            className="hidden group-data-[collapsible=icon]:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4 group-data-[collapsible=icon]:px-0">
        <SidebarMenu>
          <DashboardNavItems />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSideNav;
