import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { productService, Product } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Minus, Plus, ShoppingBag, Star, Heart, Share2, ChevronLeft, Truck, RotateCcw, Shield, Package } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showStickyBar, setShowStickyBar] = useState(false);


    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyBar(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchProduct = async () => {
        if (!id) return;

        setIsLoading(true);
        try {
            const response = await productService.getProduct(id);
            if (response.success) {
                setProduct(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
            toast.error("Product not found");
            navigate("/shop");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;
        await addToCart(product._id, quantity);
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: product?.name,
                text: product?.description,
                url: window.location.href,
            });
        } catch {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-20">
                    <div className="container mx-auto px-4 py-8 lg:py-16">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div className="aspect-square bg-secondary/50 rounded-2xl animate-pulse" />
                            <div className="space-y-4">
                                <div className="h-6 bg-secondary/50 rounded-lg w-1/3 animate-pulse" />
                                <div className="h-10 bg-secondary/50 rounded-lg w-3/4 animate-pulse" />
                                <div className="h-6 bg-secondary/50 rounded-lg w-1/4 animate-pulse" />
                                <div className="h-24 bg-secondary/50 rounded-lg animate-pulse" />
                                <div className="h-14 bg-secondary/50 rounded-xl animate-pulse" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-20">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <h1 className="text-2xl font-display mb-4">Product not found</h1>
                        <Link to="/shop">
                            <Button variant="outline">Back to Shop</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const images = product.images.length > 0 ? product.images : [product.image];
    const discount = product.compareAtPrice > product.price
        ? Math.round((1 - product.price / product.compareAtPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-16 lg:pt-20 pb-24 lg:pb-0">
                <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8">
                    {/* Mobile Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 -ml-1"
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>

                    {/* Desktop Breadcrumb */}
                    <nav className="hidden lg:block mb-8">
                        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
                            <li>/</li>
                            <li><Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link></li>
                            <li>/</li>
                            <li className="text-foreground truncate max-w-[200px]">{product.name}</li>
                        </ol>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
                        {/* Images */}
                        <div className="space-y-3 lg:space-y-4">
                            {/* Main Image */}
                            <motion.div
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="aspect-square overflow-hidden rounded-2xl bg-secondary/30"
                            >
                                <img
                                    src={images[selectedImage].startsWith('/') ? `http://localhost:5173${images[selectedImage]}` : images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Thumbnail Gallery */}
                            {images.length > 1 && (
                                <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden rounded-xl border-2 transition-all ${selectedImage === index
                                                ? 'border-accent ring-2 ring-accent/20'
                                                : 'border-transparent hover:border-border'
                                                }`}
                                        >
                                            <img
                                                src={img.startsWith('/') ? `http://localhost:5173${img}` : img}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <div className="space-y-5 lg:space-y-6">
                                {/* Category & Badges */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                                        {product.categoryName}
                                    </span>
                                    {product.isNew && (
                                        <span className="text-[10px] uppercase tracking-widest bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-semibold">
                                            New
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="text-[10px] uppercase tracking-widest bg-red-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                            -{discount}% OFF
                                        </span>
                                    )}
                                </div>

                                {/* Name */}
                                <h1 className="font-display text-2xl lg:text-4xl leading-tight">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < Math.floor(product.rating)
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-muted-foreground/30'
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {product.rating.toFixed(1)} · {product.numReviews} reviews
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl lg:text-4xl font-display">${product.price.toLocaleString()}</span>
                                    {product.compareAtPrice > product.price && (
                                        <span className="text-lg text-muted-foreground line-through">
                                            ${product.compareAtPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                                    {product.description}
                                </p>

                                {/* Stock Status */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${product.stock > 5
                                    ? 'bg-green-500/10 text-green-600'
                                    : product.stock > 0
                                        ? 'bg-amber-500/10 text-amber-600'
                                        : 'bg-red-500/10 text-red-600'
                                    }`}>
                                    <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
                                        }`} />
                                    {product.stock > 5
                                        ? `${product.stock} in stock`
                                        : product.stock > 0
                                            ? `Only ${product.stock} left!`
                                            : 'Out of stock'
                                    }
                                </div>

                                {/* Quantity Selector - Desktop */}
                                <div className="hidden lg:flex items-center gap-4">
                                    <span className="text-sm font-medium">Quantity</span>
                                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                                        <button
                                            onClick={decrementQuantity}
                                            className="p-3 hover:bg-secondary transition-colors disabled:opacity-50"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-14 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={incrementQuantity}
                                            className="p-3 hover:bg-secondary transition-colors disabled:opacity-50"
                                            disabled={quantity >= product.stock}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Actions - Desktop */}
                                <div className="hidden lg:flex gap-3">
                                    <Button
                                        size="lg"
                                        className="flex-1 h-14 rounded-xl text-base font-medium"
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                    >
                                        <ShoppingBag size={20} className="mr-2" />
                                        Add to Bag
                                    </Button>
                                    <Button
                                        variant={isInWishlist(product._id) ? "default" : "outline"}
                                        size="icon"
                                        className="w-14 h-14 rounded-xl"
                                        onClick={() => {
                                            if (isInWishlist(product._id)) {
                                                removeFromWishlist(product._id);
                                            } else {
                                                addToWishlist(product._id);
                                            }
                                        }}
                                    >
                                        <Heart size={20} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-14 h-14 rounded-xl"
                                        onClick={handleShare}
                                    >
                                        <Share2 size={20} />
                                    </Button>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                                        <Truck size={18} className="text-accent" />
                                        <span className="text-xs font-medium">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                                        <RotateCcw size={18} className="text-accent" />
                                        <span className="text-xs font-medium">30-Day Returns</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                                        <Shield size={18} className="text-accent" />
                                        <span className="text-xs font-medium">Secure Payment</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                                        <Package size={18} className="text-accent" />
                                        <span className="text-xs font-medium">Premium Quality</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                {product.tags.length > 0 && (
                                    <div className="pt-4 border-t border-border">
                                        <span className="text-xs font-medium text-muted-foreground mr-3">Tags:</span>
                                        <div className="inline-flex flex-wrap gap-2 mt-2">
                                            {product.tags.map((tag) => (
                                                <Link
                                                    key={tag}
                                                    to={`/shop?search=${tag}`}
                                                    className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                                                >
                                                    {tag}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Sticky Bottom Bar */}
            <AnimatePresence>
                {showStickyBar && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-4 z-50"
                    >
                        <div className="flex items-center gap-3">
                            {/* Quantity */}
                            <div className="flex items-center border border-border rounded-xl overflow-hidden">
                                <button
                                    onClick={decrementQuantity}
                                    className="p-2.5 hover:bg-secondary transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="p-2.5 hover:bg-secondary transition-colors"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <Button
                                className="flex-1 h-12 rounded-xl font-medium text-sm px-2"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                <ShoppingBag size={16} className="mr-1.5" />
                                <span className="truncate">Add · ${(product.price * quantity).toLocaleString()}</span>
                            </Button>

                            {/* Wishlist */}
                            <Button
                                variant={isInWishlist(product._id) ? "default" : "outline"}
                                size="icon"
                                className="w-12 h-12 rounded-xl flex-shrink-0"
                                onClick={() => {
                                    if (isInWishlist(product._id)) {
                                        removeFromWishlist(product._id);
                                    } else {
                                        addToWishlist(product._id);
                                    }
                                }}
                            >
                                <Heart size={18} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <Footer />
        </div >
    );
};

export default ProductDetail;
