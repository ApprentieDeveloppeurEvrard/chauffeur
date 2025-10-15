export default function DriverNotifications({ notifications }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_offer':
        return (
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        );
      case 'profile_validation':
        return (
          <div className="p-2 bg-green-100 rounded-lg">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'payment_received':
        return (
          <div className="p-2 bg-purple-100 rounded-lg">
            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      case 'mission_update':
        return (
          <div className="p-2 bg-yellow-100 rounded-lg">
            <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-lg">
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Restez informé des nouvelles offres, validations et paiements</p>
      </div>

      {/* Paramètres de notifications */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Paramètres de notification</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Nouvelles offres</h4>
                <p className="text-sm text-gray-500">Recevoir des notifications pour les nouvelles offres correspondant à votre profil</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Validation de profil</h4>
                <p className="text-sm text-gray-500">Notifications concernant la validation de vos documents</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Paiements reçus</h4>
                <p className="text-sm text-gray-500">Confirmation de réception des paiements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Mises à jour de missions</h4>
                <p className="text-sm text-gray-500">Changements dans vos missions acceptées</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des notifications */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Notifications récentes</h3>
            <button className="text-sm text-green-600 hover:text-green-700">
              Marquer toutes comme lues
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications?.map(notification => (
            <div key={notification.id} className={`p-6 ${notification.unread ? 'bg-green-50' : 'bg-white'}`}>
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  {notification.action && (
                    <div className="mt-3">
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        {notification.action}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) || (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
              <p className="text-gray-600">Vous êtes à jour ! Les nouvelles notifications apparaîtront ici.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
