"use client";

import Sidebar from '@/components/ui/account-sidebar'; // Import the sidebar
import { usePathname } from 'next/navigation'; // Optional, if you need to check the current route

import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

export default function AccountPage() {
  const pathname = usePathname(); // Optional, for active link highlighting

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Sidebar and Detail View */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Detail View (Main Content) */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-semibold">Account Overview</h1>

          <p className="mt-4">Current Path: {pathname}</p>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}