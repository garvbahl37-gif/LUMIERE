import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { productService, Product } from "@/services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getFeaturedProducts(8);
        if (response.success) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 animate-fade-up opacity-0">
              Featured
            </p>
            <h2 className="font-display text-3xl lg:text-5xl animate-fade-up opacity-0 animation-delay-100">
              Curated Essentials
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm uppercase tracking-wider text-foreground hover:text-accent transition-smooth underline underline-offset-4 animate-fade-up opacity-0 animation-delay-200"
          >
            View All Products
          </Link>
        </div>

        {/* Product grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${(index + 1) * 100 + 200}ms` }}
              >
                <ProductCard
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  category={product.categoryName}
                  isNew={product.isNew}
                  rating={product.rating}
                  numReviews={product.numReviews}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
