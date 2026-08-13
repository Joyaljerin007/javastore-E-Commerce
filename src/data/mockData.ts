import { Category, Product, Review, User, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'Electronics & Tech', slug: 'electronics', description: 'Smartphones, Laptops, Audio & Accessories', iconName: 'Laptop', productCount: 6 },
  { id: 2, name: 'Fashion & Apparel', slug: 'fashion', description: 'Trendy Clothing, Footwear & Accessories', iconName: 'Shirt', productCount: 5 },
  { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Smart Home Appliances, Decor & Utensils', iconName: 'Home', productCount: 4 },
  { id: 4, name: 'Books & Stationery', slug: 'books', description: 'Programming, Tech Books & Office Supplies', iconName: 'BookOpen', productCount: 4 },
  { id: 5, name: 'Sports & Fitness', slug: 'sports', description: 'Gym Equipment, Athletic Gear & Wearables', iconName: 'Dumbbell', productCount: 3 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Java Full Stack Developer Masterclass Bundle',
    description: 'Complete hands-on Java Spring Boot, Hibernate, React & MySQL course material with source code.',
    detailedDescription: 'Master modern full stack development using Java 21, Spring Boot 3, Hibernate JPA, REST APIs, Security, MySQL, and React frontend. Includes 50+ hours of video lessons, architectural diagrams, and production-ready source code templates.',
    price: 1499,
    discountPrice: 999,
    stock: 45,
    categoryId: 4,
    categoryName: 'Books & Stationery',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewCount: 38,
    sku: 'BK-JAV-001',
    isFeatured: true,
    specifications: {
      'Format': 'Hardcover + Digital eBook',
      'Pages': '680 Pages',
      'Language': 'English',
      'Publisher': 'Data Alcott Tech Press',
      'Edition': '2026 3rd Edition'
    }
  },
  {
    id: 102,
    name: 'Pro Noise-Cancelling Wireless Headphones',
    description: 'High-fidelity Bluetooth 5.3 headphones with active noise cancellation and 40-hour battery life.',
    detailedDescription: 'Experience pristine audio quality with custom 40mm neodymium drivers. Features dual-mic AI noise suppression for clear calls, low latency gaming mode, fast USB-C charging (10 mins charge = 5 hours playback), and memory foam ear cushions.',
    price: 4999,
    discountPrice: 3499,
    stock: 22,
    categoryId: 1,
    categoryName: 'Electronics & Tech',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewCount: 124,
    sku: 'EL-AUD-102',
    isFeatured: true,
    specifications: {
      'Bluetooth Version': '5.3',
      'Battery Life': '40 Hours ANC On',
      'Driver Size': '40mm',
      'Weight': '250g',
      'Warranty': '1 Year Manufacturer'
    }
  },
  {
    id: 103,
    name: 'Smart Ergonomic RGB Mechanical Keyboard',
    description: 'Hot-swappable mechanical keyboard with custom tactile switches and programmable macro keys.',
    detailedDescription: 'Built for developers and gamers alike. Features durable PBT double-shot keycaps, per-key RGB backlighting, detachable Type-C braided cable, and multi-device Bluetooth/2.4GHz wireless connectivity.',
    price: 3899,
    discountPrice: 2999,
    stock: 15,
    categoryId: 1,
    categoryName: 'Electronics & Tech',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 62,
    sku: 'EL-KEY-103',
    isFeatured: true,
    specifications: {
      'Switch Type': 'Tactile Brown Switches',
      'Layout': '75% Compact',
      'Connectivity': 'Bluetooth 5.1 / 2.4Ghz / Type-C',
      'Backlight': 'RGB 16.8 Million Colors'
    }
  },
  {
    id: 104,
    name: 'Classic Leather Laptop Backpack (15.6")',
    description: 'Premium water-resistant genuine leather laptop backpack with hidden anti-theft pocket.',
    detailedDescription: 'Crafted from full-grain vintage leather, this laptop bag combines timeless elegance with functional ergonomics. Includes dedicated padded sleeve for 15.6-inch laptops, built-in USB charging port, and breathable mesh back panel.',
    price: 2499,
    discountPrice: 1899,
    stock: 30,
    categoryId: 2,
    categoryName: 'Fashion & Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewCount: 45,
    sku: 'FA-BAG-104',
    isFeatured: false,
    specifications: {
      'Material': 'Water-Resistant PU Leather',
      'Capacity': '25 Liters',
      'Fits Laptop Size': 'Up to 15.6 inches',
      'Dimensions': '45 x 30 x 15 cm'
    }
  },
  {
    id: 105,
    name: 'Ultra HD 4K Curved Gaming Monitor 27"',
    description: '165Hz refresh rate 1ms response time IPS display with HDR400 and AMD FreeSync Premium.',
    detailedDescription: 'Immerse yourself in crystal clear 4K visuals with 99% sRGB color gamut coverage. Curved 1500R screen reduces eye strain during long coding sessions or gaming marathons. Features HDMI 2.1 and DisplayPort inputs.',
    price: 24999,
    discountPrice: 19999,
    stock: 8,
    categoryId: 1,
    categoryName: 'Electronics & Tech',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 89,
    sku: 'EL-MON-105',
    isFeatured: true,
    specifications: {
      'Screen Size': '27 Inch',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Refresh Rate': '165Hz',
      'Panel Type': 'IPS 1ms GTG'
    }
  },
  {
    id: 106,
    name: 'Smart WiFi Espresso Coffee Maker',
    description: '15-bar Italian pressure pump automatic espresso machine with built-in milk frother.',
    detailedDescription: 'Brew cafe-quality cappuccinos, lattes, and espressos at home. Schedule your morning brew via smartphone app, adjust coffee strength and temperature, and enjoy automatic cleaning cycle.',
    price: 11999,
    discountPrice: 8999,
    stock: 12,
    categoryId: 3,
    categoryName: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 54,
    sku: 'HK-COF-106',
    isFeatured: false,
    specifications: {
      'Pressure': '15 Bar',
      'Water Tank': '1.8 Liters',
      'Power': '1350W',
      'Control': 'Touch Screen & Mobile App'
    }
  },
  {
    id: 107,
    name: 'Stainless Steel Insulated Smart Water Bottle (750ml)',
    description: 'Temperature display vacuum insulated bottle that keeps beverages cold for 24h or hot for 12h.',
    detailedDescription: 'Made with food-grade 304 stainless steel. Features LED touch display on the cap showing current liquid temperature, hydration reminder alarms, and leak-proof silicone seal.',
    price: 1299,
    discountPrice: 899,
    stock: 50,
    categoryId: 5,
    categoryName: 'Sports & Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewCount: 29,
    sku: 'SP-BOT-107',
    isFeatured: false,
    specifications: {
      'Capacity': '750 ml',
      'Insulation': 'Double Wall Vacuum',
      'Material': 'BPA-Free 304 Stainless Steel'
    }
  },
  {
    id: 108,
    name: 'Clean Code & Microservices Architecture Design',
    description: 'Definitive guide to scalable software engineering, Spring Cloud, Docker, and Kubernetes.',
    detailedDescription: 'Learn industry best practices for modular architecture, domain-driven design, transactional messaging, and resilient Spring Boot microservices. Essential reading for every Java engineer.',
    price: 999,
    discountPrice: 799,
    stock: 25,
    categoryId: 4,
    categoryName: 'Books & Stationery',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 71,
    sku: 'BK-ARC-108',
    isFeatured: true,
    specifications: {
      'Format': 'Paperback',
      'Pages': '520 Pages',
      'Language': 'English',
      'Author': 'Data Alcott Tech Experts'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    userId: 2,
    userName: 'Anshul Deep Bajpai',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    productId: 101,
    rating: 5,
    comment: 'The Java Full Stack Internship course material helped me build my e-commerce project easily. The Spring Boot + JPA explanations are top notch!',
    createdAt: '2026-08-01'
  },
  {
    id: 2,
    userId: 3,
    userName: 'Khushal Mudgil',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    productId: 102,
    rating: 5,
    comment: 'Exceptional active noise cancellation! Great sound quality and deep bass. Battery lasts for days of coding.',
    createdAt: '2026-08-05'
  },
  {
    id: 3,
    userId: 4,
    userName: 'Harshada Sable',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    productId: 103,
    rating: 4,
    comment: 'Awesome typing feel! The tactile switches are quiet enough for work while delivering satisfying feedback.',
    createdAt: '2026-08-08'
  }
];

export const SAMPLE_USERS: User[] = [
  {
    id: 1,
    email: 'admin@dataalcott.com',
    firstName: 'Admin',
    lastName: 'System',
    role: 'ROLE_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    phone: '+91 9600095045',
    address: 'Data Alcott Systems Campus, Chennai, Tamil Nadu'
  },
  {
    id: 2,
    email: 'intern.das001@freeinternships.in',
    firstName: 'Data Alcott',
    lastName: 'Intern',
    role: 'ROLE_USER',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    phone: '+91 9876543210',
    address: 'Flat 4B, Tech Park Road, Chennai, India'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8941',
    userId: 2,
    userName: 'Data Alcott Intern',
    userEmail: 'intern.das001@freeinternships.in',
    orderDate: '2026-08-10',
    status: 'SHIPPED',
    items: [
      {
        id: 1,
        productId: 101,
        productName: 'Java Full Stack Developer Masterclass Bundle',
        productImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        quantity: 1,
        price: 999
      },
      {
        id: 2,
        productId: 107,
        productName: 'Stainless Steel Insulated Smart Water Bottle (750ml)',
        productImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
        quantity: 1,
        price: 899
      }
    ],
    subtotal: 1898,
    discount: 189,
    tax: 90,
    shippingFee: 0,
    totalAmount: 1799,
    shippingAddress: {
      fullName: 'Data Alcott Intern',
      email: 'intern.das001@freeinternships.in',
      phone: '+91 9876543210',
      streetAddress: '123 Innovation Way, Sector 5',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600001',
      country: 'India'
    },
    paymentMethod: 'RAZORPAY',
    paymentId: 'pay_RZP2026894101',
    estimatedDeliveryDate: '2026-08-13'
  },
  {
    id: 'ORD-2026-8902',
    userId: 2,
    userName: 'Data Alcott Intern',
    userEmail: 'intern.das001@freeinternships.in',
    orderDate: '2026-08-04',
    status: 'DELIVERED',
    items: [
      {
        id: 3,
        productId: 102,
        productName: 'Pro Noise-Cancelling Wireless Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        quantity: 1,
        price: 3499
      }
    ],
    subtotal: 3499,
    discount: 0,
    tax: 175,
    shippingFee: 0,
    totalAmount: 3674,
    shippingAddress: {
      fullName: 'Data Alcott Intern',
      email: 'intern.das001@freeinternships.in',
      phone: '+91 9876543210',
      streetAddress: '123 Innovation Way, Sector 5',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600001',
      country: 'India'
    },
    paymentMethod: 'STRIPE',
    paymentId: 'ch_STR2026890288',
    estimatedDeliveryDate: '2026-08-07'
  }
];
