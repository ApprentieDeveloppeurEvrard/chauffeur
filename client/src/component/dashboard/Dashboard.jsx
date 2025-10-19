import StatsCards from './StatsCards';
import ActivityFeed from './ActivityFeed';

export default function Dashboard({ myOffers, activeMissions, notifications, receivedApplications }) {
  return (
    <div className="space-y-4 lg:space-y-6">

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
