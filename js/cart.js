// Shopping Cart Functionality

// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart total items
function getCartTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get cart total price
function getCartTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: parseInt(quantity)
        });
    }

    saveCart();
    updateCartUI();
    showNotification('Item added to cart!', 'success');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showNotification('Item removed from cart!', 'info');
}

// Update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = parseInt(newQuantity);
            saveCart();
            updateCartUI();
        }
    }
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Get cart item by ID
function getCartItem(productId) {
    return cart.find(item => item.id === productId);
}

// Check if item is in cart
function isInCart(productId) {
    return cart.some(item => item.id === productId);
}

// Update cart UI elements
function updateCartUI() {
    // Update cart count in header
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = getCartTotalItems();
    }

    // Update cart sidebar content
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemsSidebar = document.getElementById('cart-items-sidebar');
    const cartTotal = document.getElementById('cart-total');
    const cartTotalSidebar = document.getElementById('cart-total-sidebar');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = generateCartItemsHTML();
    }

    if (cartItemsSidebar) {
        cartItemsSidebar.innerHTML = generateCartItemsHTML();
    }

    if (cartTotal) {
        cartTotal.textContent = formatCurrency(getCartTotalPrice());
    }

    if (cartTotalSidebar) {
        cartTotalSidebar.textContent = formatCurrency(getCartTotalPrice());
    }
}

// Generate cart items HTML
function generateCartItemsHTML() {
    if (cart.length === 0) {
        return `
            <div class="empty-cart-sidebar">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    }

    return cart.map(item => `
        <div class="cart-sidebar-item">
            <div class="cart-sidebar-item-image">
                <img src="${item.image || getPlaceholderImage(item.id)}" alt="${item.title}">
            </div>
            <div class="cart-sidebar-item-info">
                <h4>${item.title}</h4>
                <p class="cart-sidebar-item-price">${formatCurrency(item.price)}</p>
                <div class="cart-sidebar-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate cart items for cart page
function generateCartPageItemsHTML() {
    if (cart.length === 0) {
        return `
            <div class="empty-cart-message" style="display: block;">
                <i class="fas fa-shopping-bag"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    }

    return cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image || getPlaceholderImage(item.id)}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-price">${formatCurrency(item.price)}</p>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div class="cart-item-total">
                <span class="cart-item-total-label">Total:</span>
                <span class="cart-item-total-price">${formatCurrency(item.price * item.quantity)}</span>
            </div>
        </div>
    `).join('');
}

// Update cart summary for cart page
function updateCartSummary() {
    const subtotal = getCartTotalPrice();
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTax = document.getElementById('summary-tax');
    const summaryTotal = document.getElementById('summary-total');

    if (summarySubtotal) summarySubtotal.textContent = formatCurrency(subtotal);
    if (summaryShipping) summaryShipping.textContent = formatCurrency(shipping);
    if (summaryTax) summaryTax.textContent = formatCurrency(tax);
    if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cart sidebar functionality
function openCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize cart functionality
function initCart() {
    // Add event listeners for cart icon
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutBtnSidebar = document.getElementById('checkout-btn-sidebar');

    if (cartIcon) {
        cartIcon.addEventListener('click', openCartSidebar);
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeCartSidebar);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    if (checkoutBtnSidebar) {
        checkoutBtnSidebar.addEventListener('click', handleCheckout);
    }

    // Update cart UI on page load
    updateCartUI();
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    // In a real application, this would redirect to a checkout page
    showNotification('Checkout functionality would be implemented here!', 'info');
    
    // For demo purposes, clear the cart
    setTimeout(() => {
        clearCart();
        showNotification('Thank you for your purchase!', 'success');
    }, 1000);
}

// Update quantity helper function
function updateQuantity(productId, newQuantity) {
    updateCartItemQuantity(productId, newQuantity);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cart,
        saveCart,
        getCartTotalItems,
        getCartTotalPrice,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartItem,
        isInCart,
        updateCartUI,
        generateCartItemsHTML,
        generateCartPageItemsHTML,
        updateCartSummary,
        showNotification,
        openCartSidebar,
        closeCartSidebar,
        initCart,
        handleCheckout
    };
}