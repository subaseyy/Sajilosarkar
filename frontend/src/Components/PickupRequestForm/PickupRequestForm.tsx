import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

interface ScrapeItem {
  id: number;
  name: string;
  price: number;
}

interface FormData {
  orderDate: Date;
  pickupTime: Date;
  customerId: string;
  scrapeItems: { value: number; label: string; price: number }[];
  totalPrice: number;
}

const PickupRequestForm = () => {
  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormData>();
  const [scrapeItems, setScrapeItems] = useState<ScrapeItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const userId = localStorage.getItem("id") || "";
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/scrapeitems/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.data) {
          throw new Error(`No data received!`);
        }
        const data: ScrapeItem[] = response.data;
        if (Array.isArray(data)) {
          setScrapeItems(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const scrapeOptions = scrapeItems.map((item) => ({
    label: `${item.name} - $${item.price}`,
    value: item.id,
    price: item.price,
  }));

  const selectedScrapeItems = watch("scrapeItems");

  useEffect(() => {
    if (selectedScrapeItems) {
      const total = selectedScrapeItems.reduce(
        (sum, item) => sum + parseFloat(item.price.toString()),
        0
      );
      setTotalPrice(total);
      setValue("totalPrice", total);
    }
  }, [selectedScrapeItems, setValue]);

  const onSubmit = async (data: FormData) => {
    console.log("Form data before submission:", data);

    // Format the date and time
    const formattedData = {
      ...data,
      orderDate: format(data.orderDate, "yyyy-MM-dd"),
      pickupTime: format(data.pickupTime, "HH:mm:ss"),
      scrapeItems: data.scrapeItems.map((item) => ({
        id: item.value,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post(
        "/api/scrapeitems/pickup",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form successfully submitted:", response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Pick Up Request Form
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Controller
                name="orderDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="w-full p-2 border border-gray-300 rounded"
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <Controller
                name="pickupTime"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="w-full p-2 border border-gray-300 rounded"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="HH:mm:ss"
                  />
                )}
              />
            </div>
          </div>

          <div>
            <input
              hidden
              type="text"
              value={userId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              {...register("customerId")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scrape Items
            </label>
            <Controller
              name="scrapeItems"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={scrapeOptions}
                  className="w-full"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    setValue(
                      "scrapeItems",
                      selectedOptions.map((option) => ({
                        label: option.label,
                        value: option.value,
                        price: option.price,
                      }))
                    )
                  }
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Price
            </label>
            <input
              type="text"
              value={`$${totalPrice.toFixed(2)}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              {...register("totalPrice")}
            />
          </div>

          <button
            className="w-full p-2 bg-blue-500 text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PickupRequestForm;
