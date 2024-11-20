"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeSelector() {
  const { setTheme, resolvedTheme } = useTheme();
  const [theme, setLocalTheme] = useState<"light" | "dark" | "auto">("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (theme !== "auto") {
        setTheme(theme);
      } else {
        setTheme(resolvedTheme || "light");
      }
    }
  }, [theme, setTheme, mounted, resolvedTheme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.value as "light" | "dark" | "auto";
    setLocalTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Smaller Slider container */}
      <div className="relative flex items-center rounded-full bg-gray-200 w-36 h-8">
        {/* Option labels */}
        <label
          htmlFor="light"
          className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-1/3 text-xs font-medium cursor-pointer transition-all duration-300 rounded-full ${
            theme === "light" ? "bg-orange-500 text-white" : "bg-transparent text-gray-500"
          }`}
        >
          Light
        </label>
        <label
          htmlFor="dark"
          className={`absolute left-1/3 top-0 bottom-0 flex items-center justify-center w-1/3 text-xs font-medium cursor-pointer transition-all duration-300 rounded-full ${
            theme === "dark" ? "bg-orange-500 text-white" : "bg-transparent text-gray-500"
          }`}
        >
          Dark
        </label>
        <label
          htmlFor="auto"
          className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-1/3 text-xs font-medium cursor-pointer transition-all duration-300 rounded-full ${
            theme === "auto" ? "bg-orange-500 text-white" : "bg-transparent text-gray-500"
          }`}
        >
          Auto
        </label>

        {/* Smaller Slider indicator */}
        <div
          className={`absolute top-0 left-0 bottom-0 bg-orange-500 transition-all duration-300 rounded-full ${
            theme === "light"
              ? "w-1/3"
              : theme === "dark"
              ? "w-1/3 left-1/3"
              : "w-1/3 right-0"
          }`}
        ></div>
      </div>

      {/* Hidden radio buttons for accessibility */}
      <input
        type="radio"
        name="theme"
        id="light"
        value="light"
        checked={theme === "light"}
        onChange={handleThemeChange}
        className="hidden"
      />
      <input
        type="radio"
        name="theme"
        id="dark"
        value="dark"
        checked={theme === "dark"}
        onChange={handleThemeChange}
        className="hidden"
      />
      <input
        type="radio"
        name="theme"
        id="auto"
        value="auto"
        checked={theme === "auto"}
        onChange={handleThemeChange}
        className="hidden"
      />
    </div>
  );
}