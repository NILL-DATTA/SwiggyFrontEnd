"use client";

import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Props } from "@/typeScript/auth.type";
import { usePathname } from "next/navigation";

export default function ProviderLayout({ children }: Props) {
  // Checking which page the user is on
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/restaurant");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
