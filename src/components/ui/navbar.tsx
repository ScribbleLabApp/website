import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"  
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-foreground">
          ScribbleLabApp
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-4">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Learn
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Developer
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Account
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Support
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="">Login</Link>
          </Button>
          <Button asChild>
            <Link href="">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}