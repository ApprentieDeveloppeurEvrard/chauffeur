import { useState, useEffect } from 'react';
import { driversApi } from '../../services/api';
import Modal from './Modal';

// Style pour masquer la barre de défilement
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function DriverProfileModal({ isOpen, onClose, driverId }) {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les données du chauffeur quand la modal s'ouvre
  useEffect(() => {
    if (isOpen && driverId) {
      loadDriverProfile();
    }
  }, [isOpen, driverId]);

  const loadDriverProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await driversApi.getProfile(driverId);
      setDriver(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      setError('Impossible de charger le profil du chauffeur');
    } finally {
      setLoading(false);
    }
  };

  // Fermer la modal
  const handleClose = () => {
    setDriver(null);
    setError(null);
    onClose();
  };

  // Contacter le chauffeur
  const handleContact = () => {
    if (!driver) return;
    
    // Créer un message de contact
    const message = `Bonjour ${driver.firstName},\n\nJe suis intéressé(e) par vos services de chauffeur. Pourriez-vous me contacter pour discuter d'une opportunité ?\n\nCordialement`;
    
    // Ouvrir l'application de messagerie par défaut ou WhatsApp
    const phoneNumber = driver.phone || '';
    if (phoneNumber) {
      // Essayer WhatsApp d'abord
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Fallback: copier le message dans le presse-papier
      navigator.clipboard.writeText(message).then(() => {
        alert('Message copié dans le presse-papier. Vous pouvez le coller dans votre application de messagerie.');
      });
    }
  };

  // Recruter le chauffeur
  const handleRecruit = () => {
    if (!driver) return;
    
    // Rediriger vers une page de création d'offre pré-remplie
    // ou ouvrir une modal de recrutement
    const recruitData = {
      targetDriverId: driver._id,
      driverName: `${driver.firstName} ${driver.lastName}`,
      driverExperience: driver.experience,
      driverZone: driver.workZone
    };
    
    // Stocker les données pour la page de création d'offre
    localStorage.setItem('recruitmentData', JSON.stringify(recruitData));
    
    // Rediriger vers la page de création d'offre
    window.location.href = '/dashboard/create-offer?recruit=true';
  };

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Profil du chauffeur"
        size="lg"
      >
        <div className="max-h-[60vh] lg:max-h-[70vh] overflow-y-auto scrollbar-hide">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Chargement...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <div className="text-red-600 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-gray-600">{error}</p>
              </div>
            )}

            {driver && (
              <div className="space-y-3 lg:space-y-4">
                {/* Photo de profil et nom */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      {driver.profilePhotoUrl ? (
                        <img
                          src={driver.profilePhotoUrl}
                          alt={`${driver.firstName} ${driver.lastName}`}
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center border-4 border-indigo-100 shadow-lg">
                          <span className="text-white text-xl lg:text-2xl font-bold">
                            {driver.firstName?.charAt(0)}{driver.lastName?.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Indicateur de disponibilité */}
                      <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                        driver.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                      }`} title={driver.isAvailable ? 'Disponible' : 'Non disponible'}>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                    {driver.firstName} {driver.lastName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {driver.experience || 'Expérience non renseignée'}
                  </p>
                </div>

                {/* Informations de base */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Type de permis</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.licenseType || 'Non renseigné'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Zone de travail</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.workZone || 'Non renseigné'}
                    </div>
                  </div>
                </div>

                {/* Informations véhicule */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Type de véhicule</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.vehicleType || 'Non renseigné'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Marque et modèle</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.vehicleBrand || 'Non renseigné'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Année</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.vehicleYear || 'Non renseigné'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Nombre de places</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.vehicleSeats || 'Non renseigné'}
                    </div>
                  </div>
                </div>

                {/* Spécialités */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Spécialités</label>
                  <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[2.5rem] flex items-center">
                    {driver.specialties && driver.specialties.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {driver.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Aucune spécialité renseignée</span>
                    )}
                  </div>
                </div>

                {/* Expérience professionnelle */}
                {driver.workExperience && driver.workExperience.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Expérience professionnelle</label>
                    <div className="space-y-2">
                      {driver.workExperience.map((exp, index) => (
                        <div key={index} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                            <h5 className="font-medium text-gray-900 text-sm lg:text-base">
                              {exp.position || 'Poste non renseigné'}
                            </h5>
                            <span className="text-xs text-gray-500 mt-1 lg:mt-0">
                              {exp.startDate && exp.endDate ? 
                                `${new Date(exp.startDate + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })} - ${new Date(exp.endDate + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}` : 
                               exp.startDate ? 
                                `Depuis ${new Date(exp.startDate + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}` : 
                               'Période non renseignée'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">{exp.company || 'Entreprise non renseignée'}</span>
                            {exp.location && ` - ${exp.location}`}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Évaluations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Note moyenne</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md flex items-center">
                      <span className="text-lg font-semibold text-gray-900 mr-2">{driver.rating || 0}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (driver.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Nombre de courses</label>
                    <div className="w-full p-2 lg:p-3 bg-gray-50 border border-gray-200 rounded-md text-sm lg:text-base">
                      {driver.totalRides || 0} courses effectuées
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleContact}
                    className="flex items-center justify-center px-6 py-2 lg:py-3 text-sm lg:text-base font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contacter
                  </button>
                  
                  <button
                    onClick={handleRecruit}
                    className="flex items-center justify-center px-6 py-2 lg:py-3 text-sm lg:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Recruter
                  </button>
                </div>
              </div>
            )}
        </div>
      </Modal>
    </>
  );
}
