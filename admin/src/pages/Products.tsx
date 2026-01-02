import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { productService } from '../services/api';
import AddProduct from './AddProduct';

const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAll({ limit: 1000 });
                // Map MongoDB data to UI structure if needed, or use directly if interface matches
                // The API returns {_id, ...}, UI uses {id, ...}
                // Also ensure we handle the response correctly (array vs object with data property)

                let productList = [];
                if (Array.isArray(data)) {
                    productList = data;
                } else if (data?.products && Array.isArray(data.products)) {
                    productList = data.products;
                } else if (data?.data && Array.isArray(data.data)) {
                    productList = data.data;
                }

                setProducts(productList.map((p: any) => ({
                    ...p,
                    id: p._id, // Map _id to id for the table
                    category: p.categoryName || 'Uncategorized'
                })));
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const [showAddModal, setShowAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ... (fetchProducts useEffect) ...

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product? This cannot be undone.')) {
            setProducts(products.filter(p => p.id !== id));
            // In real app: await productService.delete(id);
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {showAddModal && (
                <AddProduct
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        // Ideally refetch products here
                        window.location.reload();
                    }}
                />
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Products</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your store inventory ({products.length} items)</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    <span className="font-medium">Add Product</span>
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset page on search
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-10 w-32 bg-slate-100 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-100 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-100 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 w-12 bg-slate-100 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-16 bg-slate-100 rounded-full"></div></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                ))
                            ) : (
                                paginatedProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-lg object-cover border border-slate-100 shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-medium text-slate-900 line-clamp-1">{product.name}</p>
                                                    <p className="text-xs text-slate-500 font-mono">ID: {String(product.id).substring(0, 6)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-slate-900">${product.price.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                <span className="text-sm text-slate-600 font-mono">{product.stock}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Empty State / Pagination Footer */}
                {!loading && products.length === 0 && (
                    <div className="p-12 text-center flex flex-col items-center justify-center flex-1">
                        <div className="bg-slate-50 p-4 rounded-full mb-3">
                            <Search className="text-slate-300" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-800">No Products Found</h3>
                        <p className="text-slate-500 mt-1 max-w-sm">We couldn't fetch any products from the server. Please check your connection.</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-rose-600 hover:text-rose-700 font-medium text-sm">Refresh Page</button>
                    </div>
                )}

                {products.length > 0 && (
                    <div className="border-t border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                            Showing <span className="font-medium">{Math.min(filteredProducts.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredProducts.length, currentPage * itemsPerPage)}</span> of {filteredProducts.length} results
                        </span>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-3 py-1 rounded border border-slate-300 bg-white text-slate-600 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-3 py-1 rounded border border-slate-300 bg-white text-slate-600 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
