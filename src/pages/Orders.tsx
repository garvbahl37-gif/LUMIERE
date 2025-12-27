import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { orderService, Order } from "@/services/orderService";
import { Package, ArrowRight, Eye } from "lucide-react";

const Orders = () => {
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const response = await orderService.getOrders();
            if (response.success) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-20">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <Package size={64} className="mx-auto text-muted-foreground mb-6" />
                        <h1 className="font-display text-3xl mb-4">View Your Orders</h1>
                        <p className="text-muted-foreground mb-8">
                            Please login to view your order history
                        </p>
                        <Link to="/login">
                            <Button size="lg">
                                Sign In
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
                    <h1 className="font-display text-3xl lg:text-4xl mb-8">My Orders</h1>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-cream-dark rounded-lg p-6 animate-pulse">
                                    <div className="h-6 bg-muted rounded w-1/4 mb-4" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16">
                            <Package size={64} className="mx-auto text-muted-foreground mb-6" />
                            <h2 className="font-display text-2xl mb-4">No orders yet</h2>
                            <p className="text-muted-foreground mb-8">
                                You haven't placed any orders yet. Start shopping to see your orders here.
                            </p>
                            <Link to="/shop">
                                <Button size="lg">
                                    Start Shopping
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-cream-dark rounded-lg p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-display text-lg">Order #{order.orderNumber}</h3>
                                                <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-display text-xl">${order.totalPrice.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        {order.items.slice(0, 4).map((item, index) => (
                                            <img
                                                key={index}
                                                src={item.image.startsWith('/') ? `http://localhost:5173${item.image}` : item.image}
                                                alt={item.name}
                                                className="w-16 h-20 object-cover rounded-sm flex-shrink-0"
                                            />
                                        ))}
                                        {order.items.length > 4 && (
                                            <div className="w-16 h-20 bg-muted rounded-sm flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm text-muted-foreground">+{order.items.length - 4}</span>
                                            </div>
                                        )}
                                    </div>

                                    {order.trackingNumber && (
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Tracking: {order.trackingNumber}
                                        </p>
                                    )}

                                    <div className="flex justify-end mt-4 pt-4 border-t border-border">
                                        <Link to={`/order-success/${order._id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye size={16} className="mr-2" />
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Orders;
