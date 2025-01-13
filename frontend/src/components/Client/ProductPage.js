import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    deliveryLocation: "",
    paymentScreenshot: null,
  });
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

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("deliveryLocation", formData.deliveryLocation);
    formDataToSend.append("paymentScreenshot", formData.paymentScreenshot);
    formDataToSend.append("cart", JSON.stringify(cart));

    try {
      await axios.post(
        "http://localhost:5000/api/newCheckout",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Order submitted successfully!");
      setFormData({
        name: "",
        contactNumber: "",
        deliveryLocation: "",
        paymentScreenshot: null,
      });
      setCart([]);
      setShowCheckout(false);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  // Calculate total cart amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col lg:flex-row">
      <section className="flex-1 py-12 bg-gray-100">
        <div className="container mx-auto px-4 lg:pr-64">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-orange-500 mb-2">
              🐶 Pawstore
            </h1>
            <p className="text-lg text-gray-700">
              Your one-stop shop for all pet needs
            </p>
            <p className="text-lg text-gray-700">
              Call us at: +977-[0]61-328463
            </p>
          </div>

          {/* Back to Main Page Button */}
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => navigate("/")}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-700"
            >
              Back to Main Page
            </button>
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
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Cart Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-lg p-4 lg:fixed lg:right-0 lg:top-0 lg:h-full lg:overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Cart</h2>
        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4"
              >
                <span>{item.name}</span>
                <span>NRP {item.price}</span>
              </div>
            ))}
            <div className="text-center font-bold text-lg mb-4">
              Total: NRP {totalAmount}
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700"
            >
              Checkout
            </button>
          </>
        ) : (
          <p className="text-gray-700 text-center">Your cart is empty.</p>
        )}
      </aside>
      {/* Checkout Form Slider */}
      {showCheckout && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contactNumber"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="deliveryLocation"
                >
                  Delivery Location
                </label>
                <input
                  type="text"
                  id="deliveryLocation"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="paymentScreenshot"
                >
                  Payment Screenshot
                </label>
                <input
                  type="file"
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="qrCode"
                >
                  Store QR Code
                </label>
                <img
                  src="/qr1.jpg" // Replace with your actual QR code path
                  alt="Store QR Code"
                  className="w-50 h-48 object-fit ml-20"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
                >
                  Submit Order
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default ProductPage;
