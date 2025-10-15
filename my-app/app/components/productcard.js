'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';


// ============================================
// PRODUCT MODAL COMPONENT
// Shows detailed product view with color/size selection
// ============================================
function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  // State to track which color is currently selected
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  
  // State to track which size is currently selected
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  
  // State to track how many items user wants to buy
  const [quantity, setQuantity] = useState(1);

  // Reset selections whenever product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null); // Default to first color
      setSelectedSize(product.sizes?.[0] || null);   // Default to first size
      setQuantity(1);                                 // Reset quantity to 1
    }
  }, [product]);

  // Don't render anything if modal is closed or no product selected
  if (!isOpen || !product) return null;

  // Function to handle "Add to Cart" button click
  const handleAddToCart = () => {
    onAddToCart?.({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
    onClose(); // Close modal after adding to cart
  };

  // Get the image for currently selected color, fallback to product's main image
  const currentImage = selectedColor?.image || product.image;

  return (
    // Full-screen overlay with semi-transparent black background
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Close modal when clicking outside
    >
      {/* Modal content container */}
      <div 
        className="bg-black border border-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Modal Header - Sticky at top when scrolling */}
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          {/* Close button */}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDE: Product Image Display */}
            <div className="flex-1 flex items-center justify-center bg-neutral-900 rounded-lg p-8 min-h-[400px]">
              <img
                src={currentImage} // Shows image based on selected color
                alt={product.name}
                className="object-contain max-h-96 w-full"
              />
            </div>
            
            {/* RIGHT SIDE: Product Details & Controls */}
            <div className="flex-1 space-y-6">
              
              {/* Price Display */}
              <div className="text-4xl font-bold text-white">
                ${product.price}.00 USD
              </div>
              
              {/* Product Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Product Details</h3>
                <p className="text-gray-400">
                  {product.description || "This is a high-quality product that meets all your needs. Perfect for everyday use with exceptional durability and performance."}
                </p>
              </div>

              {/* COLOR SELECTION SECTION */}
{product.colors && product.colors.length > 0 && (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-white">
      Color: <span className="text-gray-400 font-normal">{selectedColor?.name}</span>
    </h3>
    <div className="flex gap-3 flex-wrap">
      {product.colors.map((color) => (
        <button
          key={color.name}
          onClick={() => setSelectedColor(color)}
          className={`px-5 py-2 rounded-full border-2 font-medium text-sm transition-all ${
            selectedColor?.name === color.name
              ? 'border-blue-500 bg-blue-600 text-white scale-105'
              : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
          }`}
        >
          {color.name}
        </button>
      ))}
    </div>
  </div>
)}


              {/* SIZE SELECTION SECTION */}
              {/* Only shows if product has sizes defined */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Select Size</h3>
                  {/* Size buttons */}
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)} // Update selected size on click
                        className={`px-6 py-3 rounded-md border-2 font-medium transition-all ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-500 text-white' // Highlight selected size
                            : 'border-gray-700 bg-transparent text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUANTITY SELECTOR */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Quantity</h3>
                <div className="flex items-center gap-4">
                  {/* Decrease quantity button (minimum 1) */}
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-700 rounded-md text-white hover:bg-gray-800 transition-colors"
                  >
                    −
                  </button>
                  {/* Current quantity display */}
                  <span className="text-xl font-semibold text-white w-12 text-center">
                    {quantity}
                  </span>
                  {/* Increase quantity button */}
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-700 rounded-md text-white hover:bg-gray-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* ADD TO CART BUTTON */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                Add to Cart
              </button>

              {/* PRODUCT FEATURES LIST */}
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Modern design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Long-lasting durability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Easy to use
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PRODUCT CARD COMPONENT
// Displays product thumbnail on home page
// ============================================
export default function ProductCard({ product, big, onAddToCart }) {
  const router = useRouter(); // Next.js router for navigation

  // Navigate to product detail page when card is clicked
  const handleClick = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <>
      {/* Product Card Container */}
      {/* 'big' prop controls if this is a large featured card or small card */}
      <div
        onClick={handleClick}
        className={`relative bg-black border border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-600 transition-all duration-300 ease-in-out flex flex-col items-center w-full group cursor-pointer ${big ? "h-[350px] sm:h-[420px]" : "h-[350px] sm:h-[195px]"}`}
      >
        {/* Product Image Container */}
        <div className="flex items-center justify-center flex-1 w-full">
          <img
            src={product.image}
            alt={product.name}
            // Image size and hover animation - moves up and scales on hover
            className={`object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-105 ${big ? "h-72 sm:h-96 w-full max-w-2xl" : "h-72 sm:h-32 w-full sm:w-40"}`}
          />
        </div>

        {/* Product Name & Price Badge - positioned at bottom left */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 sm:gap-3 px-3 py-2 bg-black border border-gray-800 rounded-full backdrop-blur-md">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white whitespace-nowrap">
            {product.name}
          </h2>
          <p className="text-white text-xs sm:text-sm bg-blue-600 px-3 sm:px-4 py-1 rounded-full font-medium whitespace-nowrap">
            ${product.price}.00 USD
          </p>
        </div>
      </div>
    </>
  );
}

// ============================================
// MOVING CARDS CAROUSEL SECTION
// Auto-scrolling horizontal carousel of products
// ============================================
export function MovingCardsSection({ products, speed = 1, onAddToCart }) {
  const router = useRouter();
  const scrollRef = useRef(null); // Reference to scrollable container
  const [isAutoScrolling, setIsAutoScrolling] = useState(true); // Controls auto-scroll
  const [isMounted, setIsMounted] = useState(false); // Prevents hydration errors
  const timeoutRef = useRef(null); // Timer for resuming auto-scroll
  const animationRef = useRef(null); // Animation frame reference

  // Set component as mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // AUTO-SCROLL LOGIC
  useEffect(() => {
    if (!isMounted) return; // Don't run on server
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = speed;

    // Animation loop for auto-scrolling
    const animate = () => {
      if (isAutoScrolling) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll when reaching end of first set (infinite scroll effect)
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Pause auto-scroll when user manually scrolls
    const handleScroll = () => {
      if (Math.abs(scrollContainer.scrollLeft - scrollPosition) > 2) {
        setIsAutoScrolling(false); // Stop auto-scroll
        scrollPosition = scrollContainer.scrollLeft;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Resume auto-scroll after 3 seconds of inactivity
        timeoutRef.current = setTimeout(() => {
          setIsAutoScrolling(true);
        }, 3000);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isAutoScrolling, speed, isMounted]);

  // Show static version during server-side rendering (prevents hydration errors)
  if (!isMounted) {
    return (
      <div className="w-full py-4 mt-2">
        <div className="flex overflow-x-auto pb-4">
          <div className="flex">
            {products.map((product, index) => (
              <div 
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-[280px] h-[280px] sm:w-[512px] sm:h-48 bg-black border border-gray-800 rounded-lg p-4 shadow-md mx-3"
              >
                <div className="flex items-center justify-center h-[200px] sm:h-44 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-full w-full rounded-md"
                  />
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black border border-gray-800 rounded-full backdrop-blur-md w-fit z-10">
                  <h2 className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                    {product.name}
                  </h2>
                  <p className="text-white text-xs bg-blue-600 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    ${product.price}.00
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Triple the products array for seamless infinite scroll effect
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <>
      <div className="w-full py-4 mt-2">
        {/* Custom scrollbar styling */}
        <style dangerouslySetInnerHTML={{__html: `
          .carousel-container::-webkit-scrollbar {
            height: 8px;
          }
          .carousel-container::-webkit-scrollbar-track {
            background: #1f2937;
            border-radius: 4px;
          }
          .carousel-container::-webkit-scrollbar-thumb {
            background: #6b7280;
            border-radius: 4px;
          }
          .carousel-container::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}} />
        
        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="carousel-container flex overflow-x-auto pb-4"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: '#6b7280 #1f2937'
          }}
        >
          <div className="flex">
            {/* Map through duplicated products for infinite scroll effect */}
            {duplicatedProducts.map((product, index) => (
              <div 
                key={`${product.id}-${index}`}
                onClick={() => router.push(`/product/${product.slug}`)} // Navigate to product page
                className="flex-shrink-0 w-[280px] h-[280px] sm:w-[512px] sm:h-48 bg-black border border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-600 transition-all duration-300 mx-3 group relative overflow-visible cursor-pointer"
              >
                {/* Product Image */}
                <div className="flex items-center justify-center h-[200px] sm:h-44 mb-4 relative z-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-full w-full rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                {/* Product Name & Price Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black border border-gray-800 rounded-full backdrop-blur-md w-fit z-10">
                  <h2 className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                    {product.name}
                  </h2>
                  <p className="text-white text-xs bg-blue-600 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    ${product.price}.00
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Product Name & Price Badge */}
    </>
  );
}