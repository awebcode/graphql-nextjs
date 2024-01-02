"use client";
import { useThemeContext } from "./ThemContext";

// Component for the themed button
export const ThemedButton = () => {
  const { theme } = useThemeContext();

  return (
    <button
      className={`rounded px-4 py-2 ${theme.theme==="light"?'bg-white text-gray-900':'bg-black text-white'}`}
      onClick={theme.toggle}
    >
      Toggle Theme
    </button>
  );
};
