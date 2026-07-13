import React from "react";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/footer/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MainSidebar from "@/components/sidebar/sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      {session ? (
        <SidebarProvider>
          <div className="flex flex-col flex-1 w-full min-h-screen">
            <Header />
            <div className="flex flex-1 pb-5">
              <MainSidebar />
              <div className="flex-1">{children}</div>
            </div>

            <Footer />
          </div>
        </SidebarProvider>
      ) : (
        <div className="min-h-screen">
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default RootLayout;
