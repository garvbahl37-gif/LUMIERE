import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Diamond, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with stronger overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Elegant luxury collection"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/50 via-[#1a1a1a]/30 to-[#1a1a1a]/60" />
        {/* Rose gold tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b76e79]/20 via-transparent to-[#d4a574]/20" />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating rose gold orbs */}
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#b76e79]/30 to-[#d4a574]/20 blur-3xl animate-float" />
        <div className="absolute top-1/3 right-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-[#d4a574]/25 to-[#b76e79]/15 blur-3xl animate-float animation-delay-200" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-[#c9a96e]/20 to-[#b76e79]/15 blur-2xl animate-float animation-delay-400" style={{ animationDuration: '6s' }} />

        {/* Sparkle particles */}
        <div className="absolute top-1/4 left-1/4 text-[#d4a574]/60 animate-pulse" style={{ animationDuration: '2s' }}>
          <Star size={12} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-[#b76e79]/50 animate-pulse animation-delay-300" style={{ animationDuration: '3s' }}>
          <Diamond size={10} fill="currentColor" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-[#c9a96e]/50 animate-pulse animation-delay-500" style={{ animationDuration: '2.5s' }}>
          <Sparkles size={14} />
        </div>
        <div className="absolute top-1/2 right-1/3 text-[#d4a574]/40 animate-pulse" style={{ animationDuration: '4s' }}>
          <Star size={8} fill="currentColor" />
        </div>

        {/* Elegant line decorations */}
        <div className="absolute top-[15%] left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#b76e79]/40 to-transparent" />
        <div className="absolute top-[85%] right-0 w-40 h-px bg-gradient-to-l from-transparent via-[#d4a574]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a]/60 backdrop-blur-md border border-[#b76e79]/30 mb-8 animate-fade-up opacity-0 shadow-lg shadow-[#b76e79]/10">
            <Sparkles size={14} className="text-[#d4a574]" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-medium">
              Spring Collection 2025
            </span>
            <Sparkles size={14} className="text-[#d4a574]" />
          </div>

          {/* Main heading with creative typography */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-8 animate-fade-up opacity-0 animation-delay-100">
            <span className="block text-white drop-shadow-lg">Redefine</span>
            <span className="relative block mt-3">
              {/* Rose gold gradient text with glow */}
              <span className="bg-gradient-to-r from-[#b76e79] via-[#d4a574] to-[#c9a96e] bg-clip-text text-transparent italic drop-shadow-lg">
                Your Radiance
              </span>
              {/* Underline decoration */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent" />
            </span>
          </h1>

          {/* Subheading with better contrast */}
          <p className="text-lg lg:text-xl text-white/85 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 animation-delay-200 leading-relaxed drop-shadow-md">
            Curated luxury for the woman who shines. Each piece tells your story —
            bold, beautiful, unapologetically you.
          </p>

          {/* Premium CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up opacity-0 animation-delay-300">
            <Link to="/shop">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-[#b76e79] to-[#d4a574] hover:from-[#a65d68] hover:to-[#c99463] text-white border-0 shadow-xl shadow-[#b76e79]/30 hover:shadow-[#b76e79]/50 transition-all duration-500 px-10 py-6 text-base font-medium"
              >
                <span className="relative z-10 flex items-center">
                  Explore Collection
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
            <Link to="/#about">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-[#d4a574] backdrop-blur-sm px-10 py-6 text-base font-medium transition-all duration-300"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Feature badges with glassmorphism */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-4 lg:gap-6 animate-fade-up opacity-0 animation-delay-500">
            {[
              { label: "Free Shipping", sublabel: "Orders $500+", icon: "✦" },
              { label: "Authentic Luxury", sublabel: "100% Genuine", icon: "◇" },
              { label: "Easy Returns", sublabel: "30 Day Policy", icon: "✧" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1a1a1a]/50 backdrop-blur-md border border-white/10 hover:border-[#b76e79]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#b76e79]/10"
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

      {/* Scroll indicator with rose gold accent */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 animation-delay-500">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#d4a574]/60 via-[#b76e79]/30 to-transparent animate-pulse" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Bottom rose gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b76e79]/50 to-transparent" />
    </section>
  );
};

export default Hero;
