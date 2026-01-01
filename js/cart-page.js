// Cart page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart functionality
    initCart();
    
    // Load cart items when the page loads
    loadCartPage();
    
    // Add event listeners for cart actions
    setupCartPageEvents();
});

// Load cart page content
function loadCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        cartItemsContainer.innerHTML = '';
        return;
    }

    // Hide empty cart message
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }

    // Generate cart items HTML
    const cartItemsHTML = generateCartPageItemsHTML();
    cartItemsContainer.innerHTML = cartItemsHTML;

    // Update cart summary
    updateCartSummary();

    // Add animations to cart items
    const cartItemElements = cartItemsContainer.querySelectorAll('.cart-item');
    cartItemElements.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Setup cart page event listeners
function setupCartPageEvents() {
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // In a real application, this would redirect to checkout
            showNotification('Redirecting to checkout...', 'info');
            setTimeout(() => {
                // For demo purposes, just show a success message
                showNotification('Thank you for your purchase!', 'success');
                clearCart();
                loadCartPage();
            }, 2000);
        });
    }

    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'shop.html';
        });
    }

    // Quantity input change event
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const productId = parseInt(e.target.closest('.cart-item').getAttribute('data-product-id'));
            const newQuantity = parseInt(e.target.value);
            updateCartItemQuantity(productId, newQuantity);
            loadCartPage();
        }
    });

    // Remove button click event
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn') || 
            (e.target.closest('.remove-btn') && e.target.tagName === 'I')) {
            const cartItem = e.target.closest('.cart-item');
            const productId = parseInt(cartItem.getAttribute('data-product-id'));
            removeFromCart(productId);
            loadCartPage();
        }
    });
}

// Update cart item quantity from input
function updateQuantityFromInput(productId, inputElement) {
    const newQuantity = parseInt(inputElement.value);
    updateCartItemQuantity(productId, newQuantity);
    loadCartPage();
}

// Clear all items from cart
function clearAllCartItems() {
    if (cart.length === 0) {
        showNotification('Your cart is already empty!', 'info');
        return;
    }

    if (confirm('Are you sure you want to clear all items from your cart?')) {
        clearCart();
        loadCartPage();
        showNotification('Cart cleared!', 'info');
    }
}

// Apply discount code (future enhancement)
function applyDiscountCode() {
    const discountInput = document.getElementById('discount-code');
    const discountCode = discountInput ? discountInput.value.trim() : '';
    
    if (!discountCode) {
        showNotification('Please enter a discount code', 'error');
        return;
    }

    // Mock discount validation
    if (discountCode === 'SAVE10') {
        showNotification('10% discount applied!', 'success');
        // In a real application, this would update the cart totals
    } else {
        showNotification('Invalid discount code', 'error');
    }
}

// Save cart for later (future enhancement)
function saveCartForLater() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const savedCarts = JSON.parse(localStorage.getItem('savedCarts')) || [];
    const savedCart = {
        id: Date.now(),
        items: [...cart],
        date: new Date().toISOString(),
        name: `Saved Cart ${savedCarts.length + 1}`
    };

    savedCarts.push(savedCart);
    localStorage.setItem('savedCarts', JSON.stringify(savedCarts));
    
    showNotification('Cart saved for later!', 'success');
}

// Load saved cart (future enhancement)
function loadSavedCart(cartId) {
    const savedCarts = JSON.parse(localStorage.getItem('savedCarts')) || [];
    const savedCart = savedCarts.find(cart => cart.id === cartId);
    
    if (savedCart) {
        cart = [...savedCart.items];
        saveCart();
        updateCartUI();
        loadCartPage();
        showNotification('Saved cart loaded!', 'success');
    } else {
        showNotification('Saved cart not found', 'error');
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadCartPage,
        setupCartPageEvents,
        updateQuantityFromInput,
        clearAllCartItems,
        applyDiscountCode,
        saveCartForLater,
        loadSavedCart
    };
}