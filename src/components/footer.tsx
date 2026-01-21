"use client";

import Link from 'next/link';
import { Church, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Animate } from '@/components/ui/animate';

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "https://daghewardmillsbooks.org/new/", label: "Books" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/connect", label: "Connect" },
  { href: "/give", label: "Give" },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];

export function Footer() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Animate as="footer" className="bg-transparent text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Church className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-semibold">DMMC</span>
            </Link>
            <p className="text-sm text-foreground/80">
              PRINCE OF PEACE CATHEDRAL NAIROBI
            </p>
            <div className="text-sm text-foreground/80">
              <p>Off Jogoo Road, near Aquinas High School, Nairobi</p>
              <p>contact@dmmc.org</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:underline text-foreground/80 hover:text-foreground"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="text-foreground/80 hover:text-foreground">
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>&copy; {year} DMMC. All Rights Reserved.</p>
        </div>
      </div>
    </Animate>
  );
}
