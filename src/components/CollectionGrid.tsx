import { useState } from "react";
import { LayoutGrid, LayoutList, Grid3X3 } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/services/productService";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "masonry" | "list";

interface CollectionGridProps {
    products: Product[];
    isLoading?: boolean;
}

const CollectionGrid = ({ products, isLoading = false }: CollectionGridProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>("masonry");

    const viewModeButtons = [
        { mode: "grid" as ViewMode, icon: LayoutGrid, label: "Grid View" },
        { mode: "masonry" as ViewMode, icon: Grid3X3, label: "Masonry View" },
        { mode: "list" as ViewMode, icon: LayoutList, label: "List View" },
    ];

    // Determine if a product should be featured (larger) in masonry layout
    const isFeaturedProduct = (index: number) => {
        return index === 0 || index === 5 || index === 8;
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                {/* View Mode Toggle Skeleton */}
                <div className="flex justify-end">
                    <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-9 h-9 rounded-md bg-neutral-200" />
                        ))}
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-lg mb-5" />
                            <div className="space-y-3">
                                <div className="h-3 bg-neutral-100 w-1/4 rounded" />
                                <div className="h-4 bg-neutral-100 w-3/4 rounded" />
                                <div className="h-3 bg-neutral-100 w-1/3 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{products.length}</span> products
                </p>

                <div className="flex gap-1 p-1 bg-neutral-100/80 backdrop-blur-sm rounded-lg shadow-sm">
                    {viewModeButtons.map(({ mode, icon: Icon, label }) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={cn(
                                "p-2 rounded-md transition-all duration-300 relative group",
                                viewMode === mode
                                    ? "bg-white text-[hsl(45_85%_45%)] shadow-md"
                                    : "text-neutral-500 hover:text-neutral-800"
                            )}
                            aria-label={label}
                        >
                            <Icon size={18} strokeWidth={viewMode === mode ? 2.5 : 2} />

                            {/* Tooltip */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest whitespace-nowrap bg-charcoal text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Display */}
            {products.length > 0 ? (
                <>
                    {/* Grid View */}
                    {viewMode === "grid" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 animate-in fade-in-0 duration-500">
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
                    )}

                    {/* Masonry View - Pinterest Style with Featured Products */}
                    {viewMode === "masonry" && (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 lg:gap-10 space-y-8 lg:space-y-10 animate-in fade-in-0 duration-500">
                            {products.map((product, index) => (
                                <div
                                    key={product._id}
                                    className={cn(
                                        "break-inside-avoid",
                                        isFeaturedProduct(index) && "lg:scale-[1.02] origin-top"
                                    )}
                                >
                                    <ProductCard
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
                                        variant={isFeaturedProduct(index) ? "featured" : "default"}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* List View - Horizontal Cards */}
                    {viewMode === "list" && (
                        <div className="flex flex-col gap-6 animate-in fade-in-0 duration-500">
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
                                    variant="horizontal"
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <LayoutGrid size={32} className="text-neutral-400" />
                    </div>
                    <p className="text-lg font-display text-neutral-600 mb-2">No products found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
            )}
        </div>
    );
};

export default CollectionGrid;
