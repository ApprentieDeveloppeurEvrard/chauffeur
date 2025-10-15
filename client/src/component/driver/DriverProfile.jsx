export default function DriverProfile() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mon profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
      </div>

      <div className="space-y-6">
        {/* Photo et informations de base */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                  alt="Photo de profil"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">Jean Dupont</h4>
                <p className="text-gray-600">Chauffeur professionnel</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">4.8 (24 avis)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  defaultValue="Jean"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  defaultValue="Dupont"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  defaultValue="jean.dupont@email.com"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input
                  type="tel"
                  defaultValue="06 12 34 56 78"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Permis et documents */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Permis et documents</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de permis *</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" required>
                  <option>Permis B</option>
                  <option>Permis B + Formation 7h</option>
                  <option>Permis C</option>
                  <option>Permis D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date d'obtention *</label>
                <input
                  type="date"
                  defaultValue="2018-03-15"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de permis</label>
                <input
                  type="text"
                  placeholder="123456789"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carte professionnelle VTC</label>
                <input
                  type="text"
                  placeholder="Numéro de carte VTC (optionnel)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Véhicule */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Mon véhicule</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de véhicule *</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" required>
                  <option>Berline</option>
                  <option>SUV</option>
                  <option>Utilitaire</option>
                  <option>Moto</option>
                  <option>Van</option>
                  <option>Camion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marque et modèle</label>
                <input
                  type="text"
                  placeholder="Ex: Peugeot 508"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
                <input
                  type="number"
                  placeholder="2020"
                  min="1990"
                  max="2024"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de places</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option>2 places</option>
                  <option>4 places</option>
                  <option>5 places</option>
                  <option>7 places</option>
                  <option>9 places</option>
                  <option>Plus de 9 places</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Expérience et disponibilités */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Expérience et disponibilités</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Années d'expérience *</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" required>
                  <option>Moins d'1 an</option>
                  <option>1-3 ans</option>
                  <option>3-5 ans</option>
                  <option>5-10 ans</option>
                  <option>Plus de 10 ans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone de travail préférée</label>
                <input
                  type="text"
                  placeholder="Ex: Paris et banlieue"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Spécialités</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Transport personnel', 'Livraison', 'VTC', 'Déménagement', 'Transport groupe', 'Longue distance'].map((specialty) => (
                  <label key={specialty} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="ml-2 text-sm text-gray-600">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Annuler
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
