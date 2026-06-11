"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul>
      <li>
        {" "}
        <Link
          href={"/"}
          className={cn(
            "text-lg font-medium",
            pathname === "/" && "underline underline-offset-2",
          )}
        >
          Posts
        </Link>{" "}
      </li>
    </ul>
  );
};

export default NavLinks;
