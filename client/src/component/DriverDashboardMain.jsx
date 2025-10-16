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

export default function DriverDashboardMain() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Utilisation du hook pour les données dynamiques
  const {
    loading,
    error,
    availableOffers,
    myApplications,
    myMissions,
    notifications,
    stats,
    refreshData,
    clearError
  } = useAppData();

  // Gestion des erreurs
  useEffect(() => {
    if (error) {
      console.error('Erreur dans le dashboard chauffeur:', error);
      // Vous pouvez ajouter ici une notification d'erreur
    }
  }, [error]);

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
            <DriverDashboard 
              availableOffers={availableOffers || []}
              myApplications={myApplications || []}
              activeMissions={myMissions || []}
              totalEarnings={totalEarnings}
              notifications={notifications || []}
              stats={stats}
              loading={loading}
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

          {/* Paramètres */}
          {activeTab === 'settings' && (
            <DriverSettings />
          )}
        </main>
      </div>
    </div>
  );
}
