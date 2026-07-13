"use client";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const PostFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const feed = searchParams.get("feed");
  const { open } = useSidebar();
  return (
    <div className={cn("pl-10 mx-auto w-full", !open && "pl-32")}>
      <div className="flex items-center gap-x-3">
        <Button
          variant={pathname === "/posts" && !feed ? "outline" : "ghost"}
          asChild
        >
          <Link href={"/"}> For you </Link>
        </Button>

        <Button variant={feed ? "outline" : "ghost"} asChild>
          <Link href={"?feed=featured"}>Featured</Link>
        </Button>
      </div>
    </div>
  );
};

export default PostFilters;
