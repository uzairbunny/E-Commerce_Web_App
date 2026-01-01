# How to Run the ShopEase eCommerce Website

## Quick Start

### Method 1: Direct Browser Opening (Recommended for Testing)
1. **Navigate to the project folder** in your file explorer
2. **Double-click `index.html`** to open it in your default web browser
3. **The website will load** and you can start browsing products, adding items to cart, etc.

### Method 2: Using a Local Server (Recommended for Development)
If you want to run this properly with all features working (especially for testing API calls or advanced features):

#### Option A: Python Simple Server
```bash
# Navigate to the project directory
cd path/to/E-commerce

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open your browser and go to: `http://localhost:8000`

#### Option B: Node.js HTTP Server
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to the project directory
cd path/to/E-commerce

# Start the server
http-server -p 8080
```
Then open your browser and go to: `http://localhost:8080`

#### Option C: Live Server (VS Code Extension)
1. **Install the "Live Server" extension** in VS Code
2. **Right-click on `index.html`**
3. **Select "Open with Live Server"**
4. **The website will open** in your default browser with live reload functionality

## What You'll See

### Home Page (`index.html`)
- Hero banner with gradient background
- Featured products section
- Navigation menu
- Footer with contact information

### Shop Page (`shop.html`)
- Grid of all products
- Sort options (Name A-Z, Price Low-High, etc.)
- Product cards with images, prices, and ratings

### Product Detail Page (`product.html`)
- Individual product information
- Large product image
- Add to cart functionality
- Related products section

### Cart Page (`cart.html`)
- Your shopping cart items
- Quantity controls
- Order summary
- Checkout functionality

## Features to Test

### Shopping Cart Functionality
1. **Add items to cart** from any product card
2. **View cart** by clicking the cart icon in the header
3. **Manage quantities** in the cart sidebar
4. **Remove items** from the cart
5. **Proceed to checkout** (demo implementation)

### Product Interactions
1. **Click product cards** to view details
2. **Use quantity selector** on product detail pages
3. **Sort products** on the shop page
4. **Navigate between pages** using the header menu

## Browser Compatibility

The website works in all modern browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Troubleshooting

### If Images Don't Load
- The website uses placeholder images from a CDN (picsum.photos)
- If images don't load, check your internet connection
- The site will still function normally with placeholder backgrounds
- **Fixed Issue**: Previously used via.placeholder.com which had reliability issues

### If Cart Doesn't Work
- Make sure JavaScript is enabled in your browser
- Try opening the browser's developer console (F12) to check for errors
- Clear your browser cache and try again
- **Fixed Issue**: Cart functionality now properly initializes and saves to localStorage

### If You See "File Not Found" Errors
- Ensure all files are in the correct directories
- Check that the folder structure matches the project structure in README.md
- Make sure you're opening the files from a web server (not just double-clicking)

### Common Issues Fixed
- **Image Loading**: Updated from unreliable via.placeholder.com to picsum.photos CDN
- **Missing Images Directory**: No longer requires local images/ directory
- **JavaScript Errors**: All functions properly scoped and exported
- **Cart Persistence**: Cart data now properly saves and loads from localStorage

## Development Notes

### File Structure
```
E-commerce/
├── index.html              # Home page
├── shop.html               # Shop page
├── product.html            # Product detail page
├── cart.html               # Cart page
├── css/                    # All CSS files
├── js/                     # All JavaScript files
├── images/                 # Product images (not required anymore)
└── README.md               # Documentation
```

### Key Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript ES6+**: Modern JavaScript with modules and async patterns
- **LocalStorage API**: Client-side data persistence for cart

### No Frameworks
This project uses **vanilla HTML, CSS, and JavaScript** only - no frameworks like React, Vue, or Angular were used, as requested.

## Fixed Issues

### Image Loading Problems
- **Problem**: Website tried to load images from non-existent `images/` directory
- **Solution**: Updated all product images to use picsum.photos CDN with unique seeds
- **Benefit**: Reliable image loading without requiring local image files

### JavaScript Functionality
- **Problem**: Some functions had scope issues and module export problems
- **Solution**: Properly structured all JavaScript files with correct exports
- **Benefit**: All cart and product functionality now works correctly

### Cart Persistence
- **Problem**: Cart data wasn't properly saving or loading
- **Solution**: Fixed localStorage operations and initialization
- **Benefit**: Cart items persist between page refreshes and browser sessions

## Next Steps

Once you have the website running:

1. **Test all functionality** - add items to cart, navigate between pages, etc.
2. **Check responsiveness** - resize your browser window to see mobile layouts
3. **View the code** - explore the HTML, CSS, and JavaScript files to understand how it works
4. **Customize** - modify colors, text, or add new products by editing the files

The website is now fully functional and demonstrates modern web development best practices!