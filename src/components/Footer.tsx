import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Home & Living", href: "#" },
      { name: "Beauty", href: "#" },
      { name: "Accessories", href: "#" },
    ],
    company: [
      { name: "Our Story", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "Shipping & Returns", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Size Guide", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Youtube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="font-display text-3xl tracking-tight mb-6 block">
              LUMIÈRE
            </a>
            <p className="text-muted-foreground max-w-sm mb-6">
              Curated essentials for modern living. Timeless pieces crafted with intention and care.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-display text-base mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display text-base mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-display text-base mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Lumière. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
