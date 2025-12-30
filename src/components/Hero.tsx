import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Diamond, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: "women",
      badge: "Women's Collection 2025",
      title: "Redefine",
      subtitle: "Your Radiance",
      description: "Curated luxury for the woman who shines. Each piece tells your story — bold, beautiful, unapologetically you.",
      ctaLink: "/shop?category=handbags",
      ctaText: "Shop Women's",
      bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
      accentFrom: "#b76e79",
      accentTo: "#d4a574",
    },
    {
      id: "men",
      badge: "Men's Collection 2025",
      title: "Define",
      subtitle: "Your Legacy",
      description: "Refined elegance for the modern gentleman. Timeless pieces crafted for those who lead with distinction.",
      ctaLink: "/shop?category=mens-watches",
      ctaText: "Shop Men's",
      bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80",
      accentFrom: "#d4a574",
      accentTo: "#c9a96e",
    },
  ];

  // Handle slide change with smooth transition
  const changeSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === activeSlide) return;
    setIsTransitioning(true);

    // Allow content to fade out, then change slide
    setTimeout(() => {
      setActiveSlide(newIndex);
      // Allow content to fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 400);
  };

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((activeSlide + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeSlide, isTransitioning]);

  const currentSlide = slides[activeSlide];

  const nextSlide = () => changeSlide((activeSlide + 1) % slides.length);
  const prevSlide = () => changeSlide((activeSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images with smooth crossfade transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0"
          style={{
            opacity: index === activeSlide ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: index === activeSlide ? 1 : 0,
          }}
        >
          <img
            src={slide.bgImage}
            alt={`${slide.id} collection`}
            className="w-full h-full object-cover"
            style={{
              transform: index === activeSlide ? 'scale(1.02)' : 'scale(1.08)',
              transition: 'transform 8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/40 to-[#1a1a1a]/70" />
          {/* Golden tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${slide.accentFrom}20 0%, transparent 50%, ${slide.accentTo}20 100%)`
            }}
          />
        </div>
      ))}

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {/* Floating golden orbs */}
        <div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full blur-3xl animate-float"
          style={{
            background: `linear-gradient(135deg, ${currentSlide.accentFrom}30 0%, ${currentSlide.accentTo}20 100%)`,
            transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div
          className="absolute top-1/3 right-[5%] w-80 h-80 rounded-full blur-3xl animate-float animation-delay-200"
          style={{
            animationDuration: '8s',
            background: `linear-gradient(135deg, ${currentSlide.accentTo}25 0%, ${currentSlide.accentFrom}15 100%)`,
            transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div
          className="absolute bottom-20 left-[15%] w-48 h-48 rounded-full blur-2xl animate-float animation-delay-400"
          style={{
            animationDuration: '6s',
            background: `linear-gradient(135deg, #c9a96e20 0%, ${currentSlide.accentFrom}15 100%)`,
            transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Sparkle particles */}
        <div className="absolute top-1/4 left-1/4 text-[#d4a574]/60 animate-pulse" style={{ animationDuration: '2s' }}>
          <Star size={12} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-[#c9a96e]/50 animate-pulse animation-delay-300" style={{ animationDuration: '3s' }}>
          <Diamond size={10} fill="currentColor" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-[#d4a574]/50 animate-pulse animation-delay-500" style={{ animationDuration: '2.5s' }}>
          <Sparkles size={14} />
        </div>

        {/* Elegant line decorations */}
        <div className="absolute top-[15%] left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#d4a574]/40 to-transparent" />
        <div className="absolute top-[85%] right-0 w-40 h-px bg-gradient-to-l from-transparent via-[#c9a96e]/40 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-[#d4a574]/50 transition-all duration-300 group"
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-[#d4a574]/50 transition-all duration-300 group"
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => changeSlide(index)}
            className={`relative h-1 rounded-full transition-all duration-700 ease-out ${index === activeSlide
              ? "w-12 bg-gradient-to-r from-[#d4a574] to-[#c9a96e]"
              : "w-6 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to ${slide.id} collection`}
            disabled={isTransitioning}
          >
            {index === activeSlide && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4a574] to-[#c9a96e] animate-pulse opacity-50" />
            )}
          </button>
        ))}
      </div>

      {/* Content with smooth crossfade transitions */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated badge - smooth transition */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4a574]/30 mb-8 shadow-lg shadow-[#d4a574]/10"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Sparkles size={14} className="text-[#d4a574]" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-medium">
              {currentSlide.badge}
            </span>
            <Sparkles size={14} className="text-[#d4a574]" />
          </div>

          {/* Main heading with smooth transition */}
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-8"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.05s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.05s',
            }}
          >
            <span className="block text-white drop-shadow-lg">{currentSlide.title}</span>
            <span className="relative block mt-3">
              {/* Golden gradient text with glow */}
              <span
                className="bg-clip-text text-transparent italic drop-shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${currentSlide.accentFrom}, ${currentSlide.accentTo}, #c9a96e)`,
                  transition: 'background-image 0.8s ease',
                }}
              >
                {currentSlide.subtitle}
              </span>
              {/* Underline decoration */}
              <span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5"
                style={{
                  background: `linear-gradient(90deg, transparent, ${currentSlide.accentTo}, transparent)`,
                  transition: 'background 0.8s ease',
                }}
              />
            </span>
          </h1>

          {/* Subheading with smooth transition */}
          <p
            className="text-lg lg:text-xl text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(15px)' : 'translateY(0)',
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            {currentSlide.description}
          </p>

          {/* Premium CTA buttons with smooth transition */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(15px)' : 'translateY(0)',
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }}
          >
            <Link to={currentSlide.ctaLink}>
              <Button
                size="lg"
                className="group relative overflow-hidden text-white border-0 shadow-xl px-10 py-6 text-base font-medium"
                style={{
                  background: `linear-gradient(135deg, ${currentSlide.accentFrom}, ${currentSlide.accentTo})`,
                  boxShadow: `0 20px 40px -10px ${currentSlide.accentFrom}50`,
                  transition: 'background 0.8s ease, box-shadow 0.8s ease',
                }}
              >
                <span className="relative z-10 flex items-center">
                  {currentSlide.ctaText}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
            <Link to="/shop">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-[#d4a574] backdrop-blur-sm px-10 py-6 text-base font-medium transition-all duration-300"
              >
                View All Collections
              </Button>
            </Link>
          </div>

          {/* Feature badges with glassmorphism - smooth transition */}
          <div
            className="mt-20 flex flex-wrap items-center justify-center gap-4 lg:gap-6"
            style={{
              opacity: isTransitioning ? 0.7 : 1,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {[
              { label: "Free Shipping", sublabel: "Orders $500+", icon: "✦" },
              { label: "Authentic Luxury", sublabel: "100% Genuine", icon: "◇" },
              { label: "Easy Returns", sublabel: "30 Day Policy", icon: "✧" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1a1a1a]/50 backdrop-blur-md border border-white/10 hover:border-[#d4a574]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4a574]/10"
              >
                <span className="text-[#d4a574] text-lg">{feature.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{feature.label}</p>
                  <p className="text-xs text-white/60">{feature.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom golden accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent z-10" />
    </section>
  );
};

export default Hero;
