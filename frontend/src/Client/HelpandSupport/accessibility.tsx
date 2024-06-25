import AccessibilityItem from "../../Components/AccessibilityItem/AccessibilityItem"
import Sidebar from "../../Components/Sidebar/Sidebar"

const accessibility = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">FAQ</h1>
        <AccessibilityItem />
        </div>
      </div>
    </div>

  )
}

export default accessibility
