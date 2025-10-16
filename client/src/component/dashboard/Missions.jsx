export default function Missions({ activeMissions }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Missions en cours</h1>
        <p className="text-gray-600">Suivi de vos chauffeurs engagés</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Contrats actifs</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {activeMissions.map(mission => (
            <div key={mission.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{mission.driver}</h4>
                  <p className="text-sm text-gray-500 mt-1">{mission.mission}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Du {mission.startDate} au {mission.endDate}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {mission.status}
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm">Contacter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
