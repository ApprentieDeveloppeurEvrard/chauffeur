import { useState } from 'react';

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
  
  // Données simulées pour le chauffeur
  const [availableOffers] = useState([
    { 
      id: 1, 
      title: "Chauffeur personnel pour événement", 
      type: "Personnel", 
      zone: "Paris", 
      duration: "1 jour",
      salary: "200€/jour",
      description: "Transport pour événement d'entreprise, véhicule haut de gamme requis",
      requirements: "Permis B, tenue correcte exigée",
      publishedDate: "Il y a 2h",
      urgent: true
    },
    { 
      id: 2, 
      title: "Livraisons express centre-ville", 
      type: "Livraison", 
      zone: "Lyon", 
      duration: "1 semaine",
      salary: "15€/h",
      description: "Livraisons rapides en centre-ville avec moto ou scooter",
      requirements: "Permis A ou B, véhicule 2 roues",
      publishedDate: "Il y a 4h"
    },
    { 
      id: 3, 
      title: "Chauffeur VTC week-ends", 
      type: "VTC", 
      zone: "Marseille", 
      duration: "Permanent",
      salary: "Selon courses",
      description: "Missions VTC les week-ends, clientèle aéroport principalement",
      requirements: "Carte VTC, véhicule récent",
      publishedDate: "Hier"
    }
  ]);

  const [myApplications] = useState([
    {
      id: 1,
      jobTitle: "Transport personnel VIP",
      company: "Luxury Services SARL",
      zone: "Paris",
      type: "Personnel",
      salary: "250€/jour",
      status: "pending",
      appliedDate: "Il y a 3 jours",
      message: null
    },
    {
      id: 2,
      jobTitle: "Livraisons quotidiennes",
      company: "Express Delivery",
      zone: "Lyon",
      type: "Livraison",
      salary: "18€/h",
      status: "accepted",
      appliedDate: "Il y a 1 semaine",
      message: "Félicitations ! Votre candidature a été retenue. Rendez-vous lundi 9h."
    },
    {
      id: 3,
      jobTitle: "Chauffeur événementiel",
      company: "Events & Co",
      zone: "Nice",
      type: "Événementiel",
      salary: "180€/jour",
      status: "rejected",
      appliedDate: "Il y a 2 semaines",
      message: "Merci pour votre candidature. Nous avons choisi un autre profil."
    }
  ]);

  const [activeMissions] = useState([
    {
      id: 1,
      title: "Transport personnel - M. Dubois",
      company: "Luxury Services SARL",
      date: "2024-10-15",
      time: "14h00 - 18h00",
      startLocation: "Hôtel Plaza, Paris 8e",
      endLocation: "Aéroport CDG Terminal 2E",
      payment: "250€",
      status: "Programmée",
      contact: {
        name: "Marie Martin",
        phone: "06 12 34 56 78"
      },
      notes: "Client VIP, ponctualité exigée. Véhicule propre obligatoire."
    },
    {
      id: 2,
      title: "Livraisons express",
      company: "Express Delivery",
      date: "2024-10-15",
      time: "09h00 - 17h00",
      startLocation: "Entrepôt Lyon Sud",
      endLocation: "Centre-ville Lyon",
      payment: "144€",
      status: "En cours",
      contact: {
        name: "Pierre Durand",
        phone: "04 78 90 12 34"
      }
    }
  ]);

  const [payments] = useState([
    {
      id: 1,
      missionTitle: "Transport VIP",
      missionType: "Personnel",
      employer: "Luxury Services",
      date: "2024-10-10",
      amount: 250,
      status: "paid"
    },
    {
      id: 2,
      missionTitle: "Livraisons express",
      missionType: "Livraison",
      employer: "Express Delivery",
      date: "2024-10-08",
      amount: 144,
      status: "pending"
    },
    {
      id: 3,
      missionTitle: "Déménagement",
      missionType: "Transport",
      employer: "Move & Co",
      date: "2024-10-05",
      amount: 180,
      status: "paid"
    }
  ]);

  const [notifications] = useState([
    { 
      id: 1, 
      type: "new_offer", 
      title: "Nouvelle offre disponible",
      message: "Une nouvelle offre correspond à votre profil : 'Chauffeur personnel Paris'", 
      time: "Il y a 1h", 
      unread: true,
      action: "Voir l'offre"
    },
    { 
      id: 2, 
      type: "payment_received", 
      title: "Paiement reçu",
      message: "Vous avez reçu 250€ pour la mission 'Transport VIP'", 
      time: "Il y a 3h", 
      unread: true,
      action: "Voir le détail"
    },
    { 
      id: 3, 
      type: "profile_validation", 
      title: "Profil validé",
      message: "Votre profil chauffeur a été validé avec succès", 
      time: "Hier", 
      unread: false
    },
    { 
      id: 4, 
      type: "mission_update", 
      title: "Mission modifiée",
      message: "L'horaire de votre mission du 15/10 a été modifié", 
      time: "Il y a 2 jours", 
      unread: false,
      action: "Voir les détails"
    }
  ]);

  const totalEarnings = 1850; // Revenus du mois

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DriverHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        onNotificationClick={() => setActiveTab('notifications')}
      />

      <div className="flex pt-20">
        {/* Sidebar */}
        <DriverSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          availableOffers={availableOffers}
          myApplications={myApplications}
          activeMissions={activeMissions}
          notifications={notifications}
        />

        {/* Contenu principal */}
        <main className="flex-1 ml-64 p-6">
          {/* Dashboard - Vue d'ensemble */}
          {activeTab === 'dashboard' && (
            <DriverDashboard 
              availableOffers={availableOffers}
              myApplications={myApplications}
              activeMissions={activeMissions}
              totalEarnings={totalEarnings}
              notifications={notifications}
            />
          )}

          {/* Offres disponibles */}
          {activeTab === 'available-offers' && (
            <AvailableOffers availableOffers={availableOffers} />
          )}

          {/* Mes candidatures */}
          {activeTab === 'my-applications' && (
            <MyApplications myApplications={myApplications} />
          )}

          {/* Mes missions */}
          {activeTab === 'missions' && (
            <DriverMissions activeMissions={activeMissions} />
          )}

          {/* Paiements & Revenus */}
          {activeTab === 'payments' && (
            <DriverPayments 
              payments={payments}
              totalEarnings={totalEarnings}
            />
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <DriverNotifications notifications={notifications} />
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
