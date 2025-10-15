import DriverStatsCards from './DriverStatsCards';

export default function DriverDashboard({ availableOffers, myApplications, activeMissions, totalEarnings, notifications }) {
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
        totalEarnings={totalEarnings}
      />

      {/* Missions du jour */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Missions d'aujourd'hui</h3>
          </div>
          <div className="p-6">
            {activeMissions?.filter(mission => mission.date === new Date().toISOString().split('T')[0]).length > 0 ? (
              <div className="space-y-4">
                {activeMissions.filter(mission => mission.date === new Date().toISOString().split('T')[0]).map(mission => (
                  <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{mission.title}</h4>
                        <p className="text-sm text-gray-600">{mission.time}</p>
                        <p className="text-sm text-gray-500">{mission.startLocation} → {mission.endLocation}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        mission.status === 'En cours' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {mission.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-gray-500">Aucune mission aujourd'hui</p>
                <p className="text-sm text-gray-400">Profitez de votre journée libre !</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Nouvelles offres</h3>
          </div>
          <div className="p-6">
            {availableOffers?.slice(0, 3).length > 0 ? (
              <div className="space-y-4">
                {availableOffers.slice(0, 3).map(offer => (
                  <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{offer.title}</h4>
                        <p className="text-sm text-gray-600">{offer.zone} • {offer.type}</p>
                        <p className="text-sm text-green-600 font-medium">{offer.salary}</p>
                      </div>
                      <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700">
                        Voir
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Voir toutes les offres →
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500">Aucune nouvelle offre</p>
                <p className="text-sm text-gray-400">De nouvelles offres apparaîtront bientôt</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Activité récente</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {notifications?.slice(0, 5).map(notif => (
              <div key={notif.id} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <p className="text-sm text-gray-600 flex-1">{notif.message}</p>
                <span className="text-xs text-gray-400">{notif.time}</span>
              </div>
            )) || (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
                </svg>
                <p className="text-gray-500">Aucune activité récente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
