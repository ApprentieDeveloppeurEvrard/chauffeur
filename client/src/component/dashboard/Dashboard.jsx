import StatsCards from './StatsCards';
import ActivityFeed from './ActivityFeed';

export default function Dashboard({ myOffers, activeMissions, notifications, receivedApplications, loading, onTabChange }) {
  return (
    <div className="space-y-4 lg:space-y-6">

      {/* Statistiques rapides */}
      <StatsCards 
        myOffers={myOffers}
        activeMissions={activeMissions}
        notifications={notifications}
        receivedApplications={receivedApplications}
        loading={loading}
      />

      {/* Mes annonces et Candidatures - Côte à côte sur PC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Mes annonces */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-medium text-gray-900">Mes annonces</h3>
              <button 
                onClick={() => onTabChange && onTabChange('my-offers')}
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
            ) : myOffers?.length > 0 ? (
              <div className="space-y-4">
                {myOffers.slice(0, 2).map(offer => (
                  <div key={offer._id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{offer.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {offer.location?.city || offer.requirements?.zone} • {offer.type}
                        </p>
                        <p className="text-sm text-indigo-600 font-medium">
                          {offer.conditions?.type || 'Conditions à négocier'}
                        </p>
                        {offer.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {offer.description.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                      <button className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 font-medium">
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">Aucune annonce publiée</p>
                <p className="text-sm text-gray-400">Créez votre première annonce pour commencer</p>
              </div>
            )}
          </div>
        </div>

        {/* Candidatures reçues */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-medium text-gray-900">Candidatures reçues</h3>
              <button 
                onClick={() => onTabChange && onTabChange('candidates')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir tout →
              </button>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            {receivedApplications?.length > 0 ? (
              <div className="space-y-3">
                {receivedApplications.slice(0, 2).map(application => (
                  <div key={application._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{application.driver?.firstName} {application.driver?.lastName}</h4>
                      <p className="text-sm text-gray-600">
                        Candidature pour: {application.offer?.title || 'Offre supprimée'}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 20v-2a7 7 0 017-7h1m7 0a7 7 0 017 7v2" />
                </svg>
                <p className="text-gray-500">Aucune candidature reçue</p>
                <p className="text-sm text-gray-400">Les candidatures apparaîtront ici</p>
              </div>
            )}
          </div>
        </div>
        
      </div>

      {/* Activité récente */}
      <ActivityFeed notifications={notifications} />
    </div>
  );
}
