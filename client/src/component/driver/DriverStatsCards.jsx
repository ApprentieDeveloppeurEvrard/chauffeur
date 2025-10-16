export default function DriverStatsCards({ availableOffers, myApplications, activeMissions, stats, loading }) {
  const statsCards = [
    {
      title: 'Offres disponibles',
      value: loading ? '...' : (availableOffers?.length || 0),
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Candidatures envoyées',
      value: loading ? '...' : (stats?.applications?.total || myApplications?.length || 0),
      icon: (
        <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Missions actives',
      value: loading ? '...' : (activeMissions?.filter(m => m.status === 'active').length || 0),
      icon: (
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      bgColor: 'bg-green-100'
    },
    {
      title: 'Profil complété',
      value: loading ? '...' : (stats?.profile?.completionRate ? `${stats.profile.completionRate}%` : '85%'),
      icon: (
        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 ${stat.bgColor} rounded-lg`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mt-1"></div>
              ) : (
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
