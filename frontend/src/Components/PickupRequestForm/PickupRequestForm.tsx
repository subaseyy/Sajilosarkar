import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

interface ScrapItem {
  id: number;
  name: string;
  price: number;
}

interface FormData {
  pickupDate: Date;
  pickupTime: Date;
  name: string;
  scrapItems: { label: string; value: number; price: number }[];
}

const PickupRequestForm = () => {
  const { register, handleSubmit, control, setValue } = useForm<FormData>();
  const [scrapItems, setScrapItems] = useState<ScrapItem[]>([]);
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchScrapItems = async () => {
      try {
        const response = await axios.get('/api/scrapitems/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setScrapItems(response.data);
      } catch (error) {
        console.error('There was an error fetching the scrap items!', error);
      }
    };

    fetchScrapItems();
  }, [token]);

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      scrapItems: data.scrapItems.map(item => ({
        id: item.value,
        name: item.label,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post('/api/pickup-requests', formattedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Form successfully submitted:', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const scrapOptions = scrapItems.map(item => ({
    label: `${item.name} - $${item.price}`,
    value: item.id,
    price: item.price,
  }));

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
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={userId} // assuming userId is the user's name for this example
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            {...register('name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Scrap Items</label>
          <Controller
            name="scrapItems"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={scrapOptions}
                className="w-full"
                classNamePrefix="select"
                onChange={selectedOptions => setValue('scrapItems', selectedOptions || [])}
              />
            )}
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
