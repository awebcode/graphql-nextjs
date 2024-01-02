"use client"
import React from 'react'
import { useThemeContext } from './ThemContext'

const ThemeComponent = () => {
    const { theme } = useThemeContext();

  return (
    <div
      className={`rounded px-4 py-2 ${
        theme.theme === "light" ? "bg-white text-gray-900" : "bg-black text-white"
      } h-screen w-screen`}
    >
      ThemeComponent
    </div>
  );
}

export default ThemeComponent