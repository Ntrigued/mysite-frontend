import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import NavBar from "../components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={
        "h-screen w-full flex items-stretch flex-col xl:flex-row xl:pt-[2.5vh] "
      }
    >
      <div className={"flex xl:h-auto w-full xl:w-[7.5%] "}>
        <NavBar />
      </div>
      <div className={"flex h-[93.5%] xl:h-full w-full xl:w-[93%]"}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

import React from "react";

export const reportAccessibility = async (
  App: typeof React,
  config?: Record<string, unknown>,
): Promise<void> => {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    const axe = await import("@axe-core/react");
    const ReactDOM = await import("react-dom");

    axe.default(App, ReactDOM, 1000, config);
  }
};

reportAccessibility(React);
