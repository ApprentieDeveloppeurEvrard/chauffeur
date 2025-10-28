import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SimpleHeader from '../component/common/SimpleHeader';
import ConversationList from '../component/messages/ConversationList';
import ChatWindow from '../component/messages/ChatWindow';
import { messagesApi } from '../services/api';

export default function MessagesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  // Charger les conversations
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchConversations();

    // Gérer le redimensionnement
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user, navigate]);

  // Sélectionner une conversation depuis l'URL
  useEffect(() => {
    const conversationId = searchParams.get('conversation');
    if (conversationId && conversations.length > 0) {
      const conv = conversations.find(c => c._id === conversationId);
      if (conv) {
        setSelectedConversation(conv);
      }
    }
  }, [searchParams, conversations]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await messagesApi.getConversations();
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error('Erreur chargement conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mettre à jour l'URL
    navigate(`/messages?conversation=${conversation._id}`, { replace: true });
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    navigate('/messages', { replace: true });
  };

  const handleNewMessage = (message) => {
    // Rafraîchir la liste des conversations
    fetchConversations();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SimpleHeader activeTab="messages" readOnly />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader activeTab="messages" readOnly />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Conteneur principal - Style Jumli */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="grid lg:grid-cols-3 h-[calc(100vh-240px)] min-h-[600px]">
            {/* Liste des conversations - Desktop toujours visible, Mobile conditionnelle */}
            <div className={`
              lg:col-span-1 border-r border-gray-200 
              ${isMobileView && selectedConversation ? 'hidden' : 'block'}
            `}>
              <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={handleSelectConversation}
                onRefresh={fetchConversations}
              />
            </div>

            {/* Fenêtre de chat - Desktop toujours visible, Mobile conditionnelle */}
            <div className={`
              lg:col-span-2 
              ${isMobileView && !selectedConversation ? 'hidden' : 'block'}
            `}>
              {selectedConversation ? (
                <ChatWindow
                  conversation={selectedConversation}
                  onBack={isMobileView ? handleBackToList : null}
                  onNewMessage={handleNewMessage}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-lg font-medium">Sélectionnez une conversation</p>
                  <p className="text-sm mt-1">Choisissez une conversation pour commencer à discuter</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
