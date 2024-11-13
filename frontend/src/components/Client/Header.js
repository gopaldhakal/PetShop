import React from "react";
import { Link } from "react-scroll";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="text-black  text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="DogBreed"
            smooth={true}
            duration={500}
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold cursor-pointer"
          >
            Breeds
          </Link>
          <Link
            to="PetProducts"
            smooth={true}
            duration={500}
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold cursor-pointer"
          >
            Accessories
          </Link>
          <Link
            to="Blog"
            smooth={true}
            duration={500}
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold cursor-pointer"
          >
            Blog
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="text-black text-lg hover:text-gray-700 cursor-pointer hover:font-bold active:font-bold cursor-pointer"
          >
            Contact
          </Link>
          <div className="relative w-64 h-12 bg-white rounded-full flex items-center px-4 shadow-md">
            <input
              type="text"
              placeholder="Search for pets..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
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

// import React, { useState } from "react";
// import { Link } from "react-scroll";
// import axios from "axios"; // Ensure axios is installed

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/breeds/search?query=${searchQuery}`
//       ); // Use the full URL here
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <header className="bg-[#FFF0D9] relative w-full h-auto">
//       <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-2 text-3xl font-bold ml-40">
//           <span role="img" aria-label="dog">
//             🐶
//           </span>
//           <span>Pawstore</span>
//         </div>
//         <nav className="flex space-x-8 items-center text-lg">
//           {/* Links */}
//           <Link
//             to="home"
//             smooth={true}
//             duration={500}
//             className="text-black text-lg font-normal hover:font-bold active:font-bold cursor-pointer"
//           >
//             Home
//           </Link>
//           {/* Other links similar to above */}

//           {/* Search Input */}
//           <div className="relative w-64 h-12 bg-white rounded-full flex items-center px-4 shadow-md">
//             <input
//               type="text"
//               placeholder="Search for pets..."
//               className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <button onClick={handleSearch}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-gray-700"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </nav>
//       </div>

//       {/* Display Search Results */}
//       {searchResults.length > 0 && (
//         <div className="absolute top-16 left-0 bg-white w-full shadow-md">
//           {searchResults.map((breed) => (
//             <div key={breed._id} className="p-4 border-b">
//               {breed.name}
//               {breed.imageUrl}
//               {breed.description}
//             </div>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate(); // Use navigate here

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/breeds/search?query=${searchQuery.trim()}`
//       );
//       setSearchResults(response.data);

//       // Redirect to the breed detail page (assuming the breed name is in the response)
//       if (response.data.length === 1) {
//         const breed = response.data[0];
//         navigate(`/breeds/${breed.name.toLowerCase().replace(/\s+/g, "-")}`); // Use navigate instead of history.push
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <header className="bg-[#FFF0D9] relative w-full h-auto">
//       {/* ...other header elements */}
//       <div className="relative w-64 h-12 bg-white rounded-full flex items-center px-4 shadow-md">
//         <input
//           type="text"
//           placeholder="Search for pets..."
//           className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6 text-gray-700"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//           onClick={handleSearch} // Trigger search on click
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//           />
//         </svg>
//       </div>
//     </header>
//   );
// };

// export default Header;
