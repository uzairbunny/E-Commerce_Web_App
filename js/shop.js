// Shop page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load products when the page loads
    loadProducts();
    
    // Add event listener for sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            loadProducts(this.value);
        });
    }
});

// Load products with optional sorting
function loadProducts(sortBy = 'name-asc') {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;

    // Show loading state
    productsGrid.innerHTML = '<div class="loading">Loading products...</div>';

    // Simulate API delay
    setTimeout(() => {
        let sortedProducts = sortProducts(products, sortBy);
        
        if (sortedProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>We couldn't find any products matching your criteria.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Refresh Page</button>
                </div>
            `;
            return;
        }

        // Generate product cards HTML
        const productsHTML = sortedProducts.map(product => `
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

        productsGrid.innerHTML = productsHTML;
        
        // Add fade-in animation to new products
        const productCards = productsGrid.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }, 500);
}

// Search functionality (if search input is added in the future)
function searchProducts(query) {
    if (!query || query.trim() === '') {
        loadProducts();
        return;
    }

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>No products match your search: "${query}"</p>
                    <button class="btn btn-primary" onclick="loadProducts()">Show All Products</button>
                </div>
            `;
            return;
        }

        const productsHTML = filteredProducts.map(product => `
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

        productsGrid.innerHTML = productsHTML;
    }
}

// Filter by category (if category filters are added in the future)
function filterByCategory(category) {
    if (!category || category === 'all') {
        loadProducts();
        return;
    }

    const filteredProducts = products.filter(product => product.category === category);
    
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>No products in the "${category}" category.</p>
                    <button class="btn btn-primary" onclick="loadProducts()">Show All Products</button>
                </div>
            `;
            return;
        }

        const productsHTML = filteredProducts.map(product => `
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

        productsGrid.innerHTML = productsHTML;
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadProducts,
        searchProducts,
        filterByCategory
    };
}