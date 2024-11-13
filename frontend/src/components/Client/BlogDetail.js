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
        const response = await axios.get(
          `http://localhost:5000/api/blogs/title/${title}`,
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
        <div>
          <p className="text-red-500">Blog not found or an error occurred.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600"
          >
            Back to Home
          </button>
        </div>
      ) : blog ? (
        <>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover mb-4"
          />
          <p className="text-lg text-gray-800 mb-8">{blog.content}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600"
          >
            Back to Home
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
