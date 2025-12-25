import { useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "New Arrivals", href: "#" },
    { name: "Collections", href: "#" },
    { name: "Home", href: "#" },
    { name: "Beauty", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a href="/" className="font-display text-2xl lg:text-3xl tracking-tight">
            LUMIÈRE
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-smooth"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <User size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-display tracking-wide text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border mt-2">
              <Button variant="ghost" size="icon">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
