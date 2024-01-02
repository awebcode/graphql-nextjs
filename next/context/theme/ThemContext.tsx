"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
interface Context {
  theme: string;
  toggle: () => void;
}
export const ThemeContext = createContext<Context | null>(null);

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { theme };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  const ref = useRef(true);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme); // Set the theme from localStorage
    }
  }, []);

  function toggle() {
    const newTheme = theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
};
