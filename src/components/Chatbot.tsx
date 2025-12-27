import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Bot, User, ShoppingBag, Sparkles, ArrowRight, Heart, TrendingUp, Package, HelpCircle, Truck, RotateCcw, CreditCard, Ruler, Gift, Clock, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";

interface Message {
    id: string;
    type: "user" | "bot";
    content: string;
    products?: typeof mockProducts;
    quickReplies?: string[];
    actions?: { label: string; action: string; icon?: React.ReactNode }[];
}

interface ConversationContext {
    lastCategory?: string;
    lastProductViewed?: string;
    preferences?: {
        priceRange?: { min: number; max: number };
        style?: string[];
        color?: string[];
    };
    conversationHistory: string[];
}

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [context, setContext] = useState<ConversationContext>({ conversationHistory: [] });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const hour = new Date().getHours();
            let greeting = "Hello";
            if (hour < 12) greeting = "Good morning";
            else if (hour < 17) greeting = "Good afternoon";
            else greeting = "Good evening";

            setMessages([
                {
                    id: "welcome",
                    type: "bot",
                    content: `${greeting}! ✨ Welcome to Lumière. I'm your personal shopping assistant. I can help you discover luxury pieces, track orders, find the perfect size, or answer any questions. What would you like to explore today?`,
                    quickReplies: ["🛍️ Shop Now", "🆕 New Arrivals", "💎 Best Sellers", "📦 Track Order", "❓ Help"],
                    actions: [
                        { label: "Browse Collections", action: "browse", icon: <ShoppingBag size={14} /> },
                        { label: "Get Recommendations", action: "recommend", icon: <Sparkles size={14} /> },
                    ]
                }
            ]);
        }
    }, [isOpen, messages.length]);

    // Extended FAQs with more detailed responses
    const FAQs: Record<string, { answer: string; followUp: string[] }> = {
        "shipping": {
            answer: "🚚 **Shipping Options:**\n\n• **Standard** (5-7 days): Free on orders over $500\n• **Express** (2-3 days): $25\n• **Next Day**: $45\n• **International**: 5-10 business days, rates vary\n\nAll orders include complimentary gift packaging!",
            followUp: ["Track my order", "International shipping", "Gift wrapping options"]
        },
        "returns": {
            answer: "↩️ **Return Policy:**\n\n• 30-day easy returns for unworn items\n• Original tags must be attached\n• Free return shipping on all orders\n• Refunds processed within 5-7 business days\n• Exchanges available for size/color\n\nNeed to start a return?",
            followUp: ["Start a return", "Exchange policy", "Contact support"]
        },
        "sizing": {
            answer: "📐 **Sizing Assistance:**\n\n• Detailed size guides on each product page\n• Virtual fitting room available\n• Compare to brands you know\n• Our styling team offers free consultations\n\nWhich category do you need sizing help with?",
            followUp: ["Shoes sizing", "Dress sizing", "Handbag dimensions", "Contact stylist"]
        },
        "payment": {
            answer: "💳 **Payment Options:**\n\n• All major credit cards (Visa, Mastercard, Amex)\n• PayPal & Apple Pay\n• Buy Now, Pay Later (Klarna, Afterpay)\n• Gift cards\n• Secure checkout with SSL encryption",
            followUp: ["Apply gift card", "Klarna info", "Security details"]
        },
        "track order": {
            answer: "📦 **Track Your Order:**\n\nTo track your order, you can:\n• Check your email for tracking updates\n• Visit 'My Orders' in your account\n• Enter your order number below\n\nWould you like me to help you track a specific order?",
            followUp: ["Enter order number", "View my orders", "Order not received"]
        },
        "contact": {
            answer: "📞 **Contact Us:**\n\n• Email: support@lumiere.com\n• Phone: +1 (800) 555-LUXE\n• Live Chat: Available 24/7\n• Hours: Mon-Fri, 9am-6pm EST\n\nHow can we assist you today?",
            followUp: ["Email support", "Schedule callback", "Leave feedback"]
        },
        "gift": {
            answer: "🎁 **Gift Services:**\n\n• Complimentary luxury gift wrapping\n• Personalized gift messages\n• E-gift cards available ($50-$1000)\n• Gift receipts included\n• Corporate gifting available\n\nWould you like to send a gift?",
            followUp: ["Buy gift card", "Corporate gifts", "Gift ideas"]
        },
        "loyalty": {
            answer: "⭐ **Lumière Rewards:**\n\n• Earn 1 point per $1 spent\n• 500 points = $25 reward\n• Members-only exclusive access\n• Birthday gifts & early sale access\n• Free express shipping at Gold tier\n\nJoin for free today!",
            followUp: ["Join now", "Check my points", "Tier benefits"]
        }
    };

    // Smart product matching with context awareness
    const findProducts = (query: string, ctx: ConversationContext): typeof mockProducts => {
        const lowerQuery = query.toLowerCase();

        // Price range detection
        let priceMin = 0;
        let priceMax = Infinity;

        if (lowerQuery.includes("under $") || lowerQuery.includes("under ")) {
            const match = lowerQuery.match(/under \$?(\d+)/);
            if (match) priceMax = parseInt(match[1]);
        }
        if (lowerQuery.includes("over $") || lowerQuery.includes("above $")) {
            const match = lowerQuery.match(/(over|above) \$?(\d+)/);
            if (match) priceMin = parseInt(match[2]);
        }
        if (lowerQuery.includes("between")) {
            const match = lowerQuery.match(/between \$?(\d+) and \$?(\d+)/);
            if (match) {
                priceMin = parseInt(match[1]);
                priceMax = parseInt(match[2]);
            }
        }

        // Style keywords
        const styleKeywords: Record<string, string[]> = {
            "elegant": ["silk", "satin", "velvet", "gown", "cocktail"],
            "casual": ["everyday", "comfortable", "relaxed"],
            "formal": ["evening", "gala", "dress", "gown"],
            "trendy": ["statement", "unique", "bold"],
            "classic": ["timeless", "structured", "traditional"],
            "minimalist": ["simple", "clean", "understated"]
        };

        // Occasion keywords
        const occasionKeywords: Record<string, string[]> = {
            "wedding": ["gown", "cocktail dress", "heels", "jewelry", "clutch"],
            "party": ["sequin", "mini dress", "heels", "clutch", "earrings"],
            "work": ["structured", "tote", "loafers", "blazer", "pumps"],
            "date night": ["dress", "heels", "jewelry", "clutch", "elegant"],
            "vacation": ["sandals", "dress", "casual", "comfortable"],
            "gift": ["jewelry", "handbag", "accessories", "luxury"]
        };

        let results = mockProducts.filter(p => p.price >= priceMin && p.price <= priceMax);

        // Category matching
        const categoryKeywords: Record<string, string[]> = {
            "handbags": ["bag", "bags", "handbag", "handbags", "purse", "tote", "clutch", "shoulder bag"],
            "jewelry": ["jewelry", "jewellery", "necklace", "bracelet", "earring", "ring", "diamond", "gold", "pearl"],
            "shoes": ["shoe", "shoes", "heel", "heels", "pump", "sandal", "boot", "loafer", "flat", "stiletto"],
            "dresses": ["dress", "dresses", "gown", "cocktail", "midi", "maxi", "mini"],
            "accessories": ["accessory", "accessories", "scarf", "belt", "sunglasses", "watch", "gloves", "hat", "wallet", "keychain"]
        };

        // Check for category
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(kw => lowerQuery.includes(kw))) {
                results = results.filter(p => p.category.slug === category);
                setContext(prev => ({ ...prev, lastCategory: category }));
                break;
            }
        }

        // Check for occasion
        for (const [occasion, keywords] of Object.entries(occasionKeywords)) {
            if (lowerQuery.includes(occasion)) {
                results = results.filter(p =>
                    keywords.some(kw =>
                        p.name.toLowerCase().includes(kw) ||
                        p.tags.some(t => t.toLowerCase().includes(kw))
                    )
                );
                break;
            }
        }

        // Sort by relevance
        if (lowerQuery.includes("popular") || lowerQuery.includes("best")) {
            results = results.sort((a, b) => b.numReviews - a.numReviews);
        } else if (lowerQuery.includes("new") || lowerQuery.includes("latest")) {
            results = results.filter(p => p.isNew).sort((a, b) => b.rating - a.rating);
        } else if (lowerQuery.includes("sale") || lowerQuery.includes("discount")) {
            results = results.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
        } else if (lowerQuery.includes("cheap") || lowerQuery.includes("affordable")) {
            results = results.sort((a, b) => a.price - b.price);
        } else if (lowerQuery.includes("luxury") || lowerQuery.includes("premium") || lowerQuery.includes("expensive")) {
            results = results.sort((a, b) => b.price - a.price);
        }

        return results.slice(0, 4);
    };

    const processMessage = (userMessage: string): Message => {
        const lowerMessage = userMessage.toLowerCase();

        // Update conversation history
        setContext(prev => ({
            ...prev,
            conversationHistory: [...prev.conversationHistory, userMessage].slice(-10)
        }));

        // Greeting responses
        if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "Hello! 👋 Great to see you! How can I help you today? I can assist with finding products, answering questions, or providing styling advice.",
                quickReplies: ["Browse products", "New arrivals", "I have a question", "Style advice"]
            };
        }

        // Thank you responses
        if (lowerMessage.match(/(thank|thanks|appreciate)/)) {
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "You're welcome! 😊 It's my pleasure to help. Is there anything else I can assist you with?",
                quickReplies: ["Continue shopping", "That's all, thanks", "Browse more"]
            };
        }

        // Goodbye responses
        if (lowerMessage.match(/(bye|goodbye|see you|that's all)/)) {
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "Goodbye! 👋 Thank you for visiting Lumière. Feel free to chat anytime you need assistance. Have a wonderful day!",
                quickReplies: ["Actually, one more thing", "Continue shopping"]
            };
        }

        // Style advice
        if (lowerMessage.includes("style") || lowerMessage.includes("what to wear") || lowerMessage.includes("outfit") || lowerMessage.includes("advice") || lowerMessage.includes("recommend")) {
            if (lowerMessage.includes("wedding") || lowerMessage.includes("formal")) {
                const products = findProducts("formal dress jewelry heels", context);
                return {
                    id: Date.now().toString(),
                    type: "bot",
                    content: "For a formal occasion, I recommend an elegant combination: a sophisticated dress, statement jewelry, and classic heels. Here are some curated picks:",
                    products,
                    quickReplies: ["Show more dresses", "Jewelry options", "Evening bags"]
                };
            }
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "I'd love to help with style advice! 🎨 Tell me more about:\n\n• What's the occasion?\n• Your preferred style (classic, trendy, minimalist)?\n• Any color preferences?\n\nOr browse our curated collections:",
                quickReplies: ["Wedding guest", "Work attire", "Date night", "Casual weekend", "Special occasion"]
            };
        }

        // Comparison requests
        if (lowerMessage.includes("compare") || lowerMessage.includes("difference between") || lowerMessage.includes("vs")) {
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "I can help you compare products! 🔍 Here's what I can assist with:\n\n• Material and quality details\n• Sizing comparisons\n• Price value analysis\n• Customer reviews summary\n\nWhich products would you like me to compare?",
                quickReplies: ["Compare handbags", "Compare shoes", "Help me decide"]
            };
        }

        // Check for FAQ matches
        for (const [key, { answer, followUp }] of Object.entries(FAQs)) {
            if (lowerMessage.includes(key)) {
                return {
                    id: Date.now().toString(),
                    type: "bot",
                    content: answer,
                    quickReplies: followUp
                };
            }
        }

        // Product search with smart filtering
        const products = findProducts(userMessage, context);

        if (products.length > 0) {
            const totalMatches = mockProducts.filter(p =>
                p.name.toLowerCase().includes(lowerMessage) ||
                p.categoryName.toLowerCase().includes(lowerMessage)
            ).length;

            return {
                id: Date.now().toString(),
                type: "bot",
                content: `I found ${totalMatches > 4 ? `${totalMatches}+` : products.length} items matching your search. Here are my top picks: ✨`,
                products,
                quickReplies: totalMatches > 4 ? ["Show more", "Filter by price", "Different style"] : ["Add to wishlist", "View all products", "Need help choosing?"]
            };
        }

        // Check for "new" or "arrivals"
        if (lowerMessage.includes("new") || lowerMessage.includes("arrival") || lowerMessage.includes("latest")) {
            const newProducts = mockProducts.filter(p => p.isNew).slice(0, 4);
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "Check out our latest arrivals! 🆕 Fresh from our designers:",
                products: newProducts,
                quickReplies: ["More new items", "Filter by category", "Notify me of new drops"]
            };
        }

        // Check for "sale" or "discount"
        if (lowerMessage.includes("sale") || lowerMessage.includes("discount") || lowerMessage.includes("offer") || lowerMessage.includes("deal")) {
            const saleProducts = mockProducts.filter(p => p.compareAtPrice && p.compareAtPrice > p.price).slice(0, 4);
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "🏷️ Great choice! Here are our best deals right now:",
                products: saleProducts,
                quickReplies: ["More deals", "Biggest discounts", "Sale by category"]
            };
        }

        // Check for "featured" or "best" or "popular"
        if (lowerMessage.includes("featured") || lowerMessage.includes("best") || lowerMessage.includes("popular") || lowerMessage.includes("trending")) {
            const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 4);
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "🔥 Here are our most popular pieces that customers love:",
                products: featuredProducts,
                quickReplies: ["New arrivals", "Customer favorites", "Editor's picks"]
            };
        }

        // Browse/shop intent
        if (lowerMessage.match(/(browse|shop|show|view|see|explore)/)) {
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "Let's find something perfect for you! 🛍️ What are you interested in?",
                quickReplies: ["Handbags", "Jewelry", "Shoes", "Dresses", "New Arrivals", "On Sale"],
                actions: [
                    { label: "Shop All", action: "shop", icon: <ShoppingBag size={14} /> },
                ]
            };
        }

        // Help intent
        if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("question")) {
            return {
                id: Date.now().toString(),
                type: "bot",
                content: "I'm here to help! 💁‍♀️ What do you need assistance with?",
                quickReplies: ["📦 Shipping info", "↩️ Returns & exchanges", "📐 Size guide", "💳 Payment options", "📞 Contact us"],
                actions: [
                    { label: "FAQs", action: "faq", icon: <HelpCircle size={14} /> },
                    { label: "Live Support", action: "support", icon: <Zap size={14} /> },
                ]
            };
        }

        // Default response with smart suggestions
        return {
            id: Date.now().toString(),
            type: "bot",
            content: "I'd love to help you find what you're looking for! 💫 Here's what I can assist with:\n\n• 🛍️ Product search & recommendations\n• 📐 Sizing & styling advice\n• 📦 Order tracking & shipping\n• ↩️ Returns & exchanges\n• 🎁 Gift ideas & wrapping",
            quickReplies: ["Shop by category", "New arrivals", "Get styled", "Track order", "Contact support"]
        };
    };

    const handleSend = async (message?: string) => {
        const messageToSend = message || input;
        if (!messageToSend.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: messageToSend
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Variable typing delay based on message complexity
        const typingDelay = 600 + Math.min(messageToSend.length * 20, 800) + Math.random() * 400;
        await new Promise(resolve => setTimeout(resolve, typingDelay));

        const botResponse = processMessage(messageToSend);
        setIsTyping(false);
        setMessages(prev => [...prev, botResponse]);
    };

    const handleQuickReply = (reply: string) => {
        // Remove emoji from reply for processing
        const cleanReply = reply.replace(/[^\w\s]/gi, '').trim();
        handleSend(cleanReply || reply);
    };

    const handleProductClick = (productId: string) => {
        setContext(prev => ({ ...prev, lastProductViewed: productId }));
        navigate(`/product/${productId}`);
        setIsOpen(false);
    };

    const handleAction = (action: string) => {
        switch (action) {
            case "browse":
            case "shop":
                navigate("/shop");
                setIsOpen(false);
                break;
            case "recommend":
                handleSend("Give me personalized recommendations");
                break;
            case "faq":
                handleSend("Show me frequently asked questions");
                break;
            case "support":
                handleSend("I need to contact support");
                break;
        }
    };

    return (
        <>
            {/* Chat Button - Rose Gold Gradient with Glow */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(10,55%,68%)] via-[hsl(15,50%,65%)] to-[hsl(350,45%,60%)] text-white shadow-lg hover:shadow-2xl hover:shadow-[hsl(10,55%,68%,0.4)] transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Open chat"
                style={{ boxShadow: '0 8px 32px rgba(205, 145, 130, 0.35)' }}
            >
                <MessageCircle size={26} className="group-hover:scale-110 transition-transform drop-shadow-md" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse ring-2 ring-white" />
                <span className="absolute inset-0 rounded-full bg-[hsl(10,55%,68%,0.3)] animate-ping" />
            </button>

            {/* Chat Window - Premium Rose Gold Design */}
            <div className={`fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[650px] max-h-[calc(100vh-100px)] bg-gradient-to-b from-background via-background to-secondary/20 border border-accent/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`} style={{ boxShadow: '0 25px 60px -10px rgba(205, 145, 130, 0.25)' }}>
                {/* Header - Rose Gold Gradient */}
                <div className="flex items-center justify-between p-4 border-b border-accent/20 bg-gradient-to-r from-[hsl(10,55%,68%,0.15)] via-[hsl(15,50%,75%,0.08)] to-[hsl(350,45%,70%,0.05)]">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(10,55%,68%)] via-[hsl(15,50%,70%)] to-[hsl(350,45%,65%)] flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 15px rgba(205, 145, 130, 0.35)' }}>
                            <Sparkles size={22} className="text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <h3 className="font-medium text-base">Lumière Assistant</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Online • Ready to help
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-2.5 ${msg.type === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 duration-200`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-accent/30' : 'bg-secondary/80'
                                }`}>
                                {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            {/* Message Content */}
                            <div className={`max-w-[80%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                                <div className={`rounded-2xl px-4 py-3 ${msg.type === 'user'
                                    ? 'bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-br-md'
                                    : 'bg-secondary/50 rounded-bl-md'
                                    }`}>
                                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                                </div>

                                {/* Action Buttons */}
                                {msg.actions && msg.type === 'bot' && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {msg.actions.map((action) => (
                                            <button
                                                key={action.label}
                                                onClick={() => handleAction(action.action)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-full transition-all hover:scale-105"
                                            >
                                                {action.icon}
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Product Cards - Enhanced design */}
                                {msg.products && msg.products.length > 0 && (
                                    <div className="mt-3 grid gap-2">
                                        {msg.products.map((product) => (
                                            <button
                                                key={product._id}
                                                onClick={() => handleProductClick(product._id)}
                                                className="flex items-center gap-3 p-2.5 bg-background border border-border/50 rounded-xl hover:border-accent/50 hover:shadow-md transition-all group text-left"
                                            >
                                                <div className="w-14 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 ring-1 ring-border/30">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{product.name}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-xs text-muted-foreground">{product.categoryName}</p>
                                                        {product.isNew && (
                                                            <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent rounded-full">NEW</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                                        <span className="text-[11px] text-muted-foreground">{product.rating.toFixed(1)}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-sm font-semibold">${product.price.toLocaleString()}</p>
                                                    {product.compareAtPrice && (
                                                        <p className="text-xs text-red-500 line-through">${product.compareAtPrice.toLocaleString()}</p>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Quick Replies */}
                                {msg.quickReplies && msg.type === 'bot' && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {msg.quickReplies.map((reply) => (
                                            <button
                                                key={reply}
                                                onClick={() => handleQuickReply(reply)}
                                                className="px-3 py-1.5 text-xs bg-secondary/40 hover:bg-secondary/60 border border-border/50 rounded-full transition-all hover:scale-105"
                                            >
                                                {reply}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator - Enhanced */}
                    {isTyping && (
                        <div className="flex gap-2.5 animate-in fade-in duration-200">
                            <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
                                <Bot size={16} />
                            </div>
                            <div className="bg-secondary/50 rounded-2xl rounded-bl-md px-4 py-3">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input - Rose Gold Gradient Design */}
                <div className="p-4 border-t border-accent/20 bg-gradient-to-r from-[hsl(10,55%,68%,0.08)] via-[hsl(15,50%,75%,0.05)] to-transparent">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-2"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-background border-accent/30 focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim()}
                            className="rounded-xl bg-gradient-to-br from-[hsl(10,55%,68%)] to-[hsl(350,45%,60%)] hover:from-[hsl(10,55%,63%)] hover:to-[hsl(350,45%,55%)] shadow-md hover:shadow-lg transition-all"
                        >
                            <Send size={18} className="text-white" />
                        </Button>
                    </form>
                    <p className="text-[10px] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[hsl(10,55%,68%)] to-[hsl(350,45%,65%)]" />
                        Powered by Lumière AI
                    </p>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
