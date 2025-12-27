import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { mockCategories } from "@/data/mockCategories";
import { mockProducts } from "@/data/mockProducts";

const Categories = () => {
  // Calculate product count for each category
  const categoriesWithCount = mockCategories.map(cat => ({
    ...cat,
    productCount: mockProducts.filter(p => p.category._id === cat._id).length
  }));

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Shop by Category
          </p>
          <h2 className="font-display text-3xl lg:text-5xl">
            Discover Your Style
          </h2>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categoriesWithCount.map((category, index) => (
            <Link
              key={category._id}
              to={`/shop?category=${category.slug}`}
              className="group relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-sm animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-primary-foreground">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary-foreground/70 mb-2">
                      {category.productCount} products
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-primary-foreground/80">
                      {category.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center group-hover:bg-primary-foreground group-hover:text-charcoal transition-smooth">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
