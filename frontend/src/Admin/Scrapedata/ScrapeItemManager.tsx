import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";

interface ScrapeItem {
  id: number;
  name: string;
  price: number;
}

interface PickupOrder {
  id: number;
  userId: number;
  date: string;
}

const ScrapeItemManager: React.FC = () => {
  const [scrapeItems, setScrapeItems] = useState<ScrapeItem[]>([]);
  const [pickupOrders, setPickupOrders] = useState<PickupOrder[]>([]);
  const [newScrapeItem, setNewScrapeItem] = useState<ScrapeItem>({ id: 0, name: "", price: 0 });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PickupOrder | null>(null);

  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  useEffect(() => {
    fetchScrapeItems();
    fetchPickupOrders();
  }, []);

  const fetchScrapeItems = async () => {
    try {
      const response = await axios.get("/api/scrapeitems/all");

      // Log the response data for debugging
      console.log("Scrape Items Response Data:", response.data);

      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setScrapeItems(response.data);
      } else {
        console.error("Expected an array of scrape items, but received:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch scrape items:", error);
    }
  };

  const fetchPickupOrders = async () => {
    try {
      const response = await axios.get<PickupOrder[]>("/api/scrapeitems/pickup", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      });

      // Log the response data for debugging
      console.log("Pickup Orders Response Data:", response.data);

      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setPickupOrders(response.data);
      } else {
        console.error("Expected an array of pickup orders, but received:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch pickup orders:", error);
    }
  };

  const handleAddScrapeItem = async () => {
    try {
      await axios.post(
        "/api/scrapeitems/add",
        { name: newScrapeItem.name, price: newScrapeItem.price }
      );
      fetchScrapeItems();
      setNewScrapeItem({ id: 0, name: "", price: 0 });
    } catch (error) {
      console.error("Failed to add scrape item:", error);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (selectedOrder) {
      try {
        await axios.delete(`/api/scrapeitems/${selectedOrder.userId}/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        fetchPickupOrders();
        setShowModal(false);
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Scrape Item Management</h2>

        {/* Add New Scrape Item */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Scrape Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            className="border p-2 rounded mr-2"
            value={newScrapeItem.name}
            onChange={(e) => setNewScrapeItem({ ...newScrapeItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded mr-2"
            value={newScrapeItem.price}
            onChange={(e) => setNewScrapeItem({ ...newScrapeItem, price: Number(e.target.value) })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddScrapeItem}
          >
            Add Scrape Item
          </button>
        </div>

        {/* Scrape Item List */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Scrape Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Price</th>
                </tr>
              </thead>
              <tbody>
                {scrapeItems.length ? (
                  scrapeItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{item.id}</td>
                      <td className="px-4 py-2 border-b">{item.name}</td>
                      <td className="px-4 py-2 border-b">${item.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 border-b text-center">No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pickup Orders */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Pickup Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Order ID</th>
                  <th className="px-4 py-2 border-b">User ID</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pickupOrders.length ? (
                  pickupOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{order.id}</td>
                      <td className="px-4 py-2 border-b">{order.userId}</td>
                      <td className="px-4 py-2 border-b">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border-b">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 border-b text-center">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Delete Order</h3>
              <p>Are you sure you want to delete this order?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ScrapeItemManager;
