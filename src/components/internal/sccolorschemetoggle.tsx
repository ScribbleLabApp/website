"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { set } from "react-hook-form";

export default function SCColorSchemeToggle() {
  const [toggleValue, setToggleValue] = useState<"light" | "dark" | "auto">(
    "auto",
  );
  const { setTheme } = useTheme();

  useEffect(() => {
    const stored = window.localStorage.getItem("colorScheme");
    if (stored === "light" || stored === "dark" || stored === "auto") {
      setToggleValue(stored);
    } else {
      setToggleValue("auto");
    }
  }, []);

  useEffect(() => {
    const theme = toggleValue === "auto" ? "system" : toggleValue;
    setTheme(theme);
    window.localStorage.setItem("colorScheme", toggleValue);
  }, [toggleValue, setTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleValue(e.target.value as "light" | "dark" | "auto");
  };

  const optionClass = (value: string) =>
    `px-2 py-0.5 min-w-[36px] text-center text-xs font-medium rounded-xl border transition-colors
    ${
      toggleValue === value
        ? "bg-orange-400 text-white border-orange-400"
        : "text-orange-400 border-transparent"
    }`;

  return (
    <div
      role="radiogroup"
      tabIndex={0}
      aria-label="Select a color scheme preference."
      className="inline-flex p-0.5 border border-orange-400 rounded-3xl text-xs font-system"
    >
      {["light", "dark", "auto"].map((option) => (
        <label key={option} className="relative">
          <input
            type="radio"
            name="colorToggle"
            value={option}
            autoComplete="off"
            checked={toggleValue === option}
            onChange={handleChange}
            className="sr-only"
          />
          <div className={optionClass(option)}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </div>
        </label>
      ))}
    </div>
  );
}
