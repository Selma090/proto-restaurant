import React, { useState, useEffect } from 'react';

function BusinessInsights() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  useEffect(() => {
    fetch('/api/restaurantData')
      .then(response => response.json())
      .then(data => setRestaurantData(data))
      .catch(error => console.error('Error fetching restaurant data', error));
  }, []);

  const filteredRestaurants = restaurantData.filter(restaurant =>
    restaurant.phoneNumber.includes(searchPhone)
  );


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredRestaurants.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const getCuisineStyle = cuisineType => {
    let backgroundColor;
    switch (cuisineType) {
      case 'Italian':
        backgroundColor = 'lightgreen';
        break;
      case 'Indian':
        backgroundColor = 'lightcoral';
        break;
      case 'Mexican':
        backgroundColor = 'lightyellow';
        break;
      default:
        backgroundColor = 'transparent';
    }
    return {
      backgroundColor,
      padding: '5px',
      borderRadius: '5px'
    };
  };

  
  const countRestaurantsByCuisine = cuisineType => {
    return filteredRestaurants.filter(restaurant => restaurant.cuisineType === cuisineType).length;
  };

  return (
    <div className="mt-20 text-center">

      <div className="flex justify-around" >
        <div className="border border-gray-400 p-2 text-center" style={{ marginLeft: '210px' }}>
          <div>{countRestaurantsByCuisine('Italian')} </div>
          <div>Italian Restaurant</div>
        </div>
        <div className="border border-gray-400 p-2 text-center">
          <div>{countRestaurantsByCuisine('Indian')} </div>
          <div>Indian Restaurant</div>
        </div>
        <div className="border border-gray-400 p-2 text-center" style={{ marginRight: '210px' }}>
          <div>{countRestaurantsByCuisine('Mexican')} </div>
          <div>Mexican Restaurant</div>
        </div>
      </div>
     
      <div className="mt-7 text-center flex flex-col md:flex-row items-start md:items-center ">
        <div className="text-left mb-4 md:mb-0 md:mr-4 flex-grow">
          <div className="flex flex-col" style={{ marginLeft: '318px' }}>
            <h2 className="text-2xl mb-50">All businesses</h2>
            <h1 className="text-gray-400">Monitor sales and status</h1>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="relative" style={{ marginRight: '318px' }}>
            <input
              type="text"
              placeholder="Search by Phone"
              value={searchPhone}
              onChange={e => setSearchPhone(e.target.value)}
              className="border rounded px-3 py-2 pl-10" 
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20" 
                height="20" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <table className="border-collapse mx-auto rounded-lg overflow-hidden mt-4">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="border px-10 py-2 font-normal">Name</th>
            <th className="border px-10 py-2 font-normal">Phone</th>
            <th className="border px-10 py-2 font-normal">Type</th>
            <th className="border px-10 py-2 font-normal">Latitude</th>
            <th className="border px-10 py-2 font-normal">Longitude</th>
            <th className="border px-10 py-2 font-normal">Delivery Distance</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(restaurant => (
            <tr key={restaurant.id}>
              <td className="border px-2 py-2 text-black">{restaurant.restaurantName}</td>
              <td className="border px-2 py-2 text-black">{restaurant.phoneNumber}</td>
              <td className="border px-2 py-2 text-black">
                <span style={getCuisineStyle(restaurant.cuisineType)}>{restaurant.cuisineType}</span>
              </td>
              <td className="border px-2 py-2 text-black">{restaurant.latitude}</td>
              <td className="border px-2 py-2 text-black">{restaurant.longitude}</td>
              <td className="border px-2 py-2 text-black">{restaurant.deliveryDistance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4" style={{ marginRight: '570px' }}>
        <button
          className="px-3 py-1 mx-1 focus:outline-none bg-gray-200"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <ul className="flex">
          {Array.from({ length: Math.ceil(filteredRestaurants.length / itemsPerPage) }).map((_, index) => (
            <li key={index}>
              <button
                className={`w-8 h-8 flex items-center justify-center mx-1 focus:outline-none rounded-full ${
                  currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="px-3 py-1 mx-1 focus:outline-none bg-gray-200"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredRestaurants.length / itemsPerPage)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default BusinessInsights;
