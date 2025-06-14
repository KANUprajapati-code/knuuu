const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item: String,
  description: String,
  quantity: Number,
  client: String,
  mobile: String,
  model: String,
  number: String,
  date: String
});

// ✅ Prevent OverwriteModelError
const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
