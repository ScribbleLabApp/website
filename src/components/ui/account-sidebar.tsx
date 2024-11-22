// components/ui/account-sidebar.tsx

import { Home, Settings } from "lucide-react"; // Icons from lucide-react
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { title: 'Overview', url: '/account/overview', icon: Home },
  { title: 'Security', url: '/account/security', icon: Settings },
  { title: 'Teams', url: '/account/teams', icon: Settings },
  { title: 'Notifications', url: '/account/notifications', icon: Settings },
  { title: 'Billing', url: '/account/billing', icon: Settings },
  { title: 'Data Export', url: '/account/data-export', icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname(); // Get the current path to highlight active links
  
  return (
    <div className="w-64 bg-gray-100 dark:bg-neutral-900 text-black dark:text-white h-full flex flex-col">
      <div className="fflex flex-col items-start py-2 px-4 pt-4">
        <h2 className="text-s font-semibold">Account Settings</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.url; // Check if the current path matches the item URL
            
            return (
              <li key={item.title}>
                <Link href={item.url} className={`flex items-center p-3 space-x-3 rounded-md 
                  ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}>
                  <item.icon size={20} />
                  <span className="text-s">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}