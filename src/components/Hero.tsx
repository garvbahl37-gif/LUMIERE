import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Elegant lifestyle collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm lg:text-base uppercase tracking-[0.3em] text-muted-foreground mb-6 animate-fade-up opacity-0">
            Winter Collection 2025
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-8 animate-fade-up opacity-0 animation-delay-100">
            Curated for the
            <span className="italic block mt-2">Quiet Luxury</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-up opacity-0 animation-delay-200">
            Timeless pieces crafted with intention. Discover our collection of elevated essentials for modern living.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 animation-delay-300">
            <Button variant="hero" size="lg" className="group">
              Explore Collection
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
            <Button variant="outline" size="lg">
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 animation-delay-500">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
