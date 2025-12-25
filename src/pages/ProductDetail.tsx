import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

// Mock product data - in a real app this would come from an API
const products = [
  {
    id: "1",
    name: "Silk Blend Cardigan",
    price: 185,
    category: "Knitwear",
    images: [product1, product2, product3, product4],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Luxuriously soft silk blend cardigan crafted from the finest materials. Features a relaxed silhouette with mother-of-pearl buttons and ribbed trim details. Perfect for layering in transitional seasons.",
    details: [
      "70% Silk, 30% Cashmere",
      "Mother-of-pearl buttons",
      "Relaxed fit",
      "Dry clean only",
      "Made in Italy"
    ],
    isNew: true,
  },
  {
    id: "2",
    name: "Cashmere Turtleneck",
    price: 245,
    category: "Knitwear",
    images: [product2, product1, product3, product4],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A timeless turtleneck in pure cashmere. This essential piece offers unparalleled warmth and sophistication for the colder months.",
    details: [
      "100% Cashmere",
      "Ribbed neckline and cuffs",
      "Regular fit",
      "Hand wash cold",
      "Made in Scotland"
    ],
    isNew: false,
  },
  {
    id: "3",
    name: "Linen Wrap Dress",
    price: 320,
    category: "Dresses",
    images: [product3, product1, product2, product4],
    sizes: ["XS", "S", "M", "L"],
    description: "An elegant wrap dress in premium linen. Features a flattering silhouette with a self-tie waist and subtle side pockets.",
    details: [
      "100% European Linen",
      "Self-tie waist",
      "Hidden side pockets",
      "Machine wash gentle",
      "Made in Portugal"
    ],
    isNew: true,
  },
  {
    id: "4",
    name: "Merino Wool Coat",
    price: 495,
    category: "Outerwear",
    images: [product4, product1, product2, product3],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A statement coat in double-faced merino wool. Minimalist design with hidden buttons and a slightly oversized fit for effortless layering.",
    details: [
      "100% Merino Wool",
      "Fully lined",
      "Hidden button closure",
      "Dry clean only",
      "Made in Italy"
    ],
    isNew: false,
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const product = products.find((p) => p.id === id) || products[0];
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) x ${quantity} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <nav className="container-padding py-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-smooth">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/" className="hover:text-foreground transition-smooth">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="container-padding py-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary rounded-sm">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-smooth"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-smooth"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                {/* New Badge */}
                {product.isNew && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-wider font-medium">
                    New
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-sm transition-smooth ${
                      selectedImage === index
                        ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {product.category}
                </p>
                <h1 className="font-display text-3xl md:text-4xl">{product.name}</h1>
                <p className="font-display text-2xl text-accent">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Select Size
                  </span>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-sm border text-sm font-medium transition-smooth ${
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-smooth"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-smooth"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-12 h-12 rounded-sm border flex items-center justify-center transition-smooth ${
                      isLiked
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  variant="default"
                  size="lg"
                  className="w-full h-14 text-base"
                >
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Product Details */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-medium uppercase tracking-wider">
                  Product Details
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.details.map((detail, index) => (
                    <li key={index}>• {detail}</li>
                  ))}
                </ul>
              </div>

              {/* Shipping & Returns */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center space-y-2">
                  <Truck size={24} className="mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center space-y-2">
                  <Shield size={24} className="mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">2 Year Warranty</p>
                </div>
                <div className="text-center space-y-2">
                  <RotateCcw size={24} className="mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">30 Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="container-padding py-16 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl">You May Also Like</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                <ProductCard
                  image={relatedProduct.images[0]}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  category={relatedProduct.category}
                  isNew={relatedProduct.isNew}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
