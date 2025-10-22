import DriverStatsCards from './DriverStatsCards';

export default function DriverDashboard({ availableOffers, myApplications, activeMissions, notifications, stats, loading, onTabChange }) {

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
            <p className="text-sm lg:text-base text-gray-600">Gérez votre activité de chauffeur professionnel</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">En ligne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <DriverStatsCards 
        availableOffers={availableOffers}
        myApplications={myApplications}
        activeMissions={activeMissions}
        stats={stats}
        loading={loading}
      />

      {/* Course en cours */}
      {activeMissions?.find(m => m.status === 'En cours') && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg mb-6 text-white">
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Course en cours</h3>
                <p className="text-blue-100 mb-1">
                  Destination: {activeMissions.find(m => m.status === 'En cours')?.destination}
                </p>
                <p className="text-blue-100">
                  Durée estimée: {activeMissions.find(m => m.status === 'En cours')?.estimatedDuration || '25 min'}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 font-medium">
                  Contacter client
                </button>
                <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 font-medium">
                  Terminer course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Offres disponibles et Mes candidatures - Côte à côte sur PC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Offres disponibles */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-medium text-gray-900">Offres disponibles</h3>
              <button 
                onClick={() => onTabChange && onTabChange('available-offers')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir tout →
              </button>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
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
                {availableOffers.slice(0, 2).map(offer => (
                  <div key={offer._id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{offer.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {offer.location?.city || offer.requirements?.zone} • {offer.type}
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                          {offer.conditions?.type || 'Conditions à négocier'}
                        </p>
                        {offer.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {offer.description.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                      <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 font-medium">
                        Postuler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500">Aucune offre disponible</p>
                <p className="text-sm text-gray-400">De nouvelles offres apparaîtront bientôt</p>
              </div>
            )}
          </div>
        </div>

        {/* Mes candidatures */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-medium text-gray-900">Mes candidatures</h3>
              <button 
                onClick={() => onTabChange && onTabChange('my-applications')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir tout →
              </button>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            {myApplications?.length > 0 ? (
              <div className="space-y-3">
                {myApplications.slice(0, 2).map(application => (
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
        
      </div>


      {/* Actions rapides */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4">
          <button 
            className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Démarrer service</span>
          </button>
          <button 
            onClick={() => onTabChange && onTabChange('available-offers')}
            className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Chercher courses</span>
          </button>
          <button 
            onClick={() => onTabChange && onTabChange('payments')}
            className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Mes gains</span>
          </button>
          <button 
            className="flex items-center justify-center p-3 lg:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Statistiques</span>
          </button>
        </div>
      </div>
    </div>
  );
}
