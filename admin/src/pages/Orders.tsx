import { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import { Eye, X, Package, CreditCard, User, MapPin } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
        <div className="space-y-6 animate-fade-in relative">
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
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={7} className="text-center py-8">Loading orders...</td></tr>
                        ) : orders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-slate-600">#{order.orderNumber || order._id.substring(0, 8)}</td>
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
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-purple-600 transition-colors"
                                        title="View Details"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && orders.length === 0 && (
                    <div className="p-12 text-center text-slate-500">No orders found.</div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Order Details</h2>
                                <p className="text-sm text-slate-500 font-mono">#{selectedOrder.orderNumber || selectedOrder._id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Items */}
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                                    <Package size={20} className="text-purple-500" />
                                    Order Items
                                </h3>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item: any) => (
                                        <div key={item._id} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                                            <div className="w-16 h-16 rounded-lg bg-white p-1 border border-slate-200 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-slate-900 truncate">{item.name}</h4>
                                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-slate-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-100 space-y-2">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span>${selectedOrder.itemsPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Shipping</span>
                                        <span>${selectedOrder.shippingPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Tax</span>
                                        <span>${selectedOrder.taxPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-100">
                                        <span>Total</span>
                                        <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Customer & Payment */}
                            <div className="space-y-8">
                                {/* Customer Details */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                                        <User size={20} className="text-blue-500" />
                                        Customer Details
                                    </h3>
                                    <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Contact</p>
                                                <p className="font-medium text-slate-900">{selectedOrder.shippingAddress?.fullName}</p>
                                                <p className="text-sm text-slate-500">{selectedOrder.user?.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <MapPin size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Shipping Address</p>
                                                <p className="text-sm text-slate-700 leading-relaxed">
                                                    {selectedOrder.shippingAddress?.street}<br />
                                                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}<br />
                                                    {selectedOrder.shippingAddress?.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                                        <CreditCard size={20} className="text-emerald-500" />
                                        Payment Info
                                    </h3>
                                    <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Method</p>
                                                <p className="font-medium text-slate-900 capitalize flex items-center gap-2">
                                                    {selectedOrder.paymentMethod}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Status</p>
                                                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-md border ${selectedOrder.paymentStatus === 'paid'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                                                    } capitalize`}>
                                                    {selectedOrder.paymentStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
