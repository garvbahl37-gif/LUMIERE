import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: "Welcome to Lumière",
        description: "You'll receive our curated updates soon.",
      });
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/60 mb-6">
            Join the Community
          </p>
          <h2 className="font-display text-3xl lg:text-5xl mb-6">
            Stay in the Light
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            Subscribe for early access to new collections, exclusive offers, and curated content for mindful living.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 px-6 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/40 transition-smooth"
                required
              />
            </div>
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="h-14 px-8"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check size={18} />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/40 mt-6">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
