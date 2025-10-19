import DriverStatsCards from './DriverStatsCards';

export default function DriverDashboard({ availableOffers, myApplications, activeMissions, notifications, stats, loading }) {

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-sm lg:text-base text-gray-600">Vue d'ensemble de votre activité chauffeur</p>
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
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base lg:text-lg font-medium text-gray-900">Offres disponibles</h3>
            <span className="text-sm text-gray-500">
              {availableOffers?.length || 0} offre{(availableOffers?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="p-4 lg:p-6">
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
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-base lg:text-lg font-medium text-gray-900">Mes candidatures</h3>
        </div>
        <div className="p-4 lg:p-6">
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

      {/* Mes missions - Section tertiaire */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base lg:text-lg font-medium text-gray-900">Mes missions</h3>
            <span className="text-sm text-gray-500">
              {activeMissions?.length || 0} mission{(activeMissions?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          {activeMissions?.length > 0 ? (
            <div className="space-y-3">
              {activeMissions.slice(0, 3).map(mission => (
                <div key={mission._id} className="flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{mission.title}</h4>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-sm text-gray-600">
                      <span>📍 {mission.location}</span>
                      <span>📅 {new Date(mission.startDate).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mission.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                        mission.status === 'Programmée' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {mission.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 lg:mt-0">
                    {mission.status === 'Programmée' && (
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 font-medium">
                        Démarrer
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 font-medium">
                      Détails
                    </button>
                  </div>
                </div>
              ))}
              {activeMissions.length > 3 && (
                <div className="text-center pt-2">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Voir toutes mes missions →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-gray-500">Aucune mission en cours</p>
              <p className="text-sm text-gray-400">Vos missions acceptées apparaîtront ici</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          <button className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Chercher des offres</span>
          </button>
          <button className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Mes candidatures</span>
          </button>
          <button className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Paramètres</span>
          </button>
        </div>
      </div>
    </div>
  );
}
