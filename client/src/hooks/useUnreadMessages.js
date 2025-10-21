import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/api';

const useUnreadMessages = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour calculer le nombre total de messages non lus
  const calculateUnreadCount = useCallback((conversationsList) => {
    const total = conversationsList.reduce((sum, conversation) => {
      return sum + (conversation.unreadCount || 0);
    }, 0);
    setUnreadCount(total);
    return total;
  }, []);

  // Fonction pour charger les conversations et compter les non lus
  const loadConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await chatService.getConversations();
      const conversationsList = response.data || [];
      
      setConversations(conversationsList);
      const total = calculateUnreadCount(conversationsList);
      
      // Afficher une notification browser si il y a de nouveaux messages
      if (total > unreadCount && total > 0) {
        showBrowserNotification(total);
      }
      
      return conversationsList;
    } catch (err) {
      console.error('Erreur lors du chargement des conversations:', err);
      setError(err.message || 'Erreur lors du chargement des messages');
      return [];
    } finally {
      setLoading(false);
    }
  }, [calculateUnreadCount, unreadCount]);

  // Fonction pour afficher une notification browser
  const showBrowserNotification = useCallback((count) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = count === 1 ? 'Nouveau message' : `${count} nouveaux messages`;
      const body = count === 1 
        ? 'Vous avez reçu un nouveau message'
        : `Vous avez ${count} messages non lus`;
      
      const notification = new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'unread-messages',
        renotify: true,
        requireInteraction: false
      });

      // Auto-fermer après 5 secondes
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Clic sur la notification pour ouvrir les messages
      notification.onclick = () => {
        window.focus();
        // Déclencher l'ouverture des messages
        window.dispatchEvent(new CustomEvent('openMessages'));
        notification.close();
      };
    }
  }, []);

  // Fonction pour demander la permission des notifications
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  // Fonction pour marquer une conversation comme lue
  const markConversationAsRead = useCallback(async (conversationId) => {
    try {
      await chatService.markConversationAsRead(conversationId);
      
      // Mettre à jour localement
      setConversations(prev => {
        const updated = prev.map(conv => 
          conv._id === conversationId 
            ? { ...conv, unreadCount: 0 }
            : conv
        );
        calculateUnreadCount(updated);
        return updated;
      });
    } catch (err) {
      console.error('Erreur lors du marquage comme lu:', err);
    }
  }, [calculateUnreadCount]);

  // Fonction pour actualiser manuellement
  const refresh = useCallback(() => {
    loadConversations();
  }, [loadConversations]);

  // Polling automatique toutes les 30 secondes
  useEffect(() => {
    // Charger immédiatement
    loadConversations();

    // Demander la permission pour les notifications
    requestNotificationPermission();

    // Configurer le polling plus fréquent
    const interval = setInterval(() => {
      loadConversations();
    }, 10000); // 10 secondes pour une meilleure réactivité

    // Écouter les événements de nouveaux messages
    const handleNewMessage = () => {
      setTimeout(() => {
        loadConversations();
      }, 1000); // Délai pour laisser le temps au message d'être sauvegardé
    };

    const handleMessageSent = () => {
      setTimeout(() => {
        loadConversations();
      }, 500); // Délai plus court pour les messages envoyés
    };

    const handleConversationMarkedAsRead = () => {
      setTimeout(() => {
        loadConversations();
      }, 200); // Délai très court pour la mise à jour immédiate
    };

    const handleForceRefresh = () => {
      console.log('🔄 Force refresh des messages non lus');
      loadConversations();
    };

    window.addEventListener('newMessageReceived', handleNewMessage);
    window.addEventListener('newMessageSent', handleMessageSent);
    window.addEventListener('conversationMarkedAsRead', handleConversationMarkedAsRead);
    window.addEventListener('forceRefreshUnreadMessages', handleForceRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener('newMessageReceived', handleNewMessage);
      window.removeEventListener('newMessageSent', handleMessageSent);
      window.removeEventListener('conversationMarkedAsRead', handleConversationMarkedAsRead);
      window.removeEventListener('forceRefreshUnreadMessages', handleForceRefresh);
    };
  }, [loadConversations, requestNotificationPermission]);

  // Fonction pour déclencher manuellement une notification de test
  const createTestNotification = useCallback(() => {
    showBrowserNotification(1);
  }, [showBrowserNotification]);

  return {
    unreadCount,
    conversations,
    loading,
    error,
    markConversationAsRead,
    refresh,
    createTestNotification,
    requestNotificationPermission,
    loadConversations // Exposer pour debug
  };
};

export default useUnreadMessages;
