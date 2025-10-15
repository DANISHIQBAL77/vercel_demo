// lib/products.js or data/products.js

export const allProducts = [
  { 
    id: 1,
    slug: "Acme Circles T-Shirt",
    name: "Acme Circles T-Shirt", 
    price: 49, 
    image: "/images/t-shirt-1.jpg",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/t-shirt-1.jpg" },
      { name: "Navy", hex: "white", image: "/images/t-shirt-navy.jpg" },
      { name: "Gray", hex: "#808080", image: "/images/t-shirt-gray.jpg" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium quality hoodie perfect for everyday wear. Made with soft, durable materials."
  },
  { 
    id: 2,
    slug: "acme bag",
    name: "White T-shirt", 
    price: 25, 
    image: "/images/bag-1-dark.jpg",
    colors: [
      { name: "Dark", hex: "#1a1a1a", image: "/images/bag-1-dark.jpg" },
      { name: "Brown", hex: "#8B4513", image: "/images/bag-1-brown.jpg" },
      { name: "Beige", hex: "#F5F5DC", image: "/images/bag-1-beige.jpg" }
    ],
    sizes: ["One Size"],
    description: "Stylish and practical bag for all occasions."
  },
  { 
    id: 3,
    slug: "sneakers",
    name: "Sneakers", 
    price: 89, 
    image: "/images/cup-black.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/cup-black.avif" },
      { name: "White", hex: "#FFFFFF", image: "/images/cup-white.avif" },
      { name: "Red", hex: "#FF0000", image: "/images/cup-red.avif" }
    ],
    description: "High-quality ceramic cup for your favorite beverages."
  },
  { 
    id: 4,
    slug: "acme-hoodie",
    name: "acme hoodie", 
    price: 19, 
    image: "/images/hoodie-1.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/hoodie-1.avif" },
      { name: "Gray", hex: "#808080", image: "/images/hoodie-gray.avif" },
      { name: "Navy", hex: "#001f3f", image: "/images/hoodie-navy.avif" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Comfortable acme hoodie with modern design."
  },
  { 
    id: 5,
    slug: "acme-baby-cap",
    name: "acme Baby Cap", 
    price: 23, 
    image: "/images/baby-cap-black.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/baby-cap-black.avif" },
      { name: "Pink", hex: "#FFC0CB", image: "/images/baby-cap-pink.avif" },
      { name: "Blue", hex: "#4169E1", image: "/images/baby-cap-blue.avif" }
    ],
    sizes: ["0-6M", "6-12M", "12-24M"],
    description: "Adorable baby cap made with soft, gentle materials."
  },
  { 
    id: 6,
    slug: "acme-baby-onesie",
    name: "acme Baby Onesie", 
    price: 30, 
    image: "/images/baby-onesie-beige-1.avif",
    colors: [
      { name: "Beige", hex: "#F5F5DC", image: "/images/baby-onesie-beige-1.avif" },
      { name: "White", hex: "#FFFFFF", image: "/images/baby-onesie-white.avif" },
      { name: "Gray", hex: "#D3D3D3", image: "/images/baby-onesie-gray.avif" }
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    description: "Comfortable baby onesie for your little one."
  },
  { 
    id: 7,
    slug: "acme-mug",
    name: "acme Mug", 
    price: 15, 
    image: "/images/mug-1.avif",
    colors: [
      { name: "White", hex: "#FFFFFF", image: "/images/mug-1.avif" },
      { name: "Black", hex: "#000000", image: "/images/mug-black.avif" },
      { name: "Blue", hex: "#4169E1", image: "/images/mug-blue.avif" }
    ],
    description: "Perfect mug for your morning coffee or tea."
  },
];

// Helper function to get product by slug
export function getProductBySlug(slug) {
  return allProducts.find(product => product.slug === slug);
}

// Helper function to get featured products
export function getFeaturedProducts() {
  return allProducts.slice(0, 3);
}

// Helper function to get carousel products
export function getCarouselProducts() {
  return allProducts.slice(3);
}