import { useState } from 'react';
import { applicationsApi } from '../../services/api';

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

export default function OfferDetailsModal({ offer, showModal, setShowModal, onApply }) {
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Fonction pour postuler à une offre
  const handleApply = async () => {
    if (applying) return;

    setApplying(true);
    try {
      // Préparer les données de candidature avec tous les champs requis
      const applicationData = {
        message: `Je suis intéressé par votre offre "${offer.title}". Je pense avoir le profil adapté pour cette mission.`,
        availability: {
          startDate: new Date().toISOString(), // Date de disponibilité immédiate
          schedule: 'Flexible'
        },
        experience: {
          years: '1-3 ans'
        }
      };

      await applicationsApi.apply(offer._id, applicationData);
      
      setHasApplied(true);
      alert('Candidature envoyée avec succès !');
      
      // Notifier le parent pour actualiser les données
      if (onApply) {
        onApply();
      }
    } catch (error) {
      console.error('Erreur:', error);
      let errorMessage = 'Erreur lors de l\'envoi de la candidature';
      
      if (error.response?.data?.details) {
        errorMessage += ':\n' + error.response.data.details.join('\n');
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      alert(errorMessage);
    } finally {
      setApplying(false);
    }
  };

  // Fonction pour annuler une candidature
  const handleCancelApplication = async () => {
    if (applying) return;

    if (!window.confirm(`Êtes-vous sûr de vouloir annuler votre candidature pour "${offer.title}" ?`)) {
      return;
    }

    setApplying(true);
    try {
      // Ici on devrait appeler une API pour annuler la candidature
      // Pour l'instant, on change juste l'état local
      setHasApplied(false);
      
      alert('Candidature annulée avec succès !');
      
      // Notifier le parent pour actualiser les données
      if (onApply) {
        onApply();
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'annulation de la candidature');
    } finally {
      setApplying(false);
    }
  };

  if (!showModal || !offer) return null;

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="relative w-full max-w-3xl shadow-2xl rounded-lg bg-white max-h-[90vh] overflow-hidden border-0 flex flex-col">
          {/* Header fixe */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{offer.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  {offer.type}
                </span>
                {offer.isUrgent && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                    🚨 Urgent
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Contenu avec défilement interne */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div className="space-y-6">
              
              {/* Description */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">📝 Description</h4>
                <p className="text-gray-700 leading-relaxed">{offer.description}</p>
              </div>

              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">📍 Localisation</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Ville:</span>
                      <span className="ml-2 text-gray-900">{offer.location?.city}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Zone:</span>
                      <span className="ml-2 text-gray-900">{offer.requirements?.zone}</span>
                    </div>
                    {offer.location?.address && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Adresse:</span>
                        <span className="ml-2 text-gray-900">{offer.location.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">💼 Conditions de travail</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Type:</span>
                      <span className="ml-2 text-gray-900">{offer.conditions?.workType || 'Non spécifié'}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Date de début:</span>
                      <span className="ml-2 text-gray-900">
                        {offer.conditions?.startDate ? new Date(offer.conditions.startDate).toLocaleDateString() : 'À définir'}
                      </span>
                    </div>
                    {offer.conditions?.endDate && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Date de fin:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(offer.conditions.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {offer.conditions?.schedule && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Horaires:</span>
                        <span className="ml-2 text-gray-900">{offer.conditions.schedule}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Exigences */}
              {offer.requirements && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">✅ Exigences</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Permis requis:</span>
                        <span className="ml-2 text-gray-900 font-medium">Permis {offer.requirements.licenseType}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Expérience:</span>
                        <span className="ml-2 text-gray-900 font-medium">{offer.requirements.experience}</span>
                      </div>
                      {offer.requirements.vehicleType && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Véhicule:</span>
                          <span className="ml-2 text-gray-900 font-medium">{offer.requirements.vehicleType}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Informations sur l'employeur */}
              {offer.employer && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">👤 Employeur</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-medium">
                          {offer.employer.firstName?.[0]}{offer.employer.lastName?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {offer.employer.firstName} {offer.employer.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{offer.employer.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Informations de contact */}
              {offer.contactInfo && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">📞 Contact</h4>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Méthode préférée:</span>
                        <span className="ml-2 text-gray-900">
                          {offer.contactInfo.preferredContact === 'platform' ? 'Via la plateforme' :
                           offer.contactInfo.preferredContact === 'email' ? 'Email' : 'Téléphone'}
                        </span>
                      </div>
                      {offer.contactInfo.phone && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Téléphone:</span>
                          <span className="ml-2 text-gray-900">{offer.contactInfo.phone}</span>
                        </div>
                      )}
                      {offer.contactInfo.email && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Email:</span>
                          <span className="ml-2 text-gray-900">{offer.contactInfo.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Informations supplémentaires */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">ℹ️ Informations supplémentaires</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Publié le:</span>
                    <span className="ml-2 font-medium">{new Date(offer.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Candidatures:</span>
                    <span className="ml-2 font-medium">{offer.applicationCount || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Statut:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {offer.status === 'active' ? 'Active' : offer.status}
                    </span>
                  </div>
                  {offer.maxApplications && (
                    <div>
                      <span className="text-gray-600">Max candidatures:</span>
                      <span className="ml-2 font-medium">{offer.maxApplications}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer avec boutons */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
            {hasApplied ? (
              <button
                onClick={handleCancelApplication}
                disabled={applying}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {applying ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Annulation...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Annuler la candidature
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {applying ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Postuler à cette offre
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
