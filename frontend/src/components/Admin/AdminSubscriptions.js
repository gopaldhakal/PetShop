import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subscriptions"
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`);
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        Subscriptions
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-purple-800">
              <th className="px-4 py-2 border-b-2 border-purple-300">Email</th>
              <th className="px-4 py-2 border-b-2 border-purple-300">
                Subscribed At
              </th>
              <th className="px-4 py-2 border-b-2 border-purple-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription._id} className="hover:bg-purple-50">
                <td className="px-4 py-2 border-b text-gray-700">
                  {subscription.email}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {subscription.createdAt
                    ? new Date(subscription.createdAt).toLocaleString()
                    : "No date available"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleDelete(subscription._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete Subscription"
                  >
                    <FaTrash className="inline-block w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
