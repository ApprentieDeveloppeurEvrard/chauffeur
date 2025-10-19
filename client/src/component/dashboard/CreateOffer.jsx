import { useState } from 'react';
import { offersApi } from '../../services/api';
import Modal from '../common/Modal';

// Style pour masquer la barre de défilement
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function CreateOffer({ showCreateForm, setShowCreateForm, onOfferCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    requirements: {
      licenseType: 'B',
      experience: '1-3 ans',
      vehicleType: ''
    },
    conditions: {
      salary: '',
      salaryType: 'horaire',
      workType: 'temps_plein',
      startDate: '',
      endDate: '',
      schedule: ''
    },
    location: {
      address: '',
      city: ''
    },
    contactInfo: {
      phone: '',
      email: '',
      preferredContact: 'platform'
    },
    isUrgent: false,
    tags: []
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validation spéciale pour le champ salaire (seuls les chiffres)
    if (name === 'conditions.salary') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: numericValue
        }
      }));
      return;
    }
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Le titre est obligatoire';
    if (!formData.description.trim()) newErrors.description = 'La description est obligatoire';
    if (!formData.type) newErrors.type = 'Le type de mission est obligatoire';
    if (!formData.location.city.trim()) newErrors.city = 'La zone géographique est obligatoire';
    if (!formData.conditions.startDate) newErrors.startDate = 'La date de début est obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Nettoyer les données avant envoi
      const cleanedData = { ...formData };
      
      // Ajouter le champ zone requis par le serveur (utiliser la valeur de city)
      cleanedData.requirements.zone = cleanedData.location.city;
      
      // Convertir le salaire en nombre s'il existe
      if (cleanedData.conditions.salary && cleanedData.conditions.salary.toString().trim() !== '') {
        cleanedData.conditions.salary = parseInt(cleanedData.conditions.salary, 10);
      } else {
        delete cleanedData.conditions.salary;
      }
      
      // Supprimer vehicleType s'il est vide pour éviter les erreurs d'enum
      if (!cleanedData.requirements.vehicleType || cleanedData.requirements.vehicleType === '') {
        delete cleanedData.requirements.vehicleType;
      }
      
      // Nettoyer les champs vides
      if (!cleanedData.conditions.endDate) {
        delete cleanedData.conditions.endDate;
      }
      if (!cleanedData.conditions.schedule || cleanedData.conditions.schedule.trim() === '') {
        delete cleanedData.conditions.schedule;
      }
      if (!cleanedData.location.address || cleanedData.location.address.trim() === '') {
        delete cleanedData.location.address;
      }
      
      // Validation finale des données
      if (!cleanedData.title || !cleanedData.description || !cleanedData.type || 
          !cleanedData.location?.city || !cleanedData.conditions?.startDate) {
        throw new Error('Champs obligatoires manquants');
      }
      
      console.log('Données envoyées:', cleanedData);
      const response = await offersApi.create(cleanedData);
      const result = response.data;
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        type: '',
        requirements: {
          licenseType: 'B',
          experience: '1-3 ans',
          vehicleType: ''
        },
        conditions: {
          salary: '',
          salaryType: 'horaire',
          workType: 'temps_plein',
          startDate: '',
          endDate: '',
          schedule: ''
        },
        location: {
          address: '',
          city: ''
        },
        contactInfo: {
          phone: '',
          email: '',
          preferredContact: 'platform'
        },
        isUrgent: false,
        tags: []
      });
      
      // Fermer le formulaire
      setShowCreateForm(false);
      
      // Notifier le parent
      if (onOfferCreated) {
        onOfferCreated(result.offer);
      }
      
      alert('Offre créée avec succès !');
      
    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Réponse du serveur:', error.response?.data);
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      
      let errorMessage = 'Erreur lors de la création de l\'offre';
      
      if (error.response?.status === 400) {
        errorMessage = 'Données invalides. Vérifiez les champs obligatoires.';
        if (error.response?.data?.details) {
          errorMessage += '\nDétails: ' + error.response.data.details.join(', ');
        }
      } else if (error.response?.status === 401) {
        errorMessage = 'Vous devez être connecté pour créer une offre.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
      } else if (error.response?.data?.error) {
        errorMessage += ': ' + error.response.data.error;
      } else if (error.message) {
        errorMessage += ': ' + error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Créer une nouvelle offre"
        size="lg"
      >
        <div className="max-h-[60vh] lg:max-h-[70vh] overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Titre de l'offre *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Chauffeur personnel pour Abidjan"
                className={`w-full p-2 lg:p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm lg:text-base ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Type et Durée */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 lg:mb-2">Type de mission *</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full p-2 lg:p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm lg:text-base ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Personnel">Transport personnel</option>
                  <option value="Livraison">Livraison</option>
                  <option value="VTC">VTC</option>
                  <option value="Transport">Transport</option>
                  <option value="Autre">Autre</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de travail</label>
                <select 
                  name="conditions.workType"
                  value={formData.conditions.workType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="temps_plein">Temps plein</option>
                  <option value="temps_partiel">Temps partiel</option>
                  <option value="ponctuel">Ponctuel</option>
                  <option value="weekend">Weekend</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Décrivez la mission, les horaires, les quartiers à desservir..."
                className={`w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Zone géographique et Salaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone géographique *</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Abidjan, Cocody..."
                  className={`w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salaire proposé</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="conditions.salary"
                    value={formData.conditions.salary}
                    onChange={handleInputChange}
                    placeholder="150000"
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <select 
                    name="conditions.salaryType"
                    value={formData.conditions.salaryType}
                    onChange={handleInputChange}
                    className="w-16 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                  >
                    <option value="horaire">/h</option>
                    <option value="journalier">/j</option>
                    <option value="mensuel">/m</option>
                    <option value="fixe">Fixe</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de début *</label>
                <input
                  type="date"
                  name="conditions.startDate"
                  value={formData.conditions.startDate}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin (optionnelle)</label>
                <input
                  type="date"
                  name="conditions.endDate"
                  value={formData.conditions.endDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Horaires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horaires</label>
              <input
                type="text"
                name="conditions.schedule"
                value={formData.conditions.schedule}
                onChange={handleInputChange}
                placeholder="Ex: 7h-19h, Flexible, Week-end..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Exigences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exigences</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Permis requis</label>
                  <select 
                    name="requirements.licenseType"
                    value={formData.requirements.licenseType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="A">Permis A (moto)</option>
                    <option value="B">Permis B (voiture)</option>
                    <option value="C">Permis C (poids lourd)</option>
                    <option value="D">Permis D (transport en commun)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Expérience</label>
                  <select 
                    name="requirements.experience"
                    value={formData.requirements.experience}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="1-3 ans">1-3 ans</option>
                    <option value="3-5 ans">3-5 ans</option>
                    <option value="5+ ans">5+ ans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Type de véhicule</label>
                  <select 
                    name="requirements.vehicleType"
                    value={formData.requirements.vehicleType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Aucune préférence</option>
                    <option value="berline">Berline</option>
                    <option value="suv">SUV</option>
                    <option value="utilitaire">Utilitaire</option>
                    <option value="moto">Moto</option>
                    <option value="van">Van</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                />
                <span className="ml-2 text-sm text-gray-600">Mission urgente</span>
              </label>
            </div>

            {/* Boutons */}
            <div className="flex flex-col lg:flex-row justify-end gap-3 pt-4 lg:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm lg:text-base"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full lg:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm lg:text-base"
              >
                {loading ? 'Création...' : 'Publier l\'offre'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
