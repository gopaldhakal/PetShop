import React from "react";

const NewsletterSection = () => {
  return (
    <section id="newsletter" className="bg-gray-100 p-6">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-l-lg"
          />
          <button className="p-2 bg-blue-500 text-white rounded-r-lg">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
