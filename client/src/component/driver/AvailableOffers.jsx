export default function AvailableOffers({ availableOffers }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Offres disponibles</h1>
        <p className="text-gray-600">Découvrez les missions qui correspondent à votre profil</p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
            <option>Toutes zones</option>
            <option>Paris</option>
            <option>Lyon</option>
            <option>Marseille</option>
            <option>Nice</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
            <option>Tous types</option>
            <option>Transport personnel</option>
            <option>Livraison</option>
            <option>VTC</option>
            <option>Déménagement</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
            <option>Toute durée</option>
            <option>Mission ponctuelle</option>
            <option>1 semaine</option>
            <option>1 mois</option>
            <option>Permanent</option>
          </select>
        </div>
      </div>

      {/* Liste des offres */}
      <div className="space-y-4">
        {availableOffers.map(offer => (
          <div key={offer.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {offer.type}
                    </span>
                    {offer.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{offer.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Zone:</span>
                      <span className="ml-1 font-medium">{offer.zone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Durée:</span>
                      <span className="ml-1 font-medium">{offer.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rémunération:</span>
                      <span className="ml-1 font-medium text-green-600">{offer.salary}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Publié:</span>
                      <span className="ml-1 font-medium">{offer.publishedDate}</span>
                    </div>
                  </div>

                  {offer.requirements && (
                    <div className="mt-3">
                      <span className="text-sm text-gray-500">Exigences: </span>
                      <span className="text-sm text-gray-700">{offer.requirements}</span>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Postuler
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {availableOffers.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune offre disponible</h3>
          <p className="text-gray-600">Aucune offre ne correspond actuellement à vos critères. Revenez plus tard ou modifiez vos filtres.</p>
        </div>
      )}
    </div>
  );
}
