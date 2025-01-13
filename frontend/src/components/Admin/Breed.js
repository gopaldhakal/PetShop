import React, { useState, useEffect } from "react";
import axios from "axios";

const Breed = () => {
  const [breeds, setBreeds] = useState([]);
  const [newBreed, setNewBreed] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: "", // Added price field
  });
  const [editingId, setEditingId] = useState(null); // Track which breed is being edited
  const [editData, setEditData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: "", // Added price field
  }); // Track edit data

  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/breeds", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBreeds(response.data))
      .catch((error) => console.log(error));
  }, [token]);

  const handleCreateBreed = (e) => {
    e.preventDefault();

    if (
      !newBreed.name ||
      !newBreed.imageUrl ||
      !newBreed.description ||
      !newBreed.price
    ) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/api/breeds", newBreed, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBreeds([...breeds, response.data]);
        setNewBreed({ name: "", imageUrl: "", description: "", price: "" });
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteBreed = (id) => {
    axios
      .delete(`http://localhost:5000/api/breeds/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setBreeds(breeds.filter((breed) => breed._id !== id)))
      .catch((error) => console.log(error));
  };

  const handleEditClick = (breed) => {
    setEditingId(breed._id);
    setEditData({
      name: breed.name,
      imageUrl: breed.imageUrl,
      description: breed.description,
      price: breed.price, // Added price field
    });
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`http://localhost:5000/api/breeds/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedBreeds = breeds.map((breed) =>
          breed._id === id ? response.data : breed
        );
        setBreeds(updatedBreeds);
        setEditingId(null); // Exit edit mode
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-8 bg-purple-50 shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-purple-700 text-center mb-8">
        Manage Breeds
      </h2>

      {/* Add Breed Form */}
      <form
        onSubmit={handleCreateBreed}
        className="space-y-6 mb-10 border-b pb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium text-gray-600">
              Breed Name
            </label>
            <input
              id="name"
              type="text"
              value={newBreed.name}
              onChange={(e) =>
                setNewBreed({ ...newBreed, name: e.target.value })
              }
              placeholder="Enter breed name"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="imageUrl"
              className="text-lg font-medium text-gray-600"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={newBreed.imageUrl}
              onChange={(e) =>
                setNewBreed({ ...newBreed, imageUrl: e.target.value })
              }
              placeholder="Enter breed image URL"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label
              htmlFor="description"
              className="text-lg font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={newBreed.description}
              onChange={(e) =>
                setNewBreed({ ...newBreed, description: e.target.value })
              }
              placeholder="Enter breed description"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-lg font-medium text-gray-600"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              value={newBreed.price}
              onChange={(e) =>
                setNewBreed({ ...newBreed, price: e.target.value })
              }
              placeholder="Enter breed price"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
        >
          Add Breed
        </button>
      </form>

      {/* Breed List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds.map((breed) => (
          <div
            key={breed._id}
            className="bg-gray-50 shadow-lg rounded-lg p-5 hover:shadow-xl transition"
          >
            <img
              src={breed.imageUrl}
              alt={breed.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            {editingId === breed._id ? (
              <div>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded-md w-full mb-2 focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={editData.imageUrl}
                  onChange={(e) =>
                    setEditData({ ...editData, imageUrl: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded-md w-full mb-2 focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded-md w-full mb-2 focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => handleSaveEdit(breed._id)}
                  className="w-full bg-green-500 text-white py-2 mt-2 rounded-md font-semibold hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="w-full bg-red-500 text-white py-2 mt-2 rounded-md font-semibold hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {breed.name}
                </h4>
                <p className="text-gray-500 mb-4">{breed.description}</p>
                <p className="text-gray-800 font-semibold">NRP {breed.price}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEditClick(breed)}
                    className="text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBreed(breed._id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breed;
