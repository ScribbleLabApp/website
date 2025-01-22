"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/mdx";
import { TableOfContents } from "@/components/ui/toc";
import CookiePolicy from "@/data/md/cookie-policy.mdx";

export default function Cookies() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-8 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex">
          <div className="flex-grow prose prose-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            <MDXProvider components={mdxComponents}>
              <CookiePolicy />
            </MDXProvider>
          </div>
          <aside className="hidden lg:block ml-8">
            <TableOfContents />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}