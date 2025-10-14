const express = require('express');
const { requireAuth } = require('../middleware/auth');
const Driver = require('../models/Driver');

const router = express.Router();

router.get('/', async (req, res) => {
  const drivers = await Driver.find().sort({ createdAt: -1 });
  return res.json(drivers);
});

router.post('/', requireAuth, async (req, res) => {
  const { name, phone } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name required' });
  const driver = await Driver.create({ name, phone: phone || '' });
  return res.status(201).json(driver);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const updated = await Driver.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Driver not found' });
  return res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const deleted = await Driver.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Driver not found' });
  return res.status(204).send();
});

module.exports = router;


