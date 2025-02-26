import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get( `https://petshopbackend-nrbh.onrender.com'
          //`http://localhost:5000/api/blogs/title/${title}`
          ,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error);
      }
    };

    fetchBlog();
  }, [title]);

  return (
    <div className="container mx-auto px-4 py-12">
      {error ? (
        <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 mb-4">
            Blog not found or an error occurred.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 mx-auto"
          >
            Back to Home
          </button>
        </div>
      ) : blog ? (
        <div className="bg-gradient-to-r from-blue-400 via-white to-red-400 p-8 rounded-lg shadow-lg border-2 border-gray-200 transition duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105 mx-4">
          <h1 className="text-4xl font-bold mb-4 text-center text-purple-500">
            {blog.title}
          </h1>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full max-h-96 object-cover mb-4 rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="prose prose-lg text-gray-800 mb-8 leading-relaxed text-justify animate-fadeIn px-4">
            {blog.content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-transform duration-300 ease-in-out transform hover:scale-105 mx-auto"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
