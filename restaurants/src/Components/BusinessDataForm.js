import React, { useState } from 'react';
import axios from 'axios'; 

function Formulaire() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    cuisineType: '',
    phoneNumber: '',
    latitude: '',
    longitude: '',
    deliveryDistance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/restaurants', formData);
      console.log(response.data); 
     
      setFormData({
        restaurantName: '',
        cuisineType: '',
        phoneNumber: '',
        latitude: '',
        longitude: '',
        deliveryDistance: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-20 flex justify-center gap-4">
      <div>
        <h2 className="text-2xl mb-4 text-gray-400">Business Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-400">Name</label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              placeholder='EX: Spice Garden'
              onChange={handleChange}
              className="w-96 border rounded px-3 py-2"
            />
            <label className="block mb-1 text-gray-400">Phone</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder='EX: 0689021736'
              onChange={handleChange}
              className="w-96 border rounded px-3 py-2"
            />
            <label className="block mb-1 text-gray-400">Type</label>
            <input
              type="text"
              name="cuisineType"
              value={formData.cuisineType}
              placeholder='Italian restaurant'
              onChange={handleChange}
              className="w-96 border rounded px-3 py-2"
            />
            
          </div>
        </form>
      </div>
      <div>
        <h2 className="text-2xl mb-4 text-gray-400">Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-400">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              placeholder='EX: 34.020882'
              onChange={handleChange}
              className="w-96 border rounded px-3 py-2"
            />
            <label className="block mb-1 text-gray-400">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              placeholder='EX: -6.841650'
              onChange={handleChange}
              className="w-96 border rounded px-3 py-2"
            />
            <label className="block mb-1 text-gray-400">Delivery Distance (Km)</label>
            <input
              type="text"
              name="deliveryDistance"
              value={formData.deliveryDistance}
              placeholder='EX: 5'
              onChange={handleChange}
              className="w-96 border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="px-4 py-2 rounded hover:bg-gray-400" style={{ backgroundColor: '#BDB76B', color: 'white', marginLeft: '10px' }}>Validate</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulaire;
