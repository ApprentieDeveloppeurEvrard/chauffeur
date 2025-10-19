import { useState, useEffect, useRef } from 'react';
import useNotifications from '../../hooks/useNotifications';

export default function NotificationDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type) => {
    const iconClass = "w-4 h-4";
    
    switch (type) {
      case 'new_offer':
        return (
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <svg className={`${iconClass} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
            </svg>
          </div>
        );
      case 'urgent_offer':
        return (
          <div className="p-1.5 bg-red-100 rounded-lg animate-pulse">
            <svg className={`${iconClass} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'application_accepted':
        return (
          <div className="p-1.5 bg-green-100 rounded-lg">
            <svg className={`${iconClass} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'payment_received':
        return (
          <div className="p-1.5 bg-purple-100 rounded-lg">
            <svg className={`${iconClass} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-1.5 bg-gray-100 rounded-lg">
            <svg className={`${iconClass} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
            </svg>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        ref={dropdownRef}
        className="
          /* Desktop styles */
          lg:absolute lg:right-0 lg:mt-2 lg:w-96 lg:max-h-96 lg:rounded-lg lg:shadow-lg
          
          /* Mobile styles - Ultra compact */
          fixed inset-x-4 top-16 bottom-56 w-auto max-h-[calc(100vh-18rem)]
          
          /* Common styles */
          bg-white border border-gray-200 z-50 overflow-hidden
          rounded-2xl lg:rounded-lg
          flex flex-col
          shadow-2xl lg:shadow-lg
        "
      >
      {/* Header du dropdown */}
      <div className="p-4 lg:p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        {/* Barre de glissement mobile */}
        <div className="lg:hidden flex justify-center mb-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-base lg:text-sm font-medium text-gray-900">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </h3>
          <div className="flex items-center gap-3 lg:gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm lg:text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1 lg:px-0 lg:py-0 rounded-full lg:rounded-none bg-blue-50 lg:bg-transparent"
              >
                Tout marquer
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-5 h-5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Liste des notifications */}
      <div className="flex-1 overflow-y-auto lg:max-h-80">
        {loading ? (
          // Skeleton de chargement
          <div className="space-y-0">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-3 animate-pulse border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notifications?.length > 0 ? (
          <div className="divide-y divide-gray-200/30">
            {notifications.slice(0, 10).map(notification => (
              <div
                key={notification.id}
                className={`p-4 lg:p-3 hover:bg-white/20 cursor-pointer transition-colors active:bg-white/30 ${
                  notification.unread ? 'bg-blue-50/30 border-l-4 lg:border-l-2 border-blue-500' : 'bg-transparent'
                }`}
                onClick={() => {
                  if (notification.unread) {
                    markAsRead(notification.id);
                  }
                }}
              >
                <div className="flex items-start space-x-4 lg:space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className={`text-sm lg:text-sm ${notification.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </p>
                      <div className="flex items-center ml-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {notification.unread && (
                          <div className="w-2.5 h-2.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full ml-2"></div>
                        )}
                      </div>
                    </div>
                    {notification.message && (
                      <p className="text-sm lg:text-xs text-gray-500 mt-2 lg:mt-1 line-clamp-2 leading-relaxed lg:leading-normal">
                        {notification.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 lg:p-8 text-center flex-1 flex flex-col justify-center">
            <svg className="mx-auto h-12 w-12 lg:h-8 lg:w-8 text-gray-400 mb-4 lg:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
            </svg>
            <h4 className="text-base lg:text-sm font-medium text-gray-900 mb-1">Aucune notification</h4>
            <p className="text-sm lg:text-sm text-gray-500">Vous êtes à jour ! Les nouvelles notifications apparaîtront ici.</p>
          </div>
        )}
      </div>

      {/* Footer avec lien vers toutes les notifications */}
      {notifications?.length > 10 && (
        <div className="p-4 lg:p-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <button
            onClick={() => {
              // Ici vous pouvez naviguer vers la page complète des notifications
              onClose();
            }}
            className="w-full text-base lg:text-sm text-blue-600 hover:text-blue-700 font-medium py-2 lg:py-0 px-4 lg:px-0 rounded-lg lg:rounded-none bg-blue-50 lg:bg-transparent hover:bg-blue-100 lg:hover:bg-transparent transition-colors"
          >
            Voir toutes les notifications ({notifications.length})
          </button>
        </div>
      )}
      </div>
    </>
  );
}
