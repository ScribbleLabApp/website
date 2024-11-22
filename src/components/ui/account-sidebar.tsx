// components/ui/account-sidebar.tsx

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Settings, Users, BellDot, Lock, CreditCard, FileDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { title: 'Overview', url: '/account/overview', icon: Home },
  { title: 'Security', url: '/account/security', icon: Lock },
  { title: 'Teams', url: '/account/teams', icon: Users },
  { title: 'Notifications', url: '/account/notifications', icon: BellDot },
  { title: 'Billing & Subscription', url: '/account/billing', icon: CreditCard },
  { title: 'Data Export', url: '/account/data-export', icon: FileDown },
];

const organizationItems = [
    { title: "Manage Teams", url: "/account/teams", icon: Users },
    { title: "Organization Settings", url: "/account/teams", icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
          <SidebarGroupLabel>Account Settings</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
          <SidebarGroupLabel>Organization Settings</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarMenu>
              {organizationItems.map((organizationItems) => (
                <SidebarMenuItem key={organizationItems.title}>
                <SidebarMenuButton asChild>
                  <a href={organizationItems.url}>
                    <organizationItems.icon />
                    <span>{organizationItems.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              ))}
          </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
}
