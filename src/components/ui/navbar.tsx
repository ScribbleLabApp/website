'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const products = [
  {
    title: 'ScribbleLab',
    href: '',
    description: "A powerful note-taking app that's features goes way beyond.",
  },
  {
    title: 'ScribbleLink',
    href: '',
    description: 'Advanced planning tools for students and professionals.',
  },
];

const learn = [
  {
    title: 'Documentation',
    href: '',
    description: 'Explore detailed guides and feature explanations.',
  },
  {
    title: 'Tutorials',
    href: '',
    description: 'Follow step-by-step instructions to get started.',
  },
];

const pricing = [
  {
    title: 'Starter',
    href: '',
    description: 'Access ScribbleLab for free with core features.',
  },
  {
    title: 'Premium',
    href: '',
    description: 'Unlock advanced tools and priority support.',
  },
  {
    title: 'Organizations',
    href: '',
    description:
      'For teams in large organizations who want to scale their notes and planning while optimizing costs.',
  },
  {
    title: 'ScribbleLab for Students',
    href: '',
    description: 'Exclusive pricing for verified students.',
  },
];

const developer = [
  {
    title: 'API Reference',
    href: '/developer/api',
    description: 'Access detailed API documentation.',
  },
  {
    title: 'Developer Tools',
    href: '/developer/tools',
    description: 'Enhance productivity with developer utilities.',
  },
  {
    title: 'Developer Documentation',
    href: '',
    description: 'Comprehensive developer-specific guides.',
  },
  {
    title: 'Development Forum',
    href: '',
    description:
      'Get in touch with our development community and ask questions related to our API or frameworks.',
  },
];

const support = [
  {
    title: 'FAQ',
    href: '/support/faq',
    description: 'Find answers to common questions.',
  },
  {
    title: 'Contact Us',
    href: '/support/contact',
    description: 'Get in touch for personalized help.',
  },
  {
    title: 'ScribbleCommunity',
    href: '',
    description: 'Join the community to connect and get support.',
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-foreground">
          ScribbleLabApp
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-foreground hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Nav Links (Desktop and iPad+ Sizes) */}
        <nav className="hidden md:flex space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Products */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    {products.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Learn */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    {learn.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    {pricing.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Developer */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Developer</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    {developer.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Support */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    {support.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/account"
            className="flex items-center text-sm font-medium text-foreground hover:text-primary py-2"
          >
            Account
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Sign Up Button */}
          <Button
            variant="outline"
            asChild
            className="rounded-full border border-solid border-black/[.08] dar:border-white/[.145] transition-all duration-300 ease-in-out"
          >
            <Link href="/auth?option=signup">Sign Up</Link>
          </Button>

          {/* Download Button */}
          <Button
            asChild
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all 
                       duration-300 ease-in-out flex items-center justify-center text-sm h-8 sm:h-10 px-3 sm:px-4 
                       bg-orange-500 text-white hover:bg-black hover:text-[#f2f2f2]"
          >
            <Link href="/download">Download</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu (iPad and smaller devices) */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              href="/products"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/developer"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Developer
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/account"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" asChild>
                <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
              <Button asChild>
                <Link href="/download" onClick={() => setIsMenuOpen(false)}>
                  Download
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
