import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { driversService, offersApi } from '../services/api';
import SimpleHeader from '../component/common/SimpleHeader';
import Footer from '../component/common/Footer';
import OfferCard from '../component/common/OfferCard';

export default function HomePage() {
  const [drivers, setDrivers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Bannières publicitaires
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop',
      title: 'Recrutez en toute confiance',
      subtitle: 'Des chauffeurs professionnels vérifiés',
      link: '/auth'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1200&h=400&fit=crop',
      title: 'Trouvez votre chauffeur idéal',
      subtitle: 'Disponible 24/7 à Abidjan',
      link: '/auth'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=400&fit=crop',
      title: 'Service premium garanti',
      subtitle: 'Plus de 100 chauffeurs expérimentés',
      link: '/chauffeurs'
    }
  ];

  // Chauffeurs de test
  const testDrivers = [
    {
      _id: '1',
      firstName: 'Kouassi',
      lastName: 'Jean',
      rating: 4.8,
      totalRides: 156,
      experience: '5-10 ans d\'expérience',
      vehicleType: 'Berline',
      workZone: 'Cocody',
      isAvailable: true,
      profilePhotoUrl: null
    },
    {
      _id: '2',
      firstName: 'Koné',
      lastName: 'Ibrahim',
      rating: 4.9,
      totalRides: 203,
      experience: 'Plus de 10 ans d\'expérience',
      vehicleType: '4x4/SUV',
      workZone: 'Plateau',
      isAvailable: true,
      profilePhotoUrl: null
    },
    {
      _id: '3',
      firstName: 'Yao',
      lastName: 'Marie',
      rating: 4.7,
      totalRides: 98,
      experience: '3-5 ans d\'expérience',
      vehicleType: 'Berline',
      workZone: 'Marcory',
      isAvailable: false,
      profilePhotoUrl: null
    },
    {
      _id: '4',
      firstName: 'Traoré',
      lastName: 'Seydou',
      rating: 5.0,
      totalRides: 312,
      experience: 'Plus de 10 ans d\'expérience',
      vehicleType: 'Minibus',
      workZone: 'Yopougon',
      isAvailable: true,
      profilePhotoUrl: null
    },
    {
      _id: '5',
      firstName: 'N\'Guessan',
      lastName: 'Aya',
      rating: 4.6,
      totalRides: 67,
      experience: '1-3 ans d\'expérience',
      vehicleType: 'Berline',
      workZone: 'Abobo',
      isAvailable: true,
      profilePhotoUrl: null
    },
    {
      _id: '6',
      firstName: 'Bamba',
      lastName: 'Moussa',
      rating: 4.8,
      totalRides: 145,
      experience: '5-10 ans d\'expérience',
      vehicleType: 'Pick-up',
      workZone: 'Cocody',
      isAvailable: true,
      profilePhotoUrl: null
    }
  ];

  // Offres de test
  const testOffers = [
    {
      _id: '1',
      title: 'Chauffeur personnel',
      company: 'Entreprise Privée',
      location: 'Cocody, Abidjan',
      salary: '250,000 - 350,000 FCFA',
      type: 'CDI',
      workType: 'Temps plein',
      vehicleType: 'Berline',
      experience: '3-5 ans',
      postedDate: '2024-01-15'
    },
    {
      _id: '2',
      title: 'Chauffeur VIP',
      company: 'Hôtel 5 étoiles',
      location: 'Plateau, Abidjan',
      salary: '400,000 - 500,000 FCFA',
      type: 'CDI',
      workType: 'Temps plein',
      vehicleType: 'Véhicule de luxe',
      experience: '5-10 ans',
      postedDate: '2024-01-14'
    },
    {
      _id: '3',
      title: 'Chauffeur livreur',
      company: 'Société de logistique',
      location: 'Yopougon, Abidjan',
      salary: '180,000 - 220,000 FCFA',
      type: 'CDD',
      workType: 'Temps plein',
      vehicleType: 'Utilitaire',
      experience: '1-3 ans',
      postedDate: '2024-01-13'
    },
    {
      _id: '4',
      title: 'Chauffeur de direction',
      company: 'Multinationale',
      location: 'Marcory, Abidjan',
      salary: '350,000 - 450,000 FCFA',
      type: 'CDI',
      workType: 'Temps plein',
      vehicleType: '4x4/SUV',
      experience: '5-10 ans',
      postedDate: '2024-01-12'
    },
    {
      _id: '5',
      title: 'Chauffeur scolaire',
      company: 'École internationale',
      location: 'Cocody, Abidjan',
      salary: '200,000 - 280,000 FCFA',
      type: 'CDI',
      workType: 'Temps partiel',
      vehicleType: 'Minibus',
      experience: '3-5 ans',
      postedDate: '2024-01-11'
    },
    {
      _id: '6',
      title: 'Chauffeur taxi',
      company: 'Compagnie de taxi',
      location: 'Abobo, Abidjan',
      salary: '150,000 - 200,000 FCFA',
      type: 'Indépendant',
      workType: 'Flexible',
      vehicleType: 'Berline',
      experience: '1-3 ans',
      postedDate: '2024-01-10'
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
    }
  ];

  // Charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les chauffeurs (limité à 8 pour la page d'accueil)
        const driversResponse = await driversService.getAll();
        if (driversResponse.data && driversResponse.data.data && driversResponse.data.data.length > 0) {
          const allDrivers = driversResponse.data.data;
          setTotalDrivers(allDrivers.length); // Nombre total
          setDrivers(allDrivers.slice(0, 8)); // Afficher seulement 8
        } else {
          setDrivers(testDrivers);
          setTotalDrivers(testDrivers.length);
        }
        
        // Charger les offres (limité à 8 pour la page d'accueil)
        const offersResponse = await offersApi.list();
        console.log('Offres reçues (HomePage):', offersResponse);
        console.log('Structure:', offersResponse.data);
        
        // L'API retourne {offers: [...]} et non {data: [...]}
        if (offersResponse.data && offersResponse.data.offers && offersResponse.data.offers.length > 0) {
          const allOffers = offersResponse.data.offers;
          console.log('Nombre d\'offres:', allOffers.length);
          console.log('Première offre:', allOffers[0]);
          setTotalOffers(allOffers.length); // Nombre total
          setOffers(allOffers.slice(0, 8)); // Afficher seulement 8
        } else {
          console.log('Aucune offre API, utilisation des données de test');
          setOffers(testOffers);
          setTotalOffers(testOffers.length);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // Utiliser les données de test en cas d'erreur
        setDrivers(testDrivers);
        setTotalDrivers(testDrivers.length);
        setOffers(testOffers);
        setTotalOffers(testOffers.length);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Défilement automatique du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [banners.length]);

  // Filtrage simple par recherche
  const filteredDrivers = drivers.filter(driver =>
    searchQuery === '' ||
    `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.workZone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SimpleHeader 
        activeTab="accueil" 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Section publicitaire - Carrousel */}
      <div className="max-w-7xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        <div className="relative bg-gray-200 rounded-lg lg:rounded-xl overflow-hidden h-48 sm:h-64 lg:h-96">
          {/* Images du carrousel */}
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={banner.image} 
                alt={banner.title}
                onClick={() => navigate(banner.link)}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          ))}

          {/* Indicateurs de pagination */}
          <div className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 lg:gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 lg:h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-6 lg:w-8' 
                    : 'bg-white/50 w-1.5 lg:w-2'
                }`}
              />
            ))}
          </div>

          {/* Boutons de navigation - masqués sur mobile */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
            className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
            className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 pb-8">
        {/* Titre section chauffeurs */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-normal text-gray-900">
            Chauffeurs <span className="text-gray-500">({totalDrivers})</span>
          </h2>
          <Link 
            to="/drivers" 
            className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            Voir tout →
          </Link>
        </div>

        {/* Liste des chauffeurs */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        ) : filteredDrivers.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDrivers.map(driver => (
              <div 
                key={driver._id} 
                className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/driver/${driver._id}`)}
              >
                {/* Photo en haut */}
                <figure className="relative h-32 lg:h-48 bg-gray-100 overflow-hidden">
                  {driver.profilePhotoUrl ? (
                    <img 
                      src={driver.profilePhotoUrl} 
                      alt={`${driver.firstName} ${driver.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 lg:w-20 h-12 lg:h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </figure>

                {/* Contenu compact */}
                <div className="p-2 lg:p-4">
                  <h3 className="text-xs lg:text-base font-semibold text-gray-900 mb-1 truncate">
                    {driver.firstName} {driver.lastName}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs lg:text-sm font-bold text-gray-900">
                      {driver.rating ? driver.rating.toFixed(1) : '5.0'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {driver.totalRides || 0} courses
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span className="truncate">{driver.workZone || 'Abidjan'}</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 truncate">
                      {driver.vehicleType || 'Professionnel'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun chauffeur trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}

        {/* Section Offres d'emploi */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-2xl font-normal text-gray-900">
              Offres d'emploi <span className="text-gray-500">({totalOffers})</span>
            </h2>
            <Link 
              to="/offres"
              className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {offers.map(offer => (
              <OfferCard key={offer._id} offer={offer} />
            ))}
          </div>
        </div>

        {/* Section Marketing & Vente */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-2xl font-normal text-gray-900">
              Marketing & Vente <span className="text-gray-500">({testProducts.length})</span>
            </h2>
            <Link 
              to="/marketing-vente"
              className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {testProducts.map(product => (
              <div 
                key={product._id} 
                className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/produit/${product._id}`)}
              >
                {/* Image grande */}
                <figure className="relative h-32 lg:h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge catégorie sur l'image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </figure>

                {/* Contenu compact */}
                <div className="p-2 lg:p-4">
                  <h3 className="text-xs lg:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm lg:text-lg font-bold text-gray-900 mb-2">
                    {product.price}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span className="truncate">{product.location.split(',')[0]}</span>
                  </div>
                  
                  <div className="mt-1">
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {product.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
