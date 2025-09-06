// app/components/Navbar.jsx

"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, Search, CreditCard } from "lucide-react";

export default function Navbar() {
  const cartItemCount = ''; // dynamically replace with your cart state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-20 bg-[#171717] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Hamburger Menu (only for small & medium screens) */}
        <div className="flex items-center lg:hidden">
          <button
            className="text-white border border-[#2c2c2c] rounded-md p-3"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center: Logo + Store Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none flex items-center space-x-2">
          <Image
            src="globe.svg" // replace with your store logo
            alt="Store Logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-lg font-bold text-white whitespace-nowrap">
            ACME STORE
          </span>

          {/* Links (Large screens only) */}
          <div className="hidden lg:flex items-center space-x-6 ml-6">
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

        {/* Search Bar (Large screens only) */}
        <div className="flex-1 max-w-md mx-6 hidden lg:block relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent text-white placeholder-gray-400"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Right: Checkout Button */}
        <div className="flex items-center lg:ml-4">
          <button className="relative h-13 w-13 flex items-center bg-transparent border-1 border-[#2c2c2c] text-white px-4 py-2 rounded-md">
             <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className="h-4 w-4 transition-all ease-in-out hover:scale-110"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
        14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 
        2.1-4.684 2.924-7.138a60.114 60.114 0 0 
        0-16.536-1.84M7.5 14.25 5.106 5.272M6 
        20.25a.75.75 0 1 1-1.5 0 .75.75 0 
        0 1 1.5 0Zm12.75 0a.75.75 0 1 
        1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
            {/* Counter (only if products exist) */}
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Medium Sliding Drawer Menu */}
      <div
        className={`fixed inset-0 bg-[#000000] transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        {/* Header inside drawer */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            className="text-white border border-[#2c2c2c] rounded-md p-2"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search bar inside drawer */}
        <div className="px-5 py-4 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md border-1 border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] bg-transparent text-white placeholder-gray-400"
          />
          <Search className="absolute right-9 top-6 w-5 h-5 text-gray-400" />
        </div>

        {/* Drawer Links */}
        <div className="px-6 space-y-4 mt-4">
          <a href="#" className="block text-white-300 hover:text-gray-400 text-lg">
            All
          </a>
          <a href="#" className="block text-white-300 hover:text-gray-400 text-lg">
            Shirts
          </a>
          <a href="#" className="block text-white-300 hover:text-gray-400 text-lg">
            Stickers
          </a>
        </div>
      </div>
    </nav>
  );
}