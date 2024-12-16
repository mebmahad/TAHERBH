import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading state change after 2 seconds (can replace with actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 bg-white rounded-md shadow">
          <Outlet />
        </div>
      </main>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <span className="text-lg text-gray-700">Loading...</span>
    </div>
  );
}

export default App;
