
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth as useClerkAuth, useUser, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useAuth } from "@/context/AuthContext";
import { orderService, Order } from "@/services/orderService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Package, MapPin, User, LogOut, ChevronRight, Eye, Settings } from "lucide-react";

interface DisplayOrder {
    id: string;
    items: Array<{
        name: string;
        image: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    date: string;
    status: string;
}

const Profile = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerkAuth();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { getToken } = useClerkAuth();

    const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'account'>('orders');
    const [orders, setOrders] = useState<DisplayOrder[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    // Fetch Orders Logic
    useEffect(() => {
        const loadOrders = async () => {
            if (activeTab !== 'orders') return;

            setIsLoadingOrders(true);
            const allOrders: DisplayOrder[] = [];

            if (isAuthenticated) {
                try {
                    const token = await getToken();
                    if (token) localStorage.setItem('token', token);

                    const response = await orderService.getOrders();
                    if (response.success && response.data) {
                        const dbOrders = response.data.map((order: Order) => ({
                            id: order.orderNumber || order._id,
                            items: order.items,
                            total: order.totalPrice,
                            date: order.createdAt,
                            status: order.status
                        }));
                        allOrders.push(...dbOrders);
                    }
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                }
            }

            // Local orders fallback
            try {
                const storedOrders = localStorage.getItem('lumiere-orders');
                if (storedOrders) {
                    const localOrders = JSON.parse(storedOrders).map((order: any) => ({
                        id: order.id,
                        items: order.items,
                        total: order.total,
                        date: order.date,
                        status: order.status
                    }));
                    allOrders.push(...localOrders);
                }
            } catch (e) { console.error(e); }

            allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setOrders(allOrders);
            setIsLoadingOrders(false);
        };

        loadOrders();
    }, [isAuthenticated, activeTab, getToken]);

    if (!isLoaded) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

    if (!user) {
        return (
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Header />
            <main className="pt-24 pb-16 container mx-auto px-4 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-neutral-100 flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-24 h-24 rounded-full border-4 border-rose-50 shadow-inner"
                    />
                    <div className="text-center md:text-left flex-1">
                        <h1 className="font-display text-3xl text-neutral-900 mb-1">{user.fullName}</h1>
                        <p className="text-neutral-500 mb-4">{user.primaryEmailAddress?.emailAddress}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">Member</span>
                            <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">Joined {user.createdAt ? new Date(user.createdAt).getFullYear() : '2025'}</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => signOut(() => navigate('/'))}
                        className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                    >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                    </Button>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden sticky top-28">
                            <nav className="flex flex-col">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`flex items-center justify-between p-4 text-left transition-colors border-l-4 ${activeTab === 'orders' ? 'border-rose-500 bg-rose-50/50 text-rose-900' : 'border-transparent text-neutral-600 hover:bg-neutral-50'}`}
                                >
                                    <span className="flex items-center gap-3 font-medium"><Package size={18} /> My Orders</span>
                                    <ChevronRight size={16} className={`opacity-50 ${activeTab === 'orders' ? 'text-rose-500' : ''}`} />
                                </button>
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`flex items-center justify-between p-4 text-left transition-colors border-l-4 ${activeTab === 'addresses' ? 'border-rose-500 bg-rose-50/50 text-rose-900' : 'border-transparent text-neutral-600 hover:bg-neutral-50'}`}
                                >
                                    <span className="flex items-center gap-3 font-medium"><MapPin size={18} /> Addresses</span>
                                    <ChevronRight size={16} className={`opacity-50 ${activeTab === 'addresses' ? 'text-rose-500' : ''}`} />
                                </button>
                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={`flex items-center justify-between p-4 text-left transition-colors border-l-4 ${activeTab === 'account' ? 'border-rose-500 bg-rose-50/50 text-rose-900' : 'border-transparent text-neutral-600 hover:bg-neutral-50'}`}
                                >
                                    <span className="flex items-center gap-3 font-medium"><User size={18} /> Account Details</span>
                                    <ChevronRight size={16} className={`opacity-50 ${activeTab === 'account' ? 'text-rose-500' : ''}`} />
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="font-display text-2xl text-neutral-900 mb-4">Order History</h2>
                                {isLoadingOrders ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 h-32 animate-pulse" />
                                        ))}
                                    </div>
                                ) : orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4 mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="font-display text-lg text-neutral-900">#{order.id.slice(-8).toUpperCase()}</span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${getStatusColor(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-neutral-500">
                                                            {new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="font-display text-lg text-neutral-900">${order.total.toFixed(2)}</p>
                                                            <p className="text-sm text-neutral-500">{order.items.length} Item{order.items.length !== 1 ? 's' : ''}</p>
                                                        </div>
                                                        <Link to={`/order-success/${order.id}`}>
                                                            <Button size="sm" variant="ghost" className="hidden md:flex text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="relative flex-shrink-0 group/item">
                                                            <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md border border-neutral-100" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                                                <span className="text-white text-xs font-medium">x{item.quantity}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="md:hidden mt-4 pt-4 border-t border-neutral-100">
                                                    <Link to={`/order-success/${order.id}`} className="block">
                                                        <Button variant="outline" className="w-full">View Details</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-100">
                                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                            <Package size={32} />
                                        </div>
                                        <h3 className="font-display text-xl text-neutral-900 mb-2">No orders yet</h3>
                                        <p className="text-neutral-500 mb-6 max-w-md mx-auto">Looks like you haven't placed any orders yet. Explore our collection and find something unique.</p>
                                        <Link to="/shop">
                                            <Button className="bg-rose-900 hover:bg-rose-950 text-white px-8">Start Shopping</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl text-neutral-900">Saved Addresses</h2>
                                    <Button variant="outline" className="border-dashed border-rose-200 text-rose-700 hover:bg-rose-50">
                                        + Add New Address
                                    </Button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Placeholder Address Card */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-100 relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg">Default</div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">{user.fullName}</h3>
                                        <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                                            123 Luxury Lane, Suite 400<br />
                                            Beverly Hills, CA 90210<br />
                                            United States
                                        </p>
                                        <div className="flex gap-2">
                                            <Button variant="link" className="p-0 h-auto text-rose-600 text-sm">Edit</Button>
                                            <div className="w-px h-4 bg-neutral-200 self-center" />
                                            <Button variant="link" className="p-0 h-auto text-neutral-400 hover:text-red-600 text-sm">Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="font-display text-2xl text-neutral-900 mb-6 flex items-center gap-2">
                                    <Settings size={24} className="text-rose-900" /> Account Settings
                                </h2>
                                <div className="space-y-6 max-w-2xl">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-neutral-700">Full Name</label>
                                            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-900">
                                                {user.fullName}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-neutral-700">Email Address</label>
                                            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-900 flex justify-between items-center">
                                                <span>{user.primaryEmailAddress?.emailAddress}</span>
                                                {user.primaryEmailAddress?.verification?.status === 'verified' && (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-700">User ID</label>
                                        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-500 text-xs font-mono">
                                            {user.id}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-neutral-100">
                                        <h3 className="font-medium text-neutral-900 mb-4">Security</h3>
                                        <Button variant="outline" className="w-full md:w-auto">
                                            Change Password
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
