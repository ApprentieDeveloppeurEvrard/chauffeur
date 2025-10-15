export default function MyApplications({ myApplications }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Acceptée';
      case 'rejected':
        return 'Refusée';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mes candidatures</h1>
        <p className="text-gray-600">Suivez l'état de vos candidatures envoyées</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-lg font-semibold text-gray-900">
                {myApplications.filter(app => app.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Acceptées</p>
              <p className="text-lg font-semibold text-gray-900">
                {myApplications.filter(app => app.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Refusées</p>
              <p className="text-lg font-semibold text-gray-900">
                {myApplications.filter(app => app.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="space-y-4">
        {myApplications.map(application => (
          <div key={application.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{application.company}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Zone:</span>
                      <span className="ml-1 font-medium">{application.zone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-1 font-medium">{application.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Candidature:</span>
                      <span className="ml-1 font-medium">{application.appliedDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rémunération:</span>
                      <span className="ml-1 font-medium text-green-600">{application.salary}</span>
                    </div>
                  </div>

                  {application.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Message de l'employeur: </span>
                        {application.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  {application.status === 'pending' && (
                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors">
                      Annuler
                    </button>
                  )}
                  {application.status === 'accepted' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Voir mission
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {myApplications.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune candidature envoyée</h3>
          <p className="text-gray-600">Vous n'avez pas encore postulé à des offres. Consultez les offres disponibles pour commencer.</p>
        </div>
      )}
    </div>
  );
}
