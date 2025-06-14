// const express = require('express');
// const Bill = require('server/models/Bill');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const bill = new Bill(req.body);
//     await bill.save();
//     res.status(201).json(bill);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   const bills = await Bill.find();
//   res.json(bills);
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');


router.get('/', async (req, res) => {
  const data = await Bill.find();
  res.json(data);
});

router.post('/', async (req, res) => {
  const item = new Bill(req.body);
  await item.save();
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;

