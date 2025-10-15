const express = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  getDriverProfile,
  updateDriverProfile,
  getAllDrivers,
  updateDriverStatus,
  updateLocation,
  findNearbyDrivers
} = require('../controllers/driverController');

const router = express.Router();

// Routes pour les chauffeurs connectés
router.get('/profile', requireAuth, getDriverProfile);
router.put('/profile', requireAuth, updateDriverProfile);
router.put('/location', requireAuth, updateLocation);

// Routes publiques/client
router.get('/nearby', findNearbyDrivers);

// Routes admin (TODO: ajouter middleware admin)
router.get('/', requireAuth, getAllDrivers);
router.put('/:driverId/status', requireAuth, updateDriverStatus);

module.exports = router;
