import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();

    // Scroll to about section when navigating with #about hash
    useEffect(() => {
        if (location.hash === "#about") {
            const element = document.getElementById("about");
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
    }, [location]);

    return (
        <section id="about" className="py-24 lg:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Content - Left Side for better flow */}
                    <div className="order-2 lg:order-1 space-y-8 animate-fade-in-up">
                        <div className="space-y-4">
                            <span className="inline-block w-12 h-0.5 bg-rose-400 mb-2"></span>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">
                                Est. 2010
                            </p>
                            <h2 className="font-display text-4xl lg:text-5xl lg:leading-tight text-neutral-900">
                                Curated for the <br />
                                <span className="italic font-light text-rose-900">Modern Connoisseur.</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-neutral-600 font-sans leading-relaxed text-lg">
                            <p>
                                <span className="text-foreground font-semibold">Lumière</span> represents the intersection of timeless elegance and contemporary design. We believe that true luxury lies not in excess, but in the intentional curation of beauty.
                            </p>
                            <p>
                                Each piece in our collection is a testament to the mastery of our artisans. Sourced from the finest ateliers in Milan and Paris, our accessories are crafted to be more than just objects—they are enduring companions for your journey.
                            </p>
                        </div>

                        <div className="flex gap-12 pt-8 border-t border-rose-200/50">
                            <div>
                                <p className="font-display text-3xl text-neutral-900">15<span className="text-rose-400 text-2xl">+</span></p>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Years Heritage</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-neutral-900">50<span className="text-rose-400 text-2xl">+</span></p>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Master Artisans</p>
                            </div>
                        </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl relative z-10">
                            <div className="absolute inset-0 bg-rose-900/10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
                            <img
                                src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop"
                                alt="Lumière Atelier Craftsmanship"
                                className="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-105"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-rose-100/50 -z-10 rounded-full blur-2xl opacity-60" />
                        <div className="absolute -top-6 -right-6 w-full h-full border border-rose-200 z-0" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
