'use client';

import Sidebar from '@/components/ui/account-sidebar';
import { usePathname } from 'next/navigation';

import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

export default function AccountPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Main Content - Sidebar and Detail View */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        <div className="flex flex-col w-64 bg-gray-100 dark:bg-neutral-900 z-10 h-auto">
          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* Detail View (Main Content) */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-semibold">Account Overview</h1>
          {/*<FirebaseImage alt="Illustration Header" path="people.png" className="w-128 object-cover" />*/}
        </main>
      </div>

      {/* Footer */}
      <div className="">
        <Footer />
      </div>
    </div>
  );
}