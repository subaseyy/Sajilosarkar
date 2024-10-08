import FAQ from "../../Components/Faq/Faq";
import Sidebar from "../../Components/Sidebar/Sidebar";

const FaqPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">FAQ</h1>
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
