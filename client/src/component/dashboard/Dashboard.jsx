import StatsCards from './StatsCards';
import ActivityFeed from './ActivityFeed';

export default function Dashboard({ myOffers, activeMissions, notifications, receivedApplications }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre activité employeur</p>
      </div>

      {/* Statistiques rapides */}
      <StatsCards 
        myOffers={myOffers}
        activeMissions={activeMissions}
        notifications={notifications}
        receivedApplications={receivedApplications}
      />

      {/* Activité récente */}
      <ActivityFeed notifications={notifications} />
    </div>
  );
}
