import { SCNavbar } from "@/components/internal/scnavbar";
import { SCFooter } from "@/components/internal/scfooter";

export default function SCCommunityPage() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-0  font-[family-name:var(--font-geist-sans)]">
      <SCNavbar />

      <main></main>

      <SCFooter />
    </div>
  );
}
