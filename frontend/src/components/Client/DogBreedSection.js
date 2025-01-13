import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBreeds } from "../../services/api"; // Updated path
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DogBreedSection = () => {
  const [breeds, setBreeds] = useState([]);
  const [currentPage] = useState(1);
  const [breedsPerPage] = useState(7); // Show 7 breeds per page

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

  // Get current breeds
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);

  // Change page
  const paginate = (direction) => {
    let newBreeds = [...breeds];
    if (direction === "next") {
      const firstBreed = newBreeds.shift();
      newBreeds.push(firstBreed);
    } else if (direction === "prev") {
      const lastBreed = newBreeds.pop();
      newBreeds.unshift(lastBreed);
    }
    setBreeds(newBreeds);
  };

  return (
    <section id="DogBreed" className="py-10 mt-5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center">Dog Breed</h2>
        <p className="text-lg mb-6 text-center text-black font-size:1rem mb-4">
          <br></br>
          Find yourself a perfect friend from a wide variety of choices.
        </p>
        <br></br>
        <div className="flex justify-between items-center">
          <button
            onClick={() => paginate("prev")}
            className="text-4xl p-2 text-[#E58608] hover:text-[#E58608] transform transition-transform duration-300 hover:scale-110"
            style={{ marginRight: "-40px" }} // Adjusted margin to bring arrow closer
          >
            <FaArrowLeft />
          </button>
          <div className="flex flex-wrap justify-center gap-6 px-10">
            {" "}
            {/* Added padding to avoid edges */}
            {currentBreeds.map((breed) => (
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
          <button
            onClick={() => paginate("next")}
            className="text-4xl p-2 text-[#E58608] hover:text-[#E58608] transform transition-transform duration-300 hover:scale-110"
            style={{ marginLeft: "-40px" }} // Adjusted margin to bring arrow closer
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DogBreedSection;
