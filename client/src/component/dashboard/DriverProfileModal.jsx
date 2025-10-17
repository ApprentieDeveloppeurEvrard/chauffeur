import Modal from '../common/Modal';

export default function DriverProfileModal({ isOpen, onClose, application }) {
  if (!application || !application.driver) return null;

  const { driver, offer, message, createdAt, status } = application;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profil du chauffeur"
      size="lg"
    >
      <div className="space-y-6">
        {/* Informations personnelles */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Informations personnelles
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Prénom</label>
              <p className="text-gray-900 font-medium">{driver.firstName || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nom</label>
              <p className="text-gray-900 font-medium">{driver.lastName || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <p className="text-gray-900 font-medium">{driver.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Téléphone</label>
              <p className="text-gray-900 font-medium">{driver.phone || 'Non renseigné'}</p>
            </div>
          </div>
        </div>

        {/* Informations sur la candidature */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Détails de la candidature
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Offre</label>
              <p className="text-gray-900 font-medium">{offer?.title || 'Offre non disponible'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Statut</label>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(status)}`}>
                  {getStatusText(status)}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date de candidature</label>
                <p className="text-gray-900 font-medium">
                  {new Date(createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {offer?.location && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Lieu de mission</label>
                <p className="text-gray-900 font-medium">
                  {offer.location.city}
                  {offer.location.address && `, ${offer.location.address}`}
                </p>
              </div>
            )}

            {offer?.salary && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Salaire proposé</label>
                <p className="text-gray-900 font-medium">{offer.salary}€</p>
              </div>
            )}
          </div>
        </div>

        {/* Message du candidat */}
        {message && (
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Message du candidat
            </h4>
            <div className="bg-white rounded-md p-3 border border-green-200">
              <p className="text-gray-700 leading-relaxed">{message}</p>
            </div>
          </div>
        )}

        {/* Informations supplémentaires du chauffeur */}
        {(driver.experience || driver.licenseType || driver.availability) && (
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informations professionnelles
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {driver.experience && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Expérience</label>
                  <p className="text-gray-900 font-medium">{driver.experience}</p>
                </div>
              )}
              {driver.licenseType && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Type de permis</label>
                  <p className="text-gray-900 font-medium">{driver.licenseType}</p>
                </div>
              )}
              {driver.availability && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Disponibilité</label>
                  <p className="text-gray-900 font-medium">{driver.availability}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Fermer
        </button>
        {driver.email && (
          <a
            href={`mailto:${driver.email}?subject=Concernant votre candidature - ${offer?.title}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contacter par email
          </a>
        )}
        {driver.phone && (
          <a
            href={`tel:${driver.phone}`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Appeler
          </a>
        )}
      </div>
    </Modal>
  );
}
