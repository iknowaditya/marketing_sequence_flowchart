import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="space-y-4">
        <Link 
          to="/dashboard" 
          className="block text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link 
          to="/designer" 
          className="block text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Sequence Designer
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;