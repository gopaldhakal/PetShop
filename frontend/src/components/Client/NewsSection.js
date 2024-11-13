import React, { useState } from "react";
import axios from "axios";

const NewsSection = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subscriptions/subscribe",
        {
          email,
        }
      );
      console.log("Subscription successful:", response.data);
      setEmail(""); // Clear the email
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };
  return (
    <section
      id="newsletter"
      className="relative flex items-center justify-between bg-fff0d9 rounded-2xl shadow-lg p-6 mx-auto mt-12 mb-20"
      style={{ width: "1166px", height: "350px", backgroundColor: "#FFF0D9" }}
    >
      <div className="w-1/3 h-full">
        <img
          src="/dog.png"
          alt="Dog wearing blue outfit"
          className="object-contain w-full h-full rounded-l-2xl"
        />
      </div>
      <div className="flex flex-col justify-center items-start text-left w-2/3 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Get Pawsome News!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Exclusive training tips, tricks, product <br></br>deals and more.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email..."
          className="p-2 border border-gray-300 rounded-lg mb-2 w-full max-w-sm"
        />
        <br></br>
        <button
          onClick={handleSubscribe}
          className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 w-auto"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsSection;
