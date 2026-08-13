export const GENERATE_README_MARKDOWN = (studentCode = 'DAS-JV-001', githubRepo = 'https://github.com/your-username/ecommerce-shopping-platform') => `# Online Shopping Platform (E-Commerce) - Java Full Stack Internship

**Company**: Data Alcott Systems ([www.dataalcott.com](https://www.dataalcott.com))  
**Task ID**: \`JV-EC-001\`  
**Student Code**: \`${studentCode}\`  
**Domain**: E-Commerce & Retail Technology  
**Program**: Free Java Full Stack Internship Online  
**Official Task Link**: [https://www.freeinternships.in/java-full-stack-internship/free-java-full-stack-internship-online-ecommerce-shopping-platform-jv-ec-001.php](https://www.freeinternships.in/java-full-stack-internship/free-java-full-stack-internship-online-ecommerce-shopping-platform-jv-ec-001.php)

---

## 📌 Executive Summary
The **Online Shopping Platform** is an enterprise-grade full-stack e-commerce web application developed as part of the **Data Alcott Systems** Free Java Full Stack Internship Online. The application enables seamless browsing of categorized products, keyword search, interactive shopping cart management, payment integration simulation (Razorpay/Stripe), order processing, customer profile history, wishlist, and a comprehensive Admin Dashboard for inventory and order status lifecycle management.

---

## 🛠️ Technology Stack
- **Backend Framework**: Java 17 / Spring Boot 3.2.3
- **ORM & Database**: Hibernate ORM, Spring Data JPA, MySQL 8.0
- **Security**: Spring Security 6 with BCrypt Password Encoding
- **Frontend Engine**: React 19, Tailwind CSS v4, Lucide Icons, Motion Transitions / Thymeleaf
- **Build Tool & Package Manager**: Maven, Vite, Node.js

---

## 📐 Database Architecture & Entity Schema
The underlying relational MySQL database (\`ecommerce_db\`) comprises the following key entities:
1. \`users\` - User details, roles (\`ROLE_USER\`, \`ROLE_ADMIN\`), authentication credentials.
2. \`categories\` - Product categorization hierarchy.
3. \`products\` - Product catalog with pricing, stock levels, rating metrics, and foreign key link to category.
4. \`cart_items\` - Persistent user shopping cart records.
5. \`orders\` - Master order records with statuses (\`PENDING\`, \`PROCESSING\`, \`SHIPPED\`, \`DELIVERED\`, \`CANCELLED\`), payment transaction ID, and delivery address.
6. \`order_items\` - Order line items linking products, ordered quantities, and captured prices.
7. \`wishlist\` - User saved items for future purchase.
8. \`reviews\` - Product customer ratings and feedback.

---

## 🚀 Key Features Implemented
- 🔒 **User Authentication & Role-Based Security**: Spring Security authentication with customer (\`ROLE_USER\`) and administrator (\`ROLE_ADMIN\`) privileges.
- 🛍️ **Product Catalog & Advanced Filtering**: Multi-criteria search by keyword, price range, categories, stock availability, and rating.
- 🛒 **Interactive Shopping Cart**: Dynamic price calculations, discount coupon application (\`DASINTERN10\`, \`SPRINGBOOT50\`), and real-time total updates.
- 💳 **Checkout & Payment Simulation**: Seamless Razorpay & Stripe mock payment authorization flow with OTP simulation and order confirmation receipts.
- 📦 **Order Tracking Lifecycle**: Live visual status tracker showing \`Order Placed\` → \`Processing\` → \`Shipped\` → \`Delivered\`.
- ⚙️ **Admin Control Panel**: Full CRUD operations for product inventory, order status workflow management, and user accounts supervision.
- 📄 **Submission & Export Suite**: Built-in 1-click generators for \`ecommerce_db.sql\` database dumps, project reports, and submission checklists.

---

## 💻 Local Setup & Execution Instructions

### Prerequisites:
- Java JDK 17 or higher
- MySQL Server 8.0+
- Maven 3.8+
- Node.js 18+ & npm

### Step 1: Clone Repository
\`\`\`bash
git clone ${githubRepo}
cd ecommerce-shopping-platform
\`\`\`

### Step 2: Configure Database
1. Open MySQL Command Line or MySQL Workbench:
\`\`\`sql
CREATE DATABASE ecommerce_db;
\`\`\`
2. Import the provided SQL dump file:
\`\`\`bash
mysql -u root -p ecommerce_db < database/ecommerce_db.sql
\`\`\`

### Step 3: Configure Spring Boot Database Credentials
Edit \`src/main/resources/application.properties\`:
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
\`\`\`

### Step 4: Run Application
\`\`\`bash
mvn spring-boot:run
\`\`\`
Open browser at \`http://localhost:8080\` or view the live interactive preview!

---

## 🎥 YouTube Video Demonstration & Blog Post
- **YouTube Link**: [Insert Your Video Link Here]
- **Internship Task Submission Post**: [https://www.freeinternships.in/blog/](https://www.freeinternships.in/blog/)

---
*© 2026 Data Alcott Systems. All Rights Reserved.*
`;

export const PROJECT_REPORT_MARKDOWN = (studentCode = 'DAS-JV-001') => `# INTERNSHIP PROJECT REPORT (2-3 PAGES)

**PROJECT TITLE**: Online Shopping Platform (E-Commerce)  
**TASK ID**: JV-EC-001  
**STUDENT CODE**: ${studentCode}  
**ORGANIZATION**: Data Alcott Systems (www.dataalcott.com)  
**PROGRAM**: Free Java Full Stack Internship Online  

---

## 1. INTRODUCTION & PROJECT OVERVIEW
The goal of this project is to build a full-featured, production-ready E-Commerce Online Shopping Platform. Modern online retail platforms demand seamless product discovery, responsive shopping carts, secure checkout processing, transaction tracking, and centralized administration for store managers.

Under the guidance of Data Alcott Systems, this task was developed using a robust Java Full Stack architecture featuring Spring Boot, Hibernate ORM, Spring Data JPA, MySQL relational database, and an interactive frontend interface.

---

## 2. ARCHITECTURE & SYSTEM DESIGN

### 2.1 Model-View-Controller (MVC) Pattern
The application strictly follows the classic Spring Boot MVC design pattern:
- Model Layer: JPA Entity classes (User, Product, Category, CartItem, Order, OrderItem, Review) mapping Java objects directly to MySQL database tables via Hibernate.
- View Layer: Reactive components / Thymeleaf templates presenting dynamic interfaces to customers and administrators.
- Controller Layer: RESTful Spring Controllers handling request mappings (/products, /cart, /checkout, /admin), data validation, and session handling.
- Service Layer: Encapsulated business logic for pricing rules, inventory checks, order placement transactions, and security checks.
- Repository Layer: Spring Data JPA Repositories extending JpaRepository to execute optimized SQL queries.

[Client Layer] ---> [Spring Boot Controllers] ---> [Service Layer] ---> [JPA / Hibernate] ---> [MySQL DB]

---

## 3. DATABASE SCHEMA & ENTITY RELATIONSHIPS

### 3.1 Relational Tables:
1. users: Primary entity holding user credentials, roles (ROLE_USER vs ROLE_ADMIN), and personal details.
2. categories: Master table for product classification (1-to-Many relationship with products).
3. products: Catalog table storing product name, pricing, stock count, SKU, image URLs, and rating metrics.
4. cart_items: Stores active items added by users before checkout.
5. orders: Holds order headers including status (PENDING, PROCESSING, SHIPPED, DELIVERED), shipping address, and payment method (RAZORPAY, STRIPE).
6. order_items: Line items mapping products to individual orders with quantity and historical price locks.
7. reviews: Stores user ratings (1 to 5 stars) and comments.

---

## 4. SECURITY & AUTHENTICATION
Security is enforced using Spring Security:
- BCrypt Password Hashing: Ensures sensitive passwords are never stored in plaintext.
- Role-Based Access Control (RBAC):
  - Public access: Product listing (/products), registration (/register), static assets.
  - ROLE_USER: Cart modification, checkout, order history, writing product reviews.
  - ROLE_ADMIN: Full access to /admin/** dashboard for product CRUD and order status updates.

---

## 5. TESTING & LEARNING OUTCOMES

### 5.1 Verification & Test Cases Passed:
- User registration and login flow validation.
- Category filtering and product search accuracy.
- Cart price calculation with discount coupon logic (DASINTERN10).
- Payment simulation modal behavior and order record generation in MySQL.
- Admin product creation, editing, and order status progression.

### 5.2 Key Learning Outcomes:
- Hands-on experience building enterprise Spring Boot 3 web applications.
- Practical understanding of Object-Relational Mapping (ORM) using Hibernate & JPA annotations.
- Designing secure RESTful controller routes and Spring Security authorization rules.
- Implementing payment gateway integration logic and order lifecycle management.
- Preparing project submission assets, SQL exports, and documentation for Data Alcott Systems evaluation.

---
Report Submitted By: Student Code ${studentCode}  
Program: Free Java Full Stack Internship Online — Data Alcott Systems
`;

export const YOUTUBE_DEMO_SCRIPT = [
  {
    time: '0:00 - 0:45',
    title: 'Introduction & Project Goal',
    script: 'Greeting! In this video, I am presenting my internship project for Data Alcott Systems (Task ID: JV-EC-001, Student Code: DAS-JV-001) - a complete Online Shopping Platform built with Spring Boot, Hibernate JPA, MySQL, and React/Thymeleaf.'
  },
  {
    time: '0:45 - 2:00',
    title: 'Customer Storefront & Catalog Walkthrough',
    script: 'Show browsing the product catalog, filtering by categories (Electronics, Fashion, Books), using the search bar, viewing detailed product specifications, stock status, and customer star reviews.'
  },
  {
    time: '2:00 - 3:30',
    title: 'Shopping Cart, Coupon & Payment Gateway Simulation',
    script: 'Demonstrate adding items to the cart, modifying quantities, applying discount coupons (e.g. DASINTERN10), filling the shipping address form, selecting Razorpay / Stripe payment, and completing the OTP transaction simulation to receive an instant order confirmation receipt.'
  },
  {
    time: '3:30 - 4:45',
    title: 'Admin Dashboard & Order Status Management',
    script: 'Switch to Admin mode (ROLE_ADMIN). Show the store analytics dashboard, adding a new product with image and stock levels, editing existing inventory, and changing order status from PENDING -> PROCESSING -> SHIPPED -> DELIVERED.'
  },
  {
    time: '4:45 - 6:00',
    title: 'Source Code & MySQL Database Schema Walkthrough',
    script: 'Walk through the Spring Boot project structure (Entities, Repositories, Services, Controllers, SecurityConfig), application.properties, and show the imported MySQL database tables (users, categories, products, orders, order_items, reviews).'
  },
  {
    time: '6:00 - 7:00',
    title: 'Conclusion & Submission Details',
    script: 'Summarize key learnings, highlight the task submission link on freeinternships.in/blog, and thank Data Alcott Systems for this internship opportunity!'
  }
];
