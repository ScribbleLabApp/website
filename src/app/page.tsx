import Image from 'next/image';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { CImage } from '@/components/ui/cimg';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-8  font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <div className="container mx-auto flex flex-col items-center justify-center text-center p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Exciting Things Are On the Way!
        </h2>

        {/* Replace with an actual image if needed */}
        <CImage id="scribble-header-people" alt="Illustration Header" className="w-3/4 m-auto h-auto" />

        <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-prose">
          Thank you for your patience as we work hard to bring you an amazing experience. 
          Our application and services are currently in development, and we can't wait to 
          share them with you. Join our waitlist today to gain early access and be among 
          the first to explore our innovative solutions!
        </p>

        <button className="px-6 py-3 bg-orange-500 text-white rounded-3xl shadow-md hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all">
          Join the Waitlist
        </button>
      </div>

      <Footer />
    </div>
  );
}
