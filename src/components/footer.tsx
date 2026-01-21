import Link from 'next/link';
import { Church, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
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
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Church className="h-8 w-8" />
              <span className="font-headline text-xl font-semibold">DMMC Connect</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Double Mega Missionary Church
            </p>
            <div className="text-sm text-primary-foreground/80">
              <p>123 Church Street, Faith City, 12345</p>
              <p>contact@dmmc.org</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline text-primary-foreground/80 hover:text-primary-foreground">
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
                <Link key={index} href={social.href} className="text-primary-foreground/80 hover:text-primary-foreground">
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} DMMC Connect. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
