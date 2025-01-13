import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleComplete = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, {
        completed: true,
      });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, completed: true } : order
        )
      );
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const handleClear = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error clearing order:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Orders</h2>
      <div className="bg-white shadow-lg rounded-lg p-4">
        {orders.length === 0 ? (
          <p className="text-gray-700">No orders found.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Delivery Location</th>
                <th className="px-4 py-2">Cart</th>
                <th className="px-4 py-2">Payment Screenshot</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className={order.completed ? "bg-gray-200" : ""}
                >
                  <td className="border px-4 py-2">{order.name}</td>
                  <td className="border px-4 py-2">{order.contactNumber}</td>
                  <td className="border px-4 py-2">{order.deliveryLocation}</td>
                  <td className="border px-4 py-2">
                    {order.cart.map((item, index) => (
                      <div key={index}>
                        {item.name} - NRP {item.price}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <a
                      href={`http://localhost:5000/${order.paymentScreenshot}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Screenshot
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    {!order.completed && (
                      <button
                        onClick={() => handleComplete(order._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleClear(order._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Clear
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
