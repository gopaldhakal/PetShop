// import React from "react";

// const MainSection = () => {
//   return (
//     <main className="relative w-full h-auto bg-[#FFF0D9] py-4">
//       <div
//         className="container mx-auto flex items-center justify-between"
//         style={{ height: "500px", margin: "0 10% 0 0%" }}
//       >
//         {/* Image Section */}
//         <div className="relative flex flex-col items-center justify-center w-1/2">
//           <div className="w-80 h-80 bg-orange-300 rounded-full flex justify-center items-center">
//             <img
//               src="/1.webp"
//               alt="Corgi"
//               className="w-72 h-72 rounded-full shadow-lg"
//             />
//           </div>
//           <p
//             className="mt-2 text-center"
//             style={{
//               fontFamily: "Poppins",
//               fontSize: "16px",
//               color: "#000000",
//             }}
//           >
//             Corgi (2 months)
//           </p>
//         </div>

//         {/* Text Section */}
//         <div
//           className="w-1/2 flex flex-col items-start p-4"
//           style={{ marginRight: "0%" }}
//         >
//           <h1
//             className="text-5xl font-bold leading-tight"
//             style={{
//               fontFamily: "Poppins",
//               fontSize: "32px",
//               color: "#000000",
//             }}
//           >
//             Everybody Needs
//             <br />A <span className="text-6xl">Friend</span> In Life
//           </h1>
//           <br></br>
//           <p
//             className="mt-2 mb-2 text-lg leading-relaxed"
//             style={{
//               fontFamily: "Poppins",
//               fontSize: "17px",
//               color: "#000000",
//             }}
//           >
//             The Corgi is intelligent, quick, and curious.
//             <br />
//             It is a kind, adventurous breed which shows
//             <br />
//             a large measure of independence.
//             <br />
//             They are good with children and
//             <br />
//             normally kind with strangers.
//           </p>
//           <br></br>
//           <button
//             className="mt-2 bg-yellow-500 text-white py-2 px-6 rounded-full"
//             style={{ fontFamily: "Poppins", fontSize: "16px" }}
//           >
//             Buy Me
//           </button>
//         </div>

//         {/* Social Media Icons */}
//         <div className="absolute bottom-4 right-10 flex space-x-4">
//           <a
//             href="https://facebook.com"
//             className="text-gray-700 hover:text-gray-900"
//           >
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a
//             href="https://twitter.com"
//             className="text-gray-700 hover:text-gray-900"
//           >
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a
//             href="https://instagram.com"
//             className="text-gray-700 hover:text-gray-900"
//           >
//             <i className="fab fa-instagram"></i>
//           </a>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default MainSection;

import React from "react";

const MainSection = () => {
  // Function to scroll to the footer section
  const scrollToFooter = () => {
    const footerSection = document.getElementById("contact");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full h-auto bg-[#FFF0D9] py-4">
      <div
        className="container mx-auto flex items-center justify-between"
        style={{ height: "500px", margin: "0 10% 0 0%" }}
      >
        <div className="relative flex flex-col items-center justify-center w-1/2">
          <div className="w-80 h-80 bg-color:#FFD6A0 rounded-full flex justify-center items-center">
            <img
              src="/cor.png"
              alt="Corgi"
              className="w-72 h-72 rounded-full shadow-lg "
            />
          </div>
          <p
            className="mt-2 text-center"
            style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              color: "#000000",
            }}
          >
            Corgi (2 months)
          </p>
        </div>
        {/* Text Section */}
        <div
          className="w-1/2 flex flex-col items-start p-4"
          style={{ marginRight: "0%" }}
        >
          <h1
            className="text-5xl font-bold leading-tight"
            style={{
              fontFamily: "Poppins",
              fontSize: "32px",
              color: "#000000",
            }}
          >
            Everybody Needs
            <br />A <span className="text-6xl">Friend</span> In Life
          </h1>
          <br />
          <p
            className="mt-2 mb-2 text-lg leading-relaxed"
            style={{
              fontFamily: "Poppins",
              fontSize: "17px",
              color: "#000000",
            }}
          >
            The Corgi is intelligent, quick, and curious.
            <br />
            It is a kind, adventurous breed which shows
            <br />
            a large measure of independence.
            <br />
            They are good with children and
            <br />
            normally kind with strangers.
          </p>
          <br />
          <button
            onClick={scrollToFooter} // Scrolls to footer section on click
            className="mt-2 bg-yellow-500 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:bg-yellow-600 hover:scale-105"
            style={{ fontFamily: "Poppins", fontSize: "16px" }}
          >
            Buy Me
          </button>
        </div>
        {/* Social Media Icons */}
        <div className="absolute bottom-4 right-10 flex space-x-4">
          <a
            href="https://facebook.com"
            className="text-gray-700 hover:text-gray-900"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-700 hover:text-gray-900"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-700 hover:text-gray-900"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </main>
  );
};

export default MainSection;
