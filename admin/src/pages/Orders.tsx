import { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderService.getAll();
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'processing': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-100';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-slate-800">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Order ID</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Total</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Payment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8">Loading orders...</td></tr>
                        ) : orders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-mono text-sm text-slate-600">{order._id.substring(0, 8)}...</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.user?.name || 'Guest'}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900">${order.totalPrice}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getStatusColor(order.status)} capitalize`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm capitalize text-slate-600">{order.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && orders.length === 0 && (
                    <div className="p-12 text-center text-slate-500">No orders found.</div>
                )}
            </div>
        </div>
    );
};

export default Orders;
