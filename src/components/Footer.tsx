import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import ShippingReturnsModal from "./ShippingReturnsModal";
import FAQsModal from "./FAQsModal";
import SizeGuideModal from "./SizeGuideModal";

const Footer = () => {
  const navigate = useNavigate();
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isFAQsModalOpen, setIsFAQsModalOpen] = useState(false);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);

  const shopLinks = [
    { name: "New Arrivals", href: "/shop?isNew=true" },
    { name: "Best Sellers", href: "/shop?sort=popular" },
    { name: "Handbags", href: "/shop?category=handbags" },
    { name: "Jewelry", href: "/shop?category=jewelry" },
    { name: "Shoes", href: "/shop?category=shoes" },
  ];

  const companyLinks = [
    { name: "Our Story", href: "/#about", isHash: true },
    { name: "Sustainability", href: "/#sustainability", isHash: true },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ];

  const supportLinks = [
    { name: "Contact Us", type: "email" },
    { name: "Shipping & Returns", type: "modal", modal: "shipping" },
    { name: "FAQs", type: "modal", modal: "faqs" },
    { name: "Size Guide", type: "modal", modal: "size" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Youtube", icon: Youtube, href: "https://youtube.com" },
  ];

  const handleSupportClick = (link: typeof supportLinks[0]) => {
    if (link.type === "email") {
      window.location.href = "mailto:support@lumiere.com";
    } else if (link.type === "modal") {
      if (link.modal === "shipping") setIsShippingModalOpen(true);
      else if (link.modal === "faqs") setIsFAQsModalOpen(true);
      else if (link.modal === "size") setIsSizeGuideModalOpen(true);
    }
  };

  const handleCompanyClick = (link: typeof companyLinks[0]) => {
    if (link.isHash) {
      if (window.location.pathname === "/") {
        const sectionId = link.href.replace("/#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate(link.href);
      }
    } else {
      navigate(link.href);
    }
  };

  return (
    <>
      <footer className="bg-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link to="/" className="font-display text-3xl tracking-tight mb-6 block hover:opacity-80 transition-opacity">
                LUMIÈRE
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                Curated essentials for modern living. Timeless pieces crafted with intention and care.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <a href="mailto:support@lumiere.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail size={16} />
                  support@lumiere.com
                </a>
                <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone size={16} />
                  +91 123 456 7890
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-secondary/50 transition-all duration-200"
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
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="font-display text-base mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleCompanyClick(link)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-0.5 inline-block text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="font-display text-base mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleSupportClick(link)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-0.5 inline-block text-left cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Lumière. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              <button
                onClick={() => setIsFAQsModalOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setIsFAQsModalOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setIsFAQsModalOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShippingReturnsModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
      />
      <FAQsModal
        isOpen={isFAQsModalOpen}
        onClose={() => setIsFAQsModalOpen(false)}
      />
      <SizeGuideModal
        isOpen={isSizeGuideModalOpen}
        onClose={() => setIsSizeGuideModalOpen(false)}
      />
    </>
  );
};

export default Footer;
