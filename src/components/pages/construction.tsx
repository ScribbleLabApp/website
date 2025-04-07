import { Button } from "@/components/ui/button";
import Link from "next/link";

import SCimg from "../internal/scimg";

export default function SCConstructionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <SCimg
        id="scribble-header-people"
        alt="An illustration showing a group of young people"
        className="max-w-lg sm:max-w-xl md:max-w-2xl w-full h-auto mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">
        We're Building Something Amazing!
      </h1>
      <p className="text-gray-600 mb-6">
        Our site is currently under construction. Stay tuned — we’ll be
        launching soon!
      </p>
      <Link href="/community">
        <Button className="border bg-transparent hover:bg-transparent border-black hover:border-orange-400 dark:border-white text-black dark:text-white hover:text-orange-400 px-12 py-6 rounded-full transition">
          <strong>Join Our Community</strong>
        </Button>
      </Link>
    </div>
  );
}
