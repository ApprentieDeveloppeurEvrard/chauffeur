import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '../component/common/SimpleHeader';
import JobOfferForm from '../component/forms/JobOfferForm';
import ProductOfferForm from '../component/forms/ProductOfferForm';

export default function CreateOfferPage() {
  const navigate = useNavigate();
  const [offerType, setOfferType] = useState(null); // 'job' ou 'product'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMobileFab, setShowMobileFab] = useState(false);

  const handleJobSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      console.log('Offre d\'emploi créée:', formData);
      // TODO: Implémenter l'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/offres');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      console.log('Produit créé:', formData);
      // TODO: Implémenter l'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/marketing-vente');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header complet sans sous-navigation */}
      <SimpleHeader readOnly={true} hideSubNav={true} />

      <main className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => offerType ? setOfferType(null) : navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Retour
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {!offerType ? 'Publier une offre' : offerType === 'job' ? 'Offre d\'emploi' : 'Produit Marketing & Vente'}
          </h1>
          <p className="text-gray-600">
            {!offerType ? 'Choisissez le type d\'offre à publier' : offerType === 'job' ? 'Trouvez le chauffeur idéal pour votre entreprise' : 'Vendez vos produits et services'}
          </p>
        </div>

        {/* Sélection du type d'offre - Masqué sur mobile */}
        {!offerType ? (
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offre d'emploi */}
            <button
              onClick={() => setOfferType('job')}
              className="group bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-orange-500 p-8 transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                  <svg className="w-10 h-10 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Offre d'emploi</h3>
                <p className="text-gray-600">Recrutez un chauffeur professionnel pour votre entreprise</p>
              </div>
            </button>

            {/* Marketing & Vente */}
            <button
              onClick={() => setOfferType('product')}
              className="group bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-orange-500 p-8 transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                  <svg className="w-10 h-10 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing & Vente</h3>
                <p className="text-gray-600">Vendez vos produits et services aux chauffeurs</p>
              </div>
            </button>
          </div>
        ) : (
          /* Card avec formulaire */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            {offerType === 'job' ? (
              <JobOfferForm 
                onSubmit={handleJobSubmit}
                loading={loading}
                error={error}
              />
            ) : (
              <ProductOfferForm 
                onSubmit={handleProductSubmit}
                loading={loading}
                error={error}
              />
            )}
          </div>
        )}
      </main>

      {/* Bouton FAB mobile - Affiché uniquement si aucun type n'est sélectionné */}
      {!offerType && (
        <>
          {/* Bouton principal */}
          <button
            onClick={() => setShowMobileFab(!showMobileFab)}
            className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
          >
            {showMobileFab ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
            )}
          </button>

          {/* Menu FAB */}
          {showMobileFab && (
            <>
              {/* Overlay */}
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowMobileFab(false)}
              />
              
              {/* Options du menu */}
              <div className="lg:hidden fixed bottom-24 right-6 z-50 space-y-3">
                {/* Marketing & Vente */}
                <button
                  onClick={() => {
                    setOfferType('product');
                    setShowMobileFab(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900 pr-2">Marketing/Vente</span>
                </button>

                {/* Offre d'emploi */}
                <button
                  onClick={() => {
                    setOfferType('job');
                    setShowMobileFab(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900 pr-2">Offre d'emploi</span>
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
