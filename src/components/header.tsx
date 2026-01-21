"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Church, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Animate } from '@/components/ui/animate';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jesus", label: "Jesus" },
  { href: "/about", label: "Who We Are" },
  { href: "/events", label: "Announcements" },
  { href: "https://daghewardmillsbooks.org/new/", label: "Books" },
  { href: "/global", label: "Global" },
  { href: "/stories", label: "Our Stories" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/connect", label: "Connect" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const logo = PlaceHolderImages.find(img => img.id === 'site-logo');

  return (
    <Animate as="header" className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {logo ? (
            <Image src={logo.imageUrl} alt="DMMC Logo" width={32} height={32} data-ai-hint={logo.imageHint} className="rounded-full" />
          ) : (
            <Church className="h-6 w-6 text-primary" />
          )}
          <span className="font-headline text-lg font-bold">DMMC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-semibold" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/give">Give</Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[320px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {logo ? (
                        <Image src={logo.imageUrl} alt="DMMC Logo" width={24} height={24} data-ai-hint={logo.imageHint} className="rounded-full"/>
                    ) : (
                        <Church className="h-6 w-6 text-primary" />
                    )}
                    <span className="font-headline text-lg font-bold">DMMC</span>
                  </Link>
                </div>
                <nav className="flex-grow mt-6 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/give">Give</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Animate>
  );
}
