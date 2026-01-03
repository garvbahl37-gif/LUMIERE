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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
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
                // Fetch similar products
                const similarResponse = await productService.getSimilarProducts(id);
                if (similarResponse.success) {
                    setSimilarProducts(similarResponse.data);
                }
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
                                    src={images[selectedImage]}
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
                                                src={img}
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
                            <motion.div
                                className="space-y-5 lg:space-y-6"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Category & Badges */}
                                <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap mb-2">
                                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                                        {product.categoryName}
                                    </span>
                                    {product.isNew && (
                                        <span className="text-[10px] uppercase tracking-widest bg-neutral-900 text-white px-2 py-0.5 rounded-sm font-medium">
                                            New Arrival
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="text-[10px] uppercase tracking-widest bg-rose-500 text-white px-2 py-0.5 rounded-sm font-medium">
                                            Save {discount}%
                                        </span>
                                    )}
                                </motion.div>

                                {/* Name */}
                                <motion.h1 variants={fadeInUp} className="font-display text-3xl lg:text-5xl text-neutral-900 leading-[1.1] mb-2">
                                    {product.name}
                                </motion.h1>

                                {/* Rating */}
                                <motion.div variants={fadeInUp} className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={i < Math.floor(product.rating)
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-neutral-200'
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="text-neutral-500 border-b border-neutral-200 pb-0.5">
                                        {product.rating.toFixed(1)} <span className="mx-1">·</span> {product.numReviews} reviews
                                    </span>
                                </motion.div>

                                {/* Price */}
                                <motion.div variants={fadeInUp} className="flex items-baseline gap-4 py-4 border-b border-neutral-100">
                                    <span className="text-4xl lg:text-5xl font-light text-neutral-900 font-display">
                                        ${product.price.toLocaleString()}
                                    </span>
                                    {product.compareAtPrice > product.price && (
                                        <div className="flex flex-col items-start">
                                            <span className="text-lg text-neutral-400 line-through decoration-neutral-300">
                                                ${product.compareAtPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Description */}
                                <motion.p variants={fadeInUp} className="text-neutral-600 leading-relaxed text-base font-light max-w-xl">
                                    {product.description}
                                </motion.p>

                                {/* Stock Status */}
                                <motion.div variants={fadeInUp} className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'
                                        }`} />
                                    <span className="text-sm font-medium text-neutral-600">
                                        {product.stock > 5
                                            ? 'In stock and ready to ship'
                                            : product.stock > 0
                                                ? `Low stock - Only ${product.stock} left`
                                                : 'Currently unavailable'}
                                    </span>
                                </motion.div>

                                {/* Quantity & Actions */}
                                <motion.div variants={fadeInUp} className="space-y-6 pt-6 border-t border-neutral-100">
                                    <div className="flex items-center justify-between max-w-sm">
                                        <span className="text-sm font-medium text-neutral-900 uppercase tracking-widest">Quantity</span>
                                        <div className="flex items-center border border-neutral-200 rounded-lg">
                                            <button
                                                onClick={decrementQuantity}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors disabled:opacity-50 text-neutral-600"
                                                disabled={quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-12 text-center font-medium text-neutral-900">{quantity}</span>
                                            <button
                                                onClick={incrementQuantity}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors disabled:opacity-50 text-neutral-600"
                                                disabled={quantity >= product.stock}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            size="lg"
                                            className="flex-1 h-14 rounded-none bg-neutral-900 hover:bg-neutral-800 text-white text-sm uppercase tracking-[0.1em] transition-all duration-300"
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                        >
                                            <ShoppingBag size={18} className="mr-3" />
                                            {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-14 h-14 rounded-none border-neutral-200 hover:border-neutral-900 hover:bg-transparent transition-all duration-300"
                                            onClick={() => {
                                                if (isInWishlist(product._id)) {
                                                    removeFromWishlist(product._id);
                                                } else {
                                                    addToWishlist(product._id);
                                                }
                                            }}
                                        >
                                            <Heart size={20} fill={isInWishlist(product._id) ? "currentColor" : "none"} className={isInWishlist(product._id) ? "text-rose-500" : "text-neutral-900"} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-14 h-14 rounded-none border-neutral-200 hover:border-neutral-900 hover:bg-transparent transition-all duration-300"
                                            onClick={handleShare}
                                        >
                                            <Share2 size={20} className="text-neutral-900" />
                                        </Button>
                                    </div>
                                </motion.div>

                                {/* Features */}
                                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-8">
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                        <Truck size={20} className="text-neutral-900 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 mb-1">Free Shipping</h4>
                                            <p className="text-xs text-neutral-500">On all orders over $200</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                        <RotateCcw size={20} className="text-neutral-900 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 mb-1">30-Day Returns</h4>
                                            <p className="text-xs text-neutral-500">Easy returns policy</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                        <Shield size={20} className="text-neutral-900 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 mb-1">Secure Payment</h4>
                                            <p className="text-xs text-neutral-500">Encrypted transactions</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                        <Package size={20} className="text-neutral-900 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 mb-1">Premium Quality</h4>
                                            <p className="text-xs text-neutral-500">Certified authentic</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Product Details Accordion */}
                                <motion.div variants={fadeInUp} className="pt-8">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="description" className="border-neutral-200">
                                            <AccordionTrigger className="font-display text-neutral-900 hover:text-neutral-700 hover:no-underline">
                                                Description
                                            </AccordionTrigger>
                                            <AccordionContent className="text-neutral-600 leading-relaxed font-light">
                                                {product.description}
                                                <p className="mt-4">
                                                    Crafted with attention to detail, this piece matches the modern aesthetic of specialized luxury. Perfect for those who appreciate the finer things.
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="shipping" className="border-neutral-200">
                                            <AccordionTrigger className="font-display text-neutral-900 hover:text-neutral-700 hover:no-underline">
                                                Shipping & Returns
                                            </AccordionTrigger>
                                            <AccordionContent className="text-neutral-600 leading-relaxed font-light">
                                                <p className="mb-2"><strong>Free Standard Shipping:</strong> 3-5 business days.</p>
                                                <p><strong>Express Shipping:</strong> Available at checkout.</p>
                                                <p className="mt-2">Returns accepted within 30 days of delivery. Items must be unworn and in original packaging.</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="care" className="border-b-0 border-neutral-200">
                                            <AccordionTrigger className="font-display text-neutral-900 hover:text-neutral-700 hover:no-underline">
                                                Care Guide
                                            </AccordionTrigger>
                                            <AccordionContent className="text-neutral-600 leading-relaxed font-light">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Keep away from direct sunlight and heat.</li>
                                                    <li>Clean with a soft, dry cloth.</li>
                                                    <li>Store in the provided dust bag when not in use.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </motion.div>

                                {/* Tags */}
                                {product.tags.length > 0 && (
                                    <motion.div variants={fadeInUp} className="pt-4 border-t border-border">
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
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
                {/* Similar Products Section */}
                {similarProducts.length > 0 && (
                    <section className="py-24 border-t border-neutral-100">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">Curated For You</h2>
                                <div className="w-24 h-px bg-neutral-200 mx-auto" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                                {similarProducts.map((product, index) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link to={`/product/${product._id}`} className="block group">
                                            <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 relative">
                                                <img
                                                    src={product.image.startsWith('/') ? `http://localhost:5173${product.image}` : product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {product.isNew && (
                                                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2 py-1">New</span>
                                                )}
                                            </div>
                                            <h3 className="font-display text-lg mb-1">{product.name}</h3>
                                            <p className="text-sm text-neutral-500">${product.price.toLocaleString()}</p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
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
