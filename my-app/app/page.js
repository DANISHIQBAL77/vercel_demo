import Navbar from './components/navbar';
import ProductCard from './components/productcard';
import Footer from "./components/footer";


const products = [
  { id: 1, name: "Black Hoodie", price: 49, image: "/images/t-shirt-1.jpg"},
  { id: 2, name: "White T-shirt", price: 25, image: "/images/bag-1-dark.jpg" },
  { id: 3, name: "Sneakers", price: 89, image: "/images/cup-black.avif" },
  { id: 4, name: "Cap", price: 19, image: "/images/hoodie-1.avif" },
];
 
export default function Home() {
  return (
    <div className="bg-[#171717]">
      <Navbar/>
        <main className="max-w-7xl mx-auto px-4 py-10"> 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      <>
      {/* Your content */}
      <Footer />
    </>  
    
    </div>
  );
} 