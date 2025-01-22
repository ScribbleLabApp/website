"use client";

import { MDXProvider } from "@mdx-js/react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { TableOfContents } from "@/components/ui/toc";
import TermsContent from "@/data/md/terms-of-service.mdx";

const mdxComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-4xl font-bold text-black dark:text-white mb-8" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="text-black dark:text-white mb-6" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 text-gray-700 dark:text-white mb-6" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-orange-500 underline" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 mb-6"
      {...props}
    />
  ),
};

export default function TermsOfService() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-8 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex">
          <div className="flex-grow prose prose-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            <MDXProvider components={mdxComponents}>
              <TermsContent />
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