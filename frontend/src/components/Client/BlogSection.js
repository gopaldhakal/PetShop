import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../../services/api"; // Ensure the correct path to your API service
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(4); // Limit 4 blogs per page
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
  };

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (direction) => {
    let newBlogs = [...blogs];
    if (direction === "next") {
      const firstBlog = newBlogs.shift();
      newBlogs.push(firstBlog);
    } else if (direction === "prev") {
      const lastBlog = newBlogs.pop();
      newBlogs.unshift(lastBlog);
    }
    setBlogs(newBlogs);
  };

  return (
    <section id="Blog" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Blog Section
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Description of blog
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => paginate("prev")}
            className="text-4xl p-2 text-[#E58608] hover:text-[#E58608] transform transition-transform duration-300 hover:scale-110"
            style={{ marginRight: "-40px" }}
          >
            <FaArrowLeft />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
            {currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
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
          <button
            onClick={() => paginate("next")}
            className="text-4xl p-2 text-[#E58608] hover:text-[#E58608] transform transition-transform duration-300 hover:scale-110"
            style={{ marginLeft: "-40px" }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
