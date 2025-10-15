export default function DriverSearch({ availableDrivers }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rechercher des chauffeurs</h1>
        <p className="text-gray-600">Contactez directement les chauffeurs disponibles - Notre point fort !</p>
      </div>

      {/* Filtres rapides */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Toutes zones</option>
            <option>Paris</option>
            <option>Lyon</option>
            <option>Marseille</option>
            <option>Nice</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Toute expérience</option>
            <option>1-3 ans</option>
            <option>3-5 ans</option>
            <option>5+ ans</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Tous véhicules</option>
            <option>Berline</option>
            <option>SUV</option>
            <option>Utilitaire</option>
            <option>Moto</option>
            <option>Van</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Toute disponibilité</option>
            <option>Temps plein</option>
            <option>Temps partiel</option>
            <option>Week-ends</option>
            <option>Ponctuel</option>
          </select>
        </div>
      </div>

      {/* Cards des chauffeurs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {availableDrivers.map(driver => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-64">
            {/* Header de la card */}
            <div className="relative p-3 pb-2">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <img 
                    src={driver.photo} 
                    alt={driver.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {driver.lastActive === 'En ligne' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-bold text-gray-900 truncate">{driver.name}</h3>
                  <div className="flex items-center justify-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-2.5 h-2.5 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs font-medium text-gray-700">{driver.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations principales */}
            <div className="px-3 pb-2">
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Exp:</span>
                  <span className="font-semibold text-gray-900">{driver.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Zone:</span>
                  <span className="font-semibold text-gray-900">{driver.zone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Dispo:</span>
                  <span className="font-semibold text-gray-900 text-right text-xs">{driver.availability}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Véhicule:</span>
                  <span className="font-semibold text-gray-900">{driver.vehicle}</span>
                </div>
              </div>
            </div>

            {/* Statut */}
            <div className="px-3 pb-2 text-center">
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                driver.lastActive === 'En ligne' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {driver.lastActive}
              </span>
            </div>

            {/* Spécialités */}
            <div className="px-3 pb-2">
              <div className="flex justify-center">
                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                  {driver.specialties[0]}
                </span>
              </div>
            </div>

            {/* Footer avec contact */}
            <div className="bg-gray-50 px-3 py-2 mt-auto">
              <div className="flex space-x-1">
                <button 
                  onClick={() => window.open(`tel:${driver.phone}`)}
                  className="flex-1 bg-indigo-600 text-white py-1.5 px-2 rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
                >
                  📞 Appeler
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-2 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
                  Profil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
