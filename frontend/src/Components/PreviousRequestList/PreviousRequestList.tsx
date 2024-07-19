import { useState, useEffect } from "react";
import axios from "axios";

interface PreviousRequest {
  orderId: number;
  orderDate: string; // Assuming this is a date string
  pickupTime: string; // Assuming this is a time string in HHmm format
  totalPrice: number;
  scrapeItems: { name: string; price: number }[]; // Adjust as per your data structure
}

const PreviousRequestList = () => {
  const [previousRequestList, setPreviousRequestList] = useState<PreviousRequest[]>([]);
  const userId = localStorage.getItem("id") || "";
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/scrapeitems/${userId}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.data) {
          throw new Error(`No data received!`);
        }
        const data: PreviousRequest[] = response.data;
        if (Array.isArray(data)) {
          setPreviousRequestList(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timeStr: string) => {
    const hours = timeStr.slice(0, 2);
    const minutes = timeStr.slice(2, 4);
    return `${hours}:${minutes}`;
  };

  const handleDelete = async (orderId: number) => {
    try {
      const response = await axios.delete(`/api/scrapeitems/${userId}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setPreviousRequestList((prevList) => prevList.filter((request) => request.orderId !== orderId));
      } else {
        console.error("Failed to delete order:", response);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Previous Requests
      </h1>
      {previousRequestList.length === 0 ? (
        <p>No previous requests found.</p>
      ) : (
        <div className="space-y-4">
          {previousRequestList.map((request) => (
            <div key={request.orderId} className="bg-white shadow-md rounded-lg p-6">
              <p>
                <strong>Order ID:</strong> {request.orderId}
              </p>
              <p>
                <strong>Order Date:</strong> {formatDate(request.orderDate)}
              </p>
              <p>
                <strong>Pickup Time:</strong> {formatTime(request.pickupTime)}
              </p>
              <p>
                <strong>Total Price:</strong> ${request.totalPrice}
              </p>
              <p>
                <strong>Scrape Items:</strong>{" "}
                {request.scrapeItems.map((item, index) => (
                  <span key={index}>
                    {item.name} - ${item.price}
                    {index !== request.scrapeItems.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <button
                onClick={() => handleDelete(request.orderId)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousRequestList;
