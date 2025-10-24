import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DetailHeader from '../component/common/DetailHeader';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Produits de test (mêmes que MarketingVentePage)
  const testProducts = [
    {
      _id: '1',
      name: 'Véhicule Toyota Corolla 2018',
      category: 'Véhicules',
      price: '8,500,000 FCFA',
      location: 'Cocody, Abidjan',
      condition: 'Occasion',
      seller: 'Jean Kouassi',
      sellerPhone: '+225 07 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
      ],
      description: 'Toyota Corolla 2018 en excellent état. Véhicule bien entretenu avec historique complet. Climatisation, vitres électriques, système audio moderne. Kilométrage : 85,000 km. Contrôle technique à jour.',
      features: [
        'Climatisation automatique',
        'Vitres électriques',
        'Système audio Bluetooth',
        'Airbags avant et latéraux',
        'ABS et ESP',
        'Jantes en alliage'
      ],
      specifications: {
        'Année': '2018',
        'Kilométrage': '85,000 km',
        'Carburant': 'Essence',
        'Transmission': 'Automatique',
        'Couleur': 'Gris métallisé',
        'Nombre de places': '5'
      },
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
      sellerPhone: '+225 05 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop'
      ],
      description: 'Large gamme de pièces détachées neuves pour toutes marques de véhicules. Qualité garantie, prix compétitifs. Livraison disponible sur Abidjan.',
      features: [
        'Pièces d\'origine',
        'Garantie 6 mois',
        'Livraison rapide',
        'Installation possible',
        'Stock permanent'
      ],
      specifications: {
        'Type': 'Pièces neuves',
        'Marques': 'Toutes marques',
        'Garantie': '6 mois',
        'Livraison': 'Disponible'
      },
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
      sellerPhone: '+225 01 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop'
      ],
      description: 'Service de nettoyage automobile professionnel. Nettoyage complet intérieur et extérieur, lavage moteur, polish, cirage. Équipe expérimentée et produits de qualité.',
      features: [
        'Nettoyage intérieur complet',
        'Lavage extérieur',
        'Aspiration profonde',
        'Nettoyage des sièges',
        'Polish et cirage',
        'Désodorisation'
      ],
      specifications: {
        'Durée': '2-3 heures',
        'Type': 'Nettoyage complet',
        'Produits': 'Professionnels',
        'Équipe': 'Expérimentée'
      },
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
      sellerPhone: '+225 27 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop'
      ],
      description: 'Assurance automobile tous risques. Couverture complète incluant dommages, vol, incendie, bris de glace. Assistance 24/7, remorquage inclus.',
      features: [
        'Tous risques',
        'Vol et incendie',
        'Bris de glace',
        'Assistance 24/7',
        'Remorquage inclus',
        'Véhicule de remplacement'
      ],
      specifications: {
        'Type': 'Tous risques',
        'Franchise': 'Variable',
        'Assistance': '24/7',
        'Durée': '1 an renouvelable'
      },
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
      sellerPhone: '+225 07 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop'
      ],
      description: 'Formation professionnelle de conduite défensive sur 5 jours. Théorie et pratique, certificat délivré en fin de formation. Formateurs expérimentés.',
      features: [
        'Formation de 5 jours',
        'Théorie et pratique',
        'Certificat officiel',
        'Formateurs certifiés',
        'Petits groupes',
        'Suivi personnalisé'
      ],
      specifications: {
        'Durée': '5 jours',
        'Horaires': '8h-17h',
        'Certificat': 'Oui',
        'Groupe': 'Max 10 personnes'
      },
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
      sellerPhone: '+225 05 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop'
      ],
      description: 'Kit complet de sécurité routière conforme aux normes. Triangle de signalisation, gilet réfléchissant, extincteur, trousse de secours.',
      features: [
        'Triangle de signalisation',
        'Gilet réfléchissant',
        'Extincteur 2kg',
        'Trousse de secours',
        'Câbles de démarrage',
        'Lampe de poche'
      ],
      specifications: {
        'Normes': 'Conformes',
        'Garantie': '1 an',
        'État': 'Neuf',
        'Livraison': 'Gratuite'
      },
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
      sellerPhone: '+225 01 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
      ],
      description: 'GPS automobile professionnel avec cartographie complète de l\'Afrique. Écran tactile 7 pouces, mises à jour gratuites à vie, alertes radars.',
      features: [
        'Écran 7 pouces tactile',
        'Cartographie Afrique',
        'Mises à jour gratuites',
        'Alertes radars',
        'Bluetooth',
        'Commande vocale'
      ],
      specifications: {
        'Écran': '7 pouces',
        'Mémoire': '16 GB',
        'Batterie': '2 heures',
        'Garantie': '2 ans'
      },
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
      sellerPhone: '+225 07 XX XX XX XX',
      images: [
        'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop'
      ],
      description: 'Révision complète de votre véhicule incluant vidange, changement filtres, vérification freins, contrôle suspension. Garage équipé, mécaniciens qualifiés.',
      features: [
        'Vidange moteur',
        'Changement filtres',
        'Vérification freins',
        'Contrôle suspension',
        'Diagnostic électronique',
        'Rapport détaillé'
      ],
      specifications: {
        'Durée': '2-3 heures',
        'Garantie': '3 mois',
        'Pièces': 'Qualité garantie',
        'Équipement': 'Moderne'
      },
      postedDate: '2024-01-08'
    }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const foundProduct = testProducts.find(p => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Produit non trouvé');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger le produit');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
          <Link to="/marketing-vente" className="text-gray-600 hover:text-gray-900">
            Retour à la marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DetailHeader activeTab="marketing" />

      {/* Contenu - Style fiche produit */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Images */}
          <div>
            {/* Image principale */}
            <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badge catégorie */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Navigation images si plusieurs */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow-md transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow-md transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-24 bg-gray-100 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-gray-900' : ''
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite - Informations */}
          <div>
            {/* En-tête */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                {product.price}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>{product.location}</span>
                </div>
                <span>•</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Caractéristiques */}
            {product.features && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Caractéristiques</h2>
                <ul className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Spécifications */}
            {product.specifications && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Spécifications</h2>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">{key}</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vendeur */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Vendeur</h2>
              <p className="text-gray-900 font-medium mb-2">{product.seller}</p>
              <p className="text-sm text-gray-600 mb-4">{product.sellerPhone}</p>
              <Link
                to="/register"
                className="block w-full py-3 bg-orange-500 text-white text-center font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Contacter le vendeur
              </Link>
            </div>

            {/* Info */}
            <p className="text-xs text-gray-500 text-center">
              Publié le {new Date(product.postedDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
