import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";
import ThemeDropdown from "./theme-dropdown";
import UserButton from "./user-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Search from "./search";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <nav className=" h-15 w-full flex-center flex-col p-5 border-b">
      <div className="flex-between w-[60%] mx-auto max-sm:w-full">
        <div className="flex items-center gap-x-2">
          {session && <SidebarTrigger />}
          <NavLinks />
        </div>
        <div>
          <Search />
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
