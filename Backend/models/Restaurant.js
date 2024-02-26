const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  cuisineType: { type: String },
  phoneNumber: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  deliveryDistance: { type: Number }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
