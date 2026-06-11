import React from "react";
import Header from "@/components/shared/header/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
