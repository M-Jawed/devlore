"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavigationLinks = () => {
  const pathname = usePathname();

  return (
    <div className="w-[60%] mx-auto mt-10 border-b max-sm:w-[90%]">
      <div className="flex items-center gap-x-3 max-sm:justify-center">
        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            "font-bold",
            pathname === "/bookmarks" &&
              "border-b-2 border-b-black rounded-none",
          )}
          asChild
        >
          <Link href={"/bookmarks"}>Bookmarks</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            pathname === "/bookmarks/liked" &&
              " font-bold border-b-2 border-b-black rounded-none",
          )}
          asChild
        >
          <Link href={"/bookmarks/liked"}>Liked posts</Link>
        </Button>
      </div>
    </div>
  );
};

export default NavigationLinks;
