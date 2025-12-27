import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Package, Search, ArrowRight, CheckCircle2, Circle, Truck, MapPin, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { orderService } from "@/services/orderService";

interface TrackOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface OrderStatus {
    _id: string;
    orderNumber?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    totalPrice: number;
    items: any[];
    shippingAddress?: {
        city?: string;
        country?: string;
    };
}

const TrackOrderModal = ({ isOpen, onClose }: TrackOrderModalProps) => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState<OrderStatus | null>(null);

    const statusSteps = [
        { key: "pending", label: "Order Placed", icon: Clock },
        { key: "processing", label: "Processing", icon: Package },
        { key: "shipped", label: "Shipped", icon: Truck },
        { key: "delivered", label: "Delivered", icon: MapPin },
    ];

    const getStatusIndex = (status: string) => {
        const index = statusSteps.findIndex(s => s.key === status.toLowerCase());
        return index >= 0 ? index : 0;
    };

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setOrderData(null);

        if (!orderId.trim()) {
            setError("Please enter an order ID");
            return;
        }

        setIsLoading(true);
        try {
            const response = await orderService.getOrder(orderId.trim());
            if (response.success && response.data) {
                setOrderData(response.data);
            } else {
                setError("Order not found. Please check the order ID and try again.");
            }
        } catch (err: any) {
            setError("Order not found. Please check the order ID and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewAllOrders = () => {
        onClose();
        navigate("/orders");
    };

    const handleClose = () => {
        setOrderData(null);
        setError("");
        setOrderId("");
        onClose();
    };

    if (!isOpen) return null;

    const currentStatusIndex = orderData ? getStatusIndex(orderData.status) : -1;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-accent/10 to-transparent border-b border-border px-6 py-5 flex items-center justify-between sticky top-0 bg-background z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                <Package className="text-accent" size={24} />
                            </div>
                            <div>
                                <h2 className="font-display text-xl tracking-tight">Track Your Order</h2>
                                <p className="text-sm text-muted-foreground">
                                    {orderData ? `Order ${orderData._id.slice(-8).toUpperCase()}` : "Enter your order ID"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {!orderData ? (
                            <form onSubmit={handleTrack} className="space-y-5">
                                <div>
                                    <label htmlFor="orderId" className="block text-sm font-medium mb-2">
                                        Order ID <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="orderId"
                                            type="text"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            placeholder="Enter your order ID"
                                            className="w-full px-4 py-3 pl-11 rounded-xl border border-border bg-secondary/20 focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                                        />
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl"
                                    >
                                        <AlertCircle size={16} />
                                        {error}
                                    </motion.div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-6 rounded-xl font-medium flex items-center justify-center gap-2 group"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            Track Order
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">or</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleViewAllOrders}
                                    className="w-full py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Package size={16} />
                                    View All Orders
                                </button>

                                <p className="text-xs text-center text-muted-foreground">
                                    Find your order ID in the confirmation email.
                                </p>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                {/* Status Timeline */}
                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Order Status</h3>
                                    <div className="relative">
                                        {statusSteps.map((step, index) => {
                                            const Icon = step.icon;
                                            const isCompleted = index <= currentStatusIndex;
                                            const isCurrent = index === currentStatusIndex;

                                            return (
                                                <div key={step.key} className="flex items-start gap-4 pb-6 last:pb-0">
                                                    {/* Line */}
                                                    {index < statusSteps.length - 1 && (
                                                        <div
                                                            className={`absolute left-[18px] mt-10 w-0.5 h-10 ${isCompleted ? "bg-accent" : "bg-border"
                                                                }`}
                                                            style={{ top: `${index * 64}px` }}
                                                        />
                                                    )}

                                                    {/* Icon */}
                                                    <div
                                                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isCompleted
                                                                ? "bg-accent text-accent-foreground"
                                                                : "bg-secondary text-muted-foreground"
                                                            } ${isCurrent ? "ring-4 ring-accent/20" : ""}`}
                                                    >
                                                        {isCompleted ? (
                                                            index === currentStatusIndex ? (
                                                                <Icon size={18} />
                                                            ) : (
                                                                <CheckCircle2 size={18} />
                                                            )
                                                        ) : (
                                                            <Circle size={18} />
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1">
                                                        <p className={`font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                                                            {step.label}
                                                        </p>
                                                        {isCurrent && (
                                                            <p className="text-sm text-accent mt-0.5">Current Status</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Order ID</span>
                                        <span className="font-mono font-medium">{orderData._id.slice(-8).toUpperCase()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Items</span>
                                        <span className="font-medium">{orderData.items?.length || 0} item(s)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Total</span>
                                        <span className="font-medium">${orderData.totalPrice?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Order Date</span>
                                        <span className="font-medium">
                                            {new Date(orderData.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setOrderData(null)}
                                    >
                                        Track Another
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={handleViewAllOrders}
                                    >
                                        View All Orders
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TrackOrderModal;
