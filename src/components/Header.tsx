import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, Search, ShoppingBag, Heart, X, ChevronDown, Sparkles, Tag, Package, Home, Truck, ClipboardList, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import TrackOrderModal from "@/components/TrackOrderModal";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: "Handbags", slug: "handbags" },
    { name: "Jewelry", slug: "jewelry" },
    { name: "Shoes", slug: "shoes" },
    { name: "Dresses", slug: "dresses" },
    { name: "Accessories", slug: "accessories" },
  ];

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={14} /> },
    { name: "New Arrivals", href: "/shop?isNew=true", icon: <Sparkles size={14} /> },
    { name: "Collections", href: "/shop", hasDropdown: true },
    { name: "Sale", href: "/shop?sale=true", icon: <Tag size={14} />, highlight: true },
    { name: "About", href: "/#about", isHash: true },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string, isHash?: boolean) => {
    setIsMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    if (isHash) {
      if (location.pathname === "/") {
        const element = document.getElementById("about");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate("/#about");
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background shadow-md border-b border-border"
        : "bg-background border-b border-border"
        }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2 hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="font-display text-2xl lg:text-3xl tracking-tight hover:opacity-80 transition-opacity">
              LUMIÈRE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative" ref={link.hasDropdown ? dropdownRef : undefined}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="flex items-center gap-1.5 font-display font-semibold text-sm tracking-widest uppercase text-foreground/80 hover:text-accent transition-all cursor-pointer group"
                      >
                        {link.name}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 text-muted-foreground group-hover:text-accent ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Mega Menu Dropdown */}
                      {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 bg-white/95 backdrop-blur-md border-t-2 border-accent shadow-premium p-6 min-w-[320px] animate-in fade-in-0 slide-in-from-top-2 duration-300 rounded-b-sm">
                          <div className="grid gap-2">
                            {categories.map((cat) => (
                              <button
                                key={cat.slug}
                                onClick={() => {
                                  navigate(`/shop?category=${cat.slug}`);
                                  setIsCategoryDropdownOpen(false);
                                }}
                                className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-md transition-colors text-left group"
                              >
                                <span className="font-display text-base text-neutral-600 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                                  {cat.name}
                                </span>
                              </button>
                            ))}
                            <div className="border-t border-neutral-100 mt-3 pt-3">
                              <button
                                onClick={() => {
                                  navigate('/shop');
                                  setIsCategoryDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-md transition-colors text-left text-xs uppercase tracking-widest font-bold text-accent"
                              >
                                View All Collections
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href, link.isHash)}
                      className={`flex items-center gap-1.5 font-display font-semibold text-sm tracking-widest uppercase transition-all cursor-pointer hover:-translate-y-0.5 ${link.highlight
                        ? 'text-rose-600 hover:text-rose-500'
                        : 'text-foreground/80 hover:text-accent'
                        }`}
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  )}
                </div>
              ))}

              {/* Track Order - Desktop */}
              <button
                onClick={() => setIsTrackOrderOpen(true)}
                className="flex items-center gap-1.5 font-display font-semibold text-sm tracking-widest uppercase text-foreground/80 hover:text-accent transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Truck size={14} />
                Track Order
              </button>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Desktop Search */}
              {isSearchOpen ? (
                <div className="hidden lg:block relative">
                  <SearchAutocomplete onClose={() => setIsSearchOpen(false)} />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex hover:bg-secondary/50 hover:scale-105 transition-all"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={20} />
                </Button>
              )}

              {/* Orders - Desktop (Signed In Only) */}
              <SignedIn>
                <Link to="/orders" className="hidden lg:block">
                  <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50 hover:scale-105 transition-all">
                    <ClipboardList size={20} />
                  </Button>
                </Link>
              </SignedIn>

              {/* Wishlist */}
              <Link to="/wishlist" className="hidden lg:block">
                <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50 hover:scale-105 transition-all">
                  <Heart size={20} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium animate-in zoom-in-50 duration-200">
                      {wishlistItems.length > 9 ? "9+" : wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Menu - Clerk Integration */}
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9",
                      userButtonPopoverCard: "bg-background border border-border shadow-xl",
                      userButtonPopoverActionButton: "hover:bg-secondary",
                      userButtonPopoverActionButtonText: "text-foreground",
                      userButtonPopoverFooter: "hidden",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
              <SignedOut>
                <Link to="/sign-in" className="hidden lg:block">
                  <Button variant="ghost" size="sm" className="text-sm hover:bg-secondary/50 hover:scale-105 transition-all">
                    Sign In
                  </Button>
                </Link>
              </SignedOut>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50 hover:scale-105 transition-all">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium animate-in zoom-in-50 duration-200">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-in slide-in-from-top-2 duration-300">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="mb-2">
                <SearchAutocomplete onClose={() => setIsMenuOpen(false)} isMobile />
              </div>

              {/* Category Links */}
              <div className="py-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Shop by Category</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        navigate(`/shop?category=${cat.slug}`);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-3 bg-secondary/30 hover:bg-secondary/50 rounded-xl transition-colors"
                    >
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="py-2 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setIsTrackOrderOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-3 bg-accent/10 hover:bg-accent/20 rounded-xl transition-colors text-accent"
                  >
                    <Truck size={16} />
                    <span className="text-sm font-medium">Track Order</span>
                  </button>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-3 bg-secondary/30 hover:bg-secondary/50 rounded-xl transition-colors"
                  >
                    <Heart size={16} />
                    <span className="text-sm font-medium">Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="text-xs text-accent">({wishlistItems.length})</span>
                    )}
                  </Link>
                </div>
              </div>

              {/* Nav Links */}
              <div className="py-2 border-t border-border">
                {navLinks.map((link) => (
                  !link.hasDropdown && (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.href, link.isHash)}
                      className={`flex items-center gap-2 py-3 text-lg font-display tracking-wide transition-colors text-left w-full ${link.highlight
                        ? 'text-red-500'
                        : 'text-foreground hover:text-accent'
                        }`}
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  )
                ))}
              </div>

              {/* Account Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-border mt-2">
                <SignedIn>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <ClipboardList size={16} className="mr-2" />
                      My Orders
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link to="/sign-in" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/sign-up" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button size="sm" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />
    </>
  );
};

export default Header;
