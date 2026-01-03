import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { mockCategories } from "@/data/mockCategories";
import { mockProducts } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";

const Categories = () => {
  // Calculate product count for each category
  const categoriesWithCount = mockCategories.map(cat => ({
    ...cat,
    productCount: mockProducts.filter(p => p.category._id === cat._id).length
  }));

  return (
    <section className="py-24 lg:py-32 relative bg-[#f8f5f2]">
      {/* Subtle Texture Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 lg:mb-24 space-y-4">
          <span className="uppercase tracking-[0.3em] text-[#8c7a6b] text-xs font-semibold">
            Curated Collections
          </span>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-[#2c2c2c]">
            Discover Your <span className="italic font-serif text-[#d4a574]">Signature</span>
          </h2>
          <div className="w-20 h-px bg-[#d4a574]/40 mt-4"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 auto-rows-[300px] lg:auto-rows-[320px] gap-4 lg:gap-6">
          {categoriesWithCount.map((category, index) => {
            // Define span classes for Bento layout
            // Items: Handbags, Jewelry, Shoes, Dresses, Accessories, Men's Watches, Men's Bags, Men's Shoes, Men's Suits, Men's Accessories, Fragrances
            // We want varied sizes.
            // Desktop (4 cols):
            // 0 (Handbags): 2 cols, 2 rows
            // 1 (Jewelry): 1 col, 1 row
            // 2 (Shoes): 1 col, 1 row
            // ... Fragrances (10) needs to be special

            let spanClass = "md:col-span-2 lg:col-span-1 lg:row-span-1";

            // Handbags (Index 0) - Large Square
            if (index === 0) spanClass = "md:col-span-3 lg:col-span-2 lg:row-span-2";
            // Fragrances (Last) - Large Horizontal? Or Vertical?
            else if (category.slug === 'fragrances') spanClass = "md:col-span-3 lg:col-span-2 lg:row-span-1";
            // Men's Suits (Index 8) - Vertical
            else if (index === 8) spanClass = "md:col-span-2 lg:col-span-1 lg:row-span-2";
            // Dresses (Index 3) - Standard
            else if (index === 3) spanClass = "md:col-span-2 lg:col-span-1 lg:row-span-1";


            return (
              <Link
                key={category._id}
                to={`/shop?category=${category.slug}`}
                className={`group relative block overflow-hidden rounded-none ${spanClass}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                  />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Interactive Border */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 m-4 z-20 pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-30">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80 text-xs uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 transform -translate-y-2 group-hover:translate-y-0">
                        {category.productCount} Products
                      </span>
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm font-light line-clamp-2 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop">
            <Button variant="outline" className="w-full py-6 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-white uppercase tracking-widest">
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
