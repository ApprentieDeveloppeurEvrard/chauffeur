import { useState, useEffect } from 'react'
import { apiService } from '../services/api'
import { User, Car, FileText, Calendar, MapPin, Star, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

const DriversValidation = () => {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [filters, setFilters] = useState({
    status: 'pending',
    page: 1,
    limit: 20
  })
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchDrivers()
  }, [filters])

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      const response = await apiService.getAdminDrivers(filters)
      setDrivers(response.data.drivers)
      setPagination(response.data.pagination)
    } catch (error) {
      toast.error('Erreur lors du chargement des chauffeurs')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (driverId, status, reason = '') => {
    try {
      await apiService.updateDriverStatus(driverId, { status, reason })
      toast.success(`Chauffeur ${status === 'approved' ? 'approuvé' : 'rejeté'} avec succès`)
      fetchDrivers()
      setSelectedDriver(null)
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'En attente' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Approuvé' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rejeté' },
      suspended: { color: 'bg-gray-100 text-gray-800', icon: AlertTriangle, text: 'Suspendu' }
    }
    
    const badge = badges[status] || badges.pending
    const Icon = badge.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </span>
    )
  }

  const DriverModal = ({ driver, onClose }) => {
    const [reason, setReason] = useState('')
    const [actionLoading, setActionLoading] = useState(false)

    const handleAction = async (status) => {
      setActionLoading(true)
      await handleStatusUpdate(driver._id, status, reason)
      setActionLoading(false)
      onClose()
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Validation du Chauffeur</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informations Personnelles
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Nom:</span> {driver.firstName} {driver.lastName}</p>
                  <p><span className="font-medium">Email:</span> {driver.email}</p>
                  <p><span className="font-medium">Téléphone:</span> {driver.phone}</p>
                  <p><span className="font-medium">Statut:</span> {getStatusBadge(driver.status)}</p>
                  <p><span className="font-medium">Inscrit le:</span> {new Date(driver.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Permis de Conduire
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Type:</span> {driver.licenseType}</p>
                  <p><span className="font-medium">Numéro:</span> {driver.licenseNumber || 'Non renseigné'}</p>
                  <p><span className="font-medium">Date d'obtention:</span> {new Date(driver.licenseDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Carte VTC:</span> {driver.vtcCard || 'Non renseigné'}</p>
                  <p><span className="font-medium">Expérience:</span> {driver.experience} ans</p>
                </div>
              </div>
            </div>

            {/* Véhicule */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Car className="w-5 h-5" />
                Véhicule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p><span className="font-medium">Type:</span> {driver.vehicleType}</p>
                <p><span className="font-medium">Marque:</span> {driver.vehicleBrand || 'Non renseigné'}</p>
                <p><span className="font-medium">Modèle:</span> {driver.vehicleModel || 'Non renseigné'}</p>
                <p><span className="font-medium">Année:</span> {driver.vehicleYear || 'Non renseigné'}</p>
                <p><span className="font-medium">Places:</span> {driver.vehicleSeats || 'Non renseigné'}</p>
              </div>
            </div>

            {/* Zone de travail et spécialités */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Zone de Travail
                </h3>
                <p>{driver.workZone || 'Non renseigné'}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Spécialités</h3>
                <div className="flex flex-wrap gap-2">
                  {driver.specialties?.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {specialty.replace('_', ' ')}
                    </span>
                  )) || <span className="text-gray-500">Aucune spécialité</span>}
                </div>
              </div>
            </div>

            {/* Documents */}
            {driver.documents && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documents</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(driver.documents).map(([key, url]) => (
                    url && (
                      <div key={key} className="border rounded-lg p-3">
                        <p className="text-sm font-medium mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <a 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Voir le document
                        </a>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold">{driver.rating || 0}</p>
                <p className="text-sm text-gray-600">Note moyenne</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{driver.totalRides || 0}</p>
                <p className="text-sm text-gray-600">Trajets effectués</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold">{driver.totalEarnings?.toFixed(2) || 0}€</span>
                <p className="text-sm text-gray-600">Gains totaux</p>
              </div>
            </div>

            {/* Actions */}
            {driver.status === 'pending' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commentaire (optionnel)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Ajoutez un commentaire sur votre décision..."
                  />
                </div>
                
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => handleAction('rejected')}
                    disabled={actionLoading}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Rejeter
                  </button>
                  <button
                    onClick={() => handleAction('approved')}
                    disabled={actionLoading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approuver
                  </button>
                </div>
              </div>
            )}
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
          <h1 className="text-3xl font-bold text-gray-900">Validation des Chauffeurs</h1>
          <p className="text-gray-600">Gérez les demandes d'inscription des chauffeurs</p>
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
            <option value="pending">En attente</option>
            <option value="approved">Approuvés</option>
            <option value="rejected">Rejetés</option>
            <option value="suspended">Suspendus</option>
          </select>
        </div>
      </div>

      {/* Drivers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : drivers.length === 0 ? (
          <div className="p-8 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun chauffeur trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chauffeur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Véhicule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expérience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <tr key={driver._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {driver.firstName} {driver.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{driver.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {driver.vehicleBrand} {driver.vehicleModel}
                      </div>
                      <div className="text-sm text-gray-500">{driver.vehicleType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {driver.experience} ans
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(driver.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(driver.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedDriver(driver)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Voir détails
                      </button>
                      {driver.status === 'pending' && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleStatusUpdate(driver._id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(driver._id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Rejeter
                          </button>
                        </div>
                      )}
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
              Page {pagination.current} sur {pagination.pages} ({pagination.total} chauffeurs)
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
      {selectedDriver && (
        <DriverModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  )
}

export default DriversValidation
