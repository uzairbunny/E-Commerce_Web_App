// Product detail page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProductDetails(parseInt(productId));
        loadRelatedProducts(parseInt(productId));
    } else {
        // If no product ID is provided, redirect to shop page
        window.location.href = 'shop.html';
    }
});

// Load product details
function loadProductDetails(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        // Product not found, show error message
        document.getElementById('product-title').textContent = 'Product Not Found';
        document.getElementById('product-description').innerHTML = `
            <p>Sorry, the product you're looking for could not be found.</p>
            <a href="shop.html" class="btn btn-primary">Back to Shop</a>
        `;
        return;
    }

    // Update product details
    document.getElementById('product-main-image').src = product.image || getPlaceholderImage(product.id);
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = formatCurrency(product.price);
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-availability').textContent = product.inStock ? 'In Stock' : 'Out of Stock';

    // Update star rating
    const ratingContainer = document.querySelector('.product-rating');
    if (ratingContainer) {
        ratingContainer.innerHTML = `
            ${getStarRating(product.rating)}
            <span>(${product.rating}/5)</span>
        `;
    }

    // Update add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = function() {
            const quantity = document.getElementById('quantity').value;
            addToCart(productId, quantity);
        };
    }

    // Update buy now button
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.onclick = function() {
            const quantity = document.getElementById('quantity').value;
            addToCart(productId, quantity);
            // In a real application, this would redirect to checkout
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 500);
        };
    }

    // Handle quantity input
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.max = product.inStock ? '99' : '0';
        quantityInput.disabled = !product.inStock;
        
        if (!product.inStock) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Out of Stock';
            buyNowBtn.disabled = true;
            buyNowBtn.textContent = 'Out of Stock';
        }
    }
}

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedProducts = getRelatedProducts(currentProductId, getProductById(currentProductId)?.category);
    const relatedProductsGrid = document.getElementById('related-products-grid');
    
    if (relatedProductsGrid) {
        if (relatedProducts.length === 0) {
            relatedProductsGrid.innerHTML = '<p>No related products found.</p>';
            return;
        }

        const relatedProductsHTML = relatedProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image || getPlaceholderImage(product.id)}" alt="${product.title}" onerror="handleImageError(this)">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-rating">
                        ${getStarRating(product.rating)}
                        <span>(${product.rating}/5)</span>
                    </div>
                    <div class="product-price">${formatCurrency(product.price)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" data-quantity="1">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="window.location.href='product.html?id=${product.id}'">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        relatedProductsGrid.innerHTML = relatedProductsHTML;
    }
}

// Image zoom functionality (if multiple images are available)
function setupImageZoom() {
    const mainImage = document.getElementById('product-main-image');
    if (mainImage) {
        mainImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        mainImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Quantity controls
function updateQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            const max = parseInt(quantityInput.max) || 99;
            if (quantityInput.value < max) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    }
}

// Add product to wishlist (future enhancement)
function addToWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification('Added to wishlist!', 'success');
    } else {
        showNotification('Already in wishlist!', 'info');
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadProductDetails,
        loadRelatedProducts,
        setupImageZoom,
        updateQuantityControls,
        addToWishlist
    };
}