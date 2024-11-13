// import React, { useEffect, useState } from "react";
// import { fetchBreeds } from "../../services/api"; // Updated path

// const DogBreedSection = () => {
//   const [breeds, setBreeds] = useState([]);

//   useEffect(() => {
//     const getBreeds = async () => {
//       try {
//         const breedsData = await fetchBreeds();
//         setBreeds(breedsData);
//       } catch (error) {
//         console.error("Error fetching breeds:", error);
//       }
//     };

//     getBreeds();
//   }, []);

//   return (
//     <section id="DogBreed" className="py-10 mt-5">
//       <div className="container mx-auto">
//         <h2 className="text-4xl font-bold mb-4 text-center">Dog Breed</h2>
//         <p className="text-lg mb-6 text-center text-black font-size:1rem mb-4">
//           <br></br>
//           Find yourself a perfect friend from a wide variety of choices.
//         </p>
//         <br></br>
//         <div className="flex flex-wrap justify-center gap-6">
//           {breeds.map((breed) => (
//             <div key={breed._id} className="flex flex-col items-center">
//               <img
//                 src={breed.imageUrl}
//                 alt={breed.name}
//                 className="w-32 h-32 object-cover rounded-full shadow-md"
//               />
//               <h3 className="mt-2 text-xl font-semibold">{breed.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DogBreedSection;

// import React, { useEffect, useState } from "react";
// import { fetchBreeds } from "../../services/api"; // Updated path

// const DogBreedSection = () => {
//   const [breeds, setBreeds] = useState([]);

//   useEffect(() => {
//     const getBreeds = async () => {
//       try {
//         const breedsData = await fetchBreeds();
//         setBreeds(breedsData);
//       } catch (error) {
//         console.error("Error fetching breeds:", error);
//       }
//     };

//     getBreeds();
//   }, []);

//   return (
//     <section id="DogBreed" className="py-10 mt-5">
//       <div className="container mx-auto">
//         <h2 className="text-4xl font-bold mb-4 text-center">Dog Breed</h2>
//         <p className="text-lg mb-6 text-center text-black font-size:1rem mb-4">
//           <br></br>
//           Find yourself a perfect friend from a wide variety of choices.
//         </p>
//         <br></br>
//         <div className="flex flex-wrap justify-center gap-6">
//           {breeds.map((breed) => (
//             <div
//               key={breed._id}
//               className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
//             >
//               <img
//                 src={breed.imageUrl}
//                 alt={breed.name}
//                 className="w-32 h-32 object-cover rounded-full shadow-md"
//               />
//               <h3 className="mt-2 text-xl font-semibold">{breed.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DogBreedSection;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBreeds } from "../../services/api"; // Updated path

const DogBreedSection = () => {
  const [breeds, setBreeds] = useState([]);

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

  return (
    <section id="DogBreed" className="py-10 mt-5">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Dog Breed</h2>
        <p className="text-lg mb-6 text-center text-black font-size:1rem mb-4">
          <br></br>
          Find yourself a perfect friend from a wide variety of choices.
        </p>
        <br></br>
        <div className="flex flex-wrap justify-center gap-6">
          {breeds.map((breed) => (
            <Link
              to={`/breeds/${breed.name.toLowerCase().replace(/ /g, "-")}`}
              key={breed._id}
              className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={breed.imageUrl}
                alt={breed.name}
                className="w-32 h-32 object-cover rounded-full shadow-md"
              />
              <h3 className="mt-2 text-xl font-semibold">{breed.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DogBreedSection;
