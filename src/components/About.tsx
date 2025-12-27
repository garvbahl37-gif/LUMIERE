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
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image - High Quality 4K Luxury Fashion Image */}
                    <div className="relative">
                        <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-lifted">
                            <img
                                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=90"
                                alt="Lumière luxury fashion collection"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 -z-10" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent/30 -z-10" />
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                                Our Story
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                                Curated for the
                                <span className="italic block mt-2">Modern Woman</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-muted-foreground">
                            <p className="text-lg leading-relaxed">
                                At Lumière, we believe luxury is not about excess—it's about intention.
                                Each piece in our collection is carefully selected to embody timeless
                                elegance and exceptional craftsmanship.
                            </p>
                            <p className="leading-relaxed">
                                Founded with a vision to make refined luxury accessible, we partner
                                with the world's most prestigious ateliers to bring you accessories
                                that transcend seasons and trends. From Italian leather handbags to
                                artisanal jewelry, every item tells a story of heritage and artistry.
                            </p>
                            <p className="leading-relaxed">
                                Our commitment extends beyond beautiful products. We embrace sustainable
                                practices, ethical sourcing, and a dedication to quality that ensures
                                your Lumière pieces become treasured companions for years to come.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                            <div>
                                <p className="font-display text-3xl lg:text-4xl text-foreground">15+</p>
                                <p className="text-sm text-muted-foreground mt-1">Years of Excellence</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl lg:text-4xl text-foreground">50+</p>
                                <p className="text-sm text-muted-foreground mt-1">Global Artisans</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl lg:text-4xl text-foreground">100%</p>
                                <p className="text-sm text-muted-foreground mt-1">Ethically Sourced</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
