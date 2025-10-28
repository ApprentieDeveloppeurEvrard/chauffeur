import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { messagesApi } from '../../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ChatWindow({ conversation, onBack, onNewMessage }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const otherUser = conversation.otherParticipant;

  // Charger les messages
  useEffect(() => {
    if (conversation?._id) {
      fetchMessages();
      // Marquer comme lu
      markAsRead();
    }
  }, [conversation?._id]);

  // Auto-scroll vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messagesApi.getMessages(conversation._id);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Erreur chargement messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      await messagesApi.markAsRead(conversation._id);
    } catch (error) {
      console.error('Erreur marquage lecture:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const response = await messagesApi.send({
        conversationId: conversation._id,
        content: newMessage.trim(),
        type: 'text'
      });

      // Ajouter le message à la liste avec senderId correct
      const newMsg = {
        ...response.data.message,
        senderId: user.sub // S'assurer que senderId est l'ID de l'utilisateur connecté
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Notifier le parent
      if (onNewMessage) {
        onNewMessage(newMsg);
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };

  const formatMessageTime = (date) => {
    try {
      return format(new Date(date), 'HH:mm', { locale: fr });
    } catch {
      return '';
    }
  };

  const formatMessageDate = (date) => {
    try {
      return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return '';
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  // Grouper les messages par date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(msg => {
      const date = formatMessageDate(msg.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* En-tête du chat - Style Jumli - Fixe en haut */}
      <div className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
        {/* Bouton retour (mobile) */}
        {onBack && (
          <button
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Avatar */}
        <div className="flex-shrink-0">
          {otherUser?.profilePhotoUrl ? (
            <img
              src={otherUser.profilePhotoUrl}
              alt={`${otherUser.firstName} ${otherUser.lastName}`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold ring-2 ring-orange-200">
              {getInitials(otherUser?.firstName, otherUser?.lastName)}
            </div>
          )}
        </div>

        {/* Infos utilisateur */}
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 truncate">
            {otherUser?.firstName} {otherUser?.lastName}
          </h2>
          <div className="flex items-center gap-2">
            <span className={`
              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
              ${otherUser?.role === 'driver' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
              }
            `}>
              {otherUser?.role === 'driver' ? 'Chauffeur' : 'Employeur'}
            </span>
            {otherUser?.companyName && (
              <span className="text-xs text-gray-500">• {otherUser.companyName}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Plus d'options">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Zone de messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50"
      >
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date}>
            {/* Séparateur de date */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white px-4 py-1 rounded-full shadow-sm border border-gray-200">
                <span className="text-xs font-medium text-gray-600">{date}</span>
              </div>
            </div>

            {/* Messages du jour */}
            <div className="space-y-3">
              {msgs.map((message, index) => {
                // Extraire l'ID de l'expéditeur (peut être un objet ou un string)
                const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
                const isOwn = senderId === user.sub;
                const isSystem = message.type === 'system';

                if (isSystem) {
                  return (
                    <div key={message._id} className="flex justify-center">
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs max-w-md text-center italic">
                        {message.content}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={message._id}
                    className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar (seulement pour les messages reçus) */}
                    {!isOwn && (
                      <div className="flex-shrink-0 w-8 h-8">
                        {otherUser?.profilePhotoUrl ? (
                          <img
                            src={otherUser.profilePhotoUrl}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-semibold">
                            {getInitials(otherUser?.firstName, otherUser?.lastName)}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bulle de message - Style Jumli */}
                    <div className={`
                      max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm
                      ${isOwn 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-sm' 
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                      }
                    `}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <div className={`
                        flex items-center gap-1 mt-1 text-xs
                        ${isOwn ? 'text-orange-100 justify-end' : 'text-gray-500'}
                      `}>
                        <span>{formatMessageTime(message.createdAt)}</span>
                        {isOwn && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie - Style Jumli - Fixe en bas */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          {/* Bouton pièce jointe (optionnel) */}
          <button
            type="button"
            className="flex-shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Joindre un fichier"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Champ de texte */}
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Tapez votre message..."
              rows={1}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none max-h-32"
              style={{ minHeight: '48px' }}
            />
          </div>

          {/* Bouton envoyer */}
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className={`
              flex-shrink-0 p-3 rounded-xl font-medium transition-all
              ${newMessage.trim() && !sending
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {sending ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>

        {/* Indicateur de frappe (optionnel) */}
        <div className="mt-2 text-xs text-gray-500 h-4">
          {/* {isTyping && <span>{otherUser?.firstName} est en train d'écrire...</span>} */}
        </div>
      </div>
    </div>
  );
}
