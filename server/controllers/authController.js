const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Driver = require('../models/Driver');

// Générer un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      sub: user._id.toString(), 
      email: user.email, 
      role: user.role 
    }, 
    process.env.JWT_SECRET || 'devsecret', 
    { expiresIn: '7d' }
  );
};

// Inscription
const register = async (req, res) => {
  try {
    const { 
      email, 
      password, 
      role = 'client',
      firstName,
      lastName,
      phone,
      // Champs spécifiques pour les chauffeurs
      licenseType,
      licenseNumber,
      licenseDate,
      experience,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      vehicleYear,
      vehicleSeats,
      workZone,
      specialties
    } = req.body;

    // Validation des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email et mot de passe sont requis' 
      });
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Format d\'email invalide' 
      });
    }

    // Validation de la force du mot de passe
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Cette adresse email est déjà utilisée' 
      });
    }

    // Hasher le mot de passe
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Créer l'utilisateur
    const userData = {
      email: email.toLowerCase(),
      passwordHash,
      role,
      firstName,
      lastName,
      phone
    };

    const user = await User.create(userData);

    // Si c'est un chauffeur, créer aussi le profil chauffeur
    if (role === 'driver') {
      const driverData = {
        userId: user._id,
        firstName,
        lastName,
        phone,
        email: email.toLowerCase(),
        licenseType,
        licenseNumber,
        licenseDate: licenseDate ? new Date(licenseDate) : undefined,
        experience,
        vehicleType,
        vehicleBrand,
        vehicleModel,
        vehicleYear: vehicleYear ? parseInt(vehicleYear) : undefined,
        vehicleSeats: vehicleSeats ? parseInt(vehicleSeats) : undefined,
        workZone,
        specialties: specialties || [],
        status: 'pending', // En attente de validation
        isAvailable: false
      };

      await Driver.create(driverData);
    }

    // Générer le token
    const token = generateToken(user);

    // Réponse sans le mot de passe
    res.status(201).json({
      message: 'Compte créé avec succès',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      token
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur lors de la création du compte' 
    });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des champs
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email et mot de passe sont requis' 
      });
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Générer le token
    const token = generateToken(user);

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: 'Connexion réussie',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      token
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur lors de la connexion' 
    });
  }
};

// Profil utilisateur actuel
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub)
      .select('-passwordHash')
      .lean();

    if (!user) {
      return res.status(404).json({ 
        error: 'Utilisateur non trouvé' 
      });
    }

    // Si c'est un chauffeur, récupérer aussi les infos du profil chauffeur
    if (user.role === 'driver') {
      const driverProfile = await Driver.findOne({ userId: user._id }).lean();
      user.driverProfile = driverProfile;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        driverProfile: user.driverProfile
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération du profil' 
    });
  }
};

// Mise à jour du profil
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { firstName, lastName, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'Utilisateur non trouvé' 
      });
    }

    // Mettre à jour les champs
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.json({
      message: 'Profil mis à jour avec succès',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour du profil' 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
