const Driver = require('../models/Driver');
const User = require('../models/User');

// Obtenir le profil du chauffeur connecté
const getDriverProfile = async (req, res) => {
  try {
    const userId = req.user.sub;
    
    const driver = await Driver.findOne({ userId })
      .populate('userId', 'email firstName lastName phone isActive')
      .lean();

    if (!driver) {
      return res.status(404).json({ 
        error: 'Profil chauffeur non trouvé' 
      });
    }

    res.json({
      driver
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du profil chauffeur:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération du profil' 
    });
  }
};

// Mettre à jour le profil du chauffeur
const updateDriverProfile = async (req, res) => {
  try {
    const userId = req.user.sub;
    const updateData = req.body;

    // Champs autorisés à être mis à jour
    const allowedFields = [
      'firstName', 'lastName', 'phone', 'licenseType', 'licenseNumber', 
      'licenseDate', 'vtcCard', 'experience', 'vehicleType', 'vehicleBrand', 
      'vehicleModel', 'vehicleYear', 'vehicleSeats', 'workZone', 'specialties',
      'isAvailable'
    ];

    // Filtrer les champs autorisés
    const filteredData = {};
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    const driver = await Driver.findOneAndUpdate(
      { userId },
      filteredData,
      { new: true, runValidators: true }
    ).populate('userId', 'email firstName lastName phone');

    if (!driver) {
      return res.status(404).json({ 
        error: 'Profil chauffeur non trouvé' 
      });
    }

    // Mettre à jour aussi les infos de base dans User si nécessaire
    if (filteredData.firstName || filteredData.lastName || filteredData.phone) {
      const userUpdateData = {};
      if (filteredData.firstName) userUpdateData.firstName = filteredData.firstName;
      if (filteredData.lastName) userUpdateData.lastName = filteredData.lastName;
      if (filteredData.phone) userUpdateData.phone = filteredData.phone;
      
      await User.findByIdAndUpdate(userId, userUpdateData);
    }

    res.json({
      message: 'Profil mis à jour avec succès',
      driver
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil chauffeur:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Données invalides',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour du profil' 
    });
  }
};

// Obtenir tous les chauffeurs (pour les admins)
const getAllDrivers = async (req, res) => {
  try {
    const { 
      status, 
      isAvailable, 
      vehicleType, 
      experience,
      page = 1, 
      limit = 10,
      search
    } = req.query;

    // Construire le filtre
    const filter = {};
    if (status) filter.status = status;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (vehicleType) filter.vehicleType = vehicleType;
    if (experience) filter.experience = experience;

    // Recherche textuelle
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { workZone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const drivers = await Driver.find(filter)
      .populate('userId', 'email isActive lastLogin')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Driver.countDocuments(filter);

    res.json({
      drivers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des chauffeurs:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des chauffeurs' 
    });
  }
};

// Approuver/rejeter un chauffeur (admin seulement)
const updateDriverStatus = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { status, reason } = req.body;

    if (!['approved', 'rejected', 'suspended'].includes(status)) {
      return res.status(400).json({ 
        error: 'Statut invalide' 
      });
    }

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { 
        status,
        statusReason: reason,
        statusUpdatedAt: new Date(),
        statusUpdatedBy: req.user.sub
      },
      { new: true }
    ).populate('userId', 'email firstName lastName');

    if (!driver) {
      return res.status(404).json({ 
        error: 'Chauffeur non trouvé' 
      });
    }

    res.json({
      message: `Statut du chauffeur mis à jour: ${status}`,
      driver
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour du statut' 
    });
  }
};

// Mettre à jour la localisation du chauffeur
const updateLocation = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        error: 'Latitude et longitude requises' 
      });
    }

    const driver = await Driver.findOneAndUpdate(
      { userId },
      {
        currentLocation: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        lastLocationUpdate: new Date()
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ 
        error: 'Profil chauffeur non trouvé' 
      });
    }

    res.json({
      message: 'Localisation mise à jour',
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        updatedAt: driver.lastLocationUpdate
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la localisation:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour de la localisation' 
    });
  }
};

// Rechercher des chauffeurs à proximité
const findNearbyDrivers = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10000, vehicleType } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        error: 'Latitude et longitude requises' 
      });
    }

    const filter = {
      status: 'approved',
      isAvailable: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    };

    if (vehicleType) {
      filter.vehicleType = vehicleType;
    }

    const drivers = await Driver.find(filter)
      .select('firstName lastName vehicleType vehicleBrand vehicleModel rating totalRides currentLocation phone')
      .limit(20)
      .lean();

    res.json({
      drivers: drivers.map(driver => ({
        ...driver,
        distance: calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          driver.currentLocation.coordinates[1],
          driver.currentLocation.coordinates[0]
        )
      }))
    });

  } catch (error) {
    console.error('Erreur lors de la recherche de chauffeurs:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la recherche de chauffeurs' 
    });
  }
};

// Fonction utilitaire pour calculer la distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 100) / 100; // Distance en km, arrondie à 2 décimales
}

module.exports = {
  getDriverProfile,
  updateDriverProfile,
  getAllDrivers,
  updateDriverStatus,
  updateLocation,
  findNearbyDrivers
};
