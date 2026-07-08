"use client";

import { cn } from "@/lib/utils";
import { bricolageBold, bricolageRegular } from "@/fonts";
import { Highlighter } from "../ui/highlighter";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative flex h-200 w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[40px_40px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-20">
        <h1
          className={`${bricolageBold.className} text-5xl lg:text-7xl text-center`}
        >
          Where Developers Share
          <br /> What They Actually Know
        </h1>
        <p
          className={`${bricolageRegular.className} text-center lg:text-3xl mt-5 text-muted-foreground`}
        >
          Browse Blogs and Posts shared by developers
          <br /> who actually{" "}
          <Highlighter action="highlight">knows</Highlighter>
        </p>
        <div className="flex-center mt-6">
          <Link href={"/posts"}>
            <Button className="w-50">Start Browsing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
