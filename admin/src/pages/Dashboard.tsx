import { useEffect, useState } from 'react';
import { DollarSign, Package, ShoppingBag, Users, RefreshCw, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';
import { productService, orderService, subscriberService } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
        subscribers: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDashboardData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const [productsData, ordersData, subscribersData] = await Promise.all([
                productService.getAll({ limit: 1000 }),
                orderService.getAll(),
                subscriberService.getAll()
            ]);

            // Handle diverse response structures
            // Products
            let productsList = [];
            if (Array.isArray(productsData)) {
                productsList = productsData;
            } else if (productsData?.products && Array.isArray(productsData.products)) {
                productsList = productsData.products;
            } else if (productsData?.data && Array.isArray(productsData.data)) {
                productsList = productsData.data;
            }

            // Orders
            const orders = Array.isArray(ordersData) ? ordersData : (ordersData.orders || []);

            // Recent Orders (Take last 5)
            const sortedOrders = [...orders].sort((a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ).slice(0, 5);
            setRecentOrders(sortedOrders);

            // Calculate Stats
            const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.totalPrice || 0), 0);
            const uniqueCustomers = new Set(orders.map((o: any) => o.email)).size;

            // Subscribers
            const subscribersCount = subscribersData?.count || (Array.isArray(subscribersData?.data) ? subscribersData.data.length : 0);

            setStats({
                revenue: totalRevenue,
                orders: orders.length,
                products: productsList.length,
                // @ts-ignore
                customers: uniqueCustomers,
                subscribers: subscribersCount
            });

        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleRefresh = () => {
        fetchDashboardData(true);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
                    <p className="text-slate-500 text-sm mt-1">Welcome back to your administration panel</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg shadow-sm transition-all hover:shadow active:scale-95 disabled:opacity-70"
                >
                    <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                    <span className="font-medium">Refresh Data</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    icon={<DollarSign className="text-emerald-500" size={24} />}
                    trend="+12% from last month"
                    trendUp={true}
                    color="emerald"
                />
                <StatCard
                    title="Active Orders"
                    value={stats.orders}
                    icon={<ShoppingBag className="text-blue-500" size={24} />}
                    trend="+5 new today"
                    trendUp={true}
                    color="blue"
                />
                <StatCard
                    title="Total Products"
                    value={stats.products}
                    icon={<Package className="text-purple-500" size={24} />}
                    trend="Inventory good"
                    trendUp={true}
                    color="purple"
                />
                <StatCard
                    title="Newsletter Subscribers"
                    value={stats.subscribers}
                    icon={<Users className="text-orange-500" size={24} />}
                    trend="Active list"
                    trendUp={true}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
                        <button className="text-rose-600 text-sm font-medium hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="pb-3 pl-2">Order ID</th>
                                    <th className="pb-3">Customer</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3 pr-2 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order: any) => (
                                        <tr key={order._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-3 pl-2 text-sm font-medium text-slate-700">#{order._id.substring(order._id.length - 6)}</td>
                                            <td className="py-3 text-sm text-slate-600">{order.shippingAddress?.fullName || order.user?.name || "Guest"}</td>
                                            <td className="py-3 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="py-3 text-sm font-medium text-slate-800">${order.totalAmount?.toLocaleString()}</td>
                                            <td className="py-3 pr-2 text-right">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${order.isPaid
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                                    }`}>
                                                    {order.isPaid ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                    {order.isPaid ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">No recent orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold mb-4 text-slate-800">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors flex items-center justify-between group">
                            <span>Add New Product</span>
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-rose-600 transition-colors">
                                <ArrowUpRight size={16} />
                            </div>
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors flex items-center justify-between group">
                            <span>Manage Categories</span>
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                                <ArrowUpRight size={16} />
                            </div>
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors flex items-center justify-between group">
                            <span>View Reports</span>
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                                <ArrowUpRight size={16} />
                            </div>
                        </button>
                    </div>

                    <h3 className="text-lg font-bold mb-4 mt-8 text-slate-800">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Server Status</span>
                            <span className="text-emerald-600 font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Database</span>
                            <span className="text-emerald-600 font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Connected</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Last Backup</span>
                            <span className="text-slate-700 font-medium">2 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend, trendUp, color }: any) => {
    const colorClasses: any = {
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600"
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-hover hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">{title}</h3>
                <div className={`p-2 rounded-full transition-transform group-hover:scale-110 ${colorClasses[color] || 'bg-slate-50'}`}>{icon}</div>
            </div>
            <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-800">{value}</p>
                {trend && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
