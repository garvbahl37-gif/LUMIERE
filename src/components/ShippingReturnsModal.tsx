import { X, Truck, RotateCcw, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShippingReturnsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShippingReturnsModal = ({ isOpen, onClose }: ShippingReturnsModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between z-10">
                        <h2 className="font-display text-xl tracking-tight">Shipping & Returns</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-8">
                        {/* Shipping Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Truck className="text-accent" size={20} />
                                </div>
                                <h3 className="font-display text-lg">Shipping Information</h3>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock size={16} className="text-muted-foreground" />
                                        <span className="font-medium text-sm">Standard Shipping</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                                    <p className="text-sm font-medium text-accent mt-1">Free over ₹2,999</p>
                                </div>

                                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Truck size={16} className="text-muted-foreground" />
                                        <span className="font-medium text-sm">Express Shipping</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                                    <p className="text-sm font-medium mt-1">₹299</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-accent mt-0.5" />
                                    <div>
                                        <p className="font-medium text-sm mb-1">Delivery Locations</p>
                                        <p className="text-sm text-muted-foreground">
                                            We deliver across India to all major cities and towns.
                                            Remote areas may take additional 2-3 days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Returns Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <RotateCcw className="text-accent" size={20} />
                                </div>
                                <h3 className="font-display text-lg">Returns & Exchanges</h3>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "30-day return window for all unworn items",
                                    "Free returns on all orders over ₹1,999",
                                    "Original tags must be attached",
                                    "Items must be in original packaging",
                                    "Refund processed within 5-7 business days",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                                        <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border">
                                <h4 className="font-medium mb-2">How to Return</h4>
                                <ol className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="font-medium text-foreground">1.</span>
                                        Log in to your account and go to Orders
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-medium text-foreground">2.</span>
                                        Select the item you wish to return
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-medium text-foreground">3.</span>
                                        Print the prepaid return label
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-medium text-foreground">4.</span>
                                        Drop off at any courier partner location
                                    </li>
                                </ol>
                            </div>
                        </section>

                        {/* Contact */}
                        <div className="text-center pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Need help? Contact us at{" "}
                                <a href="mailto:support@lumiere.com" className="text-accent hover:underline">
                                    support@lumiere.com
                                </a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ShippingReturnsModal;
