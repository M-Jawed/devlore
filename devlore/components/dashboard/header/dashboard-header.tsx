import NavLinks from "./nav-links";
import UserButton from "@/components/shared/header/user-button";
import ThemeDropdown from "@/components/shared/header/theme-dropdown";
import DashboardSearch from "./dashboard-search";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notifications from "@/components/notification/notifications";

const DashboardHeader = () => {
  return (
    <header className="w-full h-20 border-b border-border flex-center">
      <div className="w-full md:w-full px-10 pr-15 flex-between">
        <div className="w-[70%] flex items-center gap-x-2">
          <SidebarTrigger />
          <div className="flex-1">
            <DashboardSearch />
          </div>
        </div>

        <div className="flex-between md:w-[8%]">
          <Notifications />
          <ThemeDropdown />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
