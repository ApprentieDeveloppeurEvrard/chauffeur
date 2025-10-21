import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import DriverProfileModal from '../common/DriverProfileModal';

export default function DriverSearch({ availableDrivers, loading, refreshData }) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ouvrir la modal du profil
  const handleViewProfile = (driverId) => {
    setSelectedDriverId(driverId);
    setIsModalOpen(true);
  };

  // Fermer la modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriverId(null);
  };
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="mb-4 lg:mb-6">
        {/* Titre avec bouton filtres mobile */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between lg:block">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Rechercher des chauffeurs</h1>
                <p className="text-sm lg:text-base text-gray-600 lg:block hidden">Contactez directement les chauffeurs disponibles - Notre point fort !</p>
              </div>
              
              {/* Bouton filtres mobile - carré sur la même ligne */}
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="lg:hidden flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 lg:hidden mt-2">Contactez directement les chauffeurs disponibles - Notre point fort !</p>
          </div>
        </div>

        {/* Filtres et bouton actualiser qui deviennent sticky */}
        {showAdvancedFilters && (
          <div className="sticky top-16 lg:top-20 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="p-3 lg:p-4">
              {/* Version mobile - Filtres conditionnels */}
              <div className="lg:hidden space-y-3">
                {/* Filtres détaillés */}
                <div className="border border-gray-200 rounded-lg p-3 space-y-3 bg-gray-50">
                  <div className="grid grid-cols-1 gap-3">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                      <option>Toutes zones</option>
                      <option>Paris</option>
                      <option>Lyon</option>
                      <option>Marseille</option>
                      <option>Nice</option>
                    </select>
                    
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                      <option>Toute expérience</option>
                      <option>1-3 ans</option>
                      <option>3-5 ans</option>
                      <option>5+ ans</option>
                    </select>
                    
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                      <option>Tous véhicules</option>
                      <option>Berline</option>
                      <option>SUV</option>
                      <option>Utilitaire</option>
                      <option>Moto</option>
                      <option>Van</option>
                    </select>
                    
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                      <option>Toute disponibilité</option>
                      <option>Temps plein</option>
                      <option>Temps partiel</option>
                      <option>Week-ends</option>
                      <option>Ponctuel</option>
                    </select>
                  </div>
                </div>

                {/* Bouton actualiser mobile */}
                <button
                  onClick={refreshData}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {loading ? 'Actualisation...' : 'Actualiser les résultats'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Version desktop - Inchangée */}
        <div className="hidden lg:block sticky top-16 lg:top-20 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="p-3 lg:p-4">
            <div className="flex flex-row gap-4 items-center">
              {/* Filtres */}
              <div className="flex-1 grid grid-cols-4 gap-3">
                {/* Zone */}
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <option>Toutes zones</option>
                  <option>Paris</option>
                  <option>Lyon</option>
                  <option>Marseille</option>
                  <option>Nice</option>
                </select>

                {/* Expérience */}
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <option>Toute expérience</option>
                  <option>1-3 ans</option>
                  <option>3-5 ans</option>
                  <option>5+ ans</option>
                </select>

                {/* Véhicule */}
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <option>Tous véhicules</option>
                  <option>Berline</option>
                  <option>SUV</option>
                  <option>Utilitaire</option>
                  <option>Moto</option>
                  <option>Van</option>
                </select>

                {/* Disponibilité */}
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <option>Toute disponibilité</option>
                  <option>Temps plein</option>
                  <option>Temps partiel</option>
                  <option>Week-ends</option>
                  <option>Ponctuel</option>
                </select>
              </div>

              {/* Bouton actualiser desktop */}
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{loading ? 'Actualisation...' : 'Actualiser'}</span>
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
          <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
              <div 
                key={driver._id || driver.id} 
                onClick={() => handleViewProfile(driver._id || driver.id)}
                className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Figure mobile - Photo en haut pleine largeur */}
                <figure className="relative h-32 bg-gradient-to-br from-indigo-50 to-blue-100">
                  {driver.profilePhotoUrl ? (
                    <img 
                      src={driver.profilePhotoUrl} 
                      alt={`${driver.firstName} ${driver.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      driver.fullName ? 
                        (() => {
                          const names = driver.fullName.split(' ');
                          if (names.length >= 2) {
                            return `${names[0]} ${names[names.length - 1]}`;
                          }
                          return driver.fullName;
                        })() :
                        `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                    )}&background=6366f1&color=fff&size=150`} 
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
                    className="w-full h-full object-cover"
                    />
                  )}
                  {driver.lastActive === 'En ligne' && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  )}
                </figure>

                {/* Card Body mobile - Style DaisyUI */}
                <div className="card-body p-3">
                  {/* Nom et prénom complets mobile */}
                  <h2 className="card-title text-sm font-bold text-gray-900 mb-2 leading-tight">
                    {driver.fullName || `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || 'Nom non spécifié'}
                  </h2>

                  {/* Informations demandées mobile */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Exp:</span>
                      <span className="font-medium text-gray-900 truncate ml-1">{driver.experience || 'Non spécifiée'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Poste:</span>
                      <span className="font-medium text-gray-900 truncate ml-1">Chauffeur {driver.vehicleType || 'pro'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Dispo:</span>
                      <span className={`font-medium ${driver.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {driver.isAvailable ? 'Oui' : 'Non'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Version desktop */}
          <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {availableDrivers.map(driver => (
              <div 
                key={driver._id || driver.id} 
                onClick={() => handleViewProfile(driver._id || driver.id)}
                className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Figure - Photo du chauffeur en haut */}
                <figure className="relative h-48 bg-gradient-to-br from-indigo-50 to-blue-100">
                  {driver.profilePhotoUrl ? (
                    <img 
                      src={driver.profilePhotoUrl} 
                      alt={`${driver.firstName} ${driver.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      driver.fullName ? 
                        (() => {
                          const names = driver.fullName.split(' ');
                          if (names.length >= 2) {
                            return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
                          }
                          return driver.fullName;
                        })() :
                        `${driver.firstName || ''} ${driver.lastName ? driver.lastName.charAt(0) + '.' : ''}`.trim()
                    )}&background=6366f1&color=fff&size=200`} 
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
                      className="w-full h-full object-cover"
                    />
                  )}
                  {driver.lastActive === 'En ligne' && (
                    <div className="absolute top-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  )}
                </figure>

                {/* Card Body */}
                <div className="card-body p-4">
                  {/* Nom et prénom complets */}
                  <h2 className="card-title text-base font-bold text-gray-900 mb-3">
                    {driver.fullName || `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || 'Nom non spécifié'}
                  </h2>

                  {/* Informations demandées */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Expérience:</span>
                      <span className="font-medium text-gray-900">{driver.experience || 'Non spécifiée'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Poste recherché:</span>
                      <span className="font-medium text-gray-900">Chauffeur {driver.vehicleType || 'professionnel'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Disponibilité:</span>
                      <span className={`font-medium ${driver.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {driver.isAvailable ? 'Disponible' : 'Occupé'}
                      </span>
                    </div>
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

      {/* Modal de profil du chauffeur */}
      <DriverProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        driverId={selectedDriverId}
      />
    </div>
  );
}
