import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BreedDetail = () => {
  const { name } = useParams(); // Capture the breed name from the URL
  const navigate = useNavigate(); // For navigation to the main page
  const [breed, setBreed] = useState(null);

  useEffect(() => {
    const fetchBreed = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/breeds/${name}`
        );
        setBreed(response.data);
      } catch (error) {
        console.error("Error fetching breed details:", error);
      }
    };

    if (name) {
      fetchBreed();
    }
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-4">
      {breed ? (
        <div className="bg-purple-200 shadow-lg rounded-lg max-w-md w-full text-center p-6 animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {breed.name}
          </h1>
          <img
            src={breed.imageUrl}
            alt={breed.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-4 transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {breed.description}
          </p>
          <p className="text-gray-900 text-lg font-semibold mb-6">
            Price: NRP {breed.price}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Main Page
          </button>
        </div>
      ) : (
        <p className="text-xl text-gray-700">Loading breed details...</p>
      )}
    </div>
  );
};

export default BreedDetail;
