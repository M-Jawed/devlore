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
    <Sidebar>
      <SidebarHeader>
        <Link href={"/posts"}>
          <Image
            src={"/images/logo-dark.png"}
            alt="Image of the logo devlore"
            width={400}
            height={130}
            className="-mt-21 dark:block hidden"
          />
          <Image
            src={"/images/logo-nobg.png"}
            alt="Image of the logo devlore"
            width={400}
            height={130}
            className="-mt-21 dark:hidden"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          <DashboardNavItems />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSideNav;
