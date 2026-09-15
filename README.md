🛍️ E-Shop Hub — ReactJS E-Commerce Application
ReactViteBootstrapLocalStorageLicense

A full-featured, responsive Frontend-Only E-Commerce Shopping Application built with ReactJS, React Router DOM, Bootstrap 5, and the LocalStorage API.

Designed for single-page application (SPA) performance with 100% client-side data persistence for user accounts, active sessions, shopping cart data, and dynamic product star ratings.

🌟 Key Features
🔐 1. User Authentication & Profile
User Registration: Create an account with Full Name, Email, Password, and Confirm Password. Includes regex email validation, password matching, and duplicate email prevention.
User Login: Authenticates credentials against registered users stored in LocalStorage.
Session Persistence: Maintains active login session across browser reloads.
Protected Profile Route (/profile): Displays user details, account status, cart statistics, and session control. Restricted to authenticated users via ProtectedRoute.
User Logout: Clears active session token from LocalStorage and state.
🛍️ 2. Product Catalog, Search & Filtering
18 Curated Sample Products: Distributed across 6 distinct categories (Electronics, Clothing, Shoes, Accessories, Home, Beauty).
Real-Time Keyword Search: Instantly filters products by name or category.
Category Filter: Filter pills (All, Electronics, Clothing, Shoes, Accessories, Home, Beauty) synced with URL query parameters (?category=Electronics).
Multi-Criteria Sorting: Sort products dynamically by Featured/Default, Price: Low to High, Price: High to Low, or Highest Rated.
Combined Filtering Engine: Utilizes React's useMemo hook to execute search, category filter, and sorting simultaneously.
Empty State Fallback: Displays a clean "No products found" view with a filter reset action.
⭐ 3. Dynamic Product Star Rating Engine
Interactive Rating Component: Displays 1 to 5 star icons supporting read-only and write modes with hover feedback.
Real-Time Recalculation Algorithm: Dynamically merges default product ratings with user-submitted ratings stored in LocalStorage: 
Average Rating
=
(
Initial Rating
×
Initial Count
)
+
∑
User Ratings
Initial Count
+
Total User Ratings
Average Rating= 
Initial Count+Total User Ratings
(Initial Rating×Initial Count)+∑User Ratings
​
 
Access Control: Logged-in users can submit ratings directly from the Product Details page (/product/:id). Unauthenticated visitors receive a friendly login prompt alert.
🛒 4. Shopping Cart & Order Management
Cart Operations: Add products, adjust quantities (+ / - / manual input), remove individual items, or clear the entire cart.
Live Calculations: Instant recalculation of Item Subtotals (
Price
×
Quantity
Price×Quantity), Total Items count, and Cart Grand Total (
₹
₹).
LocalStorage Sync: Cart items survive page refreshes and browser restarts (eshop_cart_items).
Navbar Integration: Live cart count badge updates across all pages.
Simulated Checkout: Order summary sidebar with shipping breakdown and automated checkout completion alert.
🛠️ Technology Stack
Core Framework: React 18 (Functional Components, Custom Hooks, Context API)
Routing: React Router DOM v6 (Client-side SPA navigation & Protected Routes)
UI & Styling: Bootstrap 5.3, Bootstrap Icons, Custom CSS (Glassmorphism & Micro-animations)
State Management: React Context API (AuthContext & CartContext)
Data Persistence: HTML5 LocalStorage API
Build Tool & Bundler: Vite 5
