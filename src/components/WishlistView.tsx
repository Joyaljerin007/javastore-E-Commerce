import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, setActiveTab, setSelectedProduct } = useApp();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-xl text-slate-100">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Save your favorite products to your wishlist so you can quickly find and buy them later!
        </p>
        <button
          onClick={() => setActiveTab('store')}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">Saved Wishlist</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 font-bold">
            {wishlistedProducts.length} Items
          </span>
        </div>

        <button
          onClick={() => setActiveTab('store')}
          className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Store
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlistedProducts.map((product) => {
          const effectivePrice = product.discountPrice || product.price;

          return (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md space-y-3 p-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-slate-900/80 text-rose-500 hover:bg-slate-900"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase">{product.categoryName}</div>
                  <h3
                    onClick={() => { setSelectedProduct(product); setActiveTab('product-detail'); }}
                    className="font-bold text-sm text-slate-100 hover:text-amber-400 cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-amber-400 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="font-extrabold text-amber-400 text-base">
                  ₹{effectivePrice.toLocaleString()}
                </div>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toggleWishlist(product.id);
                  }}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Move to Cart
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
