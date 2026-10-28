"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-x-6">
      <Link
        href={"/dashboard"}
        className={cn(
          "text-muted-foreground",
          pathname === "/dashboard" &&
            "text-primary underline underline-offset-2",
        )}
      >
        Dashboard
      </Link>
      <Link
        href={"/dashboard/posts"}
        className={cn(
          "text-muted-foreground",
          pathname.startsWith("/dashboard/posts") &&
            "text-primary underline underline-offset-2",
        )}
      >
        Posts
      </Link>
      <Link
        href={"/dashboard/users"}
        className={cn(
          "text-muted-foreground",
          pathname.startsWith("/dashboard/users") &&
            "text-primary underline underline-offset-2",
        )}
      >
        Users
      </Link>
    </div>
  );
};

export default NavLinks;
