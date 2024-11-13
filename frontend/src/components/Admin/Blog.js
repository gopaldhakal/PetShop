import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    imageUrl: "",
    content: "",
  });
  const [editing, setEditing] = useState(false);
  const [editBlog, setEditBlog] = useState({});

  // Fetch all blogs on page load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }) // Pass the token in the headers
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle create blog
  const handleCreateBlog = (e) => {
    e.preventDefault();

    if (
      !newBlog.title ||
      !newBlog.description ||
      !newBlog.content ||
      !newBlog.imageUrl
    ) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/api/blogs", newBlog, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }) // Include token in the request headers
      .then((response) => {
        setBlogs([...blogs, response.data]); // Add new blog to list
        setNewBlog({
          title: "",
          description: "",
          imageUrl: "",
          content: "",
        }); // Reset the form
      })
      .catch((err) => console.log(err));
  };

  // Handle edit button click
  const handleEditBlog = (blog) => {
    setEditing(true);
    setEditBlog(blog); // Set the blog data for editing
  };

  // Handle updating blog
  const handleUpdateBlog = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/blogs/${editBlog._id}`, editBlog, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }) // Pass token in headers
      .then((response) => {
        setBlogs(
          blogs.map((blog) =>
            blog._id === response.data._id ? response.data : blog
          )
        ); // Update the blog in the list
        setEditing(false); // Exit editing mode
        setEditBlog({}); // Reset the edit form
      })
      .catch((err) => console.log(err));
  };

  // Handle delete button click
  const handleDeleteBlog = (id) => {
    axios
      .delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }) // Pass token in headers
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from state
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8 bg-purple-50 shadow-lg rounded-lg max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
        Manage Blogs
      </h2>

      {/* Add Blog Form */}
      <form
        onSubmit={editing ? handleUpdateBlog : handleCreateBlog}
        className="space-y-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-purple-200"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-600">
            Blog Title
          </label>
          <input
            id="title"
            type="text"
            value={editing ? editBlog.title : newBlog.title}
            onChange={(e) =>
              editing
                ? setEditBlog({ ...editBlog, title: e.target.value })
                : setNewBlog({ ...newBlog, title: e.target.value })
            }
            placeholder="Enter blog title"
            className="border border-purple-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-600"
          >
            Short Description
          </label>
          <input
            id="description"
            type="text"
            value={editing ? editBlog.description : newBlog.description}
            onChange={(e) =>
              editing
                ? setEditBlog({ ...editBlog, description: e.target.value })
                : setNewBlog({ ...newBlog, description: e.target.value })
            }
            placeholder="Enter short description"
            className="border border-purple-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="content"
            className="text-lg font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            value={editing ? editBlog.content : newBlog.content}
            onChange={(e) =>
              editing
                ? setEditBlog({ ...editBlog, content: e.target.value })
                : setNewBlog({ ...newBlog, content: e.target.value })
            }
            placeholder="Enter blog content"
            className="border border-purple-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="imageUrl"
            className="text-lg font-medium text-gray-600"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            value={editing ? editBlog.imageUrl : newBlog.imageUrl}
            onChange={(e) =>
              editing
                ? setEditBlog({ ...editBlog, imageUrl: e.target.value })
                : setNewBlog({ ...newBlog, imageUrl: e.target.value })
            }
            placeholder="Enter image URL"
            className="border border-purple-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
        >
          {editing ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <div className="mt-8">
        <h3 className="text-2xl font-medium mb-6 text-purple-800">Blog List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col border border-purple-200"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h4>
              <p className="text-gray-500">{blog.description}</p>
              <div className="flex mt-4 space-x-4">
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
