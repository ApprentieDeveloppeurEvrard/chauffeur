import { useState } from 'react';

export default function ProductOfferForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Produit', // Type spécifique pour les produits
    
    // Informations produit (stockées dans tags ou description)
    category: '',
    price: '',
    brand: '',
    condition: 'new',
    stock: '',
    
    location: {
      address: '',
      city: 'Abidjan'
    },
    
    contactInfo: {
      phone: '',
      email: '',
      preferredContact: 'platform'
    },
    
    // Champs optionnels
    tags: [], // Pour catégorie, marque, etc.
    requirementsList: [], // Caractéristiques du produit
    benefits: [], // Avantages
    images: [], // URLs des images
    mainImage: '' // Image principale
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [imageFiles, setImageFiles] = useState([]); // Fichiers images temporaires

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Gérer les champs imbriqués (ex: location.city)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      alert('Vous ne pouvez ajouter que 5 images maximum');
      return;
    }

    // Créer des URLs temporaires pour prévisualisation
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImageFiles(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImageFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Uploader les images vers le serveur (Cloudinary, AWS S3, etc.)
    // et récupérer les URLs avant de soumettre le formulaire
    
    const dataToSubmit = {
      ...formData,
      // Les URLs des images seront ajoutées ici après upload
      images: imageFiles.map(img => img.preview), // Temporaire - à remplacer par les vraies URLs
      mainImage: imageFiles[0]?.preview || '' // Temporaire - à remplacer par la vraie URL
    };
    
    onSubmit(dataToSubmit);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Steps - Adapté mobile */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-semibold text-base sm:text-lg ${
                currentStep >= step 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 2 && (
                <div className={`flex-1 h-1 mx-1 sm:mx-2 ${
                  currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-600">
          <span>Informations produit</span>
          <span>Contact & Livraison</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Étape 1: Informations du produit */}
        {currentStep === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du produit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Ex: Pneus Michelin, Huile moteur..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Pièces auto">Pièces auto</option>
                  <option value="Accessoires">Accessoires</option>
                  <option value="Entretien">Produits d'entretien</option>
                  <option value="Électronique">Électronique</option>
                  <option value="Sécurité">Équipement de sécurité</option>
                  <option value="Services">Services</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (FCFA) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Prix unitaire"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Décrivez votre produit en détail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marque
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Nom de la marque"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  État <span className="text-red-500">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="new">Neuf</option>
                  <option value="like_new">Comme neuf</option>
                  <option value="good">Bon état</option>
                  <option value="fair">État correct</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock disponible <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Quantité"
              />
            </div>

            {/* Caractéristiques */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caractéristiques du produit
              </label>
              <textarea
                name="characteristics"
                value={formData.requirementsList.join('\n')}
                onChange={(e) => {
                  const lines = e.target.value.split('\n').filter(line => line.trim());
                  setFormData(prev => ({ ...prev, requirementsList: lines }));
                }}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Une caractéristique par ligne&#10;Ex:&#10;Garantie 2 ans&#10;Compatible tous véhicules&#10;Certifié ISO 9001"
              />
              <p className="mt-1 text-xs text-gray-500">Une caractéristique par ligne</p>
            </div>

            {/* Avantages / Spécifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avantages / Points forts
              </label>
              <textarea
                name="benefits"
                value={formData.benefits.join('\n')}
                onChange={(e) => {
                  const lines = e.target.value.split('\n').filter(line => line.trim());
                  setFormData(prev => ({ ...prev, benefits: lines }));
                }}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Un avantage par ligne&#10;Ex:&#10;Livraison rapide&#10;Prix compétitif&#10;Service après-vente"
              />
              <p className="mt-1 text-xs text-gray-500">Un avantage par ligne</p>
            </div>

            {/* Upload d'images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos du produit (max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
              >
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Cliquez pour ajouter des images
                  </p>
                </div>
              </label>

              {/* Prévisualisation des images */}
              {imageFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageFiles.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Aperçu ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          Image principale
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Étape 2: Contact & Livraison */}
        {currentStep === 2 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="contact@entreprise.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone de contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="+225 XX XX XX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville <span className="text-red-500">*</span>
              </label>
              <select
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="Abidjan">Abidjan</option>
                <option value="Bouaké">Bouaké</option>
                <option value="Yamoussoukro">Yamoussoukro</option>
                <option value="San-Pédro">San-Pédro</option>
                <option value="Daloa">Daloa</option>
                <option value="Korhogo">Korhogo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options de livraison <span className="text-red-500">*</span>
              </label>
              <select
                name="deliveryOptions"
                value={formData.deliveryOptions}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">Sélectionnez</option>
                <option value="pickup">Retrait sur place uniquement</option>
                <option value="delivery">Livraison disponible</option>
                <option value="both">Retrait ou livraison</option>
              </select>
            </div>
          </>
        )}

        {/* Navigation Buttons - Adapté mobile */}
        <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <span className="hidden sm:inline">← Précédent</span>
              <span className="sm:hidden">←</span>
            </button>
          )}
          
          {currentStep < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition-all font-medium shadow-md hover:shadow-lg text-sm"
            >
              <span className="hidden sm:inline">Suivant →</span>
              <span className="sm:hidden">→</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Publication...
                </>
              ) : (
                <>
                  Publier le produit
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
