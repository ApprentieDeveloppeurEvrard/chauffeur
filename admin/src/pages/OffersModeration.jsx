import { useState, useEffect } from 'react'
import { apiService } from '../services/api'
import { Briefcase, MapPin, DollarSign, Calendar, Flag, CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

const OffersModeration = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    flagged: '',
    page: 1,
    limit: 20
  })
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchOffers()
  }, [filters])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      const response = await apiService.getAdminOffers(filters)
      setOffers(response.data.offers)
      setPagination(response.data.pagination)
    } catch (error) {
      toast.error('Erreur lors du chargement des offres')
    } finally {
      setLoading(false)
    }
  }

  const handleModeration = async (offerId, action, reason = '') => {
    try {
      await apiService.moderateOffer(offerId, { action, reason })
      toast.success(`Offre ${action === 'approve' ? 'approuvée' : action === 'reject' ? 'rejetée' : 'signalée'} avec succès`)
      fetchOffers()
      setSelectedOffer(null)
    } catch (error) {
      toast.error('Erreur lors de la modération')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      draft: { color: 'bg-gray-100 text-gray-800', text: 'Brouillon' },
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      paused: { color: 'bg-yellow-100 text-yellow-800', text: 'En pause' },
      closed: { color: 'bg-red-100 text-red-800', text: 'Fermée' },
      completed: { color: 'bg-blue-100 text-blue-800', text: 'Terminée' }
    }
    
    const badge = badges[status] || badges.draft
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    )
  }

  const getWorkTypeBadge = (workType) => {
    const badges = {
      temps_plein: { color: 'bg-blue-100 text-blue-800', text: 'Temps plein' },
      temps_partiel: { color: 'bg-purple-100 text-purple-800', text: 'Temps partiel' },
      ponctuel: { color: 'bg-orange-100 text-orange-800', text: 'Ponctuel' },
      weekend: { color: 'bg-pink-100 text-pink-800', text: 'Weekend' }
    }
    
    const badge = badges[workType] || { color: 'bg-gray-100 text-gray-800', text: workType }
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    )
  }

  const OfferModal = ({ offer, onClose }) => {
    const [reason, setReason] = useState('')
    const [actionLoading, setActionLoading] = useState(false)

    const handleAction = async (action) => {
      setActionLoading(true)
      await handleModeration(offer._id, action, reason)
      setActionLoading(false)
      onClose()
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Détails de l'Offre</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* En-tête de l'offre */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{offer.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  {getStatusBadge(offer.status)}
                  {offer.isFlagged && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <Flag className="w-3 h-3 mr-1" />
                      Signalée
                    </span>
                  )}
                  {offer.isUrgent && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Urgent
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Publiée le</p>
                <p className="font-medium">{new Date(offer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Informations de l'employeur */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Employeur</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span className="font-medium">Nom:</span> {offer.employerId?.firstName} {offer.employerId?.lastName}</p>
                <p><span className="font-medium">Email:</span> {offer.employerId?.email}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{offer.description}</p>
            </div>

            {/* Détails de l'offre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Informations générales</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Type:</span> {offer.type}</p>
                  <p><span className="font-medium">Type de travail:</span> {getWorkTypeBadge(offer.conditions?.workType)}</p>
                  <p><span className="font-medium">Date de début:</span> {new Date(offer.conditions?.startDate).toLocaleDateString()}</p>
                  {offer.conditions?.endDate && (
                    <p><span className="font-medium">Date de fin:</span> {new Date(offer.conditions.endDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Rémunération</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Salaire:</span> {offer.conditions?.salary}€</p>
                  <p><span className="font-medium">Type:</span> {offer.conditions?.salaryType}</p>
                  {offer.conditions?.schedule && (
                    <p><span className="font-medium">Horaires:</span> {offer.conditions.schedule}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Localisation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span className="font-medium">Ville:</span> {offer.location?.city}</p>
                {offer.location?.address && (
                  <p><span className="font-medium">Adresse:</span> {offer.location.address}</p>
                )}
              </div>
            </div>

            {/* Exigences */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Exigences</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p><span className="font-medium">Permis:</span> {offer.requirements?.licenseType}</p>
                <p><span className="font-medium">Expérience:</span> {offer.requirements?.experience}</p>
                <p><span className="font-medium">Type de véhicule:</span> {offer.requirements?.vehicleType}</p>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{offer.applicationCount || 0}</p>
                <p className="text-sm text-blue-800">Candidatures</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{offer.maxApplications || 0}</p>
                <p className="text-sm text-green-800">Max candidatures</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">{offer.tags?.length || 0}</p>
                <p className="text-sm text-purple-800">Tags</p>
              </div>
            </div>

            {/* Tags */}
            {offer.tags && offer.tags.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {offer.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions de modération */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commentaire de modération
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Ajoutez un commentaire sur votre action de modération..."
                />
              </div>
              
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => handleAction('flag')}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Flag className="w-4 h-4" />
                  Signaler
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Rejeter
                </button>
                <button
                  onClick={() => handleAction('approve')}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approuver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modération des Offres</h1>
          <p className="text-gray-600">Surveillez et modérez les offres d'emploi</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="active">Active</option>
            <option value="paused">En pause</option>
            <option value="closed">Fermée</option>
            <option value="completed">Terminée</option>
          </select>
          
          <select
            value={filters.flagged}
            onChange={(e) => setFilters({ ...filters, flagged: e.target.value, page: 1 })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les offres</option>
            <option value="true">Signalées uniquement</option>
            <option value="false">Non signalées</option>
          </select>
        </div>
      </div>

      {/* Offers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : offers.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune offre trouvée</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employeur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type / Salaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidatures
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {offers.map((offer) => (
                  <tr key={offer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {offer.isFlagged && <Flag className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />}
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {offer.title}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {offer.location?.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {offer.employerId?.firstName} {offer.employerId?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{offer.employerId?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{offer.type}</div>
                      <div className="text-sm text-gray-500">
                        {offer.conditions?.salary}€ / {offer.conditions?.salaryType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-lg font-bold text-blue-600">
                        {offer.applicationCount || 0}
                      </span>
                      <div className="text-xs text-gray-500">
                        / {offer.maxApplications}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(offer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(offer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleModeration(offer._id, 'flag')}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleModeration(offer._id, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleModeration(offer._id, 'reject')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page {pagination.current} sur {pagination.pages} ({pagination.total} offres)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page <= 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page >= pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  )
}

export default OffersModeration
