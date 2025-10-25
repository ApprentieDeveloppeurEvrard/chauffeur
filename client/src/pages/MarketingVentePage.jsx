import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleHeader from '../component/common/SimpleHeader';
import Footer from '../component/common/Footer';
import ProductCard from '../component/common/ProductCard';
import api from '../services/api';

export default function MarketingVentePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const navigate = useNavigate();

  // Bannières publicitaires
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
      title: 'Vendez vos produits facilement',
      subtitle: 'Rejoignez notre marketplace',
      link: '/auth'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=400&fit=crop',
      title: 'Achetez en toute confiance',
      subtitle: 'Des milliers de produits disponibles',
      link: '/auth'
    }
  ];

  // Produits de test
  const testProducts = [
    {
      _id: '1',
      name: 'Véhicule Toyota Corolla 2018',
      category: 'Véhicules',
      price: '8,500,000 FCFA',
      location: 'Cocody, Abidjan',
      condition: 'Occasion',
      seller: 'Jean Kouassi',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      description: 'Véhicule en excellent état, entretien régulier',
      postedDate: '2024-01-15'
    },
    {
      _id: '2',
      name: 'Pièces détachées auto',
      category: 'Pièces & Accessoires',
      price: '50,000 FCFA',
      location: 'Yopougon, Abidjan',
      condition: 'Neuf',
      seller: 'Auto Parts CI',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
      description: 'Large gamme de pièces détachées neuves',
      postedDate: '2024-01-14'
    },
    {
      _id: '3',
      name: 'Service de nettoyage auto',
      category: 'Services',
      price: '15,000 FCFA',
      location: 'Plateau, Abidjan',
      condition: 'Service',
      seller: 'Clean Car Pro',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
      description: 'Nettoyage complet intérieur et extérieur',
      postedDate: '2024-01-13'
    },
    {
      _id: '4',
      name: 'Assurance auto complète',
      category: 'Assurances',
      price: 'À partir de 120,000 FCFA/an',
      location: 'Marcory, Abidjan',
      condition: 'Service',
      seller: 'Assur CI',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
      description: 'Couverture complète tous risques',
      postedDate: '2024-01-12'
    },
    {
      _id: '5',
      name: 'Formation conduite défensive',
      category: 'Formations',
      price: '75,000 FCFA',
      location: 'Cocody, Abidjan',
      condition: 'Service',
      seller: 'Drive Safe Academy',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
      description: 'Formation professionnelle de 5 jours',
      postedDate: '2024-01-11'
    },
    {
      _id: '6',
      name: 'Équipements de sécurité',
      category: 'Équipements',
      price: '25,000 FCFA',
      location: 'Abobo, Abidjan',
      condition: 'Neuf',
      seller: 'Safety First',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
      description: 'Kit complet de sécurité routière',
      postedDate: '2024-01-10'
    },
    {
      _id: '7',
      name: 'GPS professionnel',
      category: 'Électronique',
      price: '85,000 FCFA',
      location: 'Plateau, Abidjan',
      condition: 'Neuf',
      seller: 'Tech Auto',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      description: 'GPS avec cartographie Afrique complète',
      postedDate: '2024-01-09'
    },
    {
      _id: '8',
      name: 'Entretien mécanique',
      category: 'Services',
      price: '45,000 FCFA',
      location: 'Yopougon, Abidjan',
      condition: 'Service',
      seller: 'Garage Pro',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop',
      description: 'Révision complète + vidange',
      postedDate: '2024-01-08'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Récupérer les offres de type "Autre" (produits)
        const response = await api.get('/offers', {
          params: {
            type: 'Autre',
            status: 'active'
          }
        });
        setProducts(response.data.offers || response.data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger les produits');
        // Fallback sur les données de test en cas d'erreur
        setProducts(testProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Défilement automatique du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Filtrage simple par recherche
  const filteredProducts = products.filter(product =>
    searchQuery === '' ||
    (product.title || product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.location?.city || product.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SimpleHeader 
        activeTab="marketing" 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 pb-8 pt-6">
        {/* Titre section produits avec bouton filtres mobile */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-normal text-gray-900">
            Produits & Services <span className="text-gray-500">({filteredProducts.length})</span>
          </h2>
          
          {/* Bouton filtres mobile */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtres
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filtres Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
              
              {/* Catégorie */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes les catégories</option>
                  <option value="vehicules">Véhicules</option>
                  <option value="pieces">Pièces & Accessoires</option>
                  <option value="services">Services</option>
                  <option value="assurances">Assurances</option>
                  <option value="formations">Formations</option>
                  <option value="equipements">Équipements</option>
                </select>
              </div>

              {/* Condition */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes conditions</option>
                  <option value="neuf">Neuf</option>
                  <option value="occasion">Occasion</option>
                  <option value="service">Service</option>
                </select>
              </div>

              {/* Ville */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes les villes</option>
                  <option value="abidjan">Abidjan</option>
                  <option value="bouake">Bouaké</option>
                  <option value="yamoussoukro">Yamoussoukro</option>
                  <option value="san-pedro">San-Pédro</option>
                </select>
              </div>

              {/* Prix */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fourchette de prix
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Tous les prix</option>
                  <option value="0-50000">0 - 50,000 FCFA</option>
                  <option value="50000-100000">50,000 - 100,000 FCFA</option>
                  <option value="100000-500000">100,000 - 500,000 FCFA</option>
                  <option value="500000+">500,000+ FCFA</option>
                </select>
              </div>

              {/* Bouton Réinitialiser */}
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1">
            {/* Liste des produits */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        )}
          </div>
        </div>
      </main>

      {/* Bouton Flottant (FAB) - Mobile uniquement */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        {/* Menu des options */}
        {showFabMenu && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 -z-10" 
              onClick={() => setShowFabMenu(false)}
            />
            
            {/* Options du menu */}
            <div className="absolute bottom-16 right-0 mb-2 space-y-3">
              {/* Option Marketing */}
              <Link
                to="/publier-offre?type=product"
                onClick={() => setShowFabMenu(false)}
                className="flex items-center gap-3 bg-white rounded-full shadow-lg pl-4 pr-5 py-3 hover:bg-gray-50 transition-all animate-fade-in"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">Marketing/Vente</span>
              </Link>

              {/* Option Offre d'emploi */}
              <Link
                to="/publier-offre?type=job"
                onClick={() => setShowFabMenu(false)}
                className="flex items-center gap-3 bg-white rounded-full shadow-lg pl-4 pr-5 py-3 hover:bg-gray-50 transition-all animate-fade-in"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M11 4V3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1ZM9 2.5H7a.5.5 0 0 0-.5.5v1h3V3a.5.5 0 0 0-.5-.5ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                    <path d="M3 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">Offre d'emploi</span>
              </Link>
            </div>
          </>
        )}

        {/* Bouton principal */}
        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className={`flex items-center justify-center w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all ${showFabMenu ? 'rotate-45' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
            />
          </svg>
        </button>
      </div>

      {/* Modal Filtres Mobile */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Filtres</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filtres */}
            <div className="p-4 space-y-3">
              {/* Catégorie */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Catégorie
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes les catégories</option>
                  <option value="vehicules">Véhicules</option>
                  <option value="pieces">Pièces & Accessoires</option>
                  <option value="services">Services</option>
                  <option value="assurances">Assurances</option>
                  <option value="formations">Formations</option>
                  <option value="equipements">Équipements</option>
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Condition
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes conditions</option>
                  <option value="neuf">Neuf</option>
                  <option value="occasion">Occasion</option>
                  <option value="service">Service</option>
                </select>
              </div>

              {/* Ville */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Ville
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes les villes</option>
                  <option value="abidjan">Abidjan</option>
                  <option value="bouake">Bouaké</option>
                  <option value="yamoussoukro">Yamoussoukro</option>
                  <option value="san-pedro">San-Pédro</option>
                </select>
              </div>

              {/* Prix */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Fourchette de prix
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Tous les prix</option>
                  <option value="0-50000">0 - 50,000 FCFA</option>
                  <option value="50000-100000">50,000 - 100,000 FCFA</option>
                  <option value="100000-500000">100,000 - 500,000 FCFA</option>
                  <option value="500000+">500,000+ FCFA</option>
                </select>
              </div>

              {/* Boutons */}
              <div className="flex gap-2 pt-3">
                <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Réinitialiser
                </button>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
