import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";
import ThemeDropdown from "./theme-dropdown";
import UserButton from "./user-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Search from "./search";
import { Button } from "@/components/ui/button";
import { StickyNotePlus } from "lucide-react";
import Link from "next/link";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <nav className=" h-15 w-full flex-center flex-col p-5 border-b">
      <div className="flex-between w-[60%] mx-auto max-sm:w-full max-lg:w-full">
        <div className="flex items-center gap-x-2">
          {session && <SidebarTrigger />}
          <NavLinks />
        </div>
        {session && (
          <div className="max-sm:hidden">
            <Search />
          </div>
        )}
        <div className="flex items-center gap-x-4">
          {session && (
            <Button size={"sm"} asChild>
              <Link href={"/upload/post"} className="flex items-center gap-x-1">
                Upload <StickyNotePlus />
              </Link>
            </Button>
          )}
          <ThemeDropdown />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
