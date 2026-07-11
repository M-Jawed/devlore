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

      if (scrollingDown) {
        sidebar.style.top = `${viewportHeight - sidebarHeight}px`;
      } else {
        sidebar.style.top = "0px";
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sidebarRef} className="sticky w-80 px-4 py-3 border-l">
      {children}
    </div>
  );
};

export default StickySidebar;
