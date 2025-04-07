import Image from "next/image";

import SCRibbon from "@/components/internal/scribbon";

import SCConstructionPage from "@/components/pages/construction";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-0  font-[family-name:var(--font-geist-sans)]">
      {/* clsName= gap-8 */}
      {/*<SCRibbon className="w-full">
       <span>ScribbleLab is currently in development. Check out the roadmap.</span>
      </SCRibbon>*/}
      <main>
        <SCConstructionPage />
      </main>
    </div>
  );
}
