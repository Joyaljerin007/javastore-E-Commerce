export const ECOMMERCE_MYSQL_DUMP_SQL = `-- ====================================================================
-- DATA ALCOTT SYSTEMS - FREE JAVA FULL STACK INTERNSHIP ONLINE
-- TASK ID: JV-EC-001 | DOMAIN: E-COMMERCE SHOPPING PLATFORM
-- DATABASE EXPORT SCRIPT: ecommerce_db.sql
-- TARGET ENGINE: MySQL 8.0+ / MariaDB
-- ====================================================================

CREATE DATABASE IF NOT EXISTS \`ecommerce_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`ecommerce_db\`;

-- --------------------------------------------------------------------
-- Table structure for \`users\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`reviews\`;
DROP TABLE IF EXISTS \`wishlist\`;
DROP TABLE IF EXISTS \`order_items\`;
DROP TABLE IF EXISTS \`orders\`;
DROP TABLE IF EXISTS \`cart_items\`;
DROP TABLE IF EXISTS \`products\`;
DROP TABLE IF EXISTS \`categories\`;
DROP TABLE IF EXISTS \`users\`;

CREATE TABLE \`users\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`first_name\` VARCHAR(100) NOT NULL,
  \`last_name\` VARCHAR(100) NOT NULL,
  \`role\` VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- Seed Users (Passwords BCrypt Encrypted: 'admin123' and 'user123')
INSERT INTO \`users\` (\`id\`, \`email\`, \`password\`, \`first_name\`, \`last_name\`, \`role\`) VALUES
(1, 'admin@dataalcott.com', '$2a$10$e8W/2qS.M8S30v6C7a4u2e9lq3Z6d.5Gf5z/Z0Q3.Y4y1a2b3c4d', 'Admin', 'System', 'ROLE_ADMIN'),
(2, 'intern.das001@freeinternships.in', '$2a$10$e8W/2qS.M8S30v6C7a4u2e9lq3Z6d.5Gf5z/Z0Q3.Y4y1a2b3c4d', 'Data Alcott', 'Intern', 'ROLE_USER');

-- --------------------------------------------------------------------
-- Table structure for \`categories\`
-- --------------------------------------------------------------------
CREATE TABLE \`categories\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`description\` VARCHAR(255),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO \`categories\` (\`id\`, \`name\`, \`description\`) VALUES
(1, 'Electronics & Tech', 'Smartphones, Laptops, Audio & Accessories'),
(2, 'Fashion & Apparel', 'Trendy Clothing, Footwear & Accessories'),
(3, 'Home & Kitchen', 'Smart Home Appliances, Decor & Utensils'),
(4, 'Books & Stationery', 'Programming, Tech Books & Office Supplies'),
(5, 'Sports & Fitness', 'Gym Equipment, Athletic Gear & Wearables');

-- --------------------------------------------------------------------
-- Table structure for \`products\`
-- --------------------------------------------------------------------
CREATE TABLE \`products\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(255) NOT NULL,
  \`description\` TEXT,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`stock\` INT NOT NULL DEFAULT 0,
  \`category_id\` BIGINT NOT NULL,
  \`image_url\` VARCHAR(500),
  \`rating\` DOUBLE DEFAULT 4.5,
  \`review_count\` INT DEFAULT 0,
  \`sku\` VARCHAR(100) UNIQUE,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_product_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4;

INSERT INTO \`products\` (\`id\`, \`name\`, \`description\`, \`price\`, \`stock\`, \`category_id\`, \`image_url\`, \`rating\`, \`review_count\`, \`sku\`) VALUES
(101, 'Java Full Stack Developer Masterclass Bundle', 'Complete hands-on Java Spring Boot, Hibernate, React & MySQL course material.', 999.00, 45, 4, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', 4.9, 38, 'BK-JAV-001'),
(102, 'Pro Noise-Cancelling Wireless Headphones', 'High-fidelity Bluetooth 5.3 headphones with active noise cancellation.', 3499.00, 22, 1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 4.8, 124, 'EL-AUD-102'),
(103, 'Smart Ergonomic RGB Mechanical Keyboard', 'Hot-swappable mechanical keyboard with custom tactile switches.', 2999.00, 15, 1, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3', 4.7, 62, 'EL-KEY-103'),
(104, 'Classic Leather Laptop Backpack (15.6")', 'Premium water-resistant genuine leather laptop backpack with anti-theft pocket.', 1899.00, 30, 2, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 4.6, 45, 'FA-BAG-104'),
(105, 'Ultra HD 4K Curved Gaming Monitor 27"', '165Hz refresh rate 1ms response time IPS display with HDR400.', 19999.00, 8, 1, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf', 4.9, 89, 'EL-MON-105');

-- --------------------------------------------------------------------
-- Table structure for \`cart_items\`
-- --------------------------------------------------------------------
CREATE TABLE \`cart_items\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`user_id\` BIGINT NOT NULL,
  \`product_id\` BIGINT NOT NULL,
  \`quantity\` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_cart_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_cart_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- Table structure for \`orders\`
-- --------------------------------------------------------------------
CREATE TABLE \`orders\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`user_id\` BIGINT NOT NULL,
  \`order_date\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`total_amount\` DECIMAL(10,2) NOT NULL,
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  \`shipping_address\` TEXT NOT NULL,
  \`payment_method\` VARCHAR(50) NOT NULL,
  \`payment_id\` VARCHAR(100),
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_order_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`orders\` (\`id\`, \`user_id\`, \`total_amount\`, \`status\`, \`shipping_address\`, \`payment_method\`, \`payment_id\`) VALUES
('ORD-2026-8941', 2, 1799.00, 'SHIPPED', '123 Innovation Way, Sector 5, Chennai, Tamil Nadu, 600001, India', 'RAZORPAY', 'pay_RZP2026894101');

-- --------------------------------------------------------------------
-- Table structure for \`order_items\`
-- --------------------------------------------------------------------
CREATE TABLE \`order_items\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`order_id\` VARCHAR(50) NOT NULL,
  \`product_id\` BIGINT NOT NULL,
  \`quantity\` INT NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_orderitem_order\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_orderitem_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO \`order_items\` (\`id\`, \`order_id\`, \`product_id\`, \`quantity\`, \`price\`) VALUES
(1, 'ORD-2026-8941', 101, 1, 999.00),
(2, 'ORD-2026-8941', 107, 1, 899.00);

-- --------------------------------------------------------------------
-- Table structure for \`wishlist\`
-- --------------------------------------------------------------------
CREATE TABLE \`wishlist\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`user_id\` BIGINT NOT NULL,
  \`product_id\` BIGINT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`user_product_unique\` (\`user_id\`, \`product_id\`),
  CONSTRAINT \`fk_wishlist_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_wishlist_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- Table structure for \`reviews\`
-- --------------------------------------------------------------------
CREATE TABLE \`reviews\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`user_id\` BIGINT NOT NULL,
  \`product_id\` BIGINT NOT NULL,
  \`rating\` INT NOT NULL CHECK (\`rating\` >= 1 AND \`rating\` <= 5),
  \`comment\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_reviews_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_reviews_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- ====================================================================
-- END OF SQL DUMP | ecommerce_db.sql
-- ====================================================================
`;
