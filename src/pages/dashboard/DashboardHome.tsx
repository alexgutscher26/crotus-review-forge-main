
import React from "react";

/**
 * A React functional component representing the home page of the dashboard.
 */
const DashboardHome: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome to your Crotus dashboard. Use the sidebar to navigate.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="font-semibold text-lg mb-2">Reviews</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 mt-2">Total reviews collected</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="font-semibold text-lg mb-2">Average Rating</h2>
          <p className="text-3xl font-bold">-</p>
          <p className="text-sm text-gray-500 mt-2">Across all reviews</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="font-semibold text-lg mb-2">Collection Form</h2>
          <p className="text-3xl font-bold">Not Active</p>
          <p className="text-sm text-gray-500 mt-2">Status of your form</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
