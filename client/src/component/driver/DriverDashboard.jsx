import DriverStatsCards from './DriverStatsCards';

export default function DriverDashboard({ availableOffers, myApplications, activeMissions, notifications, stats, loading }) {

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre activité chauffeur</p>
      </div>

      {/* Statistiques rapides */}
      <DriverStatsCards 
        availableOffers={availableOffers}
        myApplications={myApplications}
        activeMissions={activeMissions}
        stats={stats}
        loading={loading}
      />

      {/* Offres disponibles - Section principale */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Offres disponibles</h3>
            <span className="text-sm text-gray-500">
              {availableOffers?.length || 0} offre{(availableOffers?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : availableOffers?.length > 0 ? (
            <div className="space-y-4">
              {availableOffers.slice(0, 6).map(offer => (
                <div key={offer._id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{offer.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        📍 {offer.location?.city || offer.requirements?.zone} • {offer.type}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        💼 {offer.conditions?.type || 'Conditions à négocier'}
                      </p>
                      {offer.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {offer.description.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 font-medium">
                      Postuler
                    </button>
                  </div>
                </div>
              ))}
              {availableOffers.length > 6 && (
                <div className="text-center pt-4">
                  <button className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 font-medium">
                    Voir toutes les offres ({availableOffers.length})
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Aucune offre disponible</h4>
              <p className="text-gray-500">De nouvelles offres apparaîtront bientôt</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Actualiser
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mes candidatures - Section secondaire */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Mes candidatures</h3>
        </div>
        <div className="p-6">
          {myApplications?.length > 0 ? (
            <div className="space-y-3">
              {myApplications.slice(0, 3).map(application => (
                <div key={application._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{application.offer?.title || 'Offre supprimée'}</h4>
                    <p className="text-sm text-gray-600">
                      Candidature envoyée le {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status === 'accepted' ? 'Acceptée' :
                     application.status === 'rejected' ? 'Refusée' :
                     'En attente'}
                  </span>
                </div>
              ))}
              {myApplications.length > 3 && (
                <div className="text-center pt-2">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Voir toutes mes candidatures →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">Aucune candidature envoyée</p>
              <p className="text-sm text-gray-400">Postulez aux offres ci-dessus pour commencer</p>
            </div>
          )}
        </div>
      </div>

      {/* Section masquée temporairement - Fonctionnalités avancées */}
      {false && (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">Fonctionnalités avancées temporairement indisponibles</p>
          <p className="text-sm text-gray-400 mt-1">Missions du jour, activité récente, statistiques détaillées</p>
        </div>
      )}
    </div>
  );
}
