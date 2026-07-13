"use client";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const PostFilters = () => {
  const pathname = usePathname();
  const { open } = useSidebar();
  return (
    <div className={cn(" w-230 mx-auto", open && "w-213")}>
      <div className="flex items-center gap-x-3">
        <Button variant={pathname === "/posts" ? "outline" : "ghost"} asChild>
          <Link href={"/"}> For you </Link>
        </Button>

        <Button
          variant={pathname === "/posts?feed=featured" ? "outline" : "ghost"}
          asChild
        >
          <Link href={"?feed=featured"}>Featured</Link>
        </Button>
      </div>
    </div>
  );
};

export default PostFilters;
