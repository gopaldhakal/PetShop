import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${API_URL}/breeds`);
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// export const fetchBlogs = async () => {
//   const token = localStorage.getItem("token");
//   try {
//     const response = await axios.get(`${API_URL}/blogs`,
//       {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     throw error;
//   }
// };
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/subscriptions");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

// export const deleteSubscription = async (id) => {
//   try {
//     await axios.delete(`/api/subscriptions/${id}`);
//   } catch (error) {
//     console.error("Error deleting subscription:", error);
//   }
// };
