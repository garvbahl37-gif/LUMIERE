import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { productService, Product } from "@/services/productService";
import { categoryService, Category } from "@/services/categoryService";
import { Search, Filter, X } from "lucide-react";

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

    // Filter states
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

    // Sync category from URL params when they change
    useEffect(() => {
        const categoryFromUrl = searchParams.get("category") || "";
        if (categoryFromUrl !== selectedCategory) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, sortBy, searchParams, pagination.page]);

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategories();
            if (response.success) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await productService.getProducts({
                category: selectedCategory || undefined,
                sort: sortBy as any,
                search: searchParams.get("search") || undefined,
                page: pagination.page,
                limit: 12,
            });
            if (response.success) {
                setProducts(response.data);
                if (response.pagination) {
                    setPagination(response.pagination);
                }
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }
        setSearchParams(params);
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setPriceRange([0, 500]);
        setSortBy("newest");
        setSearch("");
        setSearchParams(new URLSearchParams());
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Premium Hero Banner (Redesigned) */}
                <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden flex items-center justify-center">
                    {/* Dynamic Background Image based on category */}
                    <div className="absolute inset-0">
                        <img
                            src={
                                (() => {
                                    // Find matching category for hero image
                                    const currentCat = categories.find(c =>
                                        c.name.toLowerCase() === selectedCategory.toLowerCase() ||
                                        c.slug === selectedCategory.toLowerCase()
                                    );
                                    if (currentCat && currentCat.heroImage) {
                                        return currentCat.heroImage;
                                    }
                                    // Fallback hero images by category name
                                    const heroImages: Record<string, string> = {
                                        "handbags": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=90",
                                        "jewelry": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=90",
                                        "shoes": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1920&q=90",
                                        "dresses": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=90",
                                        "accessories": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90",
                                    };
                                    const key = selectedCategory.toLowerCase();
                                    return heroImages[key] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=90";
                                })()
                            }
                            alt={selectedCategory || "Shop collection"}
                            className="w-full h-full object-cover transition-transform duration-1000 transform scale-105 filter brightness-[0.7]"
                        />
                        {/* Elegant Dark Gradient for Text Contrast */}
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
                        <div className="max-w-4xl mx-auto space-y-6">

                            {/* Minimal Category Label */}
                            {selectedCategory && (
                                <p className="text-xs lg:text-sm uppercase tracking-[0.4em] text-white/80 font-medium mb-2 animate-fade-in opacity-0" style={{ animationDelay: '100ms' }}>
                                    Collection
                                </p>
                            )}

                            {/* Main Title - Premium Typography */}
                            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-tight animate-fade-up opacity-0" style={{ animationDelay: '200ms' }}>
                                {selectedCategory ? (
                                    <>
                                        <span className="font-normal block mb-2">Explore</span>
                                        <span className="italic font-normal bg-gradient-to-r from-rose-200 to-amber-100 bg-clip-text text-transparent">
                                            {selectedCategory}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="font-normal block mb-2">The</span>
                                        <span className="italic font-normal bg-gradient-to-r from-rose-200 to-amber-100 bg-clip-text text-transparent">
                                            Collection
                                        </span>
                                    </>
                                )}
                            </h1>

                            {/* Divider Line */}
                            <div className="w-24 h-px bg-white/30 mx-auto my-8 animate-scale-in opacity-0" style={{ animationDelay: '400ms' }} />

                            {/* Refined Description */}
                            <p className="text-white/80 text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '500ms' }}>
                                {selectedCategory
                                    ? `Discover our exclusive ${selectedCategory.toLowerCase()} collection, curated for the discerning connoisseur.`
                                    : "Timeless pieces crafted with intention and designed for modern living."
                                }
                            </p>

                            {/* Minimal Stats */}
                            <div className="flex items-center justify-center gap-8 mt-8 text-white/60 text-sm tracking-widest animate-fade-in opacity-0" style={{ animationDelay: '700ms' }}>
                                <span>{pagination.total} ITEMS</span>
                                <span>•</span>
                                <span>{categories.length} CATEGORIES</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters & Products */}
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Top bar */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="relative max-w-md w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 h-11"
                                />
                            </form>

                            <div className="flex items-center gap-4">
                                {/* Mobile filter toggle */}
                                <Button
                                    variant="outline"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden"
                                >
                                    <Filter size={18} className="mr-2" />
                                    Filters
                                </Button>

                                {/* Sort */}
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Top Rated</SelectItem>
                                    </SelectContent>
                                </Select>

                                <p className="text-sm text-muted-foreground hidden lg:block">
                                    {pagination.total} products
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-8">
                            {/* Sidebar filters (Redesigned) */}
                            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 animate-fade-in`}>
                                <div className="space-y-10 pl-2 lg:border-l lg:border-neutral-200 lg:pl-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-display text-xl italic text-neutral-800">Filters</h3>
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-rose-500 transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>

                                    {/* Categories */}
                                    <div className="space-y-4">
                                        <h4 className="font-display text-lg text-neutral-800">Category</h4>
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => setSelectedCategory("")}
                                                className={`group flex items-center justify-between w-full text-left transition-all duration-300 ${!selectedCategory
                                                    ? 'text-rose-600 font-medium translate-x-1'
                                                    : 'text-neutral-500 hover:text-neutral-900'
                                                    }`}
                                            >
                                                <span className="text-sm tracking-wide">All Categories</span>
                                                {!selectedCategory && <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />}
                                            </button>

                                            {categories.map((cat) => (
                                                <button
                                                    key={cat._id}
                                                    onClick={() => setSelectedCategory(cat.name)}
                                                    className={`group flex items-center justify-between w-full text-left transition-all duration-300 ${selectedCategory === cat.name
                                                        ? 'text-rose-600 font-medium translate-x-1'
                                                        : 'text-neutral-500 hover:text-neutral-900'
                                                        }`}
                                                >
                                                    <span className="text-sm tracking-wide group-hover:underline decoration-rose-200 underline-offset-4">{cat.name}</span>
                                                    {selectedCategory === cat.name && <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="space-y-4">
                                        <h4 className="font-display text-lg text-neutral-800">Price Range</h4>
                                        <Slider
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            max={500}
                                            step={10}
                                            className="mb-4 py-4"
                                        />
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-neutral-900 px-3 py-1 bg-neutral-100 rounded-md">${priceRange[0]}</span>
                                            <span className="text-neutral-400">-</span>
                                            <span className="font-medium text-neutral-900 px-3 py-1 bg-neutral-100 rounded-md">${priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Products Grid */}
                            <div className="flex-1">
                                {isLoading ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="animate-pulse">
                                                <div className="aspect-[3/4] bg-neutral-100 mb-5" />
                                                <div className="h-4 bg-neutral-100 w-3/4 mb-3" />
                                                <div className="h-4 bg-neutral-100 w-1/4" />
                                            </div>
                                        ))}
                                    </div>
                                ) : products.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products.map((product, index) => (
                                            <ProductCard
                                                key={product._id}
                                                id={product._id}
                                                image={product.image.startsWith('/') ? `http://localhost:5173${product.image}` : product.image}
                                                name={product.name}
                                                price={product.price}
                                                compareAtPrice={product.compareAtPrice}
                                                category={product.categoryName}
                                                isNew={product.isNew}
                                                rating={product.rating}
                                                numReviews={product.numReviews}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <p className="text-muted-foreground text-lg mb-4">No products found</p>
                                        <Button variant="outline" onClick={clearFilters}>
                                            Clear filters
                                        </Button>
                                    </div>
                                )}

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="flex justify-center gap-2 mt-12">
                                        {[...Array(pagination.pages)].map((_, i) => (
                                            <Button
                                                key={i}
                                                variant={pagination.page === i + 1 ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setPagination({ ...pagination, page: i + 1 })}
                                            >
                                                {i + 1}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Shop;
