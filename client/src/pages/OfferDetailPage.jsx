import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SimpleHeader from '../component/common/SimpleHeader';
import { offersApi } from '../services/api';

export default function OfferDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Offres de test (mêmes que OffersPage)
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
      licenseType: 'B',
      description: 'Nous recherchons un chauffeur personnel expérimenté pour assurer le transport quotidien de notre dirigeant. Vous serez responsable de la conduite en toute sécurité, de l\'entretien du véhicule et de la planification des itinéraires.',
      requirements: [
        'Permis de conduire catégorie B valide',
        '3 à 5 ans d\'expérience en tant que chauffeur',
        'Excellente connaissance d\'Abidjan',
        'Ponctualité et discrétion',
        'Présentation soignée'
      ],
      benefits: [
        'Salaire attractif',
        'Assurance santé',
        'Congés payés',
        'Formation continue',
        'Véhicule de fonction'
      ],
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
      licenseType: 'B',
      description: 'Hôtel de luxe recherche chauffeur VIP pour le transport de clients prestigieux. Service haut de gamme requis avec excellente présentation et maîtrise de l\'anglais.',
      requirements: [
        'Permis de conduire catégorie B',
        'Minimum 5 ans d\'expérience',
        'Maîtrise de l\'anglais',
        'Excellente présentation',
        'Expérience avec véhicules de luxe'
      ],
      benefits: [
        'Salaire très attractif',
        'Pourboires',
        'Assurance complète',
        'Uniforme fourni',
        'Repas sur place'
      ],
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
      licenseType: 'B',
      description: 'Société de logistique en expansion recrute chauffeur livreur pour assurer la livraison de colis dans la région d\'Abidjan. Respect des délais et bon relationnel client requis.',
      requirements: [
        'Permis B valide',
        '1 à 3 ans d\'expérience',
        'Bonne connaissance d\'Abidjan',
        'Sens de l\'organisation',
        'Bon relationnel'
      ],
      benefits: [
        'Salaire fixe + primes',
        'Véhicule fourni',
        'Carburant pris en charge',
        'Assurance',
        'Évolution possible'
      ],
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
      licenseType: 'B',
      description: 'Grande entreprise internationale recherche chauffeur de direction pour assurer le transport de cadres supérieurs. Discrétion absolue et grande disponibilité requises.',
      requirements: [
        'Permis B depuis plus de 5 ans',
        'Expérience significative',
        'Discrétion professionnelle',
        'Disponibilité horaires flexibles',
        'Maîtrise du français et anglais'
      ],
      benefits: [
        'Package salarial attractif',
        'Assurance groupe',
        'Mutuelle famille',
        'Prime de fin d\'année',
        'Plan de carrière'
      ],
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
      licenseType: 'B',
      description: 'École internationale recherche chauffeur pour le transport scolaire. Patience avec les enfants et conduite sécuritaire primordiales.',
      requirements: [
        'Permis B valide',
        'Expérience transport de personnes',
        'Patience avec les enfants',
        'Casier judiciaire vierge',
        'Ponctualité exemplaire'
      ],
      benefits: [
        'Horaires adaptés',
        'Vacances scolaires',
        'Environnement familial',
        'Assurance',
        'Stabilité'
      ],
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
      licenseType: 'B',
      description: 'Compagnie de taxi recrute chauffeurs indépendants. Horaires flexibles, revenus basés sur l\'activité. Véhicule peut être fourni.',
      requirements: [
        'Permis B',
        'Connaissance d\'Abidjan',
        'Bon relationnel',
        'Smartphone',
        'Disponibilité'
      ],
      benefits: [
        'Horaires flexibles',
        'Revenus attractifs',
        'Véhicule disponible',
        'Formation fournie',
        'Indépendance'
      ],
      postedDate: '2024-01-10'
    }
  ];

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        console.log('Chargement de l\'offre avec ID:', id);
        
        // Essayer de charger depuis l'API
        const response = await offersApi.list();
        console.log('Réponse API complète:', response);
        console.log('Offres dans la réponse:', response.data?.offers);
        
        let foundOffer = null;
        
        // L'API retourne {offers: [...]}
        if (response.data && response.data.offers) {
          foundOffer = response.data.offers.find(o => o._id === id);
          console.log('Offre trouvée dans l\'API:', foundOffer);
        }
        
        // Si pas trouvé dans l'API, chercher dans les offres de test
        if (!foundOffer) {
          console.log('Recherche dans les offres de test...');
          foundOffer = testOffers.find(o => o._id === id);
          console.log('Offre trouvée dans les tests:', foundOffer);
        }
        
        if (foundOffer) {
          console.log('Offre finale à afficher:', foundOffer);
          setOffer(foundOffer);
          setError(null);
        } else {
          console.error('Aucune offre trouvée avec l\'ID:', id);
          setError('Offre non trouvée');
        }
      } catch (err) {
        console.error('Erreur lors du chargement:', err);
        // En cas d'erreur API, utiliser les offres de test
        const foundOffer = testOffers.find(o => o._id === id);
        if (foundOffer) {
          console.log('Utilisation de l\'offre de test après erreur:', foundOffer);
          setOffer(foundOffer);
          setError(null);
        } else {
          setError('Impossible de charger l\'offre');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Offre non trouvée</h2>
          <Link to="/offres" className="text-gray-600 hover:text-gray-900">
            Retour aux offres
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SimpleHeader activeTab="offres" readOnly={true} />

      {/* Contenu - Style fiche produit */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Détails de l'offre */}
          <div className="lg:col-span-2">
            {/* En-tête */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 mb-6">
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                {offer.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{offer.company}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                  {offer.contractType || offer.type || 'CDI'}
                </span>
                {offer.type && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                    {offer.type}
                  </span>
                )}
                {(offer.conditions?.workType || offer.workType) && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                    {offer.conditions?.workType?.replace('_', ' ') || offer.workType}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Publié le {new Date(offer.createdAt || offer.postedDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 mb-6">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Description du poste</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{offer.description}</p>
            </div>

            {/* Exigences */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 mb-6">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Profil recherché</h2>
              <ul className="space-y-2">
                {/* Afficher les exigences selon la structure */}
                {(offer.requirementsList && Array.isArray(offer.requirementsList)) ? (
                  offer.requirementsList.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))
                ) : Array.isArray(offer.requirements) ? (
                  offer.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))
                ) : offer.requirements ? (
                  <>
                    {offer.requirements.licenseType && (
                      <li className="flex items-start gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Permis de conduire catégorie {offer.requirements.licenseType}</span>
                      </li>
                    )}
                    {offer.requirements.experience && (
                      <li className="flex items-start gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Expérience: {offer.requirements.experience}</span>
                      </li>
                    )}
                    {offer.requirements.vehicleType && (
                      <li className="flex items-start gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Véhicule: {offer.requirements.vehicleType}</span>
                      </li>
                    )}
                    {offer.requirements.zone && (
                      <li className="flex items-start gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Zone: {offer.requirements.zone}</span>
                      </li>
                    )}
                  </>
                ) : null}
              </ul>
            </div>

            {/* Avantages */}
            {offer.benefits && Array.isArray(offer.benefits) && offer.benefits.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Avantages</h2>
                <ul className="space-y-2">
                  {offer.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Colonne latérale - Informations et action */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              {/* Informations clés */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Localisation</p>
                    <p className="text-sm font-medium text-gray-900">
                      {offer.location?.address && offer.location?.city 
                        ? `${offer.location.address}, ${offer.location.city}`
                        : offer.location?.city || offer.location || 'Non spécifié'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Salaire</p>
                    <p className="text-sm font-medium text-gray-900">
                      {offer.salaryRange || (offer.conditions?.salary ? `${offer.conditions.salary.toLocaleString()} FCFA` : offer.salary || 'À négocier')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Type de véhicule</p>
                    <p className="text-sm font-medium text-gray-900">
                      {offer.requirements?.vehicleType || offer.vehicleType || 'Non spécifié'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Expérience requise</p>
                    <p className="text-sm font-medium text-gray-900">
                      {offer.requirements?.experience || offer.experience || 'Non spécifié'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Permis</p>
                    <p className="text-sm font-medium text-gray-900">
                      Permis {offer.requirements?.licenseType || offer.licenseType || 'B'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bouton d'action */}
              <div className="space-y-3">
                <Link
                  to="/register"
                  className="block w-full py-3 bg-orange-500 text-white text-center font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Postuler à cette offre
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  Créez un compte gratuit pour postuler
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
