// app/components/navbar.js

'use client';
import { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const cartItemCount = 0; // dynamically replace with your cart state
  const [isOpen, setIsOpen] = useState(false); // left drawer (mobile menu)
  const [isCartOpen, setIsCartOpen] = useState(false); // right drawer (cart)

  return (
    <nav className="h-20 z-50 bg-neutral-900">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
          {/* Mobile/Tablet: Hamburger Menu */}
          <div className="lg:hidden">
            <button
              className="text-white border border-gray-800 rounded-md p-2"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Logo & Store Name */}
          <div className="flex items-center flex-1 justify-center lg:justify-start lg:flex-none">
            <a className="flex items-center" href="/">
              <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Acme Store logo"
                  viewBox="0 0 32 28"
                  className="h-4 w-4 fill-black dark:fill-white"
                >
                  <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
                  <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
                </svg>
              </div>
              <div className="ml-2 flex-none text-sm font-medium uppercase sm:block">
                Acme Store
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-6 ml-8">
              <a href="#" className="text-gray-300 hover:text-white">
                All
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Shirts
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Stickers
              </a>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent text-white placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Cart Button */}
          <div className="lg:ml-4">
            <button
              className="relative flex items-center justify-center bg-transparent border border-gray-800 text-white p-3 rounded-md"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 transition-all ease-in-out hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile Drawer (Left) ---------------- */}
      {isOpen && (
        <div className="fixed inset-0 bg-black transform transition-transform duration-300 ease-in-out z-50 lg:hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[35px] w-[35px] rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Acme Store logo"
                  viewBox="0 0 32 28"
                  className="h-4 w-4 fill-black dark:fill-white"
                >
                  <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
                  <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
                </svg>
              </div>
              <div className="ml-2 text-sm font-medium uppercase text-white">
                Acme Store
              </div>
            </div>
            <button
              className="text-white border border-gray-800 rounded-md p-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="px-4 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent text-white placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Links */}
          <div className="px-4 space-y-1">
            <a
              href="#"
              className="block text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base transition-colors"
            >
              All
            </a>
            <a
              href="#"
              className="block text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base transition-colors"
            >
              Shirts
            </a>
            <a
              href="#"
              className="block text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base transition-colors"
            >
              Stickers
            </a>
          </div>
        </div>
      )}

      {/* ---------------- Cart Drawer (Right) ---------------- */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 h-full w-90 bg-neutral-900 border-l border-gray-800 shadow-lg z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <div className="text-xl font-medium text-white">My Cart</div>
            <button
              className="text-gray-400 hover:text-white border border-gray-800 p-2 rounded-md"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Empty Cart */}
          <div className="flex flex-col items-center justify-center h-[calc(100%-80px)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-16 w-16 text-gray-600 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <p className="text-white text-lg font-medium">Your cart is empty</p>
          </div>
        </div>
      )}
    </nav>
  );
}