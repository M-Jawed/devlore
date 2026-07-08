"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul>
      <li>
        {" "}
        <Link href={"/"} className={cn("text-lg font-medium", geist.className)}>
          Devlore
        </Link>{" "}
      </li>
    </ul>
  );
};

export default NavLinks;
