import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Printer, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const OrderHistoryView: React.FC = () => {
  const { orders, setActiveTab } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            In Transit / Shipped
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Processing
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Pending Approval
          </span>
        );
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">No Orders Placed Yet</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          You haven't placed any orders on JavaStore yet. Place your first order to see real-time order tracking in action!
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
          <Package className="w-6 h-6 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">Order History & Tracking</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold">
            {orders.length} Orders
          </span>
        </div>

        <button
          onClick={() => window.print()}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          Print Invoices
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6 text-slate-100">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono">ORDER ID</span>
                <div className="font-extrabold text-amber-400 text-sm">{order.id}</div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block">ORDER DATE</span>
                <span className="font-semibold text-slate-200">{order.orderDate}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block">TOTAL AMOUNT</span>
                <span className="font-extrabold text-white text-sm">₹{order.totalAmount.toLocaleString()}</span>
              </div>

              <div>{getStatusBadge(order.status)}</div>
            </div>

            {/* Visual Progress Timeline Tracker */}
            <div className="py-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Order Delivery Status
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((step, idx) => {
                  const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
                  const currentIndex = statuses.indexOf(order.status);
                  const isCompleted = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div key={step} className="space-y-1">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isCompleted
                            ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                            : 'bg-slate-800'
                        }`}
                      />
                      <span
                        className={`block font-bold ${
                          isCurrent
                            ? 'text-amber-400'
                            : isCompleted
                            ? 'text-slate-200'
                            : 'text-slate-500'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items List */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs p-2 rounded-lg bg-slate-950/60 border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900"
                    />
                    <div>
                      <div className="font-bold text-slate-200">{item.productName}</div>
                      <div className="text-[11px] text-slate-400">Qty: {item.quantity} x ₹{item.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="font-bold text-amber-400">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Address & Payment Details */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <div>
                <strong>Shipping Address:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.streetAddress}, {order.shippingAddress.city}
              </div>
              <div className="font-mono text-emerald-400 text-[11px]">
                Paid via {order.paymentMethod} ({order.paymentId})
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
