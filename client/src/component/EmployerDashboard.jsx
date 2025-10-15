import { useState } from 'react';

// Import des composants du dashboard
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';
import Dashboard from './dashboard/Dashboard';
import DriverSearch from './dashboard/DriverSearch';
import MyOffers from './dashboard/MyOffers';
import Candidates from './dashboard/Candidates';
import Missions from './dashboard/Missions';
import Settings from './dashboard/Settings';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Données simulées
  const [myOffers] = useState([
    { id: 1, title: "Chauffeur personnel pour 1 mois", type: "Personnel", status: "active", candidates: 12, created: "2024-10-10" },
    { id: 2, title: "Chauffeur-livreur avec moto", type: "Livraison", status: "active", candidates: 8, created: "2024-10-08" },
    { id: 3, title: "Chauffeur VTC week-ends", type: "VTC", status: "paused", candidates: 5, created: "2024-10-05" }
  ]);

  const [activeMissions] = useState([
    { id: 1, driver: "Pierre Martin", mission: "Chauffeur personnel", startDate: "2024-10-01", endDate: "2024-10-31", status: "En cours" },
    { id: 2, driver: "Marie Dubois", mission: "Livraisons quotidiennes", startDate: "2024-09-15", endDate: "2024-11-15", status: "En cours" }
  ]);

  const [notifications] = useState([
    { id: 1, type: "new_candidate", message: "Nouveau candidat pour 'Chauffeur personnel'", time: "Il y a 2h", unread: true },
    { id: 2, type: "mission_ending", message: "Mission avec Pierre Martin se termine dans 3 jours", time: "Il y a 4h", unread: true },
    { id: 3, type: "document_expired", message: "Permis de Marie Dubois expire bientôt", time: "Hier", unread: false }
  ]);

  // Liste des chauffeurs disponibles
  const [availableDrivers] = useState([
    { 
      id: 1, 
      name: "Jean Dupont", 
      experience: "5+ ans", 
      zone: "Paris", 
      availability: "Temps plein", 
      vehicle: "Berline", 
      rating: 4.8, 
      phone: "06 12 34 56 78",
      specialties: ["VTC", "Transport personnel"],
      lastActive: "En ligne",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 2, 
      name: "Marie Martin", 
      experience: "3-5 ans", 
      zone: "Lyon", 
      availability: "Temps partiel", 
      vehicle: "Utilitaire", 
      rating: 4.9, 
      phone: "06 98 76 54 32",
      specialties: ["Livraison", "Transport marchandises"],
      lastActive: "Il y a 1h",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 3, 
      name: "Ahmed Ben Ali", 
      experience: "1-3 ans", 
      zone: "Marseille", 
      availability: "Week-ends", 
      vehicle: "Moto", 
      rating: 4.6, 
      phone: "06 55 44 33 22",
      specialties: ["Livraison rapide", "Coursier"],
      lastActive: "En ligne",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 4, 
      name: "Sophie Leroy", 
      experience: "5+ ans", 
      zone: "Paris", 
      availability: "Temps plein", 
      vehicle: "SUV", 
      rating: 4.7, 
      phone: "06 11 22 33 44",
      specialties: ["Transport familial", "Longue distance"],
      lastActive: "Il y a 30min",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 5, 
      name: "Carlos Rodriguez", 
      experience: "3-5 ans", 
      zone: "Nice", 
      availability: "Ponctuel", 
      vehicle: "Van", 
      rating: 4.5, 
      phone: "06 77 88 99 00",
      specialties: ["Déménagement", "Transport groupe"],
      lastActive: "Il y a 2h",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
      />

      <div className="flex pt-20">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          myOffers={myOffers}
          availableDrivers={availableDrivers}
          activeMissions={activeMissions}
        />

        {/* Contenu principal */}
        <main className="flex-1 ml-64 p-6">
          {/* Dashboard - Vue d'ensemble */}
          {activeTab === 'dashboard' && (
            <Dashboard 
              myOffers={myOffers}
              activeMissions={activeMissions}
              notifications={notifications}
            />
          )}

          {/* Rechercher des chauffeurs */}
          {activeTab === 'search-drivers' && (
            <DriverSearch availableDrivers={availableDrivers} />
          )}

          {/* Mes annonces */}
          {activeTab === 'my-offers' && (
            <MyOffers 
              myOffers={myOffers}
              showCreateForm={showCreateForm}
              setShowCreateForm={setShowCreateForm}
            />
          )}

          {/* Candidatures reçues */}
          {activeTab === 'candidates' && (
            <Candidates />
          )}

          {/* Missions en cours */}
          {activeTab === 'missions' && (
            <Missions activeMissions={activeMissions} />
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
