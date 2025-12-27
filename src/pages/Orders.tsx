import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { orderService, Order } from "@/services/orderService";
import { Package, ArrowRight, Eye } from "lucide-react";

interface DisplayOrder {
    id: string;
    items: Array<{
        _id?: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    date: string;
    status: string;
    source: 'local' | 'database';
}

const Orders = () => {
    const { isAuthenticated } = useAuth();
    const { getToken } = useClerkAuth();
    const [orders, setOrders] = useState<DisplayOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            const allOrders: DisplayOrder[] = [];

            // If authenticated, fetch from database
            if (isAuthenticated) {
                try {
                    // Refresh token for API call
                    const token = await getToken();
                    if (token) {
                        localStorage.setItem('token', token);
                    }

                    const response = await orderService.getOrders();
                    if (response.success && response.data) {
                        const dbOrders = response.data.map((order: Order) => ({
                            id: order._id,
                            items: order.items,
                            total: order.totalPrice,
                            date: order.createdAt,
                            status: order.status,
                            source: 'database' as const
                        }));
                        allOrders.push(...dbOrders);
                    }
                } catch (error) {
                    console.error("Failed to fetch orders from database:", error);
                }
            }

            // Also load from localStorage (for guest orders or older orders)
            try {
                const storedOrders = localStorage.getItem('lumiere-orders');
                if (storedOrders) {
                    const localOrders = JSON.parse(storedOrders).map((order: any) => ({
                        id: order.id,
                        items: order.items,
                        total: order.total,
                        date: order.date,
                        status: order.status,
                        source: 'local' as const
                    }));
                    allOrders.push(...localOrders);
                }
            } catch (error) {
                console.error("Failed to load local orders:", error);
            }

            // Sort by date (newest first)
            allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setOrders(allOrders);
            setIsLoading(false);
        };

        loadOrders();
    }, [isAuthenticated]);


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


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
                                <div key={order.id} className="bg-cream-dark rounded-lg p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-display text-lg">Order #{order.id}</h3>
                                                <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-display text-xl">${order.total.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        {order.items.slice(0, 4).map((item, index) => (
                                            <img
                                                key={index}
                                                src={item.image}
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

                                    <div className="flex justify-end mt-4 pt-4 border-t border-border">
                                        <Link to={`/order-success/${order.id}`}>
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
