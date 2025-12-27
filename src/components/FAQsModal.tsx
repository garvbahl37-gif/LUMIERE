import { useState } from "react";
import { X, ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const faqs = [
    {
        category: "Orders & Payments",
        questions: [
            {
                q: "How do I place an order?",
                a: "Simply browse our collection, add items to your bag, and proceed to checkout. You can pay using credit/debit cards, UPI, net banking, or cash on delivery."
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards (Visa, Mastercard, American Express), UPI, net banking, wallets (PayTM, PhonePe), and Cash on Delivery for eligible orders."
            },
            {
                q: "Can I modify or cancel my order?",
                a: "You can modify or cancel your order within 1 hour of placing it. After that, please contact our support team for assistance."
            },
        ]
    },
    {
        category: "Shipping & Delivery",
        questions: [
            {
                q: "How long does shipping take?",
                a: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Delivery times may vary for remote locations."
            },
            {
                q: "Do you offer free shipping?",
                a: "Yes! We offer free standard shipping on all orders above ₹2,999. Express shipping is available at a flat rate of ₹299."
            },
            {
                q: "Can I track my order?",
                a: "Absolutely! Once your order ships, you'll receive a tracking link via email and SMS. You can also track your order from the Orders section in your account."
            },
        ]
    },
    {
        category: "Returns & Refunds",
        questions: [
            {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for all unworn items with original tags attached. Items must be in their original packaging."
            },
            {
                q: "How do I initiate a return?",
                a: "Log in to your account, go to Orders, select the item you wish to return, and follow the instructions to generate a return label."
            },
            {
                q: "When will I receive my refund?",
                a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method."
            },
        ]
    },
    {
        category: "Product Care",
        questions: [
            {
                q: "How should I care for my jewelry?",
                a: "Store jewelry in a cool, dry place away from direct sunlight. Avoid contact with water, perfumes, and lotions. Clean gently with a soft cloth."
            },
            {
                q: "How do I clean leather products?",
                a: "Use a soft, dry cloth for regular cleaning. For deeper cleaning, use a leather-specific cleaner. Avoid excessive water and store in dust bags."
            },
        ]
    },
];

const FAQsModal = ({ isOpen, onClose }: FAQsModalProps) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

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
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <HelpCircle className="text-accent" size={20} />
                            </div>
                            <h2 className="font-display text-xl tracking-tight">Frequently Asked Questions</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {faqs.map((category, catIndex) => (
                            <section key={catIndex}>
                                <h3 className="font-display text-sm uppercase tracking-wider text-accent mb-3">
                                    {category.category}
                                </h3>
                                <div className="space-y-2">
                                    {category.questions.map((faq, qIndex) => {
                                        const itemId = `${catIndex}-${qIndex}`;
                                        const isOpen = openItems.includes(itemId);

                                        return (
                                            <div
                                                key={qIndex}
                                                className="border border-border rounded-xl overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleItem(itemId)}
                                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
                                                >
                                                    <span className="font-medium text-sm pr-4">{faq.q}</span>
                                                    <ChevronDown
                                                        size={18}
                                                        className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-4 pb-4 pt-0">
                                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                                    {faq.a}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}

                        {/* Contact */}
                        <div className="text-center pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Still have questions?{" "}
                                <a href="mailto:support@lumiere.com" className="text-accent hover:underline">
                                    Contact our support team
                                </a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default FAQsModal;
