import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Smartphone,
  Banknote,
  Download,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    placeOrder,
    setActiveTab,
    currentUser,
    appliedCoupon,
    couponDiscount
  } = useApp();

  // Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Data Alcott Intern',
    email: currentUser ? currentUser.email : 'intern.das001@freeinternships.in',
    phone: currentUser?.phone || '+91 9600095045',
    streetAddress: '123 Innovation Way, Tech Park, Sector 5',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipCode: '600001',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'STRIPE' | 'COD' | 'UPI'>('RAZORPAY');
  const [paymentStep, setPaymentStep] = useState<'DETAILS' | 'RAZORPAY_POPUP' | 'CONFIRMED'>('DETAILS');
  const [placedOrderRecord, setPlacedOrderRecord] = useState<Order | null>(null);

  // Razorpay Simulation State
  const [razorpayOtp, setRazorpayOtp] = useState('123456');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * couponDiscount);
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const shippingFee = subtotal > 1500 ? 0 : 99;
  const totalAmount = subtotal - discountAmount + tax + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'RAZORPAY' || paymentMethod === 'STRIPE' || paymentMethod === 'UPI') {
      setPaymentStep('RAZORPAY_POPUP');
    } else {
      // COD Order direct confirmation
      const newOrder = placeOrder(shippingAddress, 'COD');
      setPlacedOrderRecord(newOrder);
      setPaymentStep('CONFIRMED');
    }
  };

  const handleSimulatedPaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const payId = `pay_${paymentMethod}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const newOrder = placeOrder(shippingAddress, paymentMethod, payId);
      setPlacedOrderRecord(newOrder);
      setPaymentStep('CONFIRMED');
    }, 1200);
  };

  if (cart.length === 0 && paymentStep !== 'CONFIRMED') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8 space-y-4">
        <p className="text-slate-300 font-bold">Your cart is empty. Please add items before checking out.</p>
        <button
          onClick={() => setActiveTab('store')}
          className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Return to Store
        </button>
      </div>
    );
  }

  // ORDER CONFIRMED RECEIPT VIEW
  if (paymentStep === 'CONFIRMED' && placedOrderRecord) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Order Confirmed!</h1>
          <p className="text-xs text-slate-400">
            Thank you for your purchase. Order <strong className="text-amber-400">{placedOrderRecord.id}</strong> has been saved in MySQL database.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4 text-xs font-mono">
          <div className="flex justify-between pb-3 border-b border-slate-800 font-sans">
            <div>
              <span className="text-slate-400 block text-[10px]">ORDER ID</span>
              <span className="font-extrabold text-amber-400 text-sm">{placedOrderRecord.id}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">PAYMENT REF</span>
              <span className="font-semibold text-slate-200">{placedOrderRecord.paymentId}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-sans font-bold text-slate-300">Ordered Items:</div>
            {placedOrderRecord.items.map((item) => (
              <div key={item.id} className="flex justify-between text-slate-300">
                <span>{item.quantity}x {item.productName}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{placedOrderRecord.subtotal.toLocaleString()}</span>
            </div>
            {placedOrderRecord.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span>- ₹{placedOrderRecord.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST & Shipping</span>
              <span>₹{(placedOrderRecord.tax + placedOrderRecord.shippingFee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-amber-400 text-sm pt-2 border-t border-slate-800">
              <span>Paid Total</span>
              <span>₹{placedOrderRecord.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 font-sans">
            <strong>Shipping To:</strong> {placedOrderRecord.shippingAddress.fullName}, {placedOrderRecord.shippingAddress.streetAddress}, {placedOrderRecord.shippingAddress.city}, {placedOrderRecord.shippingAddress.state} - {placedOrderRecord.shippingAddress.zipCode}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => setActiveTab('orders')}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4" />
            Track Order in History
          </button>
          
          <button
            onClick={() => setActiveTab('store')}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            Back to Store
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Back to Cart */}
      <button
        onClick={() => setActiveTab('cart')}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-100">
        
        {/* Left 2 Cols: Shipping & Payment Method Form */}
        <form onSubmit={handleFormSubmit} className="md:col-span-2 space-y-6">
          
          {/* Shipping Address Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-400 pb-2 border-b border-slate-800">
              <Truck className="w-4 h-4" />
              Shipping Address
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Street Address *</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={shippingAddress.streetAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">State & PIN Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    required
                    className="w-2/3 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-1/3 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Gateway Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-400 pb-2 border-b border-slate-800">
              <CreditCard className="w-4 h-4" />
              Payment Gateway
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('RAZORPAY')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  paymentMethod === 'RAZORPAY'
                    ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-bold ring-2 ring-indigo-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-indigo-600 text-white font-black text-xs">RZP</div>
                <div>
                  <div className="font-bold">Razorpay</div>
                  <div className="text-[10px] text-slate-400">Cards, NetBanking & UPI</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('STRIPE')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  paymentMethod === 'STRIPE'
                    ? 'bg-purple-950/80 border-purple-500 text-purple-200 font-bold ring-2 ring-purple-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-purple-600 text-white font-black text-xs">STR</div>
                <div>
                  <div className="font-bold">Stripe</div>
                  <div className="text-[10px] text-slate-400">Credit / Debit Cards</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  paymentMethod === 'UPI'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-bold">UPI Payment</div>
                  <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  paymentMethod === 'COD'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold ring-2 ring-amber-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="font-bold">Cash On Delivery</div>
                  <div className="text-[10px] text-slate-400">Pay on doorstep</div>
                </div>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Pay ₹{totalAmount.toLocaleString()} Now
            </button>
          </div>

        </form>

        {/* Right 1 Col: Order Items Summary */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="font-extrabold text-sm text-white pb-2 border-b border-slate-800">
              Items in Order ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-200 truncate">{item.product.name}</div>
                    <div className="text-slate-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-amber-400">
                    ₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes & Shipping</span>
                <span>₹{(tax + shippingFee).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-amber-400 pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RAZORPAY / STRIPE SIMULATED MODAL POPUP */}
      {paymentStep === 'RAZORPAY_POPUP' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-slate-100">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white font-extrabold text-xs">
                  {paymentMethod}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{paymentMethod} Payment Gateway</h3>
                  <p className="text-[10px] text-slate-400">Data Alcott Merchant Simulator</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">₹{totalAmount.toLocaleString()}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Payee Merchant</div>
                <div className="font-bold text-slate-100">Data Alcott Systems E-Commerce Platform</div>
                <div className="text-slate-400 text-[10px]">Task Ref: JV-EC-001</div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold block">Enter Verification OTP (Simulated)</label>
                <input
                  type="text"
                  value={razorpayOtp}
                  onChange={(e) => setRazorpayOtp(e.target.value)}
                  className="w-full text-center tracking-widest font-mono text-base bg-slate-950 border border-indigo-500/50 rounded-xl py-2 text-amber-400 font-bold focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 text-center">Use default OTP: 123456</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPaymentStep('DETAILS')}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSimulatedPaymentSuccess}
                disabled={isProcessing}
                className="flex-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Authorize Payment</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
