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

const DashboardSummary: React.FC = () => {
  const [scrapeItems, setScrapeItems] = useState<ScrapeItem[]>([]);
  const [pickupOrders, setPickupOrders] = useState<PickupOrder[]>([]);
  const [totalScrapeItems, setTotalScrapeItems] = useState<number>(0);
  const [totalPickupOrders, setTotalPickupOrders] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number>(0);

  // Function to get the authentication token
  const getAuthToken = () => {
    return localStorage.getItem("token") || "";
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    const token = getAuthToken(); // Get the token

    try {
      // Fetch scrape items and pickup orders
      const scrapeItemsResponse = await axios.get("/api/scrapeitems/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pickupOrdersResponse = await axios.get("/api/scrapeitems/pickup", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the responses for debugging
      console.log("Scrape Items Response Data:", scrapeItemsResponse.data);
      console.log("Pickup Orders Response Data:", pickupOrdersResponse.data);

      // Handle scrape items response
      if (Array.isArray(scrapeItemsResponse.data)) {
        const items = scrapeItemsResponse.data as ScrapeItem[];
        setScrapeItems(items);
        setTotalScrapeItems(items.length);

        // Calculate average price
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        setAveragePrice(items.length > 0 ? totalPrice / items.length : 0);
      } else {
        console.error("Expected an array of scrape items, but received:", scrapeItemsResponse.data);
      }

      // Handle pickup orders response
      if (Array.isArray(pickupOrdersResponse.data)) {
        const orders = pickupOrdersResponse.data as PickupOrder[];
        setPickupOrders(orders);
        setTotalPickupOrders(orders.length);
      } else {
        console.error("Expected an array of pickup orders, but received:", pickupOrdersResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch summary data:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard Summary</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Scrape Items</h2>
            <p className="text-3xl mt-2">{totalScrapeItems}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Pickup Orders</h2>
            <p className="text-3xl mt-2">{totalPickupOrders}</p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Average Scrape Item Price</h2>
            <p className="text-3xl mt-2">${averagePrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Pickup Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Order ID</th>
                  <th className="px-4 py-2 border-b">User ID</th>
                  <th className="px-4 py-2 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {pickupOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{order.id}</td>
                    <td className="px-4 py-2 border-b">{order.userId}</td>
                    <td className="px-4 py-2 border-b">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSummary;
