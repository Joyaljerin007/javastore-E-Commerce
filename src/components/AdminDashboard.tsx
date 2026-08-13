import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, OrderStatus } from '../types';
import { 
  ShieldCheck, 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Layers, 
  X, 
  Check, 
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    categories,
    orders,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateOrderStatus
  } = useApp();

  const [adminTab, setAdminTab] = useState<'PRODUCTS' | 'ORDERS' | 'CATEGORIES' | 'USERS'>('PRODUCTS');
  const [productSearch, setProductSearch] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    price: 1000,
    discountPrice: 899,
    stock: 20,
    categoryId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    sku: 'EL-NEW-001'
  });

  // Category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // KPI calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData
      });
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      description: '',
      detailedDescription: '',
      price: 1000,
      discountPrice: 899,
      stock: 20,
      categoryId: 1,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      sku: `PROD-${Math.floor(100 + Math.random() * 900)}`
    });
  };

  const startEditing = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      description: p.description,
      detailedDescription: p.detailedDescription || '',
      price: p.price,
      discountPrice: p.discountPrice || p.price,
      stock: p.stock,
      categoryId: p.categoryId,
      imageUrl: p.imageUrl,
      sku: p.sku
    });
    setIsAddModalOpen(true);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName, newCatDesc);
    setNewCatName('');
    setNewCatDesc('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/50 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            ADMIN ROLE AUTHORIZED
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Admin Management Dashboard</h1>
          <p className="text-xs text-slate-300">
            Manage product inventory, process customer orders, configure categories, and oversee system analytics.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-slate-400 flex items-center justify-between">
            <span>Total Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">From {totalOrdersCount} processed orders</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-slate-400 flex items-center justify-between">
            <span>Total Orders</span>
            <Package className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-300">{totalOrdersCount}</div>
          <div className="text-[10px] text-slate-500">Order history tracking active</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-slate-400 flex items-center justify-between">
            <span>Catalog Products</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{totalProductsCount}</div>
          <div className="text-[10px] text-slate-500">{categories.length} product categories</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-slate-400 flex items-center justify-between">
            <span>Registered Users</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-sky-300">{users.length}</div>
          <div className="text-[10px] text-slate-500">Role-Based Auth (BCrypt)</div>
        </div>
      </div>

      {/* Admin Tab Switches */}
      <div className="flex border-b border-slate-800 gap-2 text-xs font-bold">
        <button
          onClick={() => setAdminTab('PRODUCTS')}
          className={`pb-3 px-4 transition-colors border-b-2 ${
            adminTab === 'PRODUCTS'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Product Management ({products.length})
        </button>

        <button
          onClick={() => setAdminTab('ORDERS')}
          className={`pb-3 px-4 transition-colors border-b-2 ${
            adminTab === 'ORDERS'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Order Status Management ({orders.length})
        </button>

        <button
          onClick={() => setAdminTab('CATEGORIES')}
          className={`pb-3 px-4 transition-colors border-b-2 ${
            adminTab === 'CATEGORIES'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Categories ({categories.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {adminTab === 'PRODUCTS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search inventory by title or SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => { setEditingProduct(null); setIsAddModalOpen(true); }}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/50">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-slate-950" />
                        <div>
                          <div className="font-bold text-slate-200 line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-slate-500">Rating: {p.rating}★</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-amber-400 font-medium">{p.categoryName}</td>
                    <td className="p-3 font-bold text-white">₹{(p.discountPrice || p.price).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stock > 10 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400 text-[11px]">{p.sku}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => startEditing(p)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ORDERS TAB */}
      {adminTab === 'ORDERS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-white">Order Status Lifecycle Control</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/50">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-amber-400">{ord.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-200">{ord.userName}</div>
                      <div className="text-[10px] text-slate-500">{ord.userEmail}</div>
                    </td>
                    <td className="p-3 text-slate-400">{ord.orderDate}</td>
                    <td className="p-3 font-bold text-white">₹{ord.totalAmount.toLocaleString()}</td>
                    <td className="p-3 text-emerald-400 font-mono text-[11px]">{ord.paymentMethod}</td>
                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-slate-950 border border-slate-800 text-amber-300 font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CATEGORIES TAB */}
      {adminTab === 'CATEGORIES' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
          <form onSubmit={handleAddCategorySubmit} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-xs text-amber-400">Add New Product Category</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Category Name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                required
                className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-100"
              />
              <input
                type="text"
                placeholder="Category Description"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-100"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
            >
              Create Category
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {categories.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200 text-sm">{c.name}</div>
                <p className="text-slate-400 text-xs">{c.description}</p>
                <div className="text-[10px] text-amber-400 font-mono pt-1">
                  {products.filter(p => p.categoryId === c.id).length} Active Products
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-amber-400">
                {editingProduct ? 'Edit Product Inventory' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Product Title *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Stock Count *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Image URL *</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
