import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  Heart, 
  Package, 
  ShieldCheck, 
  FileCheck2, 
  User as UserIcon, 
  Menu, 
  X, 
  LogOut, 
  Laptop, 
  Shirt, 
  Home, 
  BookOpen, 
  Dumbbell, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cart,
    wishlist,
    orders,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    currentUser,
    setCurrentUser,
    users,
    addToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Dumbbell': return <Dumbbell className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab !== 'store') {
      setActiveTab('store');
    }
  };

  const switchUserRole = (userEmail: string) => {
    const target = users.find(u => u.email === userEmail);
    if (target) {
      setCurrentUser(target);
      setUserDropdownOpen(false);
      addToast('Switched User Role', `Now logged in as ${target.firstName} (${target.role}).`, 'info');
      if (target.role === 'ROLE_ADMIN') {
        setActiveTab('admin');
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => { setActiveTab('store'); setSelectedCategoryId(null); }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                    JAVASTORE
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    E-Commerce
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Data Alcott Systems Platform</p>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              placeholder="Search products by title, category, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Main Desktop Navigation Actions */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'store'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Store
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                activeTab === 'wishlist'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              Orders
              {orders.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-indigo-500 text-white text-[10px] font-bold rounded-full">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative flex items-center gap-2 ${
                activeTab === 'cart'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {totalCartCount > 0 && (
                <span className="px-2 py-0.5 bg-slate-950 text-amber-300 text-xs font-bold rounded-full border border-amber-500/50">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-500/50'
                  : 'text-purple-300 hover:bg-purple-950/40 border border-purple-800/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Admin Panel
            </button>

            {/* Internship Submission Suite Button */}
            <button
              onClick={() => setActiveTab('internship-suite')}
              className={`ml-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'internship-suite'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                  : 'text-emerald-300 hover:bg-emerald-950/40 border border-emerald-800/40'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              Task Submission
            </button>
          </div>

          {/* User Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-colors text-xs text-slate-200"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                alt={currentUser?.firstName}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-amber-500/30"
              />
              <div className="hidden sm:block text-left">
                <div className="font-bold text-slate-100 flex items-center gap-1">
                  {currentUser?.firstName}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[10px] text-amber-400/90 font-mono">
                  {currentUser?.role === 'ROLE_ADMIN' ? 'ADMIN ROLE' : 'STUDENT INTERN'}
                </div>
              </div>
            </button>

            {/* Role Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs text-slate-200">
                <div className="px-3 py-2 border-b border-slate-800 bg-slate-950/50">
                  <p className="font-semibold text-slate-100">{currentUser?.firstName} {currentUser?.lastName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {currentUser?.role}
                  </span>
                </div>

                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Role (Demo)
                </div>

                <button
                  onClick={() => switchUserRole('intern.das001@freeinternships.in')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    currentUser?.email === 'intern.das001@freeinternships.in' ? 'bg-slate-800/80 font-bold text-amber-400' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-3.5 h-3.5 text-sky-400" />
                    <div>
                      <div>Student Intern Customer</div>
                      <div className="text-[10px] text-slate-400">ROLE_USER</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => switchUserRole('admin@dataalcott.com')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    currentUser?.email === 'admin@dataalcott.com' ? 'bg-slate-800/80 font-bold text-purple-400' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <div>
                      <div>Data Alcott Admin</div>
                      <div className="text-[10px] text-slate-400">ROLE_ADMIN</div>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cart')}
              className="p-2 rounded-lg bg-amber-500/20 text-amber-300 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto scrollbar-none py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <button
            onClick={() => { setSelectedCategoryId(null); if(activeTab !== 'store') setActiveTab('store'); }}
            className={`px-3 py-1.5 rounded-lg transition-all shrink-0 font-medium flex items-center gap-1.5 ${
              selectedCategoryId === null && activeTab === 'store'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            All Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategoryId(cat.id); if(activeTab !== 'store') setActiveTab('store'); }}
              className={`px-3 py-1.5 rounded-lg transition-all shrink-0 font-medium flex items-center gap-1.5 ${
                selectedCategoryId === cat.id && activeTab === 'store'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-100 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <button
              onClick={() => { setActiveTab('store'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 text-slate-200"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              Store Front
            </button>

            <button
              onClick={() => { setActiveTab('cart'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 text-slate-200"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              Cart ({totalCartCount})
            </button>

            <button
              onClick={() => { setActiveTab('wishlist'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 text-slate-200"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              Wishlist ({wishlist.length})
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 text-slate-200"
            >
              <Package className="w-4 h-4 text-indigo-400" />
              My Orders ({orders.length})
            </button>

            <button
              onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/60"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Admin Panel
            </button>

            <button
              onClick={() => { setActiveTab('internship-suite'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              Task Submission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
