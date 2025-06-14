const express = require('express');
const Inventory = require('../models/Inventory');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Inventory = require('../models/Inventory');



// router.get('/', async (req, res) => {
//   const data = await Inventory.find();
//   res.json(data);
// });

// router.post('/', async (req, res) => {
//   const item = new Inventory(req.body);
//   await item.save();
//   res.json({ success: true });
// });

// module.exports = router;
