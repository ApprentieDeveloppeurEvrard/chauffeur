export default function MyOffers({ myOffers, showCreateForm, setShowCreateForm }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mes annonces</h1>
        <p className="text-gray-600">Gérez vos offres d'emploi et créez de nouvelles annonces</p>
      </div>

      {/* Modale de création d'offre */}
      {showCreateForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center overflow-y-auto h-full w-full z-50">
          <div className="relative p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-lg bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Créer une nouvelle offre</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'offre *</label>
                  <input
                    type="text"
                    placeholder="Ex: Chauffeur personnel pour missions ponctuelles"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de mission *</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                      <option value="">Sélectionner un type</option>
                      <option value="personnel">Transport personnel</option>
                      <option value="livraison">Livraison</option>
                      <option value="vtc">VTC</option>
                      <option value="demenagement">Déménagement</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durée *</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                      <option value="">Sélectionner une durée</option>
                      <option value="ponctuel">Mission ponctuelle</option>
                      <option value="semaine">1 semaine</option>
                      <option value="mois">1 mois</option>
                      <option value="trimestre">3 mois</option>
                      <option value="permanent">Permanent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    rows="4"
                    placeholder="Décrivez la mission, les horaires, les exigences..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zone géographique *</label>
                    <input
                      type="text"
                      placeholder="Ex: Paris, Lyon, Marseille..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rémunération</label>
                    <input
                      type="text"
                      placeholder="Ex: 15€/h, 2000€/mois..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exigences</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">Permis B obligatoire</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">Véhicule personnel requis</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">Expérience professionnelle</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Publier l'offre
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Liste des offres */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Offres publiées</h3>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Nouvelle offre
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {myOffers.map(offer => (
            <div key={offer.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{offer.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">Type: {offer.type} • Créée le {offer.created}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {offer.status === 'active' ? 'Active' : 'En pause'}
                    </span>
                    <span className="text-sm text-gray-600">{offer.candidates} candidatures</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* Bouton Modifier */}
                  <button 
                    className="group flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 rounded-lg border border-indigo-200 hover:border-indigo-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md w-full sm:w-24 min-w-0"
                    title="Modifier cette annonce"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="hidden sm:inline truncate">Modifier</span>
                  </button>

                  {/* Bouton Suspendre/Activer */}
                  <button 
                    className={`group flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md w-full sm:w-24 min-w-0 ${
                      offer.status === 'active' 
                        ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 hover:text-yellow-800 border-yellow-200 hover:border-yellow-300' 
                        : 'bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border-green-200 hover:border-green-300'
                    }`}
                    title={offer.status === 'active' ? 'Suspendre cette annonce' : 'Activer cette annonce'}
                  >
                    {offer.status === 'active' ? (
                      <>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="hidden sm:inline truncate">Suspendre</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 5a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        <span className="hidden sm:inline truncate">Activer</span>
                      </>
                    )}
                  </button>

                  {/* Bouton Supprimer */}
                  <button 
                    className="group flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md w-full sm:w-24 min-w-0"
                    title="Supprimer définitivement cette annonce"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.')) {
                        // Logique de suppression ici
                        console.log('Suppression de l\'annonce', offer.id);
                      }
                    }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline truncate">Supprimer</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
