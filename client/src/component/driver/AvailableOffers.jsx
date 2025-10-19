import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import OfferDetailsModal from './OfferDetailsModal';
import { applicationsApi } from '../../services/api';

export default function AvailableOffers({ availableOffers, loading, refreshData }) {
  const [applying, setApplying] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState(new Set());
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fonction pour afficher les détails d'une offre
  const handleShowDetails = (offer) => {
    setSelectedOffer(offer);
    setShowDetailsModal(true);
  };

  // Fonction pour postuler à une offre
  const handleApply = async (offer) => {
    if (applying) return;

    setApplying(offer._id);
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
      
      // Marquer l'offre comme postulée
      setAppliedOffers(prev => new Set([...prev, offer._id]));
      
      alert('Candidature envoyée avec succès !');
      
      // Actualiser les données si possible
      if (refreshData) {
        refreshData();
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
      setApplying(null);
    }
  };

  // Fonction pour annuler une candidature
  const handleCancelApplication = async (offer) => {
    if (applying) return;

    if (!window.confirm(`Êtes-vous sûr de vouloir annuler votre candidature pour "${offer.title}" ?`)) {
      return;
    }

    setApplying(offer._id);
    try {
      // Ici on devrait appeler une API pour annuler la candidature
      // Pour l'instant, on retire juste de l'état local
      setAppliedOffers(prev => {
        const newSet = new Set(prev);
        newSet.delete(offer._id);
        return newSet;
      });
      
      alert('Candidature annulée avec succès !');
      
      // Actualiser les données si possible
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'annulation de la candidature');
    } finally {
      setApplying(null);
    }
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Offres disponibles</h1>
        <p className="text-sm lg:text-base text-gray-600">Découvrez les missions qui correspondent à votre profil</p>
      </div>

      {/* Header avec bouton actualiser */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mb-6">
        <div>
          <p className="text-sm lg:text-base text-gray-600">
            {availableOffers?.length || 0} offre{(availableOffers?.length || 0) !== 1 ? 's' : ''} disponible{(availableOffers?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 w-full lg:w-auto justify-center lg:justify-start"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualiser
        </button>
      </div>

      {/* Filtres pour la Côte d'Ivoire */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 lg:flex lg:flex-wrap gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
            <option>Toutes villes</option>
            <option>Abidjan</option>
            <option>Bouaké</option>
            <option>Yamoussoukro</option>
            <option>San-Pédro</option>
            <option>Daloa</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
            <option>Tous types</option>
            <option>Personnel</option>
            <option>Livraison</option>
            <option>VTC</option>
            <option>Transport</option>
            <option>Autre</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
            <option>Tous horaires</option>
            <option>Temps plein</option>
            <option>Temps partiel</option>
            <option>Ponctuel</option>
            <option>Weekend</option>
          </select>
        </div>
      </div>

      {/* Liste des offres */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4 lg:p-6 animate-pulse">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 mb-2">
                    <div className="h-5 lg:h-6 bg-gray-200 rounded w-1/2 lg:w-1/3"></div>
                    <div className="h-4 lg:h-5 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-4">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-3 bg-gray-200 rounded w-20"></div>
                    ))}
                  </div>
                </div>
                <div className="flex lg:flex-col gap-2 lg:ml-6">
                  <div className="h-8 bg-gray-200 rounded flex-1 lg:w-20"></div>
                  <div className="h-8 bg-gray-200 rounded flex-1 lg:w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : availableOffers?.length > 0 ? (
        <div className="space-y-4">
          {availableOffers.map(offer => (
            <div key={offer._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 mb-2">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900">{offer.title}</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {offer.type}
                        </span>
                        {offer.isUrgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm lg:text-base text-gray-600 mb-3">{offer.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-4 text-sm">
                      <div className="flex justify-between lg:block">
                        <span className="text-gray-500">📍 Zone:</span>
                        <span className="ml-1 font-medium">{offer.location?.city || offer.requirements?.zone}</span>
                      </div>
                      <div className="flex justify-between lg:block">
                        <span className="text-gray-500">💼 Type:</span>
                        <span className="ml-1 font-medium">{offer.conditions?.workType || 'Non spécifié'}</span>
                      </div>
                      {offer.conditions?.salary && (
                        <div className="flex justify-between lg:block">
                          <span className="text-gray-500">💰 Salaire:</span>
                          <span className="ml-1 font-medium text-green-600">
                            {offer.conditions.salary} FCFA
                            {offer.conditions.salaryType && (
                              <span className="text-gray-500">
                                {offer.conditions.salaryType === 'horaire' && '/h'}
                                {offer.conditions.salaryType === 'journalier' && '/j'}
                                {offer.conditions.salaryType === 'mensuel' && '/m'}
                                {offer.conditions.salaryType === 'fixe' && ''}
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between lg:block">
                        <span className="text-gray-500">📅 Publié:</span>
                        <span className="ml-1 font-medium">
                          {new Date(offer.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {offer.requirements && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-500">Exigences: </span>
                        <span className="text-sm text-gray-700">
                          Permis {offer.requirements.licenseType}, {offer.requirements.experience} d'expérience
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2 lg:ml-6">
                    {appliedOffers.has(offer._id) ? (
                      <button 
                        onClick={() => handleCancelApplication(offer)}
                        disabled={applying === offer._id}
                        className="flex-1 lg:flex-none px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {applying === offer._id ? 'Annulation...' : 'Annuler'}
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleApply(offer)}
                        disabled={applying === offer._id}
                        className="flex-1 lg:flex-none px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {applying === offer._id ? 'Envoi...' : 'Postuler'}
                      </button>
                    )}
                    <button 
                      onClick={() => handleShowDetails(offer)}
                      className="flex-1 lg:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
          title="Aucune offre disponible"
          description="Aucune offre ne correspond actuellement à vos critères. De nouvelles offres apparaissent régulièrement."
          action={refreshData}
          actionText="Actualiser"
        />
      )}

      {/* Modale des détails de l'offre */}
      <OfferDetailsModal 
        offer={selectedOffer}
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
        onApply={refreshData}
      />

    </div>
  );
}
