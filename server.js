// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client'))); // Serve frontend

// MongoDB Connection

// const mongoURI = 'mongodb+srv://kanuprajapati717:kanu1233@cluster0.z29xexj.mongodb.net/inventoryApp';
// mongoose.connect(mongoURI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    console.log('MongoDB Connected');
  })
  .catch(err => console.error(err));

// Mongoose Schemas
const InventorySchema = new mongoose.Schema({
  item: String,
  desc: String,
  qty: Number,
  clientName: String,
  clientMobile: String,
  vehicleModel: String,
  vehicleNumber: String,
  date: String
});

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

const Inventory = mongoose.model('Inventory', InventorySchema);
const Billing = mongoose.model('Billing', BillingSchema);

// API Routes
app.post('/api/inventory', async (req, res) => {
  console.log("REQ BODY:", req.body); // 👈 આ ઉમેરો
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.send({ success: true });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).send({ success: false, error });
  }
});


app.get('/api/inventory', async (req, res) => {
  const items = await Inventory.find().sort({ _id: -1 });
  res.json(items);
});



app.post('/api/billing', async (req, res) => {
  try {
    const bill = new Billing(req.body);
    await bill.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.get('/api/billing', async (req, res) => {
  const bills = await Billing.find().sort({ _id: -1 });
  res.json(bills);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

