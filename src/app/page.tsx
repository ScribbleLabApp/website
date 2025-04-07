import Image from "next/image";

import { SCNavbar } from "@/components/internal/scnavbar";
import { SCFooter } from "@/components/internal/scfooter";

import SCConstructionPage from "@/components/pages/construction";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-0  font-[family-name:var(--font-geist-sans)]">
      {/* clsName= gap-8 */}

      <SCNavbar />
      <main>
        <SCConstructionPage />
      </main>
      <SCFooter />
    </div>
  );
}
