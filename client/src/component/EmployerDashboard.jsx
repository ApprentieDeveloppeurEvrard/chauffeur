import { useState, useEffect } from 'react';
import useAppData from '../hooks/useAppData';

// Import des composants du dashboard
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';
import Dashboard from './dashboard/Dashboard';
import DriverSearch from './dashboard/DriverSearch';
import MyOffers from './dashboard/MyOffers';
import Candidates from './dashboard/Candidates';
import Missions from './dashboard/Missions';
import Settings from './dashboard/Settings';
import Notifications from './dashboard/Notifications';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Utilisation du hook pour les données dynamiques
  const {
    loading,
    error,
    drivers: availableDrivers,
    myOffers,
    receivedApplications,
    myMissions,
    notifications,
    stats,
    refreshData,
    clearError
  } = useAppData();

  // Gestion des erreurs
  useEffect(() => {
    if (error) {
      console.error('Erreur dans le dashboard:', error);
      // Vous pouvez ajouter ici une notification d'erreur
    }
  }, [error]);

  // Fonction appelée après création d'une offre
  const handleOfferCreated = (newOffer) => {
    console.log('Nouvelle offre créée:', newOffer);
    // Actualiser les données
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications || []}
        onNotificationClick={() => setActiveTab('notifications')}
        loading={loading}
      />

      <div className="flex pt-20">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          myOffers={myOffers || []}
          availableDrivers={availableDrivers || []}
          activeMissions={myMissions || []}
          receivedApplications={receivedApplications || []}
        />

        {/* Contenu principal */}
        <main className="flex-1 ml-64 p-6">
          {/* Dashboard - Vue d'ensemble */}
          {activeTab === 'dashboard' && (
            <Dashboard 
              myOffers={myOffers || []}
              activeMissions={myMissions || []}
              notifications={notifications || []}
              receivedApplications={receivedApplications || []}
              stats={stats}
              loading={loading}
            />
          )}

          {/* Rechercher des chauffeurs */}
          {activeTab === 'search-drivers' && (
            <DriverSearch 
              availableDrivers={availableDrivers || []} 
              loading={loading}
              refreshData={refreshData}
            />
          )}

          {/* Mes annonces */}
          {activeTab === 'my-offers' && (
            <MyOffers 
              myOffers={myOffers || []}
              showCreateForm={showCreateForm}
              setShowCreateForm={setShowCreateForm}
              onOfferCreated={handleOfferCreated}
              loading={loading}
              refreshData={refreshData}
            />
          )}

          {/* Candidatures reçues */}
          {activeTab === 'candidates' && (
            <Candidates 
              receivedApplications={receivedApplications || []}
              loading={loading}
              refreshData={refreshData}
            />
          )}

          {/* Missions en cours */}
          {activeTab === 'missions' && (
            <Missions activeMissions={myMissions || []} loading={loading} />
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Notifications 
              notifications={notifications || []} 
              loading={loading}
              onMarkAsRead={clearError}
            />
          )}

          {/* Paramètres */}
          {activeTab === 'settings' && (
            <Settings />
          )}
        </main>
      </div>
    </div>
  );
}
