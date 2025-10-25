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

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [driverInfo, setDriverInfo] = useState({
    licenseNumber: '',
    licenseType: 'B',
    experience: '1-3',
    vehicleType: 'berline',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleSeats: '5',
    workZone: 'Abidjan',
    specialties: []
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

  const handleSpecialtyToggle = (specialty) => {
    setDriverInfo({
      ...driverInfo,
      specialties: driverInfo.specialties.includes(specialty)
        ? driverInfo.specialties.filter(s => s !== specialty)
        : [...driverInfo.specialties, specialty]
    });
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.put('/auth/profile', userInfo);
      setSuccess('Informations mises à jour avec succès !');
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon Profil</h1>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Informations personnelles */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations personnelles</h2>
          
          <form onSubmit={handleUpdateUserInfo} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </form>
        </div>

        {/* Section Devenir Chauffeur */}
        {!isDriver && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Devenir Chauffeur</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Complétez vos informations pour apparaître dans la liste des chauffeurs
                </p>
              </div>
              
              {!showDriverForm && (
                <button
                  onClick={() => setShowDriverForm(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Commencer
                </button>
              )}
            </div>

            {showDriverForm && (
              <form onSubmit={handleBecomeDriver} className="space-y-4 mt-6 border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          <span className="text-sm text-gray-700 capitalize">
                            {specialty.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
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

        {/* Si déjà chauffeur */}
        {isDriver && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <div>
                <h3 className="font-semibold text-green-900">Vous êtes chauffeur</h3>
                <p className="text-sm text-green-700">Votre profil apparaît dans la liste des chauffeurs</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
