import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  SlidersHorizontal, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductList: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    minRatingFilter,
    setMinRatingFilter,
    sortBy,
    setSortBy,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setActiveTab
  } = useApp();

  const [onlyInStock, setOnlyInStock] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategoryId !== null && product.categoryId !== selectedCategoryId) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const catMatch = product.categoryName?.toLowerCase().includes(query);
        const skuMatch = product.sku.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !catMatch && !skuMatch) {
          return false;
        }
      }
      // Price range
      const effectivePrice = product.discountPrice || product.price;
      if (effectivePrice < priceRange[0] || effectivePrice > priceRange[1]) {
        return false;
      }
      // Rating filter
      if (minRatingFilter > 0 && product.rating < minRatingFilter) {
        return false;
      }
      // In Stock filter
      if (onlyInStock && product.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategoryId, searchQuery, priceRange, minRatingFilter, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategoryId(null);
    setSearchQuery('');
    setPriceRange([0, 30000]);
    setMinRatingFilter(0);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner for E-Commerce Platform */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Data Alcott Systems Java Full Stack Internship Task
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
            Online Shopping Platform
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Full-stack e-commerce store with product search, category filtering, persistent shopping cart, payment gateway simulator, and Spring Boot REST backend logic.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-sky-300 border border-slate-700">Spring Boot 3</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-amber-300 border border-slate-700">Hibernate ORM</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-emerald-300 border border-slate-700">MySQL Database</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-purple-300 border border-slate-700">Spring Security</span>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block space-y-6 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-sm text-slate-200 self-start">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-100">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              Filter Products
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Categories
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategoryId === null
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>All Categories</span>
                <span className="opacity-70">{products.length}</span>
              </button>

              {categories.map((cat) => {
                const count = products.filter(p => p.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategoryId === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-400 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-amber-400">₹{priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="30000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRatingFilter(rating)}
                  className={`py-1.5 text-xs rounded-lg font-medium border transition-colors flex items-center justify-center gap-1 ${
                    minRatingFilter === rating
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+`}
                  {rating > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-800"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>

        </aside>

        {/* Product Catalog Display */}
        <main className="lg:col-span-3 space-y-4">
          
          {/* Top Bar: Count + Mobile Filter Trigger + Sort Selector */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 shadow-sm">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 font-medium"
              >
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                Filters
              </button>

              <span className="font-semibold text-slate-200">
                Showing <strong className="text-amber-400">{filteredProducts.length}</strong> of {products.length} Products
              </span>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <span className="text-slate-400 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 text-xs text-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-100">Filter Options</span>
                <button onClick={resetFilters} className="text-amber-400">Reset All</button>
              </div>

              <div>
                <label className="font-bold text-slate-400 block mb-1">Categories</label>
                <select
                  value={selectedCategoryId || ''}
                  onChange={(e) => setSelectedCategoryId(e.target.value ? Number(e.target.value) : null)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-400 block mb-1">Max Price: ₹{priceRange[1]}</label>
                <input
                  type="range"
                  min="500"
                  max="30000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">No matching products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try resetting your filters, clearing your search keywords, or selecting a different category.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const inWish = isInWishlist(product.id);
                const effectivePrice = product.discountPrice || product.price;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-slate-900 border border-slate-800/90 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    
                    {/* Image Box */}
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Stock Badge */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-amber-300 backdrop-blur-md border border-amber-500/30">
                          {product.categoryName}
                        </span>
                        {product.stock <= 5 && product.stock > 0 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white shadow">
                            Only {product.stock} Left!
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                          inWish
                            ? 'bg-rose-500 text-white shadow-md'
                            : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                        title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                      </button>

                      {/* Quick View Button on Hover */}
                      <button
                        onClick={() => { setSelectedProduct(product); setActiveTab('product-detail'); }}
                        className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Full Specs & Reviews
                      </button>
                    </div>

                    {/* Content Box */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      
                      <div className="space-y-1.5">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <div className="flex items-center text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold ml-1">{product.rating}</span>
                          </div>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 text-[11px]">{product.reviewCount} Reviews</span>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => { setSelectedProduct(product); setActiveTab('product-detail'); }}
                          className="font-bold text-sm text-slate-100 hover:text-amber-400 cursor-pointer line-clamp-2 leading-snug transition-colors"
                        >
                          {product.name}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing & Cart Action */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-lg font-extrabold text-amber-400">
                            ₹{effectivePrice.toLocaleString()}
                          </div>
                          {product.discountPrice && (
                            <div className="text-[11px] text-slate-500 line-through">
                              ₹{product.price.toLocaleString()}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          disabled={product.stock <= 0}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            product.stock > 0
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md hover:scale-102'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
