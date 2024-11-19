"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
    {/* Theme logic */}
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.value as "light" | "dark" | "auto");
        // Handle the actual theme change logic here
    };

  return (
    <footer className="bg-background text-foreground  mt-12  w-full">
        {/* Separator */}
        <hr className="my-4 border-t-2 border-muted-foreground" />

        <div className="container mx-auto px-4">
        {/* Legal Links */}
        <div className="text-center text-sm text-muted-foreground mb-6">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>{" "}
          |{" "}
          <Link href="/cookies" className="hover:underline">
            Cookies
          </Link>
        </div>

        {/* Language & Country Selector */}
        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <div>English (US)</div>
          <div className="text-gray-500">© 2024 ScribbleLab, LLC - All rights reserved.</div>
        </div>

        {/* Theme Picker (Slider-like Element) */}
        <div className="flex justify-center items-center gap-4 mt-6">
          {/* Slider container */}
          <div className="relative flex items-center rounded-full bg-gray-200 w-56 h-12">
            {/* Option labels */}
            <label
              htmlFor="light"
              className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-1/3 text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${
                theme === "light" ? "bg-orange-500 text-white" : "text-gray-500"
              }`}
            >
              Light
            </label>
            <label
              htmlFor="dark"
              className={`absolute left-1/3 top-0 bottom-0 flex items-center justify-center w-1/3 text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${
                theme === "dark" ? "bg-orange-500 text-white" : "text-gray-500"
              }`}
            >
              Dark
            </label>
            <label
              htmlFor="auto"
              className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-1/3 text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${
                theme === "auto" ? "bg-orange-500 text-white" : "text-gray-500"
              }`}
            >
              Auto
            </label>

            {/* Slider indicator */}
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
      </div>
    </footer>
  );
}