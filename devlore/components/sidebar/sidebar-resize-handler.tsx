"use client";

import { useSidebar } from "../ui/sidebar";
import { useEffect } from "react";

const SidebarResizeHandler = () => {
  const { setOpen } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true);
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
};

export default SidebarResizeHandler;
