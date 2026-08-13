import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    setActiveTab
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * couponDiscount);
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const totalAmount = subtotal - discountAmount + tax + shippingFee;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Looks like you haven't added any items to your cart yet. Explore our product catalog and start shopping!
        </p>
        <button
          onClick={() => setActiveTab('store')}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all"
        >
          Explore Catalog Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">Shopping Cart</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-100">
        
        {/* Left: Cart Items Table/List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const price = item.product.discountPrice || item.product.price;
            const itemTotal = price * item.quantity;

            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-bold text-sm text-slate-100 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      ₹{price.toLocaleString()} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center border border-slate-700 rounded-lg bg-slate-800">
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-300 hover:text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-amber-300">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-300 hover:text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[80px]">
                    <div className="font-extrabold text-amber-400 text-sm">
                      ₹{itemTotal.toLocaleString()}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            );
          })}

          <button
            onClick={() => setActiveTab('store')}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {/* Right: Order Summary Card */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="font-extrabold text-base text-white pb-2 border-b border-slate-800">
              Order Summary
            </h3>

            {/* Coupon Promo Box */}
            <form onSubmit={handleApplyCouponSubmit} className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Discount Coupon</span>
                <span className="text-[10px] text-amber-400 font-mono">Use DASINTERN10</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. DASINTERN10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-lg border border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium pt-1">
                  <Check className="w-3.5 h-3.5" />
                  Coupon <strong>{appliedCoupon}</strong> active! ({(couponDiscount * 100)}% off)
                </div>
              )}
            </form>

            {/* Subtotal Calculations */}
            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Tax (5% GST)</span>
                <span className="font-semibold">₹{tax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-400 font-bold">FREE</span>
                ) : (
                  <span className="font-semibold">₹{shippingFee}</span>
                )}
              </div>

              <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-amber-400">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => setActiveTab('checkout')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulated Payment Gateway (Razorpay / Stripe)</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
