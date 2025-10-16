'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';


// ============================================
// PRODUCT CARD COMPONENT
// Displays product thumbnail on home page
// ============================================
export default function ProductCard({ product, big, onAddToCart }) {
  const router = useRouter();

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

  const handleCardClick = (product) => {
    router.push(`/product/${product.slug}`);
  };

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
                onClick={() => handleCardClick(product)}
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
    </>
  );
}