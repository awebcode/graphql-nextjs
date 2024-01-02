"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon,FaSun } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeChanger = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  console.log("resolvedTheme", resolvedTheme);

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center cursor-pointer justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <FaSun className="h-10 w-10 text-orange-500" />
      ) : (
        // <h2>White</h2>
        <FaMoon className="h-10 w-10 text-slate-800" />
        // <h2>Dark</h2>
      )}
    </button>
  );
};

export default ThemeChanger;
