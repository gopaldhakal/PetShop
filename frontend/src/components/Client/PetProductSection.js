// import React, { useEffect, useState } from "react";
// import { fetchProducts } from "../../services/api"; // Import the function to fetch products from your API
// import { useNavigate } from "react-router-dom";

// const PetProductSection = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const productsData = await fetchProducts();
//         setProducts(productsData);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     getProducts();
//   }, []);

//   const handleSeeMore = () => {
//     navigate("/products");
//   };

//   return (
//     <section id="PetProducts" className="py-12 bg-white">
//       <div className="container mx-auto px-0  flex flex-col md:flex-row">
//         {/* Text Section */}
//         <div className="w-full md:w-1/3 mb-8 md:mb-0 md:mr-8 px-10 py-10 ml-24">
//           <h2 className="text-4xl font-bold mb-8">Pet Products</h2>
//           <p className="text-black font-semibold mb-10">
//             All products are designed for ease of use and durable, as well as
//             looking good. You can choose your own colours to make your item
//             unique.
//           </p>
//           <button
//             className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600"
//             onClick={handleSeeMore}
//           >
//             See more
//           </button>
//         </div>

//         {/* Images Grid */}
//         <div
//           className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"
//           style={{ maxWidth: "45%", marginLeft: 40 }}
//         >
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white shadow-md rounded-lg overflow-hidden"
//             >
//               <img
//                 src={product.imageUrl}
//                 alt="Product"
//                 className="w-full h-auto aspect-square object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PetProductSection;

import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api"; // Import the function to fetch products from your API
import { useNavigate } from "react-router-dom";

const PetProductSection = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const handleSeeMore = () => {
    navigate("/products");
  };

  return (
    <section id="PetProducts" className="py-20 bg-white ">
      <div className="container mx-auto px-0 flex flex-col md:flex-row">
        {/* Text Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 md:mr-8 px-10 py-10 ml-24">
          <h2 className="text-4xl font-bold mb-8">Pet Products</h2>
          <p className="text-black font-semibold mb-10">
            All products are designed for ease of use and durable, as well as
            looking good. You can choose your own colours to make your item
            unique.
          </p>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600"
            onClick={handleSeeMore}
          >
            See more
          </button>
        </div>

        {/* Images Grid */}
        <div
          className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"
          style={{ maxWidth: "45%", marginLeft: 40 }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt="Product"
                className="w-full h-auto aspect-square object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetProductSection;
