import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, Review, User, ActiveTab, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_REVIEWS, SAMPLE_USERS, INITIAL_ORDERS } from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  
  products: Product[];
  categories: Category[];
  reviews: Review[];
  
  cart: CartItem[];
  wishlist: number[]; // Product IDs
  orders: Order[];
  
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  selectedCategoryId: number | null;
  setSelectedCategoryId: (catId: number | null) => void;
  
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  
  minRatingFilter: number;
  setMinRatingFilter: (rating: number) => void;
  
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest') => void;
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  
  addReview: (productId: number, rating: number, comment: string) => void;
  
  placeOrder: (
    shippingAddress: any, 
    paymentMethod: 'RAZORPAY' | 'STRIPE' | 'COD' | 'UPI', 
    paymentId?: string
  ) => Order;
  
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Admin Product CRUD
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  
  // Admin Category CRUD
  addCategory: (name: string, description: string) => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Student Code details
  studentCode: string;
  setStudentCode: (code: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth State
  const [users] = useState<User[]>(SAMPLE_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(SAMPLE_USERS[1]); // Default as Intern Customer
  
  // Data State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('das_javastore_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('das_javastore_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('das_javastore_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('das_javastore_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('das_javastore_wishlist');
    return saved ? JSON.parse(saved) : [101, 103];
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('das_javastore_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  
  // UI State
  const [activeTab, setActiveTab] = useState<ActiveTab>('store');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  
  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  
  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Student metadata
  const [studentCode, setStudentCode] = useState<string>('DAS-JV-001');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('das_javastore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('das_javastore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('das_javastore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('das_javastore_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast Helper
  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: Date.now(), productId: product.id, product, quantity }];
    });
    addToast('Added to Cart', `Added ${quantity}x "${product.name}" to your shopping cart.`, 'success');
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
    addToast('Item Removed', 'Product removed from shopping cart.', 'info');
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon('');
    setCouponDiscount(0);
  };

  const applyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'DASINTERN10') {
      setAppliedCoupon('DASINTERN10');
      setCouponDiscount(0.10); // 10% OFF
      addToast('Coupon Applied!', '10% Internship discount applied to your cart.', 'success');
      return true;
    } else if (formatted === 'SPRINGBOOT50') {
      setAppliedCoupon('SPRINGBOOT50');
      setCouponDiscount(0.15); // 15% OFF
      addToast('Special Offer Applied!', '15% Spring Boot discount applied.', 'success');
      return true;
    } else {
      addToast('Invalid Coupon', 'Coupon code not recognized. Try "DASINTERN10".', 'error');
      return false;
    }
  };

  // Wishlist Actions
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', 'Item removed from your saved list.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Added to Wishlist', 'Item saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  // Reviews
  const addReview = (productId: number, rating: number, comment: string) => {
    if (!currentUser) {
      addToast('Login Required', 'Please log in to submit a review.', 'warning');
      return;
    }
    const newRev: Review = {
      id: Date.now(),
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userAvatar: currentUser.avatar,
      productId,
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [newRev, ...prev]);

    // Recalculate rating on product
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const productRevs = [...reviews.filter(r => r.productId === productId), newRev];
        const avg = productRevs.reduce((acc, r) => acc + r.rating, 0) / productRevs.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewCount: productRevs.length
        };
      }
      return p;
    }));

    addToast('Review Submitted', 'Thank you for rating this product!', 'success');
  };

  // Order Placement
  const placeOrder = (
    shippingAddress: any, 
    paymentMethod: 'RAZORPAY' | 'STRIPE' | 'COD' | 'UPI', 
    paymentId?: string
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmount = Math.round(subtotal * couponDiscount);
    const tax = Math.round((subtotal - discountAmount) * 0.05); // 5% GST/Tax
    const shippingFee = subtotal > 1500 ? 0 : 99;
    const totalAmount = subtotal - discountAmount + tax + shippingFee;

    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      userId: currentUser ? currentUser.id : 2,
      userName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : shippingAddress.fullName,
      userEmail: currentUser ? currentUser.email : shippingAddress.email,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      items: cart.map(item => ({
        id: Date.now() + Math.random(),
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.imageUrl,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price
      })),
      subtotal,
      discount: discountAmount,
      tax,
      shippingFee,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentId: paymentId || `pay_SIM_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      estimatedDeliveryDate: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast('Order Placed!', `Your order ${orderId} has been confirmed.`, 'success');
    return newOrder;
  };

  // Admin Order Status Update
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status } : ord));
    addToast('Order Status Updated', `Order ${orderId} is now set to ${status}.`, 'info');
  };

  // Admin Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const newId = Math.max(...products.map(p => p.id), 100) + 1;
    const newProduct: Product = {
      ...productData,
      id: newId,
      rating: 5.0,
      reviewCount: 1,
      categoryName: categories.find(c => c.id === productData.categoryId)?.name || 'General'
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast('Product Added', `New product "${newProduct.name}" created in inventory.`, 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? {
      ...updatedProduct,
      categoryName: categories.find(c => c.id === updatedProduct.categoryId)?.name || p.categoryName
    } : p));
    addToast('Product Updated', `Inventory details for "${updatedProduct.name}" saved.`, 'success');
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast('Product Deleted', 'Product removed from store catalog.', 'info');
  };

  const addCategory = (name: string, description: string) => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const newCat: Category = {
      id: newId,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description,
      productCount: 0
    };
    setCategories(prev => [...prev, newCat]);
    addToast('Category Created', `New product category "${name}" added.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        products,
        categories,
        reviews,
        cart,
        wishlist,
        orders,
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
        priceRange,
        setPriceRange,
        minRatingFilter,
        setMinRatingFilter,
        sortBy,
        setSortBy,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        toggleWishlist,
        isInWishlist,
        addReview,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        toasts,
        addToast,
        removeToast,
        studentCode,
        setStudentCode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
