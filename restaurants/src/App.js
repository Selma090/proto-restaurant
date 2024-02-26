import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Navbar from './Components/Navbar'; 
import BusinessDataForm from './Components/BusinessDataForm';
import BusinessInsights from './Components/BusinessInsights';
import DeliveryAvailability from './Components/DeliveryAvailability';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/business-data-form" element={<BusinessDataForm />} />
          <Route path="/business-insights" element={<BusinessInsights />} />
          <Route path="/delivery-availability" element={<DeliveryAvailability/>} />
          <Route path="/" element={<BusinessDataForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
