/* ==========================================================
   ZAN-G LUXURY STREETWEAR - INTERACTIVE SCRIPT
   Handles: Welcome Animation, Catalog Rendering, Cart, Wishlist,
   Filters, Quick View, and POD Architecture Hooks.
   ========================================================== */

// Sample Product Catalog (Pre-configured for POD suppliers like Qikink / Printrove)
const products = [
    {
        id: 1,
        title: "Obsidian Gold Emperor Hoodie",
        category: "Hoodies",
        price: 125.00,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        description: "Heavyweight 500GSM French Terry cotton hoodie featuring intricate gold embroidery and oversized streetwear silhouette.",
        colors: ["#000000", "#111111", "#330000"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        podSku: "ZANG-HOODIE-OBS-01"
    },
    {
        id: 2,
        title: "Bloodline Crimson Oversized Tee",
        category: "T-Shirts",
        price: 55.00,
        badge: "NEW DROP",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        description: "Premium combed cotton tee with crimson gradient accents and drop-shoulder streetwear cut.",
        colors: ["#cc0000", "#000000", "#f5f5f5"],
        sizes: ["S", "M", "L", "XL"],
        podSku: "ZANG-TEE-CRIM-02"
    },
    {
        id: 3,
        title: "Vanguard Tactical Bomber Jacket",
        category: "Jackets",
        price: 210.00,
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        description: "Weather-resistant tactical bomber featuring matte hardware and gold interior lining.",
        colors: ["#000000", "#222222"],
        sizes: ["M", "L", "XL", "XXL"],
        podSku: "ZANG-JCK-TAC-03"
    },
    {
        id: 4,
        title: "Monolith Heavy Tracksuit",
        category: "Tracksuits",
        price: 180.00,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        description: "Matching zip-up jacket and tapered joggers engineered for luxury comfort and street presence.",
        colors: ["#000000", "#1a1a1a"],
        sizes: ["S", "M", "L", "XL"],
        podSku: "ZANG-TRK-MON-04"
    },
    {
        id: 5,
        title: "Kyoto Dragon Embroidered Hoodie",
        category: "Hoodies",
        price: 140.00,
        badge: "EXCLUSIVE",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        description: "Artisanal gold thread embroidery across the back panel on ultra-soft thermal cotton.",
        colors: ["#000000", "#800000"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        podSku: "ZANG-HOODIE-KYO-05"
    },
    {
        id: 6,
        title: "Apex Minimalist Streetwear Joggers",
        category: "Streetwear",
        price: 95.00,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
        description: "Relaxed fit cargo joggers with reinforced utility pockets and subtle ZAN-G branding.",
        colors: ["#000000", "#333333"],
        sizes: ["S", "M", "L", "XL"],
        podSku: "ZANG-JOG-APX-06"
    },
    {
        id: 7,
        title: "Golden Hour Signature Cap",
        category: "Accessories",
        price: 45.00,
        badge: "ESSENTIAL",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
        description: "Structured cotton twill cap with embroidered gold logo and adjustable brass clasp.",
        colors: ["#000000", "#cc0000"],
        sizes: ["One Size"],
        podSku: "ZANG-ACC-CAP-07"
    },
    {
        id: 8,
        title: "Crimson Accent Women's Crop Hoodie",
        category: "Womens Wear",
        price: 110.00,
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "Cropped luxury streetwear hoodie designed with clean architectural lines and contrast drawstrings.",
        colors: ["#000000", "#ffffff"],
        sizes: ["XS", "S", "M", "L"],
        podSku: "ZANG-WOM-CROP-08"
    }
];

// App State
let cart = JSON.parse(localStorage.getItem('zang_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('zang_wishlist')) || [];

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    initWelcomeScreen();
    initNavigation();
    renderProducts(products);
    updateBadgeCounts();
    initEventListeners();
});

/* ================= WELCOME SCREEN ANIMATION ================= */
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-btn');

    enterBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('fade-out');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 800);
    });
}

/* ================= NAVIGATION ================= */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

/* ================= RENDER PRODUCTS ================= */
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No products found matching your search.</p>`;
        return;
    }

    items.forEach(product => {
        const isWishlisted = wishlist.some(item => item.id === product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-actions">
                    <button class="action-icon-btn wishlist-action ${isWishlisted ? 'active' : ''}" data-id="${product.id}" title="Add to Wishlist">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <button class="action-icon-btn quick-view-action" data-id="${product.id}" title="Quick View">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price-row">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Bag</button>
            </div>
        `;
        grid.appendChild(card);
    });

    // Attach card event listeners
    attachProductCardListeners();
}

/* ================= EVENT LISTENERS & INTERACTION ================= */
function initEventListeners() {
    // Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Category Card click shortcuts
    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            
            // Activate corresponding filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === cat) {
                    btn.click();
                }
            });
        });
    });

    // Search bar
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    // Modals / Drawers Open & Close
    setupModal('cart-btn', 'cart-modal', true);
    setupModal('wishlist-btn', 'wishlist-modal', true);
    setupModal('account-btn', 'account-modal', false);
    setupModal('footer-track-order', 'tracking-modal', false);
    setupModal('track-order-modal-trigger', 'tracking-modal', false);

    // Account Modal Tabs
    const tabBtns = document.querySelectorAll('.acc-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.acc-tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Simulated Authentication Alerts
    document.getElementById('google-signin-btn').addEventListener('click', () => {
        alert("Google Sign-In initialized. [Note: Requires backend API key config in Firebase/Supabase].");
    });
    
    document.getElementById('phone-signin-btn').addEventListener('click', () => {
        alert("OTP Mobile sign-in initialized. [Note: Requires SMS gateway backend].");
    });

    document.getElementById('email-auth-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Authentication submitted. [Frontend demo mode: Connect a real auth backend for production].");
    });

    // Checkout Simulation
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your shopping bag is empty.");
            return;
        }
        alert("Redirecting to Secure Payment Gateway (Stripe / Razorpay)... \n\n[Note: Connect your merchant account keys in backend script for live transactions].");
    });

    // Order Tracking Lookup
    document.getElementById('lookup-tracking-btn').addEventListener('click', () => {
        const orderId = document.getElementById('tracking-input').value.trim();
        const resultDiv = document.getElementById('tracking-result');
        if (!orderId) {
            resultDiv.innerHTML = `<p style="color: var(--accent-red);">Please enter a valid Order ID.</p>`;
            return;
        }
        resultDiv.innerHTML = `
            <div style="background: var(--bg-card); padding: 15px; border: 1px solid var(--border-color); text-align: left;">
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Status:</strong> Printing & Quality Inspection (POD Partner)</p>
                <p><strong>Estimated Delivery:</strong> 3-5 Business Days</p>
            </div>
        `;
    });

    // Newsletter form
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to ZAN-G private drops.");
        e.target.reset();
    });

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Your message has been dispatched to the ZAN-G Concierge team.");
        e.target.reset();
    });
}

/* ================= PRODUCT CARD LISTENERS ================= */
function attachProductCardListeners() {
    // Add to Bag buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            addToCart(product);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            toggleWishlist(id);
        });
    });

    // Quick View buttons
    document.querySelectorAll('.quick-view-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            openQuickView(product);
        });
    });
}

/* ================= CART MANAGEMENT ================= */
function addToCart(product, size = 'M', color = '#000000') {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size && item.color === color);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            color: color,
            quantity: 1
        });
    }

    saveCart();
    updateBadgeCounts();
    renderCartDrawer();
    
    // Open cart drawer
    document.getElementById('cart-modal').classList.add('open');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateBadgeCounts();
    renderCartDrawer();
}

function saveCart() {
    localStorage.setItem('zang_cart', JSON.stringify(cart));
}

function renderCartDrawer() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px;">Your bag is currently empty.</p>`;
        document.getElementById('cart-subtotal').textContent = '$0.00';
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-meta">Size: ${item.size} | Qty: ${item.quantity}</div>
            </div>
            <button class="remove-cart-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash-can"></i></button>
        `;
        container.appendChild(itemEl);
    });

    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
}

/* ================= WISHLIST MANAGEMENT ================= */
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(product);
    }

    localStorage.setItem('zang_wishlist', JSON.stringify(wishlist));
    updateBadgeCounts();
    renderProducts(products);
    renderWishlistDrawer();
}

function renderWishlistDrawer() {
    const container = document.getElementById('wishlist-items-container');
    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px;">Your wishlist is empty.</p>`;
        return;
    }

    wishlist.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <button class="add-to-cart-btn" style="padding: 6px 12px; font-size: 0.75rem;" onclick="addWishlistToCart(${item.id})">Move to Bag</button>
        `;
        container.appendChild(itemEl);
    });
}

function addWishlistToCart(productId) {
    const product = products.find(p => p.id === productId);
    addToCart(product);
    toggleWishlist(productId);
}

function updateBadgeCounts() {
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCartItems;
    document.getElementById('cart-bag-count').textContent = totalCartItems;
    
    document.getElementById('wishlist-count').textContent = wishlist.length;
    document.getElementById('wishlist-drawer-count').textContent = wishlist.length;

    renderCartDrawer();
    renderWishlistDrawer();
}

/* ================= QUICK VIEW MODAL ================= */
function openQuickView(product) {
    const modal = document.getElementById('product-modal');
    const detailsContainer = document.getElementById('modal-product-details');

    detailsContainer.innerHTML = `
        <div class="quick-view-grid">
            <div class="quick-view-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="quick-view-details">
                <span class="product-category">${product.category}</span>
                <h2>${product.title}</h2>
                <span class="price">$${product.price.toFixed(2)}</span>
                <p>${product.description}</p>
                <p style="font-size: 0.8rem; color: var(--accent-gold); margin-bottom: 15px;">POD SKU: ${product.podSku}</p>
                
                <div class="option-group">
                    <label>SELECT SIZE:</label>
                    <div class="size-options" id="qv-sizes">
                        ${product.sizes.map((s, i) => `<button class="size-option-btn ${i===0?'selected':''}" data-size="${s}">${s}</button>`).join('')}
                    </div>
                </div>

                <div class="option-group">
                    <label>SELECT COLOR:</label>
                    <div class="color-options" id="qv-colors">
                        ${product.colors.map((c, i) => `<div class="color-option-dot ${i===0?'selected':''}" style="background-color: ${c};" data-color="${c}"></div>`).join('')}
                    </div>
                </div>

                <button id="modal-add-to-bag" class="btn-primary full-width" style="margin-top: 20px;">Add to Bag</button>
            </div>
        </div>
    `;

    modal.classList.add('open');

    // Size selector logic
    let selectedSize = product.sizes[0];
    document.querySelectorAll('.size-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedSize = e.target.getAttribute('data-size');
        });
    });

    // Color selector logic
    let selectedColor = product.colors[0];
    document.querySelectorAll('.color-option-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            document.querySelectorAll('.color-option-dot').forEach(d => d.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedColor = e.target.getAttribute('data-color');
        });
    });

    // Add to bag from modal
    document.getElementById('modal-add-to-bag').addEventListener('click', () => {
        addToCart(product, selectedSize, selectedColor);
        modal.classList.remove('open');
    });
}

/* ================= UTILITY MODAL SETUP ================= */
function setupModal(triggerId, modalId, isDrawer = false) {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    if (!trigger || !modal) return;

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
    });

    modal.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
}