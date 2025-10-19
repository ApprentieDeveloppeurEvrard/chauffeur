import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

export default function DriverSearch({ availableDrivers, loading, refreshData }) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="mb-4 lg:mb-6">
        {/* Titre qui disparaît au scroll */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Rechercher des chauffeurs</h1>
            <p className="text-sm lg:text-base text-gray-600">Contactez directement les chauffeurs disponibles - Notre point fort !</p>
          </div>
        </div>

        {/* Filtres et bouton actualiser qui deviennent sticky */}
        <div className="sticky top-16 lg:top-20 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="p-3 lg:p-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
              {/* Filtres */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                {/* Zone */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none lg:hidden">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <select className="w-full pl-9 lg:pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                    <option>Toutes zones</option>
                    <option>Paris</option>
                    <option>Lyon</option>
                    <option>Marseille</option>
                    <option>Nice</option>
                  </select>
                </div>

                {/* Expérience */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none lg:hidden">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <select className="w-full pl-9 lg:pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                    <option>Toute expérience</option>
                    <option>1-3 ans</option>
                    <option>3-5 ans</option>
                    <option>5+ ans</option>
                  </select>
                </div>

                {/* Véhicule */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none lg:hidden">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <select className="w-full pl-9 lg:pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                    <option>Tous véhicules</option>
                    <option>Berline</option>
                    <option>SUV</option>
                    <option>Utilitaire</option>
                    <option>Moto</option>
                    <option>Van</option>
                  </select>
                </div>

                {/* Disponibilité */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none lg:hidden">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <select className="w-full pl-9 lg:pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                    <option>Toute disponibilité</option>
                    <option>Temps plein</option>
                    <option>Temps partiel</option>
                    <option>Week-ends</option>
                    <option>Ponctuel</option>
                  </select>
                </div>
              </div>

              {/* Bouton actualiser */}
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full lg:w-auto"
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden lg:inline">{loading ? 'Actualisation...' : 'Actualiser'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards des chauffeurs */}
      {loading ? (
        <>
          {/* Version mobile skeleton */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card bg-white shadow-sm animate-pulse">
                {/* Figure skeleton mobile */}
                <figure className="px-2 pt-2">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                </figure>

                {/* Card Body skeleton mobile */}
                <div className="card-body p-2">
                  {/* Title skeleton */}
                  <div className="flex flex-col items-center gap-1 mb-2">
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    <div className="w-12 h-3 bg-gray-200 rounded-full"></div>
                  </div>

                  {/* Rating skeleton */}
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(j => (
                        <div key={j} className="w-2.5 h-2.5 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Description skeleton */}
                  <div className="space-y-1 mb-2 text-xs">
                    {[1, 2].map(j => (
                      <div key={j} className="flex justify-between">
                        <div className="w-8 h-2 bg-gray-200 rounded"></div>
                        <div className="w-12 h-2 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Actions skeleton */}
                  <div className="w-full h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Version desktop skeleton */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="card bg-white shadow-sm animate-pulse">
                {/* Figure skeleton */}
                <figure className="px-4 pt-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                </figure>

                {/* Card Body skeleton */}
                <div className="card-body p-4">
                  {/* Title skeleton */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-32 h-5 bg-gray-200 rounded"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
                  </div>

                  {/* Rating skeleton */}
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(j => (
                        <div key={j} className="w-4 h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="w-8 h-3 bg-gray-200 rounded ml-2"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="space-y-2 mb-4">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="flex justify-between">
                        <div className="w-16 h-3 bg-gray-200 rounded"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Actions skeleton */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                      <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : availableDrivers?.length > 0 ? (
        <>
          {/* Version mobile */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            {availableDrivers.map(driver => (
              <div key={driver._id || driver.id} className="card bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                {/* Figure mobile - Photo plus petite */}
                <figure className="px-2 pt-2">
                  <div className="relative">
                    <img 
                      src={driver.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        driver.fullName ? 
                          (() => {
                            const names = driver.fullName.split(' ');
                            if (names.length >= 2) {
                              return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                            }
                            return driver.fullName;
                          })() :
                          `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                      )}&background=6366f1&color=fff`} 
                      alt={driver.fullName ? 
                        (() => {
                          const names = driver.fullName.split(' ');
                          if (names.length >= 2) {
                            return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                          }
                          return driver.fullName;
                        })() :
                        `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                      }
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mx-auto"
                    />
                    {driver.lastActive === 'En ligne' && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                </figure>

                {/* Card Body mobile - Plus compact */}
                <div className="card-body p-2">
                  {/* Card Title mobile */}
                  <div className="text-center mb-2">
                    <h2 className="text-sm font-bold text-gray-900 leading-tight">
                      {driver.fullName ? 
                        (() => {
                          const names = driver.fullName.split(' ');
                          if (names.length >= 2) {
                            return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                          }
                          return driver.fullName;
                        })() :
                        `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                      }
                    </h2>
                    <div className={`badge badge-xs ${driver.isAvailable ? 'badge-success' : 'badge-neutral'} mt-1`}>
                      {driver.isAvailable ? 'Dispo' : 'Occupé'}
                    </div>
                  </div>

                  {/* Rating mobile */}
                  <div className="flex items-center justify-center mb-2">
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

                  {/* Infos essentielles mobile */}
                  <div className="space-y-1 text-xs text-gray-600 mb-2">
                    <div className="flex justify-between">
                      <span>Exp:</span>
                      <span className="font-medium text-gray-900 truncate ml-1">{driver.experience || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zone:</span>
                      <span className="font-medium text-gray-900 truncate ml-1">{driver.workZone || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Bouton mobile */}
                  <button className="btn btn-primary btn-xs w-full">
                    Profil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Version desktop */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableDrivers.map(driver => (
              <div key={driver._id || driver.id} className="card bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                {/* Figure - Photo du chauffeur */}
                <figure className="px-4 pt-4">
                  <div className="relative">
                    <img 
                      src={driver.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        driver.fullName ? 
                          (() => {
                            const names = driver.fullName.split(' ');
                            if (names.length >= 2) {
                              return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                            }
                            return driver.fullName;
                          })() :
                          `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                      )}&background=6366f1&color=fff`} 
                      alt={driver.fullName ? 
                        (() => {
                          const names = driver.fullName.split(' ');
                          if (names.length >= 2) {
                            return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                          }
                          return driver.fullName;
                        })() :
                        `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                      }
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                    />
                    {driver.lastActive === 'En ligne' && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                </figure>

                {/* Card Body */}
                <div className="card-body p-4">
                  {/* Card Title avec badge */}
                  <h2 className="card-title text-lg font-bold text-gray-900 justify-center text-center">
                    {driver.fullName ? 
                      (() => {
                        const names = driver.fullName.split(' ');
                        if (names.length >= 2) {
                          return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                        }
                        return driver.fullName;
                      })() :
                      `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                    }
                    <div className={`badge ${driver.isAvailable ? 'badge-success' : 'badge-neutral'} text-xs`}>
                      {driver.isAvailable ? 'Disponible' : 'Occupé'}
                    </div>
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">{driver.rating}</span>
                    </div>
                  </div>

                  {/* Description - Informations du chauffeur */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Expérience:</span>
                      <span className="font-medium text-gray-900">{driver.experience || 'Non spécifié'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zone:</span>
                      <span className="font-medium text-gray-900">{driver.workZone || 'Non spécifié'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Véhicule:</span>
                      <span className="font-medium text-gray-900">{driver.vehicleType || 'Non spécifié'}</span>
                    </div>
                  </div>

                  {/* Card Actions - Badges et bouton */}
                  <div className="card-actions justify-between items-center">
                    <div className="flex gap-2">
                      <div className="badge badge-outline text-xs">
                        {driver.specialties?.[0] || 'Généraliste'}
                      </div>
                      <div className="badge badge-outline text-xs">
                        {driver.vehicleType || 'Standard'}
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-sm">
                      Voir le profil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
        
        
      ) : (
        <EmptyState
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.196-2.196m0 0A3 3 0 0112 15.464m0 0V9a3 3 0 116 0v6.464m0 0a3 3 0 01-5.196 2.196M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          title="Aucun chauffeur disponible"
          description="Il n'y a actuellement aucun chauffeur inscrit sur la plateforme. Les chauffeurs apparaîtront ici une fois qu'ils se seront inscrits."
        />
      )}
    </div>
  );
}
