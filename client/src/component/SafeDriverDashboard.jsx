import { useState, useEffect } from 'react';
import useAppData from '../hooks/useAppData';

// Import des composants du dashboard chauffeur
import DriverHeader from './driver/DriverHeader';
import DriverSidebar from './driver/DriverSidebar';
import DriverDashboard from './driver/DriverDashboard';
import AvailableOffers from './driver/AvailableOffers';
import MyApplications from './driver/MyApplications';
import DriverMissions from './driver/DriverMissions';
import DriverPayments from './driver/DriverPayments';
import DriverNotifications from './driver/DriverNotifications';
import DriverSettings from './driver/DriverSettings';

export default function SafeDriverDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  
  // Utilisation du hook pour les données dynamiques avec gestion d'erreur
  const hookData = useAppData();

  const {
    loading,
    error: hookError,
    availableOffers,
    myApplications,
    myMissions,
    notifications,
    stats,
    refreshData,
    clearError
  } = hookData;


  // Gestion des erreurs
  useEffect(() => {
    if (hookError) {
      console.error('Erreur dans le dashboard chauffeur:', hookError);
      setError(hookError);
    }
  }, [hookError]);

  // Calcul des revenus totaux depuis les stats
  const totalEarnings = stats?.summary?.totalEarnings || 0;

  // Données de paiements depuis les missions
  const payments = myMissions?.filter(mission => mission.status === 'completed').map(mission => ({
    id: mission._id,
    missionTitle: mission.title,
    missionType: mission.type,
    employer: mission.employer?.firstName + ' ' + mission.employer?.lastName,
    date: new Date(mission.completedAt || mission.createdAt).toLocaleDateString(),
    amount: mission.payment,
    status: mission.paymentStatus || 'pending'
  })) || [];

  // Si erreur critique, afficher un écran d'erreur
  if (error || hookError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Erreur Dashboard Chauffeur</h2>
            <p className="text-sm text-gray-600 mb-4">{error || hookError}</p>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  setError(null);
                  clearError();
                  window.location.reload();
                }}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Recharger la page
              </button>
              <button 
                onClick={() => {
                  console.log('=== DEBUG INFO ===');
                  console.log('Error:', error || hookError);
                  console.log('Loading:', loading);
                  console.log('Available Offers:', availableOffers);
                  console.log('My Applications:', myApplications);
                  console.log('My Missions:', myMissions);
                  console.log('Notifications:', notifications);
                  console.log('Stats:', stats);
                  console.log('==================');
                }}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Afficher debug dans console
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DriverHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications || []}
        onNotificationClick={() => setActiveTab('notifications')}
        loading={loading}
      />

      <div className="flex pt-20">
        {/* Sidebar */}
        <DriverSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          availableOffers={availableOffers || []}
          myApplications={myApplications || []}
          activeMissions={myMissions || []}
          notifications={notifications || []}
        />

        {/* Contenu principal */}
        <main className="flex-1 ml-64 p-6">
          {/* Dashboard - Vue d'ensemble */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Test simple d'abord */}
              <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
                <p className="text-gray-600">Vue d'ensemble de votre activité chauffeur</p>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Offres disponibles</p>
                      <p className="text-2xl font-semibold text-gray-900">{availableOffers?.length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Candidatures envoyées</p>
                      <p className="text-2xl font-semibold text-gray-900">{myApplications?.length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Missions actives</p>
                      <p className="text-2xl font-semibold text-gray-900">{myMissions?.filter(m => m.status === 'active').length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Revenus ce mois</p>
                      <p className="text-2xl font-semibold text-gray-900">{totalEarnings || 0}€</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message d'information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-blue-900">Bienvenue sur votre tableau de bord !</h3>
                    <p className="text-blue-700 mt-1">
                      Votre profil est en cours de validation. Une fois approuvé, vous pourrez voir et postuler aux offres disponibles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Offres disponibles */}
          {activeTab === 'available-offers' && (
            <AvailableOffers 
              availableOffers={availableOffers || []} 
              loading={loading}
              refreshData={refreshData}
            />
          )}

          {/* Mes candidatures */}
          {activeTab === 'my-applications' && (
            <MyApplications 
              myApplications={myApplications || []} 
              loading={loading}
            />
          )}

          {/* Mes missions */}
          {activeTab === 'missions' && (
            <DriverMissions 
              activeMissions={myMissions || []} 
              loading={loading}
            />
          )}

          {/* Paiements & Revenus */}
          {activeTab === 'payments' && (
            <DriverPayments 
              payments={payments}
              totalEarnings={totalEarnings}
              loading={loading}
            />
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <DriverNotifications 
              notifications={notifications || []} 
              loading={loading}
              onMarkAsRead={clearError}
            />
          )}

          {/* Paramètres */}
          {activeTab === 'settings' && (
            <DriverSettings />
          )}
        </main>
      </div>
    </div>
  );
}
