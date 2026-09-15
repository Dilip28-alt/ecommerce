import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    
    # 16:9 widescreen layout
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    blank_layout = prs.slide_layouts[6]
    
    # Color Palette
    COLOR_BG_DARK = RGBColor(15, 23, 42)       # #0f172a (Dark Slate)
    COLOR_BG_LIGHT = RGBColor(248, 250, 252)   # #f8fafc (Light Slate)
    COLOR_PRIMARY = RGBColor(79, 70, 229)      # #4f46e5 (Indigo)
    COLOR_ACCENT = RGBColor(168, 85, 247)      # #a855f7 (Purple)
    COLOR_TEXT_DARK = RGBColor(30, 41, 59)     # #1e293b
    COLOR_TEXT_MUTED = RGBColor(100, 116, 139) # #64748b
    COLOR_WHITE = RGBColor(255, 255, 255)
    COLOR_CARD_BG = RGBColor(255, 255, 255)
    COLOR_BORDER = RGBColor(226, 232, 240)    # #e2e8f0

    def add_header(slide, title_text, category_text="E-COMMERCE SHOPPING APPLICATION"):
        # Header background banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        # Category label
        p_cat = tf.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = COLOR_PRIMARY
        p_cat.font.name = "Arial"
        
        # Main Title
        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_TEXT_DARK
        p_title.font.name = "Arial"

    def add_card(slide, left, top, width, height, bg_color=COLOR_CARD_BG, border_color=COLOR_BORDER):
        shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(1)
        else:
            shape.line.fill.background()
        return shape

    # ==========================================
    # SLIDE 1: Title Slide (Dark Theme)
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_BG_DARK
    bg1.line.fill.background()

    # Title Box
    title_box = slide1.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(11.333), Inches(3.5))
    tf1 = title_box.text_frame
    tf1.word_wrap = True

    p1 = tf1.paragraphs[0]
    p1.text = "E-Commerce Shopping Application"
    p1.font.size = Pt(44)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_WHITE
    p1.font.name = "Arial"

    p2 = tf1.add_paragraph()
    p2.text = "A Full-Featured Frontend-Only E-Commerce Platform Built with ReactJS, Bootstrap 5 & LocalStorage"
    p2.font.size = Pt(18)
    p2.font.color.rgb = RGBColor(194, 205, 255)
    p2.font.name = "Arial"
    p2.space_before = Pt(16)

    p3 = tf1.add_paragraph()
    p3.text = "College Final-Year Capstone Project Demonstration"
    p3.font.size = Pt(14)
    p3.font.bold = True
    p3.font.color.rgb = COLOR_ACCENT
    p3.font.name = "Arial"
    p3.space_before = Pt(30)

    # Tech pill labels at bottom
    tech_box = slide1.shapes.add_textbox(Inches(1.0), Inches(6.0), Inches(11.333), Inches(0.8))
    tf_tech = tech_box.text_frame
    p_tech = tf_tech.paragraphs[0]
    p_tech.text = "Technologies: React 18  |  React Router DOM v6  |  Context API  |  Bootstrap 5  |  LocalStorage API  |  Vite"
    p_tech.font.size = Pt(12)
    p_tech.font.color.rgb = RGBColor(148, 163, 184)
    p_tech.font.name = "Arial"

    # ==========================================
    # SLIDE 2: Project Overview & Objectives
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "Project Overview & Key Objectives")

    # Left Box: Problem & Motivation
    add_card(slide2, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    tb2_left = slide2.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.5))
    tf2_l = tb2_left.text_frame
    tf2_l.word_wrap = True

    p = tf2_l.paragraphs[0]
    p.text = "Problem & Motivation"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    bullets_l = [
        "Traditional web projects rely on complex backends, database configuration, and network latency for demo deployments.",
        "Need for a lightweight, ultra-responsive single-page application (SPA) showcasing complete e-commerce functionality.",
        "Requirement for persistent client-side state without external database dependencies."
    ]
    for b in bullets_l:
        p = tf2_l.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(13)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(12)

    # Right Box: Project Objectives
    add_card(slide2, Inches(6.9), Inches(1.8), Inches(5.6), Inches(5.0))
    tb2_right = slide2.shapes.add_textbox(Inches(7.2), Inches(2.0), Inches(5.0), Inches(4.5))
    tf2_r = tb2_right.text_frame
    tf2_r.word_wrap = True

    p = tf2_r.paragraphs[0]
    p.text = "Core Objectives"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    bullets_r = [
        "User Auth System: Full Registration, Login, Logout, & Protected Profile routes.",
        "Interactive Product Catalog: 18+ items across 6 categories with combined Search, Filtering, and Sorting.",
        "Dynamic Rating Engine: Star rating submission (1-5 stars) with real-time average calculation.",
        "Shopping Cart Persistence: Add/Remove items, quantity management, subtotal/total calculations surviving page reloads.",
        "Modern Aesthetics: Responsive Bootstrap 5 layout with rich glassmorphism & micro-animations."
    ]
    for b in bullets_r:
        p = tf2_r.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(13)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(10)

    # ==========================================
    # SLIDE 3: Technology Stack
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "Technology Stack & Frameworks")

    tech_stack = [
        ("React 18", "Core Library", "Functional Components, React Hooks (useState, useEffect, useMemo, useContext), Component Architecture"),
        ("React Router v6", "Routing", "Client-side SPA navigation, dynamic route parameters (/product/:id), Protected Routes"),
        ("Bootstrap 5 & Icons", "UI Framework", "Responsive grid system, modal overlays, collapse navbar, Bootstrap icons, custom CSS utilities"),
        ("LocalStorage API", "Data Persistence", "Pure browser-based data engine for users, active sessions, shopping cart, and product ratings"),
        ("Vite 5", "Build Tool", "Lightning-fast HMR dev server and optimized production bundle compilation")
    ]

    for i, (name, role, desc) in enumerate(tech_stack):
        top_pos = Inches(1.7 + i * 1.05)
        add_card(slide3, Inches(0.8), top_pos, Inches(11.733), Inches(0.95))
        
        tb = slide3.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.1), Inches(11.333), Inches(0.75))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = f"{name}  "
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY
        
        run = p.add_run()
        run.text = f"|  {role}"
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = COLOR_ACCENT

        p_desc = tf.add_paragraph()
        p_desc.text = desc
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = COLOR_TEXT_MUTED
        p_desc.space_before = Pt(4)

    # ==========================================
    # SLIDE 4: System Architecture & Data Flow
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "System Architecture & Global State Flow")

    cols = [
        ("1. Application Shell", "App.jsx & Router", ["Wraps app in AuthProvider & CartProvider", "Defines public & protected routes", "Renders sticky Navbar & Footer"]),
        ("2. Context State Layer", "Auth & Cart Context", ["AuthContext manages currentUser session", "CartContext manages cart items & totals", "Exposes custom hooks: useAuth(), useCart()"]),
        ("3. Storage Synchronization", "localStorage.js Helper", ["Synchronizes state changes to LocalStorage", "Parses JSON safely with fallbacks", "Calculates dynamic rating averages"]),
        ("4. UI Presentation Layer", "Pages & Components", ["ProductCard, SearchBar, Rating components", "Home, Products, Details, Cart, Profile", "Bootstrap responsive grid layout"])
    ]

    for i, (title, sub, items) in enumerate(cols):
        left_pos = Inches(0.8 + i * 2.98)
        add_card(slide4, left_pos, Inches(1.8), Inches(2.8), Inches(5.0))

        tb = slide4.shapes.add_textbox(left_pos + Inches(0.15), Inches(2.0), Inches(2.5), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY

        p_sub = tf.add_paragraph()
        p_sub.text = sub
        p_sub.font.size = Pt(11)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_ACCENT
        p_sub.space_before = Pt(2)

        for item in items:
            p_item = tf.add_paragraph()
            p_item.text = "• " + item
            p_item.font.size = Pt(11)
            p_item.font.color.rgb = COLOR_TEXT_DARK
            p_item.space_before = Pt(10)

    # ==========================================
    # SLIDE 5: User Authentication Module
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "Feature Focus: User Authentication & Session Management")

    add_card(slide5, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    tb5_l = slide5.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.5))
    tf5_l = tb5_l.text_frame
    tf5_l.word_wrap = True

    p = tf5_l.paragraphs[0]
    p.text = "Registration & Login Features"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    auth_features = [
        "User Registration (/register): Captures Full Name, Email, Password, and Confirm Password.",
        "Form Validations: Ensures required inputs, valid email format regex, password length & matching.",
        "Duplicate Prevention: Checks existing users list to reject duplicate email registration.",
        "User Login (/login): Validates email & password against stored users in LocalStorage.",
        "Session Persistence: Saves active user object under 'eshop_logged_in_user'."
    ]
    for f in auth_features:
        p = tf5_l.add_paragraph()
        p.text = "• " + f
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(8)

    add_card(slide5, Inches(6.9), Inches(1.8), Inches(5.6), Inches(5.0))
    tb5_r = slide5.shapes.add_textbox(Inches(7.2), Inches(2.0), Inches(5.0), Inches(4.5))
    tf5_r = tb5_r.text_frame
    tf5_r.word_wrap = True

    p = tf5_r.paragraphs[0]
    p.text = "Protected Routes & Session Control"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    prot_features = [
        "ProtectedRoute Guard: Restricts unauthorized access to sensitive pages like Profile (/profile).",
        "Automatic Redirect: Redirects unauthenticated visitors to /login with state memory to return after login.",
        "Profile Page (/profile): Displays user name, email, account status, and cart statistics.",
        "User Logout: Clears active session token from LocalStorage and navigates back to Login page.",
        "Navbar Integration: Navbar switches between Login/Register buttons and User Profile/Logout dynamically."
    ]
    for f in prot_features:
        p = tf5_r.add_paragraph()
        p.text = "• " + f
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(8)

    # ==========================================
    # SLIDE 6: Product Catalog & Search/Filter
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "Feature Focus: Product Catalog, Search & Filtering")

    cards6 = [
        ("Curated Catalog", "18 Sample Products", "Across 6 distinct categories: Electronics, Clothing, Shoes, Accessories, Home, Beauty. Each with high-res photos, price (₹), and descriptions."),
        ("Real-time Search", "SearchBar Component", "Searches product name and category in real time as the user types. Includes a quick clear button."),
        ("Category Filter", "CategoryFilter Component", "Filter pills for 'All' + 6 category options. Seamlessly updates URL query parameters (?category=Electronics)."),
        ("Multi-Criteria Sorting", "Sorting Engine", "Sort products dynamically by Featured/Default, Price: Low to High, Price: High to Low, or Highest Rated.")
    ]

    for i, (title, sub, desc) in enumerate(cards6):
        row = i // 2
        col = i % 2
        left_pos = Inches(0.8 + col * 5.98)
        top_pos = Inches(1.8 + row * 2.55)

        add_card(slide6, left_pos, top_pos, Inches(5.75), Inches(2.35))
        tb = slide6.shapes.add_textbox(left_pos + Inches(0.2), top_pos + Inches(0.2), Inches(5.35), Inches(1.95))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY

        p_sub = tf.add_paragraph()
        p_sub.text = sub
        p_sub.font.size = Pt(12)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_ACCENT
        p_sub.space_before = Pt(2)

        p_desc = tf.add_paragraph()
        p_desc.text = desc
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = COLOR_TEXT_DARK
        p_desc.space_before = Pt(8)

    # ==========================================
    # SLIDE 7: Dynamic Rating Engine
    # ==========================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "Feature Focus: Dynamic Product Star Rating Engine")

    add_card(slide7, Inches(0.8), Inches(1.8), Inches(11.733), Inches(5.0))
    tb7 = slide7.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(11.133), Inches(4.5))
    tf7 = tb7.text_frame
    tf7.word_wrap = True

    p = tf7.paragraphs[0]
    p.text = "How the Dynamic Rating Engine Works"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    rating_points = [
        "Rating Component (Rating.jsx): Displays 1 to 5 interactive star icons with hover effects and half-star visual rendering.",
        "Dynamic Recalculation Algorithm: Combines initial product default rating sum with all user ratings submitted in LocalStorage:",
        "    Average Rating = (Initial Rating × Initial Count + Sum of User Ratings) / (Initial Count + Total User Ratings)",
        "LocalStorage Storage Structure: Stored under 'eshop_product_ratings' keyed by Product ID and User Email to allow rating updates.",
        "Authentication Check: Logged-in users can rate products directly from the Product Details page. Unauthenticated visitors see a friendly alert prompting them to log in.",
        "Real-Time UI Refresh: Immediately recalculates and updates the displayed star score and total rating count upon submission."
    ]

    for pt in rating_points:
        p = tf7.add_paragraph()
        p.text = pt
        p.font.size = Pt(13)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(8)

    # ==========================================
    # SLIDE 8: Shopping Cart & Checkout
    # ==========================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "Feature Focus: Shopping Cart & Checkout Management")

    cart_points = [
        ("Add & Manage Items", ["Add to cart from Product Cards or Product Details page.", "Adjust quantity (+ / - / manual input) on Cart page.", "Remove individual items or clear entire cart with one click."]),
        ("Real-time Calculations", ["Subtotal per product: Price × Quantity", "Total Items Count: Sum of all item quantities", "Cart Grand Total: Live sum of all subtotals in ₹"]),
        ("LocalStorage Persistence", ["Cart items stored in 'eshop_cart_items'", "Cart survives page refreshes and browser restarts", "Navbar cart badge updates dynamically across all pages"]),
        ("Simulated Checkout", ["Order summary sidebar with shipping breakdown", "Proceed to Checkout button triggers confirmation toast", "Clears cart state and updates LocalStorage automatically"])
    ]

    for i, (title, items) in enumerate(cart_points):
        row = i // 2
        col = i % 2
        left_pos = Inches(0.8 + col * 5.98)
        top_pos = Inches(1.8 + row * 2.55)

        add_card(slide8, left_pos, top_pos, Inches(5.75), Inches(2.35))
        tb = slide8.shapes.add_textbox(left_pos + Inches(0.2), top_pos + Inches(0.2), Inches(5.35), Inches(1.95))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY

        for item in items:
            p_item = tf.add_paragraph()
            p_item.text = "• " + item
            p_item.font.size = Pt(11)
            p_item.font.color.rgb = COLOR_TEXT_DARK
            p_item.space_before = Pt(4)

    # ==========================================
    # SLIDE 9: LocalStorage Schema Breakdown
    # ==========================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_header(slide9, "Data Architecture: LocalStorage Schema")

    schemas = [
        ("eshop_registered_users", "Array of User Objects", "[ { fullName: 'John Doe', email: 'john@example.com', password: '***' } ]"),
        ("eshop_logged_in_user", "Active Session Object", "{ fullName: 'John Doe', email: 'john@example.com' }"),
        ("eshop_cart_items", "Array of Cart Items", "[ { product: { id: '1', name: '...', price: 14999 }, quantity: 2 } ]"),
        ("eshop_product_ratings", "Ratings Map by Product ID", "{ '1': [ { userEmail: 'john@example.com', rating: 5 } ] }")
    ]

    for i, (key, title, example) in enumerate(schemas):
        top_pos = Inches(1.7 + i * 1.3)
        add_card(slide9, Inches(0.8), top_pos, Inches(11.733), Inches(1.15))

        tb = slide9.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.1), Inches(11.333), Inches(0.95))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"Key: {key}  "
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY

        run = p.add_run()
        run.text = f"({title})"
        run.font.size = Pt(13)
        run.font.color.rgb = COLOR_ACCENT

        p_ex = tf.add_paragraph()
        p_ex.text = f"Structure Example: {example}"
        p_ex.font.size = Pt(11)
        p_ex.font.name = "Consolas"
        p_ex.font.color.rgb = COLOR_TEXT_DARK
        p_ex.space_before = Pt(4)

    # ==========================================
    # SLIDE 10: Component & Page Architecture
    # ==========================================
    slide10 = prs.slides.add_slide(blank_layout)
    add_header(slide10, "Component & Page Architecture")

    # Left Box: Pages
    add_card(slide10, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    tb10_l = slide10.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.5))
    tf10_l = tb10_l.text_frame
    tf10_l.word_wrap = True

    p = tf10_l.paragraphs[0]
    p.text = "Application Pages (src/pages/)"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    pages_list = [
        "Home.jsx: Hero banner, feature highlights, category cards, & CTA",
        "Products.jsx: Catalog page with search, category filters & sorting",
        "ProductDetails.jsx: Detailed product view with dynamic rating submission",
        "Cart.jsx: Cart items table, quantity controls, subtotal & grand total",
        "Login.jsx & Register.jsx: Auth forms with LocalStorage validation",
        "Profile.jsx: Protected user profile page with session controls",
        "NotFound.jsx: Custom 404 error page"
    ]
    for page in pages_list:
        p = tf10_l.add_paragraph()
        p.text = "• " + page
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(6)

    # Right Box: Components
    add_card(slide10, Inches(6.9), Inches(1.8), Inches(5.6), Inches(5.0))
    tb10_r = slide10.shapes.add_textbox(Inches(7.2), Inches(2.0), Inches(5.0), Inches(4.5))
    tf10_r = tb10_r.text_frame
    tf10_r.word_wrap = True

    p = tf10_r.paragraphs[0]
    p.text = "Reusable Components (src/components/)"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY

    comp_list = [
        "Navbar.jsx: Sticky Bootstrap navigation with live cart count badge",
        "Footer.jsx: Footer with quick navigation links & support info",
        "ProductCard.jsx: Reusable card with price, image, rating & add to cart",
        "SearchBar.jsx: Real-time search input with clear button",
        "CategoryFilter.jsx: Category filter pills for product filtering",
        "Rating.jsx: Dynamic star rating component supporting read/write modes",
        "ProtectedRoute.jsx: Auth route guard redirecting unauthenticated users"
    ]
    for comp in comp_list:
        p = tf10_r.add_paragraph()
        p.text = "• " + comp
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.space_before = Pt(6)

    # ==========================================
    # SLIDE 11: Verification & Testing Results
    # ==========================================
    slide11 = prs.slides.add_slide(blank_layout)
    add_header(slide11, "Verification & Testing Results")

    tests = [
        ("Vite Production Build", "PASSED (0 Errors)", "Successfully compiled all JS, JSX, and CSS modules using `vite build` with zero errors or unresolved imports."),
        ("User Auth & Validation", "PASSED", "Verified user registration, duplicate email check, valid credential checking, session saving, and logout functionality."),
        ("Search & Filter Logic", "PASSED", "Tested keyword search combined with category filter pills and sorting options across 18 catalog products."),
        ("Cart & LocalStorage Sync", "PASSED", "Verified quantity increments, subtotal calculations, cart total accuracy, and data persistence across browser reloads."),
        ("Responsive Layout", "PASSED", "Tested and verified across Desktop, Tablet, and Mobile viewport breakpoints using Bootstrap 5 grid utilities.")
    ]

    for i, (title, status, desc) in enumerate(tests):
        top_pos = Inches(1.7 + i * 1.05)
        add_card(slide11, Inches(0.8), top_pos, Inches(11.733), Inches(0.95))

        tb = slide11.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.1), Inches(11.333), Inches(0.75))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"{title}  "
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY

        run = p.add_run()
        run.text = f"|  {status}"
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = RGBColor(16, 185, 129) if "PASSED" in status else COLOR_ACCENT

        p_desc = tf.add_paragraph()
        p_desc.text = desc
        p_desc.font.size = Pt(11)
        p_desc.font.color.rgb = COLOR_TEXT_DARK
        p_desc.space_before = Pt(4)

    # ==========================================
    # SLIDE 12: Conclusion & Future Scope (Dark Theme)
    # ==========================================
    slide12 = prs.slides.add_slide(blank_layout)
    bg12 = slide12.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg12.fill.solid()
    bg12.fill.fore_color.rgb = COLOR_BG_DARK
    bg12.line.fill.background()

    # Title Box
    title_box = slide12.shapes.add_textbox(Inches(1.0), Inches(0.8), Inches(11.333), Inches(1.2))
    tf12 = title_box.text_frame
    tf12.word_wrap = True
    p = tf12.paragraphs[0]
    p.text = "Conclusion & Future Enhancements"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE

    # Left Box: Conclusion Summary
    add_card(slide12, Inches(1.0), Inches(2.2), Inches(5.4), Inches(4.5), bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb12_l = slide12.shapes.add_textbox(Inches(1.2), Inches(2.4), Inches(5.0), Inches(4.0))
    tf12_l = tb12_l.text_frame
    tf12_l.word_wrap = True

    p = tf12_l.paragraphs[0]
    p.text = "Project Summary"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_ACCENT

    conc_bullets = [
        "Delivered a complete, production-ready frontend e-commerce web application.",
        "Demonstrated full client-side state management using React Context API & LocalStorage API.",
        "Achieved responsive, modern glassmorphism aesthetics suitable for college final-year capstone project standards."
    ]
    for b in conc_bullets:
        p = tf12_l.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(13)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.space_before = Pt(12)

    # Right Box: Future Scope
    add_card(slide12, Inches(6.9), Inches(2.2), Inches(5.4), Inches(4.5), bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb12_r = slide12.shapes.add_textbox(Inches(7.1), Inches(2.4), Inches(5.0), Inches(4.0))
    tf12_r = tb12_r.text_frame
    tf12_r.word_wrap = True

    p = tf12_r.paragraphs[0]
    p.text = "Future Scope & Enhancements"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_ACCENT

    future_bullets = [
        "Payment Gateway Integration: Connect Stripe or Razorpay SDKs for live transactions.",
        "Backend API Connectivity: Connect with a Node.js / Express / MongoDB REST API.",
        "Wishlist & Favorites: Allow users to bookmark items to a personalized wishlist.",
        "Dark / Light Mode Toggle: Theme switcher utilizing CSS custom variables."
    ]
    for b in future_bullets:
        p = tf12_r.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(13)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.space_before = Pt(12)

    output_path = os.path.join(os.getcwd(), "E-Commerce_Shopping_App_Presentation.pptx")
    prs.save(output_path)
    print(f"Presentation successfully created at: {output_path}")

if __name__ == "__main__":
    create_presentation()
