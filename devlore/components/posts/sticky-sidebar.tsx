"use client";

import { useEffect, useRef } from "react";

const StickySidebar = ({ children }: { children: React.ReactNode }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const scrollY = window.scrollY;
      const sidebarHeight = sidebar.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (sidebarHeight <= viewportHeight) {
        sidebar.style.top = "0px";
        return;
      }

      const scrollingDown = scrollY > lastScrollY.current;
      const currentTop = parseInt(sidebar.style.top || "0");

      if (scrollingDown) {
        const newTop = Math.max(
          viewportHeight - sidebarHeight,
          currentTop - (scrollY - lastScrollY.current),
        );
        sidebar.style.top = `${newTop}px`;
      } else {
        const newTop = Math.min(
          0,
          currentTop + (lastScrollY.current - scrollY),
        );
        sidebar.style.top = `${newTop}px`;
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="max-xl:hidden sticky w-80 px-4 py-3 border-l shrink-0"
    >
      {children}
    </div>
  );
};

export default StickySidebar;
