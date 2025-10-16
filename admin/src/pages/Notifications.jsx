import React, { useState } from 'react'
import { Bell, Check, X, AlertCircle, Users, FileText, Settings as SettingsIcon } from 'lucide-react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_driver',
      title: 'Nouveau chauffeur inscrit',
      message: 'Jean Dupont a créé un compte et attend la validation de son profil',
      time: 'Il y a 2h',
      unread: true,
      action: 'Valider le profil'
    },
    {
      id: 2,
      type: 'document_validation',
      title: 'Documents à valider',
      message: '5 nouveaux documents de chauffeurs nécessitent une validation',
      time: 'Il y a 4h',
      unread: true,
      action: 'Voir les documents'
    },
    {
      id: 3,
      type: 'system_alert',
      title: 'Maintenance système',
      message: 'Maintenance programmée ce soir de 23h à 1h du matin',
      time: 'Hier',
      unread: false
    },
    {
      id: 4,
      type: 'new_employer',
      title: 'Nouvel employeur',
      message: 'Entreprise TransportCorp a créé un compte professionnel',
      time: 'Il y a 1 jour',
      unread: false,
      action: 'Voir le profil'
    },
    {
      id: 5,
      type: 'report',
      title: 'Signalement utilisateur',
      message: 'Un signalement a été déposé concernant un chauffeur',
      time: 'Il y a 2 jours',
      unread: false,
      action: 'Traiter le signalement'
    }
  ])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_driver':
        return (
          <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        )
      case 'document_validation':
        return (
          <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900">
            <FileText className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
        )
      case 'system_alert':
        return (
          <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
        )
      case 'new_employer':
        return (
          <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        )
      case 'report':
        return (
          <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
            <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        )
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-lg dark:bg-gray-800">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
        )
    }
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez les notifications système et les alertes administratives
        </p>
      </div>

      {/* Paramètres de notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Paramètres de notification
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Nouveaux utilisateurs
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Recevoir des notifications pour les nouvelles inscriptions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Validation de documents
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Notifications pour les documents nécessitant une validation
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Signalements
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Alertes pour les signalements d'utilisateurs
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Alertes système
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Notifications concernant le système et la maintenance
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Notifications récentes
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Marquer toutes comme lues
              </button>
            )}
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.length > 0 ? notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-6 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'}`}
            >
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  <div className="mt-3 flex items-center space-x-3">
                    {notification.action && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        {notification.action}
                      </button>
                    )}
                    <div className="flex items-center space-x-2">
                      {notification.unread && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Marquer comme lu
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucune notification
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vous êtes à jour ! Les nouvelles notifications apparaîtront ici.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
