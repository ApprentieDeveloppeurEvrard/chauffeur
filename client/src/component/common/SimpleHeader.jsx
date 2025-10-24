import { Link } from 'react-router-dom';
import SubNavigation from './SubNavigation';

export default function SimpleHeader({ activeTab = '', searchQuery = '', onSearchChange = () => {} }) {
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
              onChange={(e) => onSearchChange(e.target.value)}
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
            <Link
              to="/auth"
              className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors"
            >
              Connexion
            </Link>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        <div className="lg:hidden mt-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sous-menu */}
      <SubNavigation activeTab={activeTab} />
    </header>
  );
}
