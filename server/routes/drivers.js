const express = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  getDriverProfile,
  getDriverProfileById,
  updateDriverProfile,
  getAllDrivers,
  getPublicDrivers,
  updateDriverStatus,
  updateLocation,
  findNearbyDrivers,
  getDriversCount,
  becomeDriver
} = require('../controllers/driverController');

const router = express.Router();

// Routes pour les chauffeurs connectés
router.get('/profile', requireAuth, getDriverProfile);
router.put('/profile', requireAuth, updateDriverProfile);
router.put('/profile/upload', requireAuth, updateDriverProfile); // Route pour upload avec fichiers
router.put('/location', requireAuth, updateLocation);
router.post('/become-driver', requireAuth, becomeDriver); // Devenir chauffeur

// Routes publiques/client
router.get('/public', getPublicDrivers); // Récupérer les chauffeurs publics (NOUVEAU)
router.get('/count', getDriversCount); // Récupérer le nombre de chauffeurs
router.get('/nearby', findNearbyDrivers);
router.get('/:driverId', requireAuth, getDriverProfileById); // Récupérer le profil d'un chauffeur spécifique (protégé)

// Routes admin (TODO: ajouter middleware admin)
router.get('/', requireAuth, getAllDrivers);
router.put('/:driverId/status', requireAuth, updateDriverStatus);

module.exports = router;
