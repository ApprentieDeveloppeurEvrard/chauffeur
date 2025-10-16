const express = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication
} = require('../controllers/applicationController');

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(requireAuth);

// Routes pour les candidatures
router.get('/my', getMyApplications); // Mes candidatures (chauffeur)
router.put('/:applicationId/status', updateApplicationStatus); // Accepter/refuser (employeur)
router.delete('/:applicationId', withdrawApplication); // Retirer candidature (chauffeur)

module.exports = router;
