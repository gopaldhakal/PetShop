// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalBlogPosts: 0,
//     recentBlogPosts: [],
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setStats({
//           totalProducts: response.data.totalProducts,
//           totalBlogPosts: response.data.totalBlogPosts,
//           recentBlogPosts: response.data.recentBlogPosts,
//         });
//       })
//       .catch((error) => console.log(error));
//   }, [token]);

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
//         {/* Overview Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">Overview</h2>
//           <p className="text-gray-500">Quick stats for managing the site.</p>
//           <div className="mt-4 text-4xl font-extrabold text-purple-600">
//             {stats.totalProducts + stats.totalBlogPosts}
//           </div>
//           <p className="text-gray-500">Total Items</p>
//         </div>

//         {/* Blog Posts Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Blog Posts
//           </h2>
//           <p className="text-gray-500">Total & recent activity</p>
//           <div className="mt-4 text-4xl font-extrabold text-green-600">
//             {stats.totalBlogPosts}
//           </div>
//           <p className="text-gray-500">Posts</p>
//           <h3 className="text-md font-semibold text-gray-700 mt-4">
//             Recent Posts
//           </h3>
//           {stats.recentBlogPosts.slice(0, 3).map((post, index) => (
//             <div key={index} className="text-gray-600 text-sm mt-2">
//               <span className="font-bold">{post.title}</span> - {post.date}
//             </div>
//           ))}
//         </div>

//         {/* Products Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">Products</h2>
//           <p className="text-gray-500">Total available products</p>
//           <div className="mt-4 text-4xl font-extrabold text-blue-600">
//             {stats.totalProducts}
//           </div>
//           <p className="text-gray-500">Products</p>
//         </div>
//       </div>

//       {/* Latest Activity */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//           Latest Activity
//         </h2>
//         <div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Recent Blog Activities
//           </h3>
//           {stats.recentBlogPosts.length > 0 ? (
//             stats.recentBlogPosts.slice(0, 5).map((post, index) => (
//               <div key={index} className="border-b border-gray-200 py-4">
//                 <p className="font-bold text-gray-800">{post.title}</p>
//                 <p className="text-gray-500 text-sm">{post.description}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No recent activity available.</p>
//           )}
//         </div>
//       </div>

//       {/* Back Button */}
//       <button
//         onClick={() => (window.location.href = "/")} // Assuming '/' is main page
//         className="mt-10 bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition-colors"
//       >
//         Back to Main Page
//       </button>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalBlogPosts: 0,
    recentBlogPosts: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStats({
          totalProducts: response.data.totalProducts,
          totalBlogPosts: response.data.totalBlogPosts,
          recentBlogPosts: response.data.recentBlogPosts,
        });
      })
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Title Section */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600 text-center mb-12">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Overview</h2>
          <p className="text-gray-500">Quick stats for managing the site.</p>
          <div className="mt-4 text-5xl font-extrabold text-gradient bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
            {stats.totalProducts + stats.totalBlogPosts}
          </div>
          <p className="text-gray-500">Total Items</p>
        </div>

        {/* Blog Posts Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Blog Posts
          </h2>
          <p className="text-gray-500">Total & recent activity</p>
          <div className="mt-4 text-5xl font-extrabold text-green-600">
            {stats.totalBlogPosts}
          </div>
          <p className="text-gray-500">Posts</p>
          <h3 className="text-md font-semibold text-gray-700 mt-4">
            Recent Posts
          </h3>
          {stats.recentBlogPosts.slice(0, 3).map((post, index) => (
            <div key={index} className="text-gray-600 text-sm mt-2">
              <span className="font-bold">{post.title}</span> - {post.date}
            </div>
          ))}
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Products</h2>
          <p className="text-gray-500">Total available products</p>
          <div className="mt-4 text-5xl font-extrabold text-blue-600">
            {stats.totalProducts}
          </div>
          <p className="text-gray-500">Products</p>
        </div>
      </div>

      {/* Latest Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Latest Activity
        </h2>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Blog Activities
          </h3>
          {stats.recentBlogPosts.length > 0 ? (
            stats.recentBlogPosts.slice(0, 5).map((post, index) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <p className="font-bold text-gray-800">{post.title}</p>
                <p className="text-gray-500 text-sm">{post.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity available.</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-10 bg-purple-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all"
      >
        Back to Main Page
      </button>
    </div>
  );
};

export default Dashboard;
