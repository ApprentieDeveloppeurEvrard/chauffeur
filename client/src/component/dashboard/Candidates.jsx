export default function Candidates() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidatures reçues</h1>
        <p className="text-gray-600">Consultez les profils des chauffeurs intéressés</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Nouveaux candidats</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 20v-2a7 7 0 017-7h1m7 0a7 7 0 717 7v2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune candidature pour le moment</h3>
            <p className="mt-1 text-sm text-gray-500">Les candidatures apparaîtront ici une fois que des chauffeurs postuleront à vos offres.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
