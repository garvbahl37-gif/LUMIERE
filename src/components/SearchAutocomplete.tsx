import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, TrendingUp, X, ArrowRight, Sparkles, Filter, Star, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";

interface SearchAutocompleteProps {
    onClose?: () => void;
    isMobile?: boolean;
}

const RECENT_SEARCHES_KEY = "lumiere-recent-searches";
const MAX_RECENT_SEARCHES = 5;

const SearchAutocomplete = ({ onClose, isMobile = false }: SearchAutocompleteProps) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Categories for quick filtering
    const categories = [
        { name: "All", slug: null, icon: <Sparkles size={14} /> },
        { name: "Handbags", slug: "handbags", icon: <Tag size={14} /> },
        { name: "Jewelry", slug: "jewelry", icon: <Star size={14} /> },
        { name: "Shoes", slug: "shoes", icon: <Tag size={14} /> },
        { name: "Dresses", slug: "dresses", icon: <Tag size={14} /> },
    ];

    // Popular searches with icons
    const popularSearches = [
        { term: "Silk Dresses", category: "dresses" },
        { term: "Gold Jewelry", category: "jewelry" },
        { term: "Designer Heels", category: "shoes" },
        { term: "Leather Bags", category: "handbags" },
        { term: "New Arrivals", category: null },
    ];

    useEffect(() => {
        const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter products based on query and category
    const filteredProducts = query.length >= 2
        ? mockProducts
            .filter(p => {
                const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
                    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
                const matchesCategory = !selectedCategory || p.category.slug === selectedCategory;
                return matchesQuery && matchesCategory;
            })
            .slice(0, 6)
        : [];

    // Get category suggestions based on query
    const categorySuggestions = query.length >= 1
        ? categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) && c.slug)
        : [];

    const saveRecentSearch = (searchTerm: string) => {
        const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, MAX_RECENT_SEARCHES);
        setRecentSearches(updated);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    };

    const handleSearch = (searchTerm: string, category?: string | null) => {
        if (searchTerm.trim()) {
            saveRecentSearch(searchTerm.trim());
            const searchParams = new URLSearchParams();
            searchParams.set("search", searchTerm.trim());
            if (category) {
                searchParams.set("category", category);
            }
            navigate(`/shop?${searchParams.toString()}`);
            setQuery("");
            setIsOpen(false);
            onClose?.();
        }
    };

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
        setQuery("");
        setIsOpen(false);
        onClose?.();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query, selectedCategory);
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem(RECENT_SEARCHES_KEY);
    };

    const handleCategoryFilter = (slug: string | null) => {
        setSelectedCategory(slug);
        if (query.length >= 2) {
            // Re-filter results
            setIsOpen(true);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <form onSubmit={handleSubmit} className="relative">
                {/* Animated search icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search size={18} className={`transition-all duration-300 ${query ? 'scale-110 text-accent' : ''}`} />
                </div>
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search luxury collections..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className={`pl-10 pr-10 transition-all duration-300 ${isMobile
                        ? 'bg-secondary border-border focus:border-accent h-12 text-base'
                        : 'w-96 bg-background border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl shadow-sm'
                        }`}
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                    >
                        <X size={16} />
                    </button>
                )}
            </form>

            {/* Premium Dropdown */}
            {isOpen && (
                <div className={`${isMobile
                    ? 'relative w-full mt-2 mb-4 bg-background/50 border-y border-border shadow-none'
                    : 'absolute top-full left-0 right-0 mt-3 bg-background border border-border rounded-2xl shadow-2xl'
                    } overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-1 duration-200 ${isMobile ? 'max-h-[60vh]' : 'max-h-[480px]'} overflow-y-auto`}>

                    {/* Category Quick Filters */}
                    <div className="p-3 border-b border-border/50 bg-gradient-to-r from-secondary/20 to-transparent">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => handleCategoryFilter(cat.slug)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedCategory === cat.slug
                                        ? 'bg-accent text-accent-foreground shadow-md'
                                        : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Results */}
                    {filteredProducts.length > 0 && (
                        <div className="p-3">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2 flex items-center gap-2">
                                <Sparkles size={12} className="text-accent" />
                                Matching Products
                            </p>
                            <div className="space-y-1">
                                {filteredProducts.map((product) => (
                                    <button
                                        key={product._id}
                                        onClick={() => handleProductClick(product._id)}
                                        className="w-full flex items-center gap-3 p-2.5 hover:bg-gradient-to-r hover:from-secondary/50 hover:to-transparent rounded-xl transition-all duration-200 group"
                                    >
                                        <div className="w-14 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 ring-1 ring-border/30 group-hover:ring-accent/50 transition-all">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="font-medium text-sm line-clamp-1 group-hover:text-accent transition-colors">{product.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-muted-foreground">{product.categoryName}</span>
                                                {product.isNew && (
                                                    <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent rounded-full">NEW</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm font-semibold">${product.price.toLocaleString()}</p>
                                            {product.compareAtPrice && (
                                                <p className="text-xs text-red-500 line-through">${product.compareAtPrice.toLocaleString()}</p>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {query.length >= 2 && (
                                <button
                                    onClick={() => handleSearch(query, selectedCategory)}
                                    className="w-full flex items-center justify-center gap-2 p-3 mt-2 text-sm text-accent hover:bg-accent/10 rounded-xl transition-all font-medium group"
                                >
                                    View all results for "{query}"
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Category Suggestions */}
                    {categorySuggestions.length > 0 && query.length >= 1 && query.length < 2 && (
                        <div className="p-3 border-b border-border/50">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2 flex items-center gap-2">
                                <Filter size={12} />
                                Categories
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {categorySuggestions.map((cat) => (
                                    <button
                                        key={cat.slug}
                                        onClick={() => {
                                            navigate(`/shop?category=${cat.slug}`);
                                            setQuery("");
                                            setIsOpen(false);
                                            onClose?.();
                                        }}
                                        className="px-4 py-2 text-sm bg-gradient-to-r from-secondary/50 to-secondary/30 hover:from-accent/20 hover:to-accent/10 rounded-xl transition-all"
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State - Popular Searches */}
                    {query.length < 2 && (
                        <div className="p-4">
                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div className="mb-5">
                                    <div className="flex items-center justify-between px-1 mb-3">
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <Clock size={12} />
                                            Recent Searches
                                        </p>
                                        <button
                                            onClick={clearRecentSearches}
                                            className="text-xs text-muted-foreground hover:text-accent transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => handleSearch(term)}
                                                className="px-4 py-2 text-sm bg-secondary/30 hover:bg-secondary/50 rounded-full transition-all hover:scale-105"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Popular Searches */}
                            <div>
                                <p className="text-xs uppercase tracking-wider text-muted-foreground px-1 mb-3 flex items-center gap-2">
                                    <TrendingUp size={12} className="text-accent" />
                                    Popular Now
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {popularSearches.map((item) => (
                                        <button
                                            key={item.term}
                                            onClick={() => handleSearch(item.term, item.category)}
                                            className="flex items-center gap-2 p-3 text-sm bg-gradient-to-r from-secondary/40 to-secondary/20 hover:from-accent/15 hover:to-accent/5 rounded-xl transition-all text-left group"
                                        >
                                            <TrendingUp size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                                            <span className="group-hover:text-accent transition-colors">{item.term}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {query.length >= 2 && filteredProducts.length === 0 && (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                                <Search size={24} className="text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">No products found for "{query}"</p>
                            <button
                                onClick={() => handleSearch(query)}
                                className="mt-3 text-sm text-accent hover:underline font-medium"
                            >
                                Search anyway →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchAutocomplete;
