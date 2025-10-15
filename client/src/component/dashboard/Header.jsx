import { Link } from 'react-router-dom';

export default function Header({ searchQuery, setSearchQuery, notifications }) {
  return (
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
  );
}
