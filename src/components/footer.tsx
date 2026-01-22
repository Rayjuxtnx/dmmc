"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Animate } from '@/components/ui/animate';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Announcements" },
  { href: "https://daghewardmillsbooks.org/new/", label: "Books" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/connect", label: "Connect" },
  { href: "/give", label: "Give" },
];

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.94-6.37-2.96-2.24-2.95-2.2-6.87-.04-9.88 1.48-2.08 3.8-3.32 6.13-3.32.02 1.51-.01 3.02.01 4.53-.49-.29-.98-.56-1.46-.86-1.07-.66-2.22-1.03-3.48-1.03-.01 2.37.01 4.73-.02 7.11.33.24.66.47 1 .69.85.55 1.83.84 2.89.84.02-2.36 0-4.73 0-7.1-.03-1.39.24-2.77 1-3.9 1.09-1.61 2.72-2.51 4.46-2.52z" />
    </svg>
);

const InstagramIconWithGradient = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <defs>
            <radialGradient id="instaGradient" r="150%" cx="30%" cy="107%">
                <stop stopColor="#fdf497" offset="0" />
                <stop stopColor="#fdf497" offset="0.05" />
                <stop stopColor="#fd5949" offset="0.45" />
                <stop stopColor="#d6249f" offset="0.6" />
                <stop stopColor="#285AEB" offset="0.9" />
            </radialGradient>
        </defs>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="url(#instaGradient)" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#instaGradient)" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="url(#instaGradient)" />
    </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/", name: "Facebook", className: "text-[#4267B2] hover:text-[#3b5998]" },
  { icon: InstagramIconWithGradient, href: "https://www.instagram.com/", name: "Instagram", className: "opacity-80 hover:opacity-100" },
  { icon: TiktokIcon, href: "https://www.tiktok.com/", name: "TikTok", className: "text-foreground/80 hover:text-foreground" },
  { icon: Youtube, href: "https://www.youtube.com/", name: "YouTube", className: "text-[#FF0000] hover:text-[#cc0000]" },
];

export function Footer() {
  const [year, setYear] = useState<number>();
  const logo = PlaceHolderImages.find(img => img.id === 'site-logo');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Animate as="footer" className="bg-transparent text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {logo && logo.imageUrl ? (
                <Image src={logo.imageUrl} alt="DMMC Logo" width={32} height={32} data-ai-hint={logo.imageHint} className="rounded-full" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-secondary" />
              )}
              <span className="font-headline text-xl font-semibold">DMMC</span>
            </Link>
            <p className="font-bold animated-gradient-text-3d">
              PRINCE OF PEACE CATHEDRAL-NAIROBI APARCHE
            </p>
            <div className="text-sm text-foreground/80">
              <p>Off Jogoo Road, near Aquinas High School, Nairobi</p>
              <p>WWW.DMMCNAIROBI</p>
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
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`transition-all ${social.className}`}
                  aria-label={`Follow us on ${social.name}`}
                >
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
