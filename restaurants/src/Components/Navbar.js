import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg'; 

function Navbar() {
  return (
    <nav className="bg-gray-300 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" /> 
          <div className="text-white font-bold text-xl">GourmetGo</div>
        </div>
        <div className="flex space-x-4">
          <Link to="/business-insights" className="text-white hover:text-gray-200">Dashboard</Link>
          <Link to="/business-data-form" className="text-white hover:text-gray-200">Add restaurant</Link>
          <Link to="/delivery-availability" className="text-white hover:text-gray-200">Delivery</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
