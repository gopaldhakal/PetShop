import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../../services/api"; // Ensure the correct path to your API service

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, []);
  const handleCardClick = (blogTitle) => {
    const formattedTitle = encodeURIComponent(
      blogTitle.replace(/\s+/g, "-").replace(/\?$/, "").toLowerCase()
    );
    navigate(`/blog/${formattedTitle}`);
  }; // Replace spaces with hyphens and encode special characters // Navigate to the blog detail page using title
  return (
    <section id="Blog" className="py-12">
      <div className="container mx-auto px-8">
        {/* Title and Description */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Blog Section
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Description of blog
        </p>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-16">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={{ maxWidth: "250px" }}
              onClick={() => handleCardClick(blog.title)}
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
