import { ThemedButton } from "@/context/theme/ThemButton";
import { useThemeContext } from "@/context/theme/ThemContext";
import ThemeComponent from "@/context/theme/ThemeComponent";
import React from "react";

const ThemeApp = () => {
  return (
    <div>
      <h1 className="h1">Theme</h1>
      <ThemedButton />
      <ThemeComponent />
    </div>
  );
};

export default ThemeApp;
