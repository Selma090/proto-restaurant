const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const Restaurant = require('./models/Restaurant'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/restau', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/restaurants', async (req, res) => {
  try {
    const { restaurantName, cuisineType, phoneNumber, latitude, longitude, deliveryDistance } = req.body;
    
    const nouveauRestaurant = new Restaurant({
      restaurantName,
      cuisineType,
      phoneNumber,
      latitude,
      longitude,
      deliveryDistance
    });

    await nouveauRestaurant.save();
    res.status(201).send(nouveauRestaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/restaurantData', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, { _id: 0, __v: 0 }); 
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
