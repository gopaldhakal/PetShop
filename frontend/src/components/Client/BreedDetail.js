// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const BreedDetail = () => {
//   const { name } = useParams(); // Capture the breed name from the URL
//   const [breed, setBreed] = useState(null);

//   useEffect(() => {
//     const fetchBreed = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/breeds/${name}`
//         );
//         setBreed(response.data);
//       } catch (error) {
//         console.error("Error fetching breed details:", error);
//       }
//     };

//     if (name) {
//       fetchBreed();
//     }
//   }, [name]); // Re-run when `name` changes

//   return (
//     <div>
//       {breed ? (
//         <div>
//           <h1>{breed.name}</h1>
//           <img src={breed.imageUrl} alt={breed.name} width="300" />
//           <p>{breed.description}</p>
//         </div>
//       ) : (
//         <p>Loading breed details...</p>
//       )}
//     </div>
//   );
// };

// export default BreedDetail;

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
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full text-center p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {breed.name}
          </h1>
          <img
            src={breed.imageUrl}
            alt={breed.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
          />
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {breed.description}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
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
