import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";
import ThemeDropdown from "./theme-dropdown";
import UserButton from "./user-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = async () => {
  return (
    <nav className=" h-15 w-full flex-center flex-col p-5 border-b">
      <div className="flex-between w-[60%] mx-auto">
        <div className="flex items-center gap-x-2">
          <SidebarTrigger />
          <NavLinks />
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeDropdown />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
