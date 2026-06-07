import { useState } from "react";

//icons
import { Moon, Sun } from "lucide-react";

//custom hook
import useTheme from "../../hooks/useTheme";
export default function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <button onClick={toggleTheme} className="cursor-pointer ">
        {theme === "light" ? (
          <Moon strokeWidth={1} className="text-accent" />
        ) : (
          <Sun strokeWidth={1} className="text-accent" />
        )}
      </button>
    </>
  );
}
