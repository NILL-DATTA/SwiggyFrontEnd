"use client";

import React from "react";
import { Provider } from "react-redux";

import { Toaster } from "sonner";

import store from "./store";
import { CookiesNextProvider } from "cookies-next";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <CookiesNextProvider>
          <Toaster />
          {children}
        </CookiesNextProvider>
        <Toaster position="top-right" theme="dark" richColors duration={3000} />
      </Provider>
    </>
  );
}
