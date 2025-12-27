import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { orderService } from "@/services/orderService";
import { CheckCircle, Package, ArrowRight, Truck } from "lucide-react";

interface DisplayOrder {
    id: string;
    items: any[];
    shipping?: {
        fullName: string;
        email?: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    total: number;
    date: string;
    status: string;
}

const OrderSuccess = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<DisplayOrder | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }

            // Check if it's a MongoDB ObjectId format (24 hex chars)
            const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

            if (isMongoId) {
                // Try to fetch from database
                try {
                    const response = await orderService.getOrder(id);
                    if (response.success && response.data) {
                        setOrder({
                            id: response.data._id,
                            items: response.data.items,
                            shipping: response.data.shippingAddress,
                            total: response.data.totalPrice,
                            date: response.data.createdAt,
                            status: response.data.status
                        });
                        setIsLoading(false);
                        return;
                    }
                } catch (error) {
                    console.error("Failed to fetch order from database:", error);
                }
            }

            // Fallback: try localStorage
            const orders = JSON.parse(localStorage.getItem('lumiere-orders') || '[]');
            const foundOrder = orders.find((o: any) => o.id === id);
            if (foundOrder) {
                setOrder({
                    id: foundOrder.id,
                    items: foundOrder.items,
                    shipping: foundOrder.shipping,
                    total: foundOrder.total,
                    date: foundOrder.date,
                    status: foundOrder.status
                });
            }
            setIsLoading(false);
        };

        loadOrder();
    }, [id]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
                    <div className="bg-secondary/30 rounded-lg p-8 lg:p-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="font-display text-3xl lg:text-4xl mb-4">
                            Order Confirmed!
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Thank you for your purchase. We've received your order and will begin processing it right away.
                        </p>

                        {order && (
                            <div className="bg-background rounded-lg p-6 mb-8 text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <Package className="text-accent" size={20} />
                                    <span className="font-medium">Order #{order.id}</span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className="capitalize text-green-600 font-medium">{order.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Date</span>
                                        <span>{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Items</span>
                                        <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span className="text-muted-foreground">Total</span>
                                        <span className="font-display text-lg">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Truck size={16} />
                                        <span>Shipping to:</span>
                                    </div>
                                    <p className="text-sm">
                                        {order.shipping.fullName}<br />
                                        {order.shipping.street}<br />
                                        {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
                                        {order.shipping.country}
                                    </p>
                                </div>

                                {/* Order Items */}
                                <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-sm text-muted-foreground mb-3">Items ordered:</p>
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-14 object-cover rounded-sm"
                                                />
                                                <div className="flex-1 text-sm">
                                                    <p className="font-medium line-clamp-1">{item.name}</p>
                                                    <p className="text-muted-foreground">Qty: {item.quantity} × ${item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/">
                                <Button variant="outline" size="lg">
                                    Back to Home
                                </Button>
                            </Link>
                            <Link to="/shop">
                                <Button size="lg">
                                    Continue Shopping
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderSuccess;
