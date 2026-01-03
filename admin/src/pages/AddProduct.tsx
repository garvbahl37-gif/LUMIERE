
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { productService } from '../services/api';

interface AddProductProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any; // If provided, we are in Edit mode
}

const AddProduct = ({ onClose, onSuccess, initialData }: AddProductProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || '',
                price: initialData.price || '',
                stock: initialData.stock || '',
                description: initialData.description || '',
                image: initialData.image || ''
            });
        }
    }, [initialData]);

    const categories = ['Handbags', 'Jewelry', 'Shoes', 'Dresses', 'Accessories', 'Men\'s Watches', 'Men\'s Bags', 'Men\'s Shoes', 'Men\'s Suits', 'Men\'s Accessories', 'Fragrances'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                images: [formData.image],
                isNew: true,
                isActive: true
            };

            if (initialData) {
                await productService.update(initialData.id, productData);
            } else {
                await productService.create(productData);
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to save product', error);
            alert('Failed to save product. Please check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Product Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                placeholder="ex. Diamond Necklace"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Category</label>
                            <select
                                required
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all bg-white"
                            >
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Price ($)</label>
                            <input
                                required
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
                            <input
                                required
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Image URL</label>
                        <div className="flex gap-4">
                            <input
                                required
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                type="url"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                        {formData.image && (
                            <div className="mt-2 h-32 w-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all resize-none"
                            placeholder="Product description..."
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium">Cancel</button>
                        <button type="submit" disabled={loading} className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 font-medium disabled:opacity-50">
                            {loading ? <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" /> : <Save size={18} />}
                            {initialData ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
