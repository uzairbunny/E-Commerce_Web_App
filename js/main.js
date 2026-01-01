// Main JavaScript file for global functionality

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart functionality
    initCart();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements when they enter viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all product cards and sections
    document.querySelectorAll('.product-card, .section-header, .hero').forEach(el => {
        observer.observe(el);
    });

    // Add click event for "Add to Cart" buttons on product cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            const quantity = parseInt(e.target.getAttribute('data-quantity')) || 1;
            
            if (productId) {
                addToCart(productId, quantity);
            }
        }
    });

    // Add click event for product cards to navigate to product detail page
    document.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        if (productCard && !e.target.classList.contains('add-to-cart-btn')) {
            const productId = productCard.getAttribute('data-product-id');
            if (productId) {
                window.location.href = `product.html?id=${productId}`;
            }
        }
    });

    // Handle window resize for responsive design
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});

// Utility function to create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image || getPlaceholderImage(product.id)}" alt="${product.title}">
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
    `;
}

// Utility function to create product detail HTML
function createProductDetailHTML(product) {
    return `
        <div class="product-container">
            <div class="product-image">
                <img id="product-main-image" src="${product.image || getPlaceholderImage(product.id)}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h1 id="product-title">${product.title}</h1>
                <div class="product-rating">
                    ${getStarRating(product.rating)}
                    <span>(${product.rating}/5)</span>
                </div>
                <div class="product-price">
                    <span class="price" id="product-price">${formatCurrency(product.price)}</span>
                </div>
                <div class="product-description" id="product-description">
                    ${product.description}
                </div>
                <div class="product-quantity">
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1">
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" id="add-to-cart-btn" onclick="addToCart(${product.id}, document.getElementById('quantity').value)">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" id="buy-now-btn">Buy Now</button>
                </div>
                <div class="product-meta">
                    <p><strong>Category:</strong> <span id="product-category">${product.category}</span></p>
                    <p><strong>Availability:</strong> <span id="product-availability">${product.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
                </div>
            </div>
        </div>
    `;
}

// Utility function to create related products HTML
function createRelatedProductsHTML(relatedProducts) {
    if (relatedProducts.length === 0) {
        return '<p>No related products found.</p>';
    }

    return `
        <div class="products-grid">
            ${relatedProducts.map(product => createProductCard(product)).join('')}
        </div>
    `;
}

// Error handling for images
function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = getPlaceholderImage(img.getAttribute('data-product-id') || '0');
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
});

// Mobile menu toggle (if needed in the future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createProductCard,
        createProductDetailHTML,
        createRelatedProductsHTML,
        handleImageError,
        toggleMobileMenu
    };
}