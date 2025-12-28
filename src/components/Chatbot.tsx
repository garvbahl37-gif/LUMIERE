import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Bot, User, ShoppingBag, Sparkles, ArrowRight, Heart, TrendingUp, Package, HelpCircle, Truck, RotateCcw, CreditCard, Ruler, Gift, Clock, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";
import { orderService, Order } from "@/services/orderService";

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
    const [awaitingOrderId, setAwaitingOrderId] = useState(false);
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
                    content: `${greeting}! Welcome to Lumière. I'm your personal shopping assistant. How can I help you today?`,
                    quickReplies: ["Shop Now", "New Arrivals", "Best Sellers", "Track Order", "Help"],
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
        let hasFilter = false;

        // Price range detection
        let priceMin = 0;
        let priceMax = Infinity;

        if (lowerQuery.includes("under $") || lowerQuery.includes("under ")) {
            const match = lowerQuery.match(/under \$?(\d+)/);
            if (match) {
                priceMax = parseInt(match[1]);
                hasFilter = true;
            }
        }
        if (lowerQuery.includes("over $") || lowerQuery.includes("above $")) {
            const match = lowerQuery.match(/(over|above) \$?(\d+)/);
            if (match) {
                priceMin = parseInt(match[2]);
                hasFilter = true;
            }
        }
        if (lowerQuery.includes("between")) {
            const match = lowerQuery.match(/between \$?(\d+) and \$?(\d+)/);
            if (match) {
                priceMin = parseInt(match[1]);
                priceMax = parseInt(match[2]);
                hasFilter = true;
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
                hasFilter = true;
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
                hasFilter = true;
                break;
            }
        }

        // Sort by relevance
        if (lowerQuery.includes("popular") || lowerQuery.includes("best")) {
            results = results.sort((a, b) => b.numReviews - a.numReviews);
            hasFilter = true;
        } else if (lowerQuery.includes("new") || lowerQuery.includes("latest")) {
            results = results.filter(p => p.isNew).sort((a, b) => b.rating - a.rating);
            hasFilter = true;
        } else if (lowerQuery.includes("sale") || lowerQuery.includes("discount")) {
            results = results.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
            hasFilter = true;
        } else if (lowerQuery.includes("cheap") || lowerQuery.includes("affordable")) {
            results = results.sort((a, b) => a.price - b.price);
            hasFilter = true;
        } else if (lowerQuery.includes("luxury") || lowerQuery.includes("premium") || lowerQuery.includes("expensive")) {
            results = results.sort((a, b) => b.price - a.price);
            hasFilter = true;
        }

        // If no specific filter was applied, don't return generic results
        if (!hasFilter) return [];

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

        // If awaiting order ID, try to track the order
        if (awaitingOrderId) {
            setAwaitingOrderId(false);
            try {
                const response = await orderService.trackOrder(messageToSend.trim());
                if (response.success && response.data) {
                    const order = response.data;
                    const statusEmoji: Record<string, string> = {
                        'pending': '⏳',
                        'processing': '📦',
                        'shipped': '🚚',
                        'delivered': '✅',
                        'cancelled': '❌'
                    };
                    const botResponse: Message = {
                        id: Date.now().toString(),
                        type: "bot",
                        content: `${statusEmoji[order.status] || '📋'} Order Found!\n\n📋 Order #: ${order.orderNumber || order._id.slice(-8).toUpperCase()}\n📊 Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}\n🛒 Items: ${order.items.length} item(s)\n💰 Total: $${order.totalPrice.toLocaleString()}\n📅 Placed: ${new Date(order.createdAt).toLocaleDateString()}${order.trackingNumber ? `\n🚚 Tracking: ${order.trackingNumber}` : ''}`,
                        quickReplies: ["Track another order", "Contact support", "Back to shopping"]
                    };
                    setIsTyping(false);
                    setMessages(prev => [...prev, botResponse]);
                    return;
                }
            } catch (error: any) {
                const botResponse: Message = {
                    id: Date.now().toString(),
                    type: "bot",
                    content: "❌ Sorry, I couldn't find that order. Please check the order ID and try again.\n\nTip: You can find your order ID in your confirmation email or in 'My Orders' if you're logged in.",
                    quickReplies: ["Try again", "View my orders", "Contact support"]
                };
                setIsTyping(false);
                setMessages(prev => [...prev, botResponse]);
                return;
            }
        }

        // Check if user wants to track an order (set up the flow)
        const lowerMessage = messageToSend.toLowerCase();
        if (lowerMessage.includes("track") && (lowerMessage.includes("order") || lowerMessage.includes("another"))) {
            setAwaitingOrderId(true);
            const botResponse: Message = {
                id: Date.now().toString(),
                type: "bot",
                content: "📦 **Track Your Order**\n\nPlease enter your order ID or order number below. You can find it in your confirmation email or on the order success page.",
                quickReplies: ["View my orders", "I don't have my order ID", "Cancel"]
            };
            setIsTyping(false);
            setMessages(prev => [...prev, botResponse]);
            return;
        }

        // Handle "Try again" for order tracking
        if (lowerMessage === "try again") {
            setAwaitingOrderId(true);
            const botResponse: Message = {
                id: Date.now().toString(),
                type: "bot",
                content: "Sure! Please enter your order ID:",
                quickReplies: ["Cancel", "Contact support"]
            };
            setIsTyping(false);
            setMessages(prev => [...prev, botResponse]);
            return;
        }

        // Handle cancel
        if (lowerMessage === "cancel" && awaitingOrderId) {
            setAwaitingOrderId(false);
        }

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
            {/* Chat Button - Rich Gold */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A96E] via-[#B8956A] to-[#A47E52] text-white shadow-2xl hover:scale-110 hover:shadow-[0_12px_40px_rgba(180,140,60,0.4)] transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Open chat"
            >
                <MessageCircle size={26} className="text-white" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </button>

            {/* Chat Window - Premium Design */}
            <div className={`fixed z-50 w-[92vw] md:w-[400px] max-w-[calc(100vw-24px)] h-[80vh] md:h-[580px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 
                left-1/2 -translate-x-1/2 bottom-[10vh] translate-y-0 
                md:left-auto md:translate-x-0 md:translate-y-0 md:bottom-6 md:right-6 
                ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
                style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>

                {/* Header - Rich Deep Gold */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#C9A96E] via-[#B8956A] to-[#A47E52] text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-base">Lumière Concierge</h3>
                            <p className="text-[11px] text-white/90 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                                Online • Ready to help
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={18} />
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
                            <div className={`max-w-[85%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                                <div className={`rounded-2xl px-4 py-3 ${msg.type === 'user'
                                    ? 'bg-gradient-to-r from-[#C9A96E] to-[#A47E52] text-white rounded-br-md'
                                    : 'bg-neutral-100 text-neutral-800 rounded-bl-md'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                </div>

                                {/* Action Buttons */}
                                {msg.actions && msg.type === 'bot' && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {msg.actions.map((action) => (
                                            <button
                                                key={action.label}
                                                onClick={() => handleAction(action.action)}
                                                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-gradient-to-r from-[#C9A96E] to-[#B8956A] text-white rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all"
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
                                                className="px-3.5 py-2 text-xs font-medium bg-white border border-neutral-200 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 text-neutral-700 rounded-full transition-all hover:scale-105"
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

                {/* Input Section */}
                <div className="p-3 border-t border-neutral-100 bg-neutral-50">
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
                            placeholder="Type your message..."
                            className="flex-1 bg-white border-neutral-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 rounded-full px-4 h-11 text-sm"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim()}
                            className="w-11 h-11 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#A47E52] hover:from-[#B8956A] hover:to-[#937245] shadow-md transition-all disabled:opacity-40"
                        >
                            <Send size={16} className="text-white" />
                        </Button>
                    </form>
                    <p className="text-[9px] text-neutral-400 text-center mt-2 tracking-widest uppercase">
                        Lumière Concierge
                    </p>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
