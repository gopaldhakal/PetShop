import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBreeds } from "../../services/api";
import axios from "axios";

const BreedsPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    deliveryLocation: "",
    paymentScreenshot: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breedsData = await fetchBreeds();
        setBreeds(breedsData);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    getBreeds();
  }, []);

  const handleBuyNow = (breed) => {
    setCart([breed]);
    setShowCheckout(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
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

  return (
    <div id="bre" className="container mx-auto py-10 mt-5">
      <h2 className="text-4xl font-bold mb-8 text-center">Dog Breeds</h2>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-600"
        >
          Back to Main Page
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {breeds.map((breed) => (
          <div
            key={breed._id}
            className="flex flex-col items-center bg-[#FFF0D9] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={breed.imageUrl}
              alt={breed.name}
              className="w-48 h-48 object-cover rounded-md shadow-md"
            />
            <h3 className="mt-4 text-xl font-semibold text-center">
              {breed.name}
            </h3>
            <p className="mt-2 text-gray-600 text-center">
              {breed.description}
            </p>
            <p className="mt-2 text-gray-800 text-center font-semibold">
              NRP {breed.price}
            </p>
            <button
              onClick={() => handleBuyNow(breed)}
              className="mt-4 bg-green-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

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
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedsPage;
