import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

const Wishlist = () => {
    const { items, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = async (productId: string) => {
        await addToCart(productId, 1);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-32 pb-20">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <Heart size={64} className="mx-auto text-muted-foreground mb-6" />
                        <h1 className="font-display text-3xl mb-4">Your Wishlist is Empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Save your favorite items to your wishlist for later.
                        </p>
                        <Link to="/shop">
                            <Button size="lg">
                                Explore Collection
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="font-display text-3xl lg:text-4xl">My Wishlist</h1>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearWishlist}
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                            Clear All
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="group relative bg-secondary/30 rounded-lg overflow-hidden"
                            >
                                {/* Image */}
                                <Link to={`/product/${item.productId}`}>
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </Link>

                                {/* Remove button */}
                                <button
                                    onClick={() => removeFromWishlist(item.productId)}
                                    className="absolute top-3 right-3 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-background transition-smooth"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* Info */}
                                <div className="p-4">
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                        {item.category}
                                    </p>
                                    <Link to={`/product/${item.productId}`}>
                                        <h3 className="font-display text-lg hover:text-accent transition-smooth line-clamp-1">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="font-display text-lg mt-1">
                                        ${item.price.toLocaleString()}
                                    </p>

                                    <Button
                                        size="sm"
                                        className="w-full mt-4"
                                        onClick={() => handleAddToCart(item.productId)}
                                    >
                                        <ShoppingBag size={16} className="mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Wishlist;
