import { useState } from 'react';
import { applicationsApi } from '../../services/api';

export default function Candidates({ receivedApplications, loading, refreshData }) {
  const [processingApplication, setProcessingApplication] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Acceptée';
      case 'rejected':
        return 'Refusée';
      default:
        return 'Inconnu';
    }
  };

  const handleApplicationAction = async (applicationId, action) => {
    if (processingApplication) return;

    console.log('Action candidature:', { applicationId, action });

    const actionText = action === 'accepted' ? 'accepter' : 'refuser';
    if (!window.confirm(`Êtes-vous sûr de vouloir ${actionText} cette candidature ?`)) {
      return;
    }

    setProcessingApplication(applicationId);
    try {
      console.log('Envoi de la requête API...');
      const response = await applicationsApi.updateStatus(applicationId, action);
      console.log('Réponse API:', response);
      
      if (refreshData) {
        refreshData();
      }
      
      alert(`Candidature ${action === 'accepted' ? 'acceptée' : 'refusée'} avec succès !`);
    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Réponse d\'erreur:', error.response?.data);
      
      let errorMessage = `Erreur lors de la ${action === 'accepted' ? 'acceptation' : 'refus'} de la candidature`;
      
      if (error.response?.data?.error) {
        errorMessage += ': ' + error.response.data.error;
      }
      
      alert(errorMessage);
    } finally {
      setProcessingApplication(null);
    }
  };

  // Fonction pour voir le profil d'un chauffeur
  const handleViewProfile = (application) => {
    console.log('Voir profil:', application);
    
    // Pour l'instant, affichons les informations dans une alerte
    // Plus tard, on pourra ouvrir une modale avec le profil complet
    const driver = application.driver;
    const profileInfo = `
Profil du chauffeur:
- Nom: ${driver?.firstName} ${driver?.lastName}
- Email: ${driver?.email}
- Téléphone: ${driver?.phone || 'Non renseigné'}
- Candidature pour: ${application.offer?.title}
- Message: ${application.message || 'Aucun message'}
- Date de candidature: ${new Date(application.createdAt).toLocaleDateString()}
    `;
    
    alert(profileInfo);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidatures reçues</h1>
        <p className="text-gray-600">Consultez les profils des chauffeurs intéressés</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">En attente</p>
              {loading ? (
                <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
              ) : (
                <p className="text-lg font-semibold text-gray-900">
                  {receivedApplications?.filter(app => app.status === 'pending').length || 0}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Acceptées</p>
              {loading ? (
                <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
              ) : (
                <p className="text-lg font-semibold text-gray-900">
                  {receivedApplications?.filter(app => app.status === 'accepted').length || 0}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Refusées</p>
              {loading ? (
                <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
              ) : (
                <p className="text-lg font-semibold text-gray-900">
                  {receivedApplications?.filter(app => app.status === 'rejected').length || 0}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Liste des candidatures */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-3 bg-gray-200 rounded w-16"></div>
                    ))}
                  </div>
                </div>
                <div className="ml-6 flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : receivedApplications?.length > 0 ? (
        <div className="space-y-4">
          {receivedApplications.map(application => {
            console.log('Application data:', application);
            return (
            <div key={application._id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.driver?.firstName} {application.driver?.lastName}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      Candidature pour: <span className="font-medium">{application.offer?.title}</span>
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">📧 Email:</span>
                        <span className="ml-1 font-medium">{application.driver?.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">📱 Téléphone:</span>
                        <span className="ml-1 font-medium">{application.driver?.phone || 'Non renseigné'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">📍 Zone:</span>
                        <span className="ml-1 font-medium">{application.offer?.location?.city}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">📅 Postulé:</span>
                        <span className="ml-1 font-medium">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {application.message && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Message du candidat: </span>
                          {application.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-col gap-2">
                    {application.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApplicationAction(application._id, 'accepted')}
                          disabled={processingApplication === application._id}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {processingApplication === application._id ? 'Traitement...' : 'Accepter'}
                        </button>
                        <button 
                          onClick={() => handleApplicationAction(application._id, 'rejected')}
                          disabled={processingApplication === application._id}
                          className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {processingApplication === application._id ? 'Traitement...' : 'Refuser'}
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleViewProfile(application)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Voir profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 20v-2a7 7 0 017-7h1m7 0a7 7 0 717 7v2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune candidature pour le moment</h3>
              <p className="mt-1 text-sm text-gray-500">Les candidatures apparaîtront ici une fois que des chauffeurs postuleront à vos offres.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
