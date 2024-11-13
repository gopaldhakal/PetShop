import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited

  // Fetch all products on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle product creation (POST request)
  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.imageUrl
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/products", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", description: "", imageUrl: "" });
      })
      .catch((err) => console.log(err));
  };

  // Handle product update (PUT request)
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null); // Clear edit mode
      })
      .catch((err) => console.log(err));
  };

  // Handle product deletion (DELETE request)
  const handleDeleteProduct = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Set product in edit mode
  const startEditingProduct = (product) => {
    setEditingProduct({ ...product });
  };

  return (
    <div className="p-8  bg-purple-50 to-indigo-100 shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-purple-700 text-center mb-8">
        Manage Products
      </h2>

      {/* Add Product Form */}
      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        className="space-y-6 mb-8"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Enter product name"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-lg font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                : setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Enter price"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={
              editingProduct
                ? editingProduct.description
                : newProduct.description
            }
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                : setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Enter product description"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="imageUrl"
            className="text-lg font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            value={
              editingProduct ? editingProduct.imageUrl : newProduct.imageUrl
            }
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({
                    ...editingProduct,
                    imageUrl: e.target.value,
                  })
                : setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            placeholder="Enter image URL"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)} // Cancel editing
            className="w-full mt-2 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      <div className="mt-8">
        <h3 className="text-2xl font-medium mb-4 text-center text-gray-800">
          Product List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h4>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-medium text-indigo-600 mt-2">
                NRP {product.price}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => startEditingProduct(product)}
                  className="text-indigo-500 hover:text-indigo-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-500 hover:text-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
