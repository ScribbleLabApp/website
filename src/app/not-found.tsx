import Link from "next/link";
import { headers } from "next/headers";

import { SCNavbar } from "@/components/internal/scnavbar";
import { SCFooter } from "@/components/internal/scfooter";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#f9f6f1] flex flex-col justify-center items-center overflow-hidden">
      <SCNavbar />
      <main className="flex flex-col justify-center items-center overflow-hidden">
        {/* Illustration */}

        {/* Message and link */}
        <p className="text-lg text-black dark:text-white mt-8 mb-4">
          We're sorry! But the page you are looking for can't be found!
        </p>
        <Link
          href="/"
          className="border-2 border-black hover:border-orange-400 dark:border-white text-black dark:text-white hover:text-orange-400 px-6 py-3 rounded-full hover:text-orange transition"
        >
          <strong>Back to Homepage</strong>
        </Link>
      </main>

      <SCFooter />
    </div>
  );
}
