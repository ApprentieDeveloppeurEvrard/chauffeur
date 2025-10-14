const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, role = 'client' } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, role });
  return res.status(201).json({ id: user._id, email: user.email, role: user.role });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ sub: user._id.toString(), email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: '7d',
  });
  return res.json({ token });
});

module.exports = router;

// Current user profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('_id email role');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ id: user._id, email: user.email, role: user.role });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to load profile' });
  }
});


