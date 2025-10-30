import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SimpleHeader from '../component/common/SimpleHeader';
import api from '../services/api';

export default function UserProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingDriverInfo, setIsEditingDriverInfo] = useState(false);
  const [isEditingEmployerInfo, setIsEditingEmployerInfo] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [driverInfo, setDriverInfo] = useState({
    licenseNumber: '',
    licenseType: 'B',
    licenseExpiryDate: '',
    experience: '1-3',
    vehicleType: 'berline',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleSeats: '5',
    vehicleColor: '',
    vehiclePlateNumber: '',
    workZone: 'Abidjan',
    specialties: [],
    address: '',
    city: 'Abidjan',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [workExperience, setWorkExperience] = useState([
    {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  const [employerInfo, setEmployerInfo] = useState({
    companyName: '',
    companyType: '',
    siret: '',
    address: '',
    city: 'Abidjan',
    website: '',
    description: ''
  });

  const [documents, setDocuments] = useState({
    profilePhoto: null,
    idCard: null,
    driverLicense: null,
    vehicleRegistration: null,
    companyRegistration: null
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
      setIsDriver(user.role === 'driver');
    }
  }, [user]);

  const handleUserInfoChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleDriverInfoChange = (e) => {
    setDriverInfo({
      ...driverInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleEmployerInfoChange = (e) => {
    setEmployerInfo({
      ...employerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocuments({
        ...documents,
        [name]: files[0]
      });
    }
  };

  const handleSpecialtyToggle = (specialty) => {
    setDriverInfo({
      ...driverInfo,
      specialties: driverInfo.specialties.includes(specialty)
        ? driverInfo.specialties.filter(s => s !== specialty)
        : [...driverInfo.specialties, specialty]
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newExperiences = [...workExperience];
    newExperiences[index][field] = value;
    setWorkExperience(newExperiences);
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const removeWorkExperience = (index) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
    }
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.put('/auth/profile', userInfo);
      setSuccess('Informations mises à jour avec succès !');
      setIsEditingPersonalInfo(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleBecomeDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Créer le profil chauffeur
      const response = await api.post('/drivers/become-driver', {
        ...userInfo,
        ...driverInfo
      });

      setSuccess('Profil chauffeur créé avec succès ! Vous apparaissez maintenant dans la liste des chauffeurs.');
      setIsDriver(true);
      setShowDriverForm(false);
      
      // Recharger les données utilisateur
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création du profil chauffeur');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4 sm:mb-6">Mon Profil</h1>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-sm sm:text-base text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <p className="text-sm sm:text-base text-green-700">{success}</p>
          </div>
        )}

        {/* Informations personnelles */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl text-gray-900">Informations personnelles</h2>
            {!isEditingPersonalInfo && (
              <button
                onClick={() => setIsEditingPersonalInfo(true)}
                className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Éditer
              </button>
            )}
          </div>
          
          <form onSubmit={handleUpdateUserInfo} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleUserInfoChange}
                  disabled={!isEditingPersonalInfo}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditingPersonalInfo ? 'focus:ring-2 focus:ring-orange-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleUserInfoChange}
                  disabled={!isEditingPersonalInfo}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditingPersonalInfo ? 'focus:ring-2 focus:ring-orange-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  disabled={!isEditingPersonalInfo}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditingPersonalInfo ? 'focus:ring-2 focus:ring-orange-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
                />
              </div>
            </div>

            {isEditingPersonalInfo && (
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingPersonalInfo(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Section Devenir Chauffeur */}
        {!isDriver && (
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl text-gray-900">Devenir Chauffeur</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Complétez vos informations pour apparaître dans la liste des chauffeurs
                </p>
              </div>
              
              {!showDriverForm && (
                <button
                  onClick={() => setShowDriverForm(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                >
                  Commencer
                </button>
              )}
            </div>

            {showDriverForm && (
              <form onSubmit={handleBecomeDriver} className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Numéro de permis *
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={driverInfo.licenseNumber}
                      onChange={handleDriverInfoChange}
                      required
                      placeholder="Ex: CI240001234"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Type de permis
                    </label>
                    <select
                      name="licenseType"
                      value={driverInfo.licenseType}
                      onChange={handleDriverInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="B">B (Voiture)</option>
                      <option value="C">C (Poids lourd)</option>
                      <option value="D">D (Transport de personnes)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Date d'expiration du permis
                    </label>
                    <input
                      type="date"
                      name="licenseExpiryDate"
                      value={driverInfo.licenseExpiryDate}
                      onChange={handleDriverInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Expérience
                    </label>
                    <select
                      name="experience"
                      value={driverInfo.experience}
                      onChange={handleDriverInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="0-1">Moins d'1 an</option>
                      <option value="1-3">1 à 3 ans</option>
                      <option value="3-5">3 à 5 ans</option>
                      <option value="5+">Plus de 5 ans</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Type de véhicule
                    </label>
                    <select
                      name="vehicleType"
                      value={driverInfo.vehicleType}
                      onChange={handleDriverInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="berline">Berline</option>
                      <option value="suv">SUV</option>
                      <option value="van">Van</option>
                      <option value="minibus">Minibus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Marque du véhicule
                    </label>
                    <input
                      type="text"
                      name="vehicleBrand"
                      value={driverInfo.vehicleBrand}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Toyota"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Modèle
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={driverInfo.vehicleModel}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Corolla"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Année
                    </label>
                    <input
                      type="number"
                      name="vehicleYear"
                      value={driverInfo.vehicleYear}
                      onChange={handleDriverInfoChange}
                      placeholder="2020"
                      min="1990"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Nombre de places
                    </label>
                    <input
                      type="number"
                      name="vehicleSeats"
                      value={driverInfo.vehicleSeats}
                      onChange={handleDriverInfoChange}
                      min="2"
                      max="50"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Couleur du véhicule
                    </label>
                    <input
                      type="text"
                      name="vehicleColor"
                      value={driverInfo.vehicleColor}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Blanc"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Numéro d'immatriculation
                    </label>
                    <input
                      type="text"
                      name="vehiclePlateNumber"
                      value={driverInfo.vehiclePlateNumber}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: AB-1234-CI"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={driverInfo.city}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Abidjan"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Adresse complète
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={driverInfo.address}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Rue 12, Cocody"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Zone de travail
                    </label>
                    <input
                      type="text"
                      name="workZone"
                      value={driverInfo.workZone}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Abidjan"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Spécialités
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['transport_personnel', 'livraison', 'vtc', 'transport_scolaire', 'evenementiel'].map(specialty => (
                        <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={driverInfo.specialties.includes(specialty)}
                            onChange={() => handleSpecialtyToggle(specialty)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="text-sm sm:text-base text-gray-700 capitalize">
                            {specialty.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact d'urgence */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Contact d'urgence (Nom)
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={driverInfo.emergencyContact}
                      onChange={handleDriverInfoChange}
                      placeholder="Ex: Marie Kouassi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Téléphone d'urgence
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={driverInfo.emergencyPhone}
                      onChange={handleDriverInfoChange}
                      placeholder="+225 07 00 00 00 00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className="mt-6">
                  <h3 className="text-lg text-gray-900 mb-4">Documents requis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Photo de profil
                      </label>
                      <input
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.profilePhoto && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.profilePhoto.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Pièce d'identité *
                      </label>
                      <input
                        type="file"
                        name="idCard"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.idCard && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.idCard.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Permis de conduire *
                      </label>
                      <input
                        type="file"
                        name="driverLicense"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.driverLicense && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.driverLicense.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Carte grise du véhicule
                      </label>
                      <input
                        type="file"
                        name="vehicleRegistration"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.vehicleRegistration && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.vehicleRegistration.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Création...' : 'Créer mon profil chauffeur'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowDriverForm(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Si déjà chauffeur - Informations complémentaires */}
        {isDriver && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h3 className="text-green-900">Vous êtes chauffeur</h3>
                  <p className="text-sm text-green-700">Votre profil apparaît dans la liste des chauffeurs</p>
                </div>
              </div>
            </div>

            {/* Expérience professionnelle */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl text-gray-900 mb-4">Expérience professionnelle</h2>
              
              <div className="space-y-6">
                {workExperience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                    {workExperience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Poste occupé *
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Ex: Chauffeur personnel"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Entreprise *
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Ex: Société ABC"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lieu
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Ex: Abidjan"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date de début
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date de fin
                          </label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="En cours si vide"
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Décrivez vos responsabilités et réalisations..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ajouter une expérience
                </button>
                
                <button
                  type="button"
                  onClick={() => {/* TODO: Sauvegarder les expériences */}}
                  className="w-full py-3 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  Enregistrer les expériences
                </button>
              </div>
            </div>

            {/* Informations et documents du chauffeur */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-900">Informations et documents du chauffeur</h2>
                {!isEditingDriverInfo && (
                  <button
                    onClick={() => setIsEditingDriverInfo(true)}
                    className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    Éditer
                  </button>
                )}
              </div>
              
              <form className="space-y-6">
                {/* Informations du permis */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Permis de conduire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Numéro de permis
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={driverInfo.licenseNumber}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: CI240001234"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Type de permis
                      </label>
                      <select
                        name="licenseType"
                        value={driverInfo.licenseType}
                        onChange={handleDriverInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="B">B (Voiture)</option>
                        <option value="C">C (Poids lourd)</option>
                        <option value="D">D (Transport de personnes)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Date d'expiration
                      </label>
                      <input
                        type="date"
                        name="licenseExpiryDate"
                        value={driverInfo.licenseExpiryDate}
                        onChange={handleDriverInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Informations du véhicule */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Véhicule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Type de véhicule
                      </label>
                      <select
                        name="vehicleType"
                        value={driverInfo.vehicleType}
                        onChange={handleDriverInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="berline">Berline</option>
                        <option value="suv">SUV</option>
                        <option value="van">Van</option>
                        <option value="minibus">Minibus</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Marque
                      </label>
                      <input
                        type="text"
                        name="vehicleBrand"
                        value={driverInfo.vehicleBrand}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Toyota"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Modèle
                      </label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={driverInfo.vehicleModel}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Corolla"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Année
                      </label>
                      <input
                        type="number"
                        name="vehicleYear"
                        value={driverInfo.vehicleYear}
                        onChange={handleDriverInfoChange}
                        placeholder="2020"
                        min="1990"
                        max={new Date().getFullYear()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Couleur
                      </label>
                      <input
                        type="text"
                        name="vehicleColor"
                        value={driverInfo.vehicleColor}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Blanc"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Immatriculation
                      </label>
                      <input
                        type="text"
                        name="vehiclePlateNumber"
                        value={driverInfo.vehiclePlateNumber}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: AB-1234-CI"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Nombre de places
                      </label>
                      <input
                        type="number"
                        name="vehicleSeats"
                        value={driverInfo.vehicleSeats}
                        onChange={handleDriverInfoChange}
                        min="2"
                        max="50"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Adresse et contacts */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Adresse et contacts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={driverInfo.city}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Abidjan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Zone de travail
                      </label>
                      <input
                        type="text"
                        name="workZone"
                        value={driverInfo.workZone}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Cocody, Plateau"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Adresse complète
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={driverInfo.address}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Rue 12, Cocody"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Contact d'urgence
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={driverInfo.emergencyContact}
                        onChange={handleDriverInfoChange}
                        placeholder="Ex: Marie Kouassi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Téléphone d'urgence
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={driverInfo.emergencyPhone}
                        onChange={handleDriverInfoChange}
                        placeholder="+225 07 00 00 00 00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Photo de profil
                      </label>
                      <input
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.profilePhoto && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.profilePhoto.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Pièce d'identité
                      </label>
                      <input
                        type="file"
                        name="idCard"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.idCard && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.idCard.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Permis de conduire
                      </label>
                      <input
                        type="file"
                        name="driverLicense"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.driverLicense && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.driverLicense.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Carte grise du véhicule
                      </label>
                      <input
                        type="file"
                        name="vehicleRegistration"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {documents.vehicleRegistration && (
                        <p className="text-xs text-green-600 mt-1">✓ {documents.vehicleRegistration.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditingDriverInfo && (
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingDriverInfo(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </form>
            </div>
          </>
        )}

        {/* Section Employeur */}
        {user?.role === 'client' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-900">Informations de l'entreprise</h2>
              {!isEditingEmployerInfo && (
                <button
                  onClick={() => setIsEditingEmployerInfo(true)}
                  className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Éditer
                </button>
              )}
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={employerInfo.companyName}
                    onChange={handleEmployerInfoChange}
                    placeholder="Ex: Transport Express CI"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Type d'entreprise
                  </label>
                  <select
                    name="companyType"
                    value={employerInfo.companyType}
                    onChange={handleEmployerInfoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="sarl">SARL</option>
                    <option value="sa">SA</option>
                    <option value="entreprise_individuelle">Entreprise individuelle</option>
                    <option value="association">Association</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Numéro SIRET/RC
                  </label>
                  <input
                    type="text"
                    name="siret"
                    value={employerInfo.siret}
                    onChange={handleEmployerInfoChange}
                    placeholder="Ex: CI-ABJ-2024-B-12345"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={employerInfo.city}
                    onChange={handleEmployerInfoChange}
                    placeholder="Ex: Abidjan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Adresse complète
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={employerInfo.address}
                    onChange={handleEmployerInfoChange}
                    placeholder="Ex: Boulevard de la République, Plateau"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={employerInfo.website}
                    onChange={handleEmployerInfoChange}
                    placeholder="https://www.example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Description de l'entreprise
                  </label>
                  <textarea
                    name="description"
                    value={employerInfo.description}
                    onChange={handleEmployerInfoChange}
                    rows="4"
                    placeholder="Décrivez votre entreprise et vos activités..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Documents entreprise */}
              <div className="mt-6">
                <h3 className="text-lg text-gray-900 mb-4">Documents de l'entreprise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Logo de l'entreprise
                    </label>
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {documents.profilePhoto && (
                      <p className="text-xs text-green-600 mt-1">✓ {documents.profilePhoto.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Registre de commerce
                    </label>
                    <input
                      type="file"
                      name="companyRegistration"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {documents.companyRegistration && (
                      <p className="text-xs text-green-600 mt-1">✓ {documents.companyRegistration.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Pièce d'identité du gérant
                    </label>
                    <input
                      type="file"
                      name="idCard"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {documents.idCard && (
                      <p className="text-xs text-green-600 mt-1">✓ {documents.idCard.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditingEmployerInfo && (
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingEmployerInfo(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
