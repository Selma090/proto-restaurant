import React, { useState, useEffect } from 'react';

function BusinessInsights() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetch('/api/restaurantData')
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(restaurant => ({ ...restaurant, availability: null }));
        setRestaurantData(updatedData);
      })
      .catch(error => console.error('Error fetching restaurant data', error));

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
      },
      error => console.error('Error getting user location', error)
    );
  }, []);

  const filteredRestaurants = restaurantData.filter(restaurant =>
    restaurant.phoneNumber.includes(searchPhone)
  );

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  };

  const handleVerify = () => {
    const updatedRestaurants = filteredRestaurants.map(restaurant => {
      const distance = calculateDistance(
        Number(latitude),
        Number(longitude),
        restaurant.latitude,
        restaurant.longitude
      );
      const isWithinDeliveryRange = distance <= restaurant.deliveryDistance;
      return { ...restaurant, availability: isWithinDeliveryRange };
    });
    setRestaurantData(updatedRestaurants);
  };

  return (
    <div className="mt-20 text-center">
      <div className="mt-7 text-center flex flex-col md:flex-row items-start md:items-center ">
        <div className="text-left mb-4 md:mb-0 md:mr-4 flex-grow">
          <div className="flex flex-col" style={{ marginLeft: '295px' }}>
            <h2 className="text-2xl mb-50">Delivery Availability</h2>
            <h1 className="text-gray-400">Verify Delivery Availability for User's Location</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center" style={{ marginRight: '295px' }}>
        <div className="mr-4 flex-grow flex flex-col">
          <label htmlFor="latitude" className="mb-1 ml-0">Latitude</label> 
          <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
          className="border px-2 py-1 rounded mb-2 w-33"
          />
        </div>
        <div className="mr-2 flex-grow flex flex-col"> 
          <label htmlFor="longitude" className="mb-1 ml-0">Longitude</label>
          <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
          className="border px-2 py-1 rounded mb-2 w-33"
          />
        </div>
          <div className="flex flex-col md:flex-row items-start md:items-center ml-2"> 
            <button onClick={handleVerify} className="bg-gray-700 text-white px-10 py-1 rounded-lg hover:bg-gray-800">Verify</button>
          </div>
        </div>
      </div>
      <table className="border-collapse mx-auto rounded-lg overflow-hidden mt-4">
        <thead>
          <tr>
            <th className="border px-10 py-2 bg-gray-200 text-black font-normal">Name</th>
            <th className="border px-10 py-2 bg-gray-200 text-black font-normal">Phone</th>
            <th className="border px-10 py-2 bg-gray-200 text-black font-normal">Latitude</th>
            <th className="border px-10 py-2 bg-gray-200 text-black font-normal">Longitude</th>
            <th className="border px-10 py-2 bg-gray-200 text-black font-normal">Delivery Distance</th>
            <th className="border px-10 py-2 bg-gray-200 text-black font-normal">Availability</th>
          </tr>
        </thead>
        <tbody>
        {filteredRestaurants.map(restaurant => (
          <tr key={restaurant.id}>
            <td className="border px-2 py-2 text-black">{restaurant.restaurantName}</td>
            <td className="border px-2 py-2 text-black">{restaurant.phoneNumber}</td>
            <td className="border px-2 py-2 text-black">{restaurant.latitude}</td>
            <td className="border px-2 py-2 text-black">{restaurant.longitude}</td>
            <td className="border px-2 py-2 text-black">{restaurant.deliveryDistance}</td>
            <td className="border px-2 py-2">
              {restaurant.availability === null ? (
                '-'
              ) : restaurant.availability ? (
                <span className="border border-gray-300 bg-gray-300 px-2 py-1 rounded text-white">True</span>
              ) : (
                <span className="border border-black bg-black px-2 py-1 rounded text-white">False</span>
              )}
            </td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  );
}

export default BusinessInsights;
