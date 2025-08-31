export default function ProductCard({ product }) {
  return (
    <div className="bg-[#000000]  justify-center border-3 rounded-lg h-75 w-75 p-4 shadow-sm hover:shadow-md hover:border-[#2563EB] transition">

      <img src={product.image} alt={product.name} className=" w-80 h-55 centre object-cover rounded-md">
      
      </img>
        <div className=" p-2 h-10 w-50 border-2 border-gray-800 rounded-lg flex items-center">
          <h2 className="mt-3 text-lg font-semibold centred top-10">{product.name}</h2>
          <p className="text-white-800 h-8 w-10 p-2 m-3 centre rounded-lg bg-[#2563EB]">${product.price}</p>
        </div>
      
      
    </div>
  );
}