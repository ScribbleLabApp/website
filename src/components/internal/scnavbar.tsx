"use client";

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

  import { LuMenu, LuX } from "react-icons/lu";

  import navigarionLinks from "@/data/navigationbar.json";


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

export function SCNavbar() {
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
            <LuX className="w-6 h-6" />
          ) : (
            <LuMenu className="w-6 h-6" />
          )}
        </button>

        {/* Nav Links (Desktop and iPad+ Sizes) */}
        <nav className="hidden md:flex space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigarionLinks.map((category) => (
                <NavigationMenuItem key={category.category}>
                  <NavigationMenuTrigger>{category.category}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px]">
                      {category.links.map((item) => (
                        <ListItem
                          key={item.name}
                          title={item.name}
                          href={item.href}
                        >
                          {item.desc}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
            {navigarionLinks.map((category) => (
              <div key={category.category}>
                <h3 className="text-sm font-semibold">{category.category}</h3>
                {category.links.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
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