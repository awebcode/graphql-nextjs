"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default NextThemeProvider;
