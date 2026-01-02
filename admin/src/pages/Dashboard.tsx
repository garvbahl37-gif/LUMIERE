import { useEffect, useState } from 'react';

import { DollarSign, Package, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsData, ordersData] = await Promise.all([
                    productService.getAll({ limit: 1000 }),
                    orderService.getAll()
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

                // Calculate Stats
                const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0);
                const uniqueCustomers = new Set(orders.map((o: any) => o.email)).size;

                setStats({
                    revenue: totalRevenue,
                    orders: orders.length,
                    products: productsList.length,
                    // @ts-ignore
                    customers: uniqueCustomers
                });

            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    icon={<DollarSign className="text-emerald-500" size={24} />}
                    trend="+12% from last month"
                />
                <StatCard
                    title="Active Orders"
                    value={stats.orders}
                    icon={<ShoppingBag className="text-blue-500" size={24} />}
                    trend="+5 new today"
                />
                <StatCard
                    title="Total Products"
                    value={stats.products}
                    icon={<Package className="text-purple-500" size={24} />}
                    trend="Inventory good"
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-700">Recent Activity</h3>
                <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    Chart Placeholder
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-hover hover:shadow-md">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</h3>
            <div className="p-2 bg-slate-50 rounded-full">{icon}</div>
        </div>
        <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-800">{value}</p>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
        </div>
    </div>
);

export default Dashboard;
