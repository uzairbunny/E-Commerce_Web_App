# ShopEase - eCommerce Website

A fully responsive eCommerce website built with HTML, CSS, and JavaScript. This project demonstrates modern web development practices with a clean, user-friendly interface.

## Features

### 🏠 **Home Page**
- Hero banner with gradient background and floating animation
- Featured products section with top-rated items
- Responsive navigation with active page indicators
- Smooth scrolling and fade-in animations

### 🛒 **Shop Page**
- Product grid layout with hover effects
- Sort functionality (Name A-Z, Name Z-A, Price Low-High, Price High-Low)
- Product cards with ratings, prices, and action buttons
- Responsive design that adapts to all screen sizes

### 📱 **Product Detail Page**
- Large product image with zoom effect
- Detailed product information (title, price, rating, description)
- Quantity selector and add to cart functionality
- Related products section
- Stock availability indicators

### 🛍️ **Shopping Cart**
- Real-time cart management with localStorage
- Add, remove, and update item quantities
- Order summary with subtotal, shipping, tax, and total
- Empty cart state with continue shopping option
- Checkout functionality (demo implementation)

## Technical Features

### 🎨 **Design & UI**
- CSS Grid and Flexbox for modern layouts
- CSS custom properties (variables) for consistent theming
- Smooth transitions and hover effects
- Responsive design with mobile-first approach
- Loading states and empty states

### ⚡ **JavaScript Functionality**
- Vanilla JavaScript (no frameworks)
- LocalStorage for persistent cart data
- Dynamic content generation
- Event-driven interactions
- Error handling and validation

### 📱 **Responsive Design**
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Project Structure

```
E-commerce/
├── index.html              # Home page
├── shop.html               # Shop page with product listing
├── product.html            # Product detail page template
├── cart.html               # Shopping cart page
├── css/
│   ├── styles.css          # Base styles and utilities
│   ├── home.css            # Home page specific styles
│   ├── shop.css            # Shop page specific styles
│   ├── product.css         # Product detail page styles
│   └── cart.css            # Cart page specific styles
├── js/
│   ├── products.js         # Product data and utilities
│   ├── cart.js             # Cart functionality
│   ├── main.js             # Global JavaScript
│   ├── shop.js             # Shop page logic
│   ├── product.js          # Product detail logic
│   └── cart-page.js        # Cart page logic
├── images/                 # Product images (placeholder)
└── README.md               # This file
```

## Sample Products

The website includes 12 sample products across different categories:

- **Electronics**: Wireless headphones, smartwatch, bluetooth speaker, wireless mouse
- **Home & Kitchen**: Coffee mug set, LED desk lamp, cooking set
- **Sports & Outdoors**: Yoga mat, water bottle, running shoes
- **Fashion**: Leather wallet, polarized sunglasses

## How to Use

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **Browse products**: Navigate to the shop page to view all products
3. **Product details**: Click on any product to view detailed information
4. **Add to cart**: Use the "Add to Cart" buttons throughout the site
5. **Manage cart**: View and manage your cart from any page via the cart icon
6. **Checkout**: Proceed to checkout from the cart page (demo implementation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Key Technologies

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript ES6+**: Modern JavaScript with modules and async patterns
- **LocalStorage API**: Client-side data persistence

## Notable Features

### 🎯 **User Experience**
- Smooth animations and transitions
- Loading states for better feedback
- Empty states with helpful guidance
- Mobile-optimized touch interactions

### 🔧 **Development Features**
- Modular JavaScript architecture
- Reusable CSS components
- Consistent naming conventions
- Comprehensive error handling

### 📊 **Cart Functionality**
- Real-time updates across all pages
- Persistent storage between sessions
- Quantity management and removal
- Order summary calculations

## Future Enhancements

Potential features that could be added:
- User registration and login
- Product search and filtering
- Wishlist functionality
- Order history and tracking
- Payment integration
- Admin dashboard
- Product reviews and ratings

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please:
1. Check the browser console for JavaScript errors
2. Ensure you're using a modern browser with JavaScript enabled
3. Verify all files are in the correct directories
4. Test in an incognito/private browsing window to rule out cache issues