const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route de recherche globale
router.get('/global', searchController.globalSearch);

// Route de recherche rapide (suggestions)
router.get('/quick', searchController.quickSearch);

module.exports = router;
