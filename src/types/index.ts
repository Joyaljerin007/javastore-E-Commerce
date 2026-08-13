export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  productCount?: number;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  productId: number;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  categoryId: number;
  categoryName?: string;
  imageUrl: string;
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  isFeatured?: boolean;
  specifications?: Record<string, string>;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string; // e.g., ORD-2026-8941
  userId: number;
  userName: string;
  userEmail: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'RAZORPAY' | 'STRIPE' | 'COD' | 'UPI';
  paymentId?: string;
  estimatedDeliveryDate?: string;
}

export type ActiveTab = 
  | 'store' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'orders' 
  | 'wishlist' 
  | 'admin' 
  | 'internship-suite';

export interface CodeFile {
  path: string;
  filename: string;
  language: string;
  content: string;
  description: string;
}
