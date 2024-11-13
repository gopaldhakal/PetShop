import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-orange-500 mb-2">
            🐶 Pawstore
          </h1>
          <p className="text-lg text-gray-700">
            Your one-stop shop for all pet needs
          </p>
          <p className="text-lg text-gray-700">Call us at: +977-[0]61-328463</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">
                    NRP {product.price}
                  </span>
                  <button className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600">
                    <i className="fas fa-phone-alt"></i> Call to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
