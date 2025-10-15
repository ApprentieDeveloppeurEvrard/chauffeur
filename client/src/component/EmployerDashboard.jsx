import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Données simulées
  const [myOffers] = useState([
    { id: 1, title: "Chauffeur personnel pour 1 mois", type: "Personnel", status: "active", candidates: 12, created: "2024-10-10" },
    { id: 2, title: "Chauffeur-livreur avec moto", type: "Livraison", status: "active", candidates: 8, created: "2024-10-08" },
    { id: 3, title: "Chauffeur VTC week-ends", type: "VTC", status: "paused", candidates: 5, created: "2024-10-05" }
  ]);

  const [activeMissions] = useState([
    { id: 1, driver: "Pierre Martin", mission: "Chauffeur personnel", startDate: "2024-10-01", endDate: "2024-10-31", status: "En cours" },
    { id: 2, driver: "Marie Dubois", mission: "Livraisons quotidiennes", startDate: "2024-09-15", endDate: "2024-11-15", status: "En cours" }
  ]);

  const [notifications] = useState([
    { id: 1, type: "new_candidate", message: "Nouveau candidat pour 'Chauffeur personnel'", time: "Il y a 2h", unread: true },
    { id: 2, type: "mission_ending", message: "Mission avec Pierre Martin se termine dans 3 jours", time: "Il y a 4h", unread: true },
    { id: 3, type: "document_expired", message: "Permis de Marie Dubois expire bientôt", time: "Hier", unread: false }
  ]);

  // Liste des chauffeurs disponibles
  const [availableDrivers] = useState([
    { 
      id: 1, 
      name: "Jean Dupont", 
      experience: "5+ ans", 
      zone: "Paris", 
      availability: "Temps plein", 
      vehicle: "Berline", 
      rating: 4.8, 
      phone: "06 12 34 56 78",
      specialties: ["VTC", "Transport personnel"],
      lastActive: "En ligne",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 2, 
      name: "Marie Martin", 
      experience: "3-5 ans", 
      zone: "Lyon", 
      availability: "Temps partiel", 
      vehicle: "Utilitaire", 
      rating: 4.9, 
      phone: "06 98 76 54 32",
      specialties: ["Livraison", "Transport marchandises"],
      lastActive: "Il y a 1h",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 3, 
      name: "Ahmed Ben Ali", 
      experience: "1-3 ans", 
      zone: "Marseille", 
      availability: "Week-ends", 
      vehicle: "Moto", 
      rating: 4.6, 
      phone: "06 55 44 33 22",
      specialties: ["Livraison rapide", "Coursier"],
      lastActive: "En ligne",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 4, 
      name: "Sophie Leroy", 
      experience: "5+ ans", 
      zone: "Paris", 
      availability: "Temps plein", 
      vehicle: "SUV", 
      rating: 4.7, 
      phone: "06 11 22 33 44",
      specialties: ["Transport familial", "Longue distance"],
      lastActive: "Il y a 30min",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    { 
      id: 5, 
      name: "Carlos Rodriguez", 
      experience: "3-5 ans", 
      zone: "Nice", 
      availability: "Ponctuel", 
      vehicle: "Van", 
      rating: 4.5, 
      phone: "06 77 88 99 00",
      specialties: ["Déménagement", "Transport groupe"],
      lastActive: "Il y a 2h",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec barre de recherche */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#4F39F6"/>
              <path d="M12 16L20 12L28 16V28L20 32L12 28V16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16L20 20L28 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 32V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-bold text-slate-800">ChauffeursConnect</span>
          </Link>

          {/* Barre de recherche */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher des chauffeurs par nom, zone, compétences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
              </svg>
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>
            <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">E</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-20 w-64 bg-white shadow-sm border-r border-gray-200 h-screen overflow-y-auto z-30">
          <div className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                Tableau de bord
              </button>

              <button
                onClick={() => setActiveTab('search-drivers')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'search-drivers' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher des chauffeurs
                <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  {availableDrivers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('my-offers')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'my-offers' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Mes annonces
                <span className="ml-auto bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">
                  {myOffers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('candidates')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'candidates' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 20v-2a7 7 0 017-7h1m7 0a7 7 0 017 7v2" />
                </svg>
                Candidatures reçues
                <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  25
                </span>
              </button>

              <button
                onClick={() => setActiveTab('missions')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'missions' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Missions en cours
                <span className="ml-auto bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                  {activeMissions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'settings' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Paramètres
              </button>
            </nav>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 ml-64 p-6">
          {/* Dashboard - Vue d'ensemble */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
                <p className="text-gray-600">Vue d'ensemble de votre activité employeur</p>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Mes annonces</p>
                      <p className="text-2xl font-semibold text-gray-900">{myOffers.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 20v-2a7 7 0 017-7h1m7 0a7 7 0 017 7v2" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Candidatures</p>
                      <p className="text-2xl font-semibold text-gray-900">25</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Missions actives</p>
                      <p className="text-2xl font-semibold text-gray-900">{activeMissions.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Notifications</p>
                      <p className="text-2xl font-semibold text-gray-900">{notifications.filter(n => n.unread).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activité récente */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Activité récente</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map(notif => (
                      <div key={notif.id} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                        <p className="text-sm text-gray-600">{notif.message}</p>
                        <span className="text-xs text-gray-400">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rechercher des chauffeurs */}
          {activeTab === 'search-drivers' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Rechercher des chauffeurs</h1>
                <p className="text-gray-600">Contactez directement les chauffeurs disponibles - Notre point fort !</p>
              </div>

              {/* Filtres rapides */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Toutes zones</option>
                    <option>Paris</option>
                    <option>Lyon</option>
                    <option>Marseille</option>
                    <option>Nice</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Toute expérience</option>
                    <option>1-3 ans</option>
                    <option>3-5 ans</option>
                    <option>5+ ans</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Tous véhicules</option>
                    <option>Berline</option>
                    <option>SUV</option>
                    <option>Utilitaire</option>
                    <option>Moto</option>
                    <option>Van</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Toute disponibilité</option>
                    <option>Temps plein</option>
                    <option>Temps partiel</option>
                    <option>Week-ends</option>
                    <option>Ponctuel</option>
                  </select>
                </div>
              </div>

              {/* Cards des chauffeurs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {availableDrivers.map(driver => (
                  <div key={driver.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-64">
                    {/* Header de la card */}
                    <div className="relative p-3 pb-2">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-2">
                          <img 
                            src={driver.photo} 
                            alt={driver.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          {driver.lastActive === 'En ligne' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="w-full">
                          <h3 className="text-xs font-bold text-gray-900 truncate">{driver.name}</h3>
                          <div className="flex items-center justify-center mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-2.5 h-2.5 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-xs font-medium text-gray-700">{driver.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informations principales */}
                    <div className="px-3 pb-2">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Exp:</span>
                          <span className="font-semibold text-gray-900">{driver.experience}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Zone:</span>
                          <span className="font-semibold text-gray-900">{driver.zone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Dispo:</span>
                          <span className="font-semibold text-gray-900 text-right text-xs">{driver.availability}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Véhicule:</span>
                          <span className="font-semibold text-gray-900">{driver.vehicle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Statut */}
                    <div className="px-3 pb-2 text-center">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                        driver.lastActive === 'En ligne' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {driver.lastActive}
                      </span>
                    </div>

                    {/* Spécialités */}
                    <div className="px-3 pb-2">
                      <div className="flex justify-center">
                        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                          {driver.specialties[0]}
                        </span>
                      </div>
                    </div>

                    {/* Footer avec contact */}
                    <div className="bg-gray-50 px-3 py-2 mt-auto">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => window.open(`tel:${driver.phone}`)}
                          className="flex-1 bg-indigo-600 text-white py-1.5 px-2 rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
                        >
                          📞 Appeler
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-2 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
                          Profil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mes annonces */}
          {activeTab === 'my-offers' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Mes annonces</h1>
                <p className="text-gray-600">Gérez vos offres d'emploi et créez de nouvelles annonces</p>
              </div>


              {/* Liste des offres */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Offres publiées</h3>
                    <button 
                      onClick={() => setShowCreateForm(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Nouvelle offre
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {myOffers.map(offer => (
                    <div key={offer.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{offer.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">Type: {offer.type} • Créée le {offer.created}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              offer.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {offer.status === 'active' ? 'Active' : 'En pause'}
                            </span>
                            <span className="text-sm text-gray-600">{offer.candidates} candidatures</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm">Modifier</button>
                          <button className="text-yellow-600 hover:text-yellow-800 text-sm">
                            {offer.status === 'active' ? 'Suspendre' : 'Activer'}
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Candidatures reçues */}
          {activeTab === 'candidates' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidatures reçues</h1>
                <p className="text-gray-600">Consultez les profils des chauffeurs intéressés</p>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Nouveaux candidats</h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 20v-2a7 7 0 017-7h1m7 0a7 7 0 017 7v2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune candidature pour le moment</h3>
                    <p className="mt-1 text-sm text-gray-500">Les candidatures apparaîtront ici une fois que des chauffeurs postuleront à vos offres.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Missions en cours */}
          {activeTab === 'missions' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Missions en cours</h1>
                <p className="text-gray-600">Suivi de vos chauffeurs engagés</p>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Contrats actifs</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {activeMissions.map(mission => (
                    <div key={mission.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{mission.driver}</h4>
                          <p className="text-sm text-gray-500 mt-1">{mission.mission}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Du {mission.startDate} au {mission.endDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {mission.status}
                          </span>
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm">Contacter</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paramètres */}
          {activeTab === 'settings' && (
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité *</label>
                          <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                            <option>Transport & Logistique</option>
                            <option>Commerce & Distribution</option>
                            <option>Services aux entreprises</option>
                            <option>Industrie</option>
                            <option>Hôtellerie & Restauration</option>
                            <option>Santé</option>
                            <option>BTP</option>
                            <option>Autre</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Taille de l'entreprise</label>
                          <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            <option>1-10 employés</option>
                            <option>11-50 employés</option>
                            <option>51-200 employés</option>
                            <option>201-500 employés</option>
                            <option>Plus de 500 employés</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                          <input
                            type="url"
                            placeholder="https://www.monentreprise.fr"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
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
                              <span className="ml-2 text-sm text-gray-600">Livraisons</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                              <span className="ml-2 text-sm text-gray-600">Transport de marchandises</span>
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
                            <option>Hebdomadaire</option>
                            <option>Quotidien</option>
                            <option>Saisonnier</option>
                            <option>Permanent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Budget mensuel moyen</label>
                          <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Moins de 1 000€</option>
                            <option>1 000€ - 5 000€</option>
                            <option>5 000€ - 10 000€</option>
                            <option>10 000€ - 20 000€</option>
                            <option>Plus de 20 000€</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Véhicules fournis</label>
                          <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Oui, toujours</option>
                            <option>Parfois</option>
                            <option>Non, jamais</option>
                            <option>Selon la mission</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Préférences de notification */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Préférences de notification</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Nouvelles candidatures</h4>
                        <p className="text-sm text-gray-500">Recevoir une notification pour chaque nouvelle candidature</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Fin de mission</h4>
                        <p className="text-sm text-gray-500">Être alerté 3 jours avant la fin d'une mission</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Documents expirés</h4>
                        <p className="text-sm text-gray-500">Notification si les documents d'un chauffeur expirent</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                  <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Annuler
                  </button>
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de création d'offre */}
      {showCreateForm && (
        <div className="fixed inset-0 backdrop-blur-[4px] overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-11/12 max-w-4xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-md bg-white border border-gray-200">
            {/* Header de la modal */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Créer une nouvelle offre</h3>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenu de la modal */}
            <div className="mt-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'offre</label>
                  <input
                    type="text"
                    placeholder="Ex: Chauffeur personnel pour 1 mois"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de mission</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Chauffeur personnel</option>
                      <option>Chauffeur-livreur</option>
                      <option>Chauffeur VTC</option>
                      <option>Transport de marchandises</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                      <option>1 jour</option>
                      <option>1 semaine</option>
                      <option>1 mois</option>
                      <option>3 mois</option>
                      <option>6 mois</option>
                      <option>1 an</option>
                      <option>Indéterminée</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows="4"
                    placeholder="Décrivez les détails de la mission, les exigences, les horaires..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salaire (€/mois)</label>
                    <input
                      type="number"
                      placeholder="2500"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zone géographique</label>
                    <input
                      type="text"
                      placeholder="Paris, Lyon..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule requis</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Aucun (véhicule fourni)</option>
                      <option>Berline</option>
                      <option>SUV</option>
                      <option>Utilitaire</option>
                      <option>Moto</option>
                      <option>Vélo</option>
                    </select>
                  </div>
                </div>

                {/* Footer de la modal */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    type="button" 
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Brouillon
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Publier l'offre
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
