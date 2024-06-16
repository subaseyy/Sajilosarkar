import Sidebar from "../Sidebar/Sidebar";

const NewIssueReport = () => {
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-full bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-center">Report an Issue</h1>
    <h2 className="text-2xl font-semibold mb-4">New Report</h2>
    <form className="space-y-6">
      <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>  
    </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input type="text" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Issue Description</label>
        <textarea className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority Level</label>
        <select className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input type="file" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" multiple />
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">Contact Information</label>
        <input type="text" placeholder="Your Name" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3" />
        <input type="email" placeholder="Your Email" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3" />
        <input type="tel" placeholder="Your Phone Number" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div> */}
      <div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
      </div>
    </form>
  </div>
      </div>
    </>
  );
};

export default NewIssueReport;
