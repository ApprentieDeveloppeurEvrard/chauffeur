import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SubNavigation from './SubNavigation';

export default function SimpleHeader({ activeTab = '', searchQuery = '', onSearchChange = () => {}, readOnly = false }) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#F97316"/>
              <path d="M12 16L20 12L28 16V28L20 32L12 28V16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16L20 20L28 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 32V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-bold text-gray-900">GoDriver</span>
          </Link>

          {/* Barre de recherche desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={readOnly ? undefined : (e) => onSearchChange(e.target.value)}
              readOnly={readOnly}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden lg:inline-block"
            >
              Publier une offre
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors"
                >
                  Mon espace
                </button>

                {/* Menu dropdown */}
                {showMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 text-sm w-64 p-3 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium z-20">
                      {/* Informations utilisateur */}
                      <div className="px-3 py-3 mb-2 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-600">
                          {user.role === 'driver' ? 'Chauffeur' : 'Employeur'}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-px">
                        <li className="flex items-center justify-between gap-3 bg-gray-500/20 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                          <Link to={user.role === 'driver' ? '/driver/dashboard' : '/employer/dashboard'} onClick={() => setShowMenu(false)}>Tableau de bord</Link>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="#1F2937" fillOpacity=".8"/>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                          <Link to={user.role === 'driver' ? '/driver/profile' : '/employer/settings'} onClick={() => setShowMenu(false)} className="-mr-px">Mon profil</Link>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#1F2937" fillOpacity=".8"/>
                          </svg>
                        </li>
                        {user.role === 'client' && (
                          <>
                            <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                              <Link to="/employer/candidates" onClick={() => setShowMenu(false)}>Mes candidatures</Link>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#1F2937" fillOpacity=".8"/>
                              </svg>
                            </li>
                            <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                              <Link to="/employer/offers" onClick={() => setShowMenu(false)}>Mes annonces</Link>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="#1F2937" fillOpacity=".8"/>
                              </svg>
                            </li>
                          </>
                        )}
                        {user.role === 'driver' && (
                          <>
                            <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                              <Link to="/driver/offers" onClick={() => setShowMenu(false)}>Mes demandes d'emploi</Link>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" fill="#1F2937" fillOpacity=".8"/>
                              </svg>
                            </li>
                            <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                              <Link to="/driver/applications" onClick={() => setShowMenu(false)}>Mes candidatures</Link>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#1F2937" fillOpacity=".8"/>
                              </svg>
                            </li>
                          </>
                        )}
                        <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                          <Link to={user.role === 'driver' ? '/driver/dashboard?tab=messages' : '/employer/dashboard?tab=messages'} onClick={() => setShowMenu(false)}>Messages</Link>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" fill="#1F2937" fillOpacity=".8"/>
                          </svg>
                        </li>
                        <div className="w-full h-px bg-gray-300/50 my-2"></div>
                        <li className="flex items-center text-red-600/80 justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-red-600/20 transition">
                          <button onClick={() => { logout(); setShowMenu(false); }} className="text-left w-full">Déconnexion</button>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.833h17m-4.25 0-.287-.766c-.28-.744-.419-1.115-.677-1.39a2.1 2.1 0 0 0-.852-.546C11.559 1 11.118 1 10.237 1H8.763c-.881 0-1.322 0-1.697.131a2.1 2.1 0 0 0-.852.546c-.258.275-.398.646-.676 1.39l-.288.766m10.625 0v9.634c0 1.586 0 2.38-.347 2.986a3.04 3.04 0 0 1-1.393 1.238c-.682.309-1.575.309-3.36.309h-2.55c-1.785 0-2.678 0-3.36-.309a3.04 3.04 0 0 1-1.393-1.238c-.347-.606-.347-1.4-.347-2.986V3.833m8.5 3.778v6.611m-4.25-6.61v6.61" stroke="#DC2626" strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>

        {/* Barre de recherche mobile */}
        {!readOnly && (
          <div className="lg:hidden mt-4">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Sous-menu */}
      <SubNavigation activeTab={activeTab} />
    </header>
  );
}
