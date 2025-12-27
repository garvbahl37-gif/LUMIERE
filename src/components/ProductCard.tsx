import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Check, Plus, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  isNew?: boolean;
  rating?: number;
  numReviews?: number;
  index?: number;
  variant?: "default" | "featured" | "horizontal";
}

const ProductCard = ({
  id,
  image,
  name,
  price,
  compareAtPrice,
  category,
  isNew,
  rating = 4.5,
  index = 0,
  variant = "default"
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isLiked = id ? isInWishlist(id) : false;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (id) {
      await addToCart(id, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    if (isLiked) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const productLink = id ? `/product/${id}` : "#";
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round((1 - price / compareAtPrice) * 100)
    : 0;

  // Horizontal variant - List view card
  if (variant === "horizontal") {
    return (
      <article
        className="group relative animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-white transition-all duration-500 ${isHovered ? 'shadow-premium ring-1 ring-[hsl(45_85%_50%/0.2)]' : 'shadow-soft'
          }`}>
          {/* Image */}
          <Link to={productLink} className="relative w-full sm:w-56 aspect-square sm:aspect-[4/5] flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-secondary/5 to-secondary/20">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-[hsl(45_75%_65%/0.1)] to-secondary/10 animate-shimmer" />
            )}
            <img
              src={image}
              alt={name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'
                } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
              {isNew && (
                <span className="bg-gradient-to-r from-[hsl(45_85%_50%)] to-[hsl(40_80%_55%)] text-white px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] font-semibold shadow-sm">
                  New
                </span>
              )}
              {discount > 0 && (
                <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] font-semibold shadow-sm">
                  -{discount}%
                </span>
              )}
            </div>
          </Link>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[hsl(45_85%_50%)] font-semibold">
                {category}
              </p>
              <h3 className="font-display text-xl tracking-wide text-charcoal leading-snug group-hover:text-[hsl(45_85%_45%)] transition-colors">
                <Link to={productLink} className="line-clamp-2">
                  {name}
                </Link>
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${i < Math.floor(rating)
                        ? 'text-[hsl(45_85%_50%)] fill-[hsl(45_85%_50%)]'
                        : 'text-border'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({rating.toFixed(1)})</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-charcoal">
                  ${price.toLocaleString()}
                </span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className="text-base text-muted-foreground/60 line-through">
                    ${compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2.5 rounded-full transition-all duration-300 ${isLiked
                      ? 'bg-[hsl(45_85%_50%)] text-white shadow-gold-glow'
                      : 'bg-neutral-100 text-charcoal hover:bg-[hsl(45_85%_50%)] hover:text-white'
                    }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2} />
                </button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!id}
                  className="h-11 px-6 rounded-md bg-gradient-to-r from-[hsl(45_85%_50%)] to-[hsl(40_80%_55%)] hover:from-[hsl(45_90%_45%)] hover:to-[hsl(40_85%_50%)] text-white border-0 shadow-md transition-all duration-300 uppercase tracking-wider text-xs font-semibold"
                >
                  {isAdded ? (
                    <>
                      <Check size={15} className="mr-2" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} className="mr-2" />
                      Add to Bag
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default and Featured variants
  const isFeatured = variant === "featured";

  return (
    <article
      className="group relative animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with Golden Border on Hover */}
      <div className={`relative rounded-sm overflow-hidden transition-all duration-500 ${isHovered
        ? 'shadow-premium ring-1 ring-[hsl(45_85%_50%/0.3)]'
        : 'shadow-soft'
        }`}>

        {/* Image Container */}
        <Link to={productLink} className="block relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-secondary/5 to-secondary/20 cursor-pointer">
          {/* Shimmer Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-[hsl(45_75%_65%/0.1)] to-secondary/10 animate-shimmer" />
          )}

          {/* Product Image */}
          <img
            src={image}
            alt={name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${isHovered ? 'scale-110' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Luxury Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`} />

          {/* Golden Shimmer Effect on Hover */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(45_85%_50%/0.1)] to-transparent animate-golden-shimmer" />
          </div>

          {/* Badges - Premium Gold Theme */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isNew && (
              <span className="bg-gradient-to-r from-[hsl(45_85%_50%)] to-[hsl(40_80%_55%)] text-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold shadow-md">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold shadow-md">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button - Premium Styling */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 z-10 transition-all duration-300 ${isHovered || isLiked ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
              }`}
            aria-label="Wishlist"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isLiked
              ? 'bg-[hsl(45_85%_50%)] text-white shadow-gold-glow'
              : 'bg-white/80 text-charcoal hover:bg-[hsl(45_85%_50%)] hover:text-white'
              }`}>
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2} />
            </div>
          </button>

          {/* Quick Add Button - Slide Up */}
          <div className={`absolute inset-x-3 bottom-3 z-10 transition-all duration-400 ease-out will-change-transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            <Button
              onClick={handleAddToCart}
              disabled={!id}
              className="w-full h-11 rounded-sm bg-gradient-to-r from-[hsl(45_85%_50%)] to-[hsl(40_80%_55%)] hover:from-[hsl(45_90%_45%)] hover:to-[hsl(40_85%_50%)] text-white border-0 shadow-lg transition-all duration-300 uppercase tracking-[0.15em] text-xs font-semibold group/btn"
            >
              {isAdded ? (
                <>
                  <Check size={15} className="mr-2" />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={15} className="mr-2 group-hover/btn:scale-110 transition-transform" />
                  Add to Bag
                </>
              )}
            </Button>
          </div>
        </Link>
      </div>

      {/* Product Information - Premium Typography */}
      <div className="pt-4 pb-2 space-y-2">
        {/* Category */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-[hsl(45_85%_50%)] font-semibold">
          {category}
        </p>

        {/* Product Name */}
        <h3 className="font-display text-base tracking-wide text-charcoal leading-tight group-hover:text-[hsl(45_85%_45%)] transition-colors duration-300">
          <Link to={productLink} className="line-clamp-1">
            {name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${i < Math.floor(rating)
                  ? 'text-[hsl(45_85%_50%)] fill-[hsl(45_85%_50%)]'
                  : 'text-border'
                  }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-lg font-semibold text-charcoal">
            ${price.toLocaleString()}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-muted-foreground/60 line-through">
              ${compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
