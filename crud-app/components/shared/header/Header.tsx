"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full flex justify-between p-5 border-b">
      <div>
        <Link
          href={"/"}
          className={cn("text-lg", pathname === "/" && "font-bold underline")}
        >
          Browse
        </Link>
      </div>
    </nav>
  );
};

export default Header;
