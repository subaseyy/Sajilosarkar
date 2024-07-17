import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

interface SrapeItem {
  id: number;
  name: string;
  price: number;
}

interface FormData {
  pickupDate: Date;
  pickupTime: Date;
  name: string;
  srapeItems: { label: string; value: number; price: number }[];
  totalPrice: number;
}

const PickupRequestForm = () => {
  const { register, handleSubmit, control, setValue, watch } = useForm<FormData>();
  const [srapeItems, setSrapeItems] = useState<SrapeItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/scrapeitems/all', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data: SrapeItem[] = await response.json();
        setSrapeItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const srapeOptions = srapeItems.map(item => ({
    label: `${item.name} - $${item.price}`,
    value: item.id,
    price: item.price,
  }));

  // Watch selected srape items and update total price
  const selectedSrapeItems = watch('srapeItems');
  useEffect(() => {
    if (selectedSrapeItems) {
      const total = selectedSrapeItems.reduce((sum, item) => sum + parseFloat(item.price.toString()), 0);
      setTotalPrice(total);
    }
  }, [selectedSrapeItems]);

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      srapeItems: data.srapeItems.map(item => ({
        id: item.value,
        name: item.label,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post('/api/pickup-requests', formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Form successfully submitted:', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Pickup Request Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <Controller
            name="pickupDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full p-2 border border-gray-300 rounded"
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
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
                dateFormat="h:mm aa"
              />
            )}
          />
        </div>

        <div>
          <input
            hidden
            type="text"
            value={userId} // assuming userId is the user's name for this example
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            {...register('name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Srape Items</label>
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
                onChange={selectedOptions => setValue('srapeItems', selectedOptions || [])}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Total Price</label>
          <input
            type="text"
            value={`$${totalPrice}`}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PickupRequestForm;
