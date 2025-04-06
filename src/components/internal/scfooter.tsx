"use client";

import Link from "next/link";
import {
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";

import quickLinks from "@/data/footer.json";

export function SCFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-neutral-900 text-foreground mt-12 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold mb-2">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language Selector and Social Media Links Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mt-8">
          <div className="flex gap-4 text-lg">
            <Link href="https://github.com/ScribbleLabApp/" aria-label="GitHub">
              <FaGithub />
            </Link>
            <Link
              href="https://www.instagram.com/scribblelabappofficial/"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.youtube.com/@scribblelabappofficial"
              aria-label="YouTube"
            >
              <FaYoutube className="hover:text-red-500" />
            </Link>
            <Link href="https://x.com/scribblelabapp" aria-label="Twitter">
              <FaTwitter className="hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.tiktok.com/@scribblelabappofficial"
              aria-label="TikTok"
            >
              <FaTiktok className="hover:text-pink-700" />
            </Link>
            <Link href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-blue-400" />
            </Link>
            <Link href="https://discord.gg/Y5mUJbNC8h" aria-label="Discord">
              <FaDiscord className="hover:text-violet-700" />
            </Link>
          </div>
        </div>

        <hr className="my-3 border-t border-muted-foreground" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright and Theme Selector */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-muted-foreground">
            <span>
              © 2024 - {new Date().getFullYear()} ScribbleLab LLC. All rights
              reserved.
            </span>
          </div>
          {/* Theme Selector */}
        </div>
      </div>
    </footer>
  );
}
