// models/bill.js
const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  item: String,
  qty: Number,
  price: Number,
  date: String,
  vehicleModel: String,
  vehicleNumber: String,
  clientName: String,
  clientMobile: String
});

module.exports = mongoose.models.Bill || mongoose.model('Bill', BillingSchema);