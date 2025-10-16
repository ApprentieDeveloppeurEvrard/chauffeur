export default function Settings() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="space-y-6">
        {/* Informations du compte */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Informations du compte</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Informations de base */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Informations de base</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise *</label>
                  <input
                    type="text"
                    defaultValue="Mon Entreprise SARL"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Forme juridique</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>SARL</option>
                    <option>SAS</option>
                    <option>SA</option>
                    <option>EURL</option>
                    <option>SNC</option>
                    <option>Auto-entrepreneur</option>
                    <option>Association</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SIRET</label>
                  <input
                    type="text"
                    placeholder="12345678901234"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Transport de personnes</option>
                    <option>Livraison</option>
                    <option>Logistique</option>
                    <option>E-commerce</option>
                    <option>Services à la personne</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Informations de contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email principal *</label>
                  <input
                    type="email"
                    defaultValue="contact@monentreprise.fr"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    defaultValue="01 23 45 67 89"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du contact</label>
                  <input
                    type="text"
                    placeholder="Jean Dupont"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fonction du contact</label>
                  <input
                    type="text"
                    placeholder="Directeur RH"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Adresse de l'entreprise</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                  <input
                    type="text"
                    placeholder="123 Rue de la République"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                  <input
                    type="text"
                    placeholder="75001"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                  <input
                    type="text"
                    placeholder="Paris"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>France</option>
                    <option>Belgique</option>
                    <option>Suisse</option>
                    <option>Luxembourg</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zone d'activité principale</label>
                  <input
                    type="text"
                    placeholder="Île-de-France"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Description de l'entreprise</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Présentation</label>
                <textarea
                  rows="4"
                  placeholder="Décrivez votre entreprise, vos activités principales, vos valeurs..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
            </div>

            {/* Besoins en chauffeurs */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Besoins en chauffeurs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Types de missions habituelles</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">Transport de personnes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">Livraison</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">VTC</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">Déménagement</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fréquence des besoins</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Occasionnel</option>
                    <option>Régulier</option>
                    <option>Permanent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Annuler
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
