import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderBanner } from './components/HeaderBanner';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartView } from './components/CartView';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryView } from './components/OrderHistoryView';
import { WishlistView } from './components/WishlistView';
import { AdminDashboard } from './components/AdminDashboard';
import { InternshipSubmissionSuite } from './components/InternshipSubmissionSuite';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      <div>
        <HeaderBanner />
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'store' && <ProductList />}
          {activeTab === 'product-detail' && <ProductDetailModal />}
          {activeTab === 'cart' && <CartView />}
          {activeTab === 'checkout' && <CheckoutModal />}
          {activeTab === 'orders' && <OrderHistoryView />}
          {activeTab === 'wishlist' && <WishlistView />}
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'internship-suite' && <InternshipSubmissionSuite />}
        </main>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
