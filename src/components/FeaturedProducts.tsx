import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: "1",
    image: product1,
    name: "Ceramic Vase Collection",
    price: 89,
    category: "Home",
    isNew: true,
  },
  {
    id: "2",
    image: product2,
    name: "Artisan Soy Candle",
    price: 48,
    category: "Home",
    isNew: false,
  },
  {
    id: "3",
    image: product3,
    name: "Linen Throw Blanket",
    price: 145,
    category: "Textiles",
    isNew: true,
  },
  {
    id: "4",
    image: product4,
    name: "Botanical Face Serum",
    price: 68,
    category: "Beauty",
    isNew: false,
  },
];

const FeaturedProducts = () => {
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
          <a
            href="#"
            className="text-sm uppercase tracking-wider text-foreground hover:text-accent transition-smooth underline underline-offset-4 animate-fade-up opacity-0 animation-delay-200"
          >
            View All Products
          </a>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${(index + 1) * 100 + 200}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
