import Image from 'next/image';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

import Construction from '@/components/ui/construction';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-8  font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-3xl opacity-20"></div>
      <Construction />
      <Footer />
    </div>
  );
}
