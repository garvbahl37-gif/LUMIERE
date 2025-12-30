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
  const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const womenDropdownRef = useRef<HTMLDivElement>(null);
  const menDropdownRef = useRef<HTMLDivElement>(null);

  const womenCategories = [
    { name: "Handbags", slug: "handbags" },
    { name: "Jewelry", slug: "jewelry" },
    { name: "Shoes", slug: "shoes" },
    { name: "Dresses", slug: "dresses" },
    { name: "Accessories", slug: "accessories" },
  ];

  const menCategories = [
    { name: "Watches", slug: "mens-watches" },
    { name: "Bags", slug: "mens-bags" },
    { name: "Shoes", slug: "mens-shoes" },
    { name: "Suits", slug: "mens-suits" },
    { name: "Accessories", slug: "mens-accessories" },
  ];

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={14} /> },
    { name: "Women", href: "/shop?gender=women", hasDropdown: true, dropdownType: "women" },
    { name: "Men", href: "/shop?gender=men", hasDropdown: true, dropdownType: "men" },
    { name: "New Arrivals", href: "/shop?isNew=true" },
    { name: "Sale", href: "/shop?sale=true", highlight: true },
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
      if (womenDropdownRef.current && !womenDropdownRef.current.contains(e.target as Node)) {
        setIsWomenDropdownOpen(false);
      }
      if (menDropdownRef.current && !menDropdownRef.current.contains(e.target as Node)) {
        setIsMenDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string, isHash?: boolean) => {
    setIsMenuOpen(false);
    setIsWomenDropdownOpen(false);
    setIsMenDropdownOpen(false);
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
                <div
                  key={link.name}
                  className="relative"
                  ref={link.dropdownType === "women" ? womenDropdownRef : link.dropdownType === "men" ? menDropdownRef : undefined}
                >
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => {
                          if (link.dropdownType === "women") {
                            setIsWomenDropdownOpen(!isWomenDropdownOpen);
                            setIsMenDropdownOpen(false);
                          } else if (link.dropdownType === "men") {
                            setIsMenDropdownOpen(!isMenDropdownOpen);
                            setIsWomenDropdownOpen(false);
                          }
                        }}
                        className="flex items-center gap-1.5 font-display font-semibold text-sm tracking-widest uppercase text-foreground/80 hover:text-accent transition-all cursor-pointer group"
                      >
                        {link.name}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 text-muted-foreground group-hover:text-accent ${(link.dropdownType === "women" && isWomenDropdownOpen) ||
                            (link.dropdownType === "men" && isMenDropdownOpen)
                            ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {((link.dropdownType === "women" && isWomenDropdownOpen) ||
                        (link.dropdownType === "men" && isMenDropdownOpen)) && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 bg-white border-t-2 border-accent shadow-xl p-4 min-w-[200px] animate-in fade-in-0 slide-in-from-top-2 duration-200 rounded-lg">
                            <div className="grid gap-1">
                              {(link.dropdownType === "women" ? womenCategories : menCategories).map((cat) => (
                                <button
                                  key={cat.slug}
                                  onClick={() => {
                                    navigate(`/shop?category=${cat.slug}`);
                                    setIsWomenDropdownOpen(false);
                                    setIsMenDropdownOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 rounded-lg transition-colors text-left group"
                                >
                                  <span className="text-sm text-neutral-700 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200">
                                    {cat.name}
                                  </span>
                                </button>
                              ))}
                              <div className="border-t border-neutral-100 mt-2 pt-2">
                                <button
                                  onClick={() => {
                                    navigate(link.href);
                                    setIsWomenDropdownOpen(false);
                                    setIsMenDropdownOpen(false);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-accent/10 rounded-lg transition-colors text-left text-xs uppercase tracking-wider font-bold text-accent"
                                >
                                  View All {link.name}
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
                Track Order
              </button>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 lg:gap-6">
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

              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-secondary/50 transition-all"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </Button>

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




              {/* Shop Links - Women */}
              <div className="py-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">Women's Collection</p>
                <div className="grid grid-cols-3 gap-2">
                  {womenCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        navigate(`/shop?category=${cat.slug}`);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center p-3 bg-gradient-to-br from-[hsl(45_85%_50%/0.1)] to-transparent hover:from-[hsl(45_85%_50%/0.2)] rounded-lg transition-all border border-[hsl(45_85%_50%/0.15)]"
                    >
                      <span className="text-xs font-medium text-neutral-700">{cat.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      navigate('/shop?gender=women');
                      setIsMenuOpen(false);
                    }}
                    className="col-span-3 flex items-center justify-center gap-2 p-2 text-[hsl(45_85%_45%)] text-xs font-semibold uppercase tracking-wider"
                  >
                    View All Women →
                  </button>
                </div>
              </div>

              {/* Shop Links - Men */}
              <div className="py-2 border-t border-border pt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">Men's Collection</p>
                <div className="grid grid-cols-3 gap-2">
                  {menCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        navigate(`/shop?category=${cat.slug}`);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center p-3 bg-gradient-to-br from-charcoal/5 to-transparent hover:from-charcoal/10 rounded-lg transition-all border border-charcoal/10"
                    >
                      <span className="text-xs font-medium text-neutral-700">{cat.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      navigate('/shop?gender=men');
                      setIsMenuOpen(false);
                    }}
                    className="col-span-3 flex items-center justify-center gap-2 p-2 text-charcoal text-xs font-semibold uppercase tracking-wider"
                  >
                    View All Men →
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="py-2 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setIsTrackOrderOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 p-3 bg-accent/10 hover:bg-accent/20 rounded-xl transition-colors text-accent"
                  >
                    <Truck size={16} />
                    <span className="text-sm font-medium">Track Order</span>
                  </button>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 p-3 bg-secondary/30 hover:bg-secondary/50 rounded-xl transition-colors"
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
                {navLinks.filter(link => link.name !== "Women" && link.name !== "Men").map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href, link.isHash)}
                    className={`flex items-center justify-center gap-2 py-3 text-lg font-display tracking-wide transition-colors text-center w-full ${link.highlight
                      ? 'text-red-500'
                      : 'text-foreground hover:text-accent'
                      }`}
                  >
                    {link.icon}
                    {link.name}
                  </button>
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
        {/* Mobile Search Bar Overlay */}
        {isSearchOpen && (
          <div className="lg:hidden border-t border-border bg-background px-4 py-3 animate-in slide-in-from-top-1 duration-200 shadow-md">
            <SearchAutocomplete onClose={() => setIsSearchOpen(false)} isMobile />
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
