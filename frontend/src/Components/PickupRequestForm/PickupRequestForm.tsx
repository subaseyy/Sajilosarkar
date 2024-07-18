import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

interface SrapeItem {
  id: number;
  name: string;
  price: number;
}

interface FormData {
  pickupDate: Date;
  pickupTime: Date;
  userId: string;
  srapeItems: { label: string; value: number; price: number }[];
  totalPrice: number;
}

const PickupRequestForm = () => {
  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormData>();
  const [srapeItems, setSrapeItems] = useState<SrapeItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const userId = localStorage.getItem("id") || "";
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/scrapeitems/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: SrapeItem[] = await response.json();
        if (Array.isArray(data)) {
          setSrapeItems(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const srapeOptions = srapeItems.map((item) => ({
    label: `${item.name} - $${item.price}`,
    value: item.id,
    price: item.price,
  }));

  const selectedSrapeItems = watch("srapeItems");
  useEffect(() => {
    if (selectedSrapeItems) {
      const total = selectedSrapeItems.reduce(
        (sum, item) => sum + parseFloat(item.price.toString()),
        0
      );
      setTotalPrice(total);
      setValue("totalPrice", total);
    }
  }, [selectedSrapeItems, setValue]);

  const onSubmit = async (data: FormData) => {
    console.log("Form data before submission:", data);
// Format the date and time
const formattedData = {
  ...data,
  pickupDate: format(data.pickupDate, "yyyy-MM-dd"),
  pickupTime: format(data.pickupTime, "HH:mm:ss"),
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
      console.log("Form data after submission:", data);
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
                name="pickupDate"
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
              {...register("userId")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Srape Items
            </label>
            <Controller
              name="srapeItems"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={srapeOptions}
                  className="w-full"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    setValue("srapeItems", selectedOptions || [])
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
