import { useState, useEffect } from "react";
import axios from "axios";

interface PreviousRequest {
  id: number;
  orderDate: string; // Assuming this is a date string
  pickupTime: string; // Assuming this is a time string
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
            <div key={request.id} className="bg-white shadow-md rounded-lg p-6">
              <p>
                <strong>Order Date:</strong> {request.orderDate}
              </p>
              <p>
                <strong>Pickup Time:</strong> {request.pickupTime}
              </p>
              <p>
                <strong>Total Price:</strong> ${request.totalPrice.toFixed(2)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousRequestList;
