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
import DriverProfile from './driver/DriverProfile';
import MobileBottomNav from './mobile/MobileBottomNav';

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

  // Fonction pour gérer le clic sur le logo
  const handleLogoClick = () => {
    setActiveTab('dashboard');
  };

  // Fonctions pour gérer les clics du menu avatar
  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DriverHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications || []}
        onNotificationClick={() => setActiveTab('notifications')}
        onLogoClick={handleLogoClick}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
        loading={loading}
      />

      <div className="flex pt-20">
        {/* Sidebar - Desktop uniquement */}
        <div className="hidden lg:block">
          <DriverSidebar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            availableOffers={availableOffers || []}
            myApplications={myApplications || []}
            activeMissions={myMissions || []}
            notifications={notifications || []}
          />
        </div>

        {/* Contenu principal */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 pb-32 lg:pb-6">
          {/* Dashboard - Vue d'ensemble */}
          {activeTab === 'dashboard' && (
            <DriverDashboard 
              availableOffers={availableOffers || []}
              myApplications={myApplications || []}
              activeMissions={myMissions?.filter(m => m.status === 'active') || []}
              notifications={notifications || []}
              stats={stats}
              loading={loading}
              onTabChange={setActiveTab}
            />
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

          {/* Profil */}
          {activeTab === 'profile' && (
            <DriverProfile />
          )}

          {/* Paramètres */}
          {activeTab === 'settings' && (
            <DriverSettings />
          )}
        </main>
      </div>

      {/* Navigation mobile */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole="driver"
        menuItems={[
          {
            id: 'dashboard',
            label: 'Tableau de bord',
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
            )
          },
          {
            id: 'available-offers',
            label: 'Offres disponibles',
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ),
            badge: availableOffers?.length || 0
          },
          {
            id: 'my-applications',
            label: 'Mes candidatures',
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
            badge: myApplications?.filter(app => app.status === 'pending').length || 0
          },
          {
            id: 'missions',
            label: 'Missions',
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            ),
            badge: myMissions?.filter(m => m.status === 'active').length || 0
          }
        ]}
      />

    </div>
  );
}
