import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Renaming Link from react-router-dom to RouterLink
import { Link as ScrollLink } from "react-scroll"; // Renaming Link from react-scroll to ScrollLink
import axios from "axios";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Use navigate here

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/breeds/search?query=${searchQuery.trim()}`
      );
      setSearchResults(response.data);

      // Redirect to the breed detail page (assuming the breed name is in the response)
      if (response.data.length === 1) {
        const breed = response.data[0];
        navigate(`/breeds/${breed.name.toLowerCase().replace(/\s+/g, "-")}`); // Use navigate instead of history.push
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Add event listener for Enter key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [searchQuery]); // Dependency array includes searchQuery

  return (
    <header className="bg-[#FFF0D9] relative w-full h-auto">
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-3xl font-bold ml-40">
          <span role="img" aria-label="dog">
            🐶
          </span>
          <span>Pawstore</span>
        </div>
        <nav className="flex space-x-8 items-center text-lg">
          <RouterLink
            to="/"
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/breed"
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold"
          >
            Breeds
          </RouterLink>
          <RouterLink
            to="/products"
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold"
          >
            Accessories
          </RouterLink>
          <ScrollLink
            to="Blog"
            smooth={true}
            duration={350} // Increased duration by 20%
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold"
          >
            Blog
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={400} // Increased duration by 20%
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold"
          >
            Contact
          </ScrollLink>
          <div className="relative w-64 h-12 bg-white rounded-full flex items-center px-4 shadow-md">
            <input
              type="text"
              placeholder="Search for pets..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }} // Handle Enter key press in the input
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={handleSearch} // Trigger search on click
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
