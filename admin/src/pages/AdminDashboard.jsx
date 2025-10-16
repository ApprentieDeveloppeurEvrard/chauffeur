import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../services/api'
import { Users, Car, Briefcase, DollarSign, AlertTriangle, Clock, TrendingUp, Activity, RefreshCw, Eye, CheckCircle, XCircle, Calendar, MapPin, Star, Bell } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  useEffect(() => {
    fetchDashboardData()
    
    // Auto-refresh toutes les 30 secondes si activé
    let interval
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchDashboardData(true) // true = silent refresh
      }, 30000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  const fetchDashboardData = useCallback(async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true)
        setError(null)
      } else {
        setRefreshing(true)
      }
      
      const response = await apiService.getAdminDashboard()
      setDashboardData(response.data)
      setLastUpdate(new Date())
      
      if (silent) {
        toast.success('Données mises à jour', { duration: 2000 })
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur lors du chargement du dashboard'
      setError(errorMsg)
      if (silent) {
        toast.error('Erreur de mise à jour')
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Actions rapides
  const handleQuickAction = async (action, id) => {
    try {
      switch (action) {
        case 'approve_driver':
          await apiService.updateDriverStatus(id, { status: 'approved', reason: 'Validation rapide depuis le dashboard' })
          toast.success('Chauffeur approuvé')
          fetchDashboardData(true)
          break
        case 'reject_driver':
          await apiService.updateDriverStatus(id, { status: 'rejected', reason: 'Rejeté depuis le dashboard' })
          toast.success('Chauffeur rejeté')
          fetchDashboardData(true)
          break
        default:
          break
      }
    } catch (error) {
      toast.error('Erreur lors de l\'action')
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Erreur</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => fetchDashboardData()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  const { overview, drivers, offers, missions, support, recentActivity, pendingValidation } = dashboardData || {}

  const StatCard = ({ title, value, icon: Icon, color, trend, onClick, loading: cardLoading }) => (
    <div 
      className={`bg-white rounded-lg shadow p-6 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''} ${cardLoading ? 'animate-pulse' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value?.toLocaleString() || 0}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{trend} cette semaine
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} ${onClick ? 'group-hover:scale-110' : ''} transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {onClick && (
        <div className="mt-2 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Cliquer pour voir plus →
        </div>
      )}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header Dynamique */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">Vue d'ensemble de la plateforme</p>
            {lastUpdate && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Mis à jour: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Toggle Auto-refresh */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            Auto-refresh
          </label>
          
          {/* Bouton Actualiser */}
          <button 
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>

      {/* Stats Overview Dynamiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Utilisateurs"
          value={overview?.totalUsers}
          icon={Users}
          color="bg-blue-500"
          onClick={() => navigate('/drivers')}
          loading={refreshing}
        />
        <StatCard
          title="Chauffeurs"
          value={overview?.totalDrivers}
          icon={Car}
          color="bg-green-500"
          trend={drivers?.newThisWeek}
          onClick={() => navigate('/drivers')}
          loading={refreshing}
        />
        <StatCard
          title="Offres Actives"
          value={offers?.active}
          icon={Briefcase}
          color="bg-purple-500"
          trend={offers?.newThisWeek}
          onClick={() => navigate('/offers')}
          loading={refreshing}
        />
        <StatCard
          title="Revenus Mensuels"
          value={`${overview?.monthlyRevenue?.toFixed(2) || 0}€`}
          icon={DollarSign}
          color="bg-yellow-500"
          onClick={() => navigate('/transactions')}
          loading={refreshing}
        />
      </div>

      {/* Alertes Dynamiques */}
      {(drivers?.pending > 0 || support?.urgentTickets > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drivers?.pending > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-colors cursor-pointer" onClick={() => navigate('/drivers?status=pending')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-medium text-orange-800">Chauffeurs en attente</h3>
                </div>
                <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-sm font-bold">
                  {drivers.pending}
                </span>
              </div>
              <p className="text-orange-700 mt-1">
                {drivers.pending} chauffeur{drivers.pending > 1 ? 's' : ''} en attente de validation
              </p>
              <div className="flex items-center justify-between mt-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/drivers?status=pending')
                  }}
                  className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                >
                  Voir les validations →
                </button>
                <div className="flex gap-2">
                  <Bell className="w-4 h-4 text-orange-500 animate-pulse" />
                </div>
              </div>
            </div>
          )}
          
          {support?.urgentTickets > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors cursor-pointer" onClick={() => navigate('/support?priority=urgent')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <h3 className="font-medium text-red-800">Tickets urgents</h3>
                </div>
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                  {support.urgentTickets}
                </span>
              </div>
              <p className="text-red-700 mt-1">
                {support.urgentTickets} ticket{support.urgentTickets > 1 ? 's' : ''} urgent{support.urgentTickets > 1 ? 's' : ''}
              </p>
              <div className="flex items-center justify-between mt-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/support?priority=urgent')
                  }}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Voir les tickets →
                </button>
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistiques Détaillées Dynamiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chauffeurs Stats avec Graphique */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Statut des Chauffeurs</h3>
            <button 
              onClick={() => navigate('/drivers')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer" onClick={() => navigate('/drivers?status=approved')}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Approuvés</span>
              </div>
              <span className="font-bold text-green-600">{drivers?.approved || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer" onClick={() => navigate('/drivers?status=pending')}>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700">En attente</span>
              </div>
              <span className="font-bold text-orange-600">{drivers?.pending || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer" onClick={() => navigate('/drivers?status=suspended')}>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">Suspendus</span>
              </div>
              <span className="font-bold text-red-600">{drivers?.suspended || 0}</span>
            </div>
          </div>
        </div>

        {/* Missions Stats avec Actions */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Missions</h3>
            <button 
              onClick={() => navigate('/missions')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => navigate('/missions?status=active')}>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">Actives</span>
              </div>
              <span className="font-bold text-blue-600">{missions?.active || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer" onClick={() => navigate('/missions?status=completed')}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Terminées</span>
              </div>
              <span className="font-bold text-green-600">{missions?.completed || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">Cette semaine</span>
              </div>
              <span className="font-bold text-purple-600">{missions?.newThisWeek || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activité Récente & Validations en Attente Dynamiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activité Récente Améliorée */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">En temps réel</span>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivity?.slice(0, 8).map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">
                      {activity.user?.firstName} {activity.user?.lastName}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {(!recentActivity || recentActivity.length === 0) && (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Aucune activité récente</p>
              </div>
            )}
          </div>
        </div>

        {/* Validations en Attente avec Actions Rapides */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Actions Rapides</h3>
            <button 
              onClick={() => navigate('/drivers?status=pending')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Voir tout
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pendingValidation?.slice(0, 5).map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {driver.firstName} {driver.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{driver.userId?.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {new Date(driver.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleQuickAction('approve_driver', driver._id)}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Approuver
                  </button>
                  <button 
                    onClick={() => handleQuickAction('reject_driver', driver._id)}
                    className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3 h-3" />
                    Rejeter
                  </button>
                </div>
              </div>
            ))}
            {(!pendingValidation || pendingValidation.length === 0) && (
              <div className="text-center py-8">
                <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Aucune validation en attente</p>
                <p className="text-xs text-gray-400 mt-1">Tous les chauffeurs sont validés !</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
