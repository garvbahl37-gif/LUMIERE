import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ image, name, price, category, isNew }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary rounded-sm mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* New badge */}
        {isNew && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-wider font-medium">
            New
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
            isLiked
              ? "bg-accent text-accent-foreground"
              : "bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100"
          }`}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>

        {/* Quick add overlay */}
        <div
          className={`absolute inset-x-4 bottom-4 transition-smooth ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button variant="default" className="w-full gap-2">
            <Plus size={16} />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {category}
        </p>
        <h3 className="font-display text-lg group-hover:text-accent transition-smooth">
          <a href="#" className="focus:outline-none focus:underline">
            {name}
          </a>
        </h3>
        <p className="font-body text-base">
          ${price.toFixed(2)}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
