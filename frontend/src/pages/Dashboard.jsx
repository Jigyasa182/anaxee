import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Beauty', 'Sports', 'Other'];

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://anaxee-backend.onrender.com/api/products`, {
                params: {
                    search,
                    category
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [search, category]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchProducts]);

    const handleAddOrUpdate = async (productData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (editingProduct) {
                await axios.put(`https://anaxee-backend.onrender.com/api/products/${editingProduct._id}`, productData, config);
            } else {
                await axios.post('https://anaxee-backend.onrender.com/api/products', productData, config);
            }
            fetchProducts();
            setShowAddModal(false);
            setEditingProduct(null);
        } catch (error) {
            console.error('Error saving product:', error);
            alert(error.response?.data?.message || 'Error saving product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://anaxee-backend.onrender.com/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setShowAddModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
                        <p className="text-gray-500 mt-1">Manage your products, stock, and categories.</p>
                    </div>
                    <button
                        onClick={() => { setEditingProduct(null); setShowAddModal(true); }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Product
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name or SKU..."
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); }}
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</label>
                        <select
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Table */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center text-gray-500">Loading products...</div>
                    ) : (
                        <ProductTable 
                            products={products} 
                            onEdit={openEditModal} 
                            onDelete={handleDelete} 
                        />
                    )}
                </div>
            </div>

            {/* Modal Overlay */}
            {showAddModal && (
                <>
                    {/* Backdrop: Semi-transparent to let dashboard peek through */}
                    <div 
                        className="fixed inset-0 z-40 bg-gray-600 bg-opacity-20 backdrop-blur-[2px] transition-opacity"
                        onClick={() => setShowAddModal(false)}
                    ></div>

                    {/* Modal Content Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto transform transition-all">
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                        {editingProduct ? 'Update Product' : 'New Product'}
                                    </h3>
                                    <button 
                                        onClick={() => setShowAddModal(false)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-2 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <ProductForm 
                                    initialData={editingProduct} 
                                    onSubmit={handleAddOrUpdate} 
                                    onCancel={() => setShowAddModal(false)} 
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
