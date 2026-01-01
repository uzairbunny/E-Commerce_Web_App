// Sample Product Data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 99.99,
        image: "https://picsum.photos/seed/headphones/300/300",
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
        rating: 4.5,
        inStock: true
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        price: 149.99,
        image: "https://picsum.photos/seed/fitness-watch/300/300",
        category: "Electronics",
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
        rating: 4.2,
        inStock: true
    },
    {
        id: 3,
        title: "Ceramic Coffee Mug Set",
        price: 29.99,
        image: "https://picsum.photos/seed/coffee-mug/300/300",
        category: "Home & Kitchen",
        description: "Set of 4 elegant ceramic mugs perfect for your morning coffee or tea.",
        rating: 4.7,
        inStock: true
    },
    {
        id: 4,
        title: "Yoga Mat Premium",
        price: 39.99,
        image: "https://picsum.photos/seed/yoga-mat/300/300",
        category: "Sports & Outdoors",
        description: "Non-slip yoga mat with excellent cushioning for all your yoga and exercise routines.",
        rating: 4.6,
        inStock: true
    },
    {
        id: 5,
        title: "Leather Wallet Brown",
        price: 49.99,
        image: "https://picsum.photos/seed/wallet/300/300",
        category: "Fashion",
        description: "Genuine leather wallet with multiple card slots and RFID protection.",
        rating: 4.3,
        inStock: true
    },
    {
        id: 6,
        title: "LED Desk Lamp",
        price: 34.99,
        image: "https://picsum.photos/seed/desk-lamp/300/300",
        category: "Home & Kitchen",
        description: "Adjustable LED desk lamp with multiple brightness levels and USB charging port.",
        rating: 4.4,
        inStock: true
    },
    {
        id: 7,
        title: "Wireless Mouse",
        price: 24.99,
        image: "https://picsum.photos/seed/mouse/300/300",
        category: "Electronics",
        description: "Ergonomic wireless mouse with precise tracking and long battery life.",
        rating: 4.1,
        inStock: true
    },
    {
        id: 8,
        title: "Stainless Steel Water Bottle",
        price: 22.99,
        image: "https://picsum.photos/seed/water-bottle/300/300",
        category: "Sports & Outdoors",
        description: "Insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours.",
        rating: 4.5,
        inStock: true
    },
    {
        id: 9,
        title: "Bluetooth Speaker",
        price: 79.99,
        image: "https://picsum.photos/seed/speaker/300/300",
        category: "Electronics",
        description: "Portable bluetooth speaker with 360-degree sound and 15-hour playtime.",
        rating: 4.3,
        inStock: true
    },
    {
        id: 10,
        title: "Cooking Set 10-Piece",
        price: 89.99,
        image: "https://picsum.photos/seed/cooking-set/300/300",
        category: "Home & Kitchen",
        description: "Complete cooking set with non-stick pans and utensils for the modern kitchen.",
        rating: 4.6,
        inStock: true
    },
    {
        id: 11,
        title: "Running Shoes Men",
        price: 119.99,
        image: "https://picsum.photos/seed/running-shoes/300/300",
        category: "Sports & Outdoors",
        description: "Lightweight running shoes with excellent cushioning and breathability.",
        rating: 4.4,
        inStock: true
    },
    {
        id: 12,
        title: "Sunglasses Polarized",
        price: 59.99,
        image: "https://picsum.photos/seed/sunglasses/300/300",
        category: "Fashion",
        description: "UV400 polarized sunglasses with stylish design and scratch-resistant lenses.",
        rating: 4.2,
        inStock: true
    }
];

// Function to get a product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Function to get featured products (top-rated)
function getFeaturedProducts() {
    return products
        .filter(product => product.rating >= 4.3)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
}

// Function to get related products (same category, excluding current product)
function getRelatedProducts(currentProductId, category) {
    return products
        .filter(product => product.id !== currentProductId && product.category === category)
        .slice(0, 4);
}

// Function to sort products
function sortProducts(productsArray, sortBy) {
    switch(sortBy) {
        case 'name-asc':
            return [...productsArray].sort((a, b) => a.title.localeCompare(b.title));
        case 'name-desc':
            return [...productsArray].sort((a, b) => b.title.localeCompare(a.title));
        case 'price-asc':
            return [...productsArray].sort((a, b) => a.price - b.price);
        case 'price-desc':
            return [...productsArray].sort((a, b) => b.price - a.price);
        default:
            return productsArray;
    }
}

// Function to generate a placeholder image URL
function getPlaceholderImage(id) {
    return `https://picsum.photos/seed/product-${id}/300/300`;
}

// Function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Function to get star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getRelatedProducts,
        sortProducts,
        getPlaceholderImage,
        formatCurrency,
        getStarRating
    };
}