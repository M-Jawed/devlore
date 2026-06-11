import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";
import ThemeDropdown from "./theme-dropdown";
import UserButton from "./user-button";

const Header = async () => {
  return (
    <nav className="w-full flex-center flex-col h-15 p-5 border-b">
      <div className="flex-between w-[60%] mx-auto">
        <div>
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
