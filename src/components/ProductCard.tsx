import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Check, Plus } from "lucide-react";
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
}

const ProductCard = ({
  id,
  image,
  name,
  price,
  compareAtPrice,
  category,
  isNew,
  index = 0
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

  return (
    <article
      className="group relative animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={productLink} className="block relative aspect-[3/4] overflow-hidden bg-secondary/10 mb-5 cursor-pointer">
        {/* Shimmer Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary/10 animate-pulse" />
        )}

        {/* Product Image */}
        <img
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform ${isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Minimal Overlay - Only darkens slightly for text contrast if needed */}
        <div className={`absolute inset-0 bg-black/0 transition-colors duration-300 ${isHovered ? 'bg-black/5' : ''}`} />

        {/* Badges - Sharp & Minimal */}
        <div className="absolute top-0 left-0 p-3 flex flex-col gap-2 z-10">
          {isNew && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-[0.15em] font-medium text-charcoal border border-black/5">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-500/90 backdrop-blur-sm text-white px-2 py-1 text-[10px] uppercase tracking-[0.15em] font-medium">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Icon - Minimal */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-0 right-0 p-3 z-10 transition-all duration-300 ${isHovered || isLiked ? "opacity-100" : "opacity-0"
            }`}
          aria-label="Wishlist"
        >
          <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-white text-rose-500 shadow-sm' : 'bg-white/50 text-charcoal hover:bg-white'}`}>
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </div>
        </button>

        {/* Add to Cart - Slide Up Bar (Optimized) */}
        <div className={`absolute inset-x-0 bottom-0 z-10 transition-transform duration-300 ease-out will-change-transform ${isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}>
          <Button
            onClick={handleAddToCart}
            disabled={!id}
            className="w-full h-12 rounded-none bg-white text-charcoal hover:bg-charcoal hover:text-white border-t border-black/5 transition-colors duration-200 uppercase tracking-widest text-xs font-medium space-x-2"
          >
            {isAdded ? (
              <>
                <Check size={14} />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Add to Bag</span>
              </>
            )}
          </Button>
        </div>
      </Link>

      {/* Product Information - Centered & Editorial */}
      <div className="text-center space-y-2 px-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80 font-medium">
          {category}
        </p>

        <h3 className="font-display text-lg tracking-wide text-charcoal group-hover:text-accent transition-colors duration-300">
          <Link to={productLink} className="line-clamp-1">
            {name}
          </Link>
        </h3>

        <div className="flex items-center justify-center gap-3 text-sm font-medium">
          <span className="text-charcoal">${price.toLocaleString()}</span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-muted-foreground/60 line-through text-xs font-normal">
              ${compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
