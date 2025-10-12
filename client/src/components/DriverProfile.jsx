import { useState, useEffect, useRef } from "react";

export default function DriverProfile({ onBackToHome }) {
    // État pour les données du profil
    const [profileData, setProfileData] = useState({
        name: "Kouassi Jean-Baptiste",
        email: "kouassi.jean@gmail.com",
        phone: "+225 07 12 34 56 78",
        location: "Abidjan, Cocody",
        vehicle: "Toyota Camry 2020",
        vehicleColor: "Noir",
        licensePlate: "AB 1234 CI",
        drivingLicense: "CI123456789",
        licenseExpiryDate: "2027-12-31",
        licenseCategory: "B",
        licenseRectoFile: null,
        licenseVersoFile: null,
        experience: "5",
        services: ["Personal", "Professional", "Airport"],
        languages: ["French", "English", "Baoulé"],
        price: "15000",
        availability: "Available now",
        bio: "Chauffeur professionnel avec 5 ans d'expérience. Service de qualité et ponctualité garantie.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    
    const languageDropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    // Options pour les services
    const availableServices = [
        "Personal", "Professional", "Airport", "Events", 
        "City Tours", "Shopping", "Medical", "VIP"
    ];

    // Options pour les langues
    const availableLanguages = [
        "French", "English", "Baoulé", "Dioula", "Arabic", "Spanish", 
        "Portuguese", "Italian", "German", "Mandarin", "Japanese", 
        "Russian", "Swahili", "Hausa", "Yoruba", "Igbo", "Amharic", 
        "Wolof", "Bambara", "Fulani", "Lingala", "Kikongo", "Akan"
    ];

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleServiceToggle = (service) => {
        setProfileData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleLanguageToggle = (language) => {
        setProfileData(prev => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter(l => l !== language)
                : [...prev.languages, language]
        }));
    };

    const handleFileUpload = (field, file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileData(prev => ({
                    ...prev,
                    [field]: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileData(prev => ({
                    ...prev,
                    avatar: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulation d'une sauvegarde
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setIsEditing(false);
        // Ici, vous ajouteriez l'appel API pour sauvegarder les données
        console.log("Profil sauvegardé:", profileData);
    };

    const calculateDropdownPosition = () => {
        if (dropdownButtonRef.current) {
            const buttonRect = dropdownButtonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const dropdownHeight = 300; // Hauteur approximative du dropdown
            const isMobile = window.innerWidth < 768; // md breakpoint
            
            if (isMobile) {
                setDropdownPosition('modal'); // Sur mobile, utiliser un modal
            } else {
                // Si pas assez d'espace en bas, ouvrir vers le haut
                if (buttonRect.bottom + dropdownHeight > viewportHeight - 50) {
                    setDropdownPosition('top');
                } else {
                    setDropdownPosition('bottom');
                }
            }
        }
    };

    const handleDropdownToggle = () => {
        if (!isLanguageDropdownOpen) {
            calculateDropdownPosition();
        }
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsLanguageDropdownOpen(false);
        // Ici, vous pourriez recharger les données depuis l'API
    };

    // Fermer le dropdown quand on clique à l'extérieur et gérer le redimensionnement
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Ne pas fermer si c'est un modal mobile
            if (dropdownPosition === 'modal') return;
            
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
                setIsLanguageDropdownOpen(false);
            }
        };

        const handleResize = () => {
            if (isLanguageDropdownOpen) {
                calculateDropdownPosition();
            }
        };

        const handleScroll = () => {
            if (isLanguageDropdownOpen && dropdownPosition !== 'modal') {
                calculateDropdownPosition();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape' && isLanguageDropdownOpen) {
                setIsLanguageDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        
        // Empêcher le scroll du body quand le modal mobile est ouvert
        if (isLanguageDropdownOpen && dropdownPosition === 'modal') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isLanguageDropdownOpen, dropdownPosition]);

    return (
        <div className="relative z-10 max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <div className="flex items-center justify-between mb-4 md:mb-0">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={() => onBackToHome && onBackToHome()}
                            className="hover:opacity-80 transition-opacity flex-shrink-0 p-2 md:p-0 -ml-2 md:ml-0"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Mon Profil</h1>
                    </div>
                    
                    {/* Boutons desktop */}
                    <div className="hidden md:block">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Modifier
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 border border-slate-500 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 text-sm font-semibold shadow-lg"
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sauvegarde...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Sauvegarder
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Boutons mobile - Affichés en bas sur mobile */}
                <div className="md:hidden">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-base font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Modifier le profil
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-base font-semibold shadow-lg"
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sauvegarde en cours...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Sauvegarder les modifications
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-full px-6 py-3 border border-slate-500 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors text-base font-medium flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Annuler les modifications
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Colonne de gauche - Photo et infos de base */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
                        {/* Photo de profil */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative">
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-600"
                                />
                                {isEditing && (
                                    <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleAvatarUpload(e.target.files[0])}
                                            className="hidden"
                                        />
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </label>
                                )}
                            </div>
                            
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="mt-4 text-xl font-bold text-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <h2 className="mt-4 text-xl font-bold text-white text-center">{profileData.name}</h2>
                            )}
                            
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-slate-300 text-sm">4.8 (127 avis)</span>
                            </div>
                        </div>

                        {/* Statut de disponibilité */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Disponibilité</label>
                            {isEditing ? (
                                <select
                                    value={profileData.availability}
                                    onChange={(e) => handleInputChange('availability', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Available now">Disponible maintenant</option>
                                    <option value="Available in 30 min">Disponible dans 30 min</option>
                                    <option value="Available in 1 hour">Disponible dans 1 heure</option>
                                    <option value="Available tomorrow">Disponible demain</option>
                                    <option value="Not available">Non disponible</option>
                                </select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-white">{profileData.availability}</span>
                                </div>
                            )}
                        </div>

                        {/* Prix */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Tarif (CFA/heure)</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={profileData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <div className="text-2xl font-bold text-blue-300">{profileData.price} CFA/heure</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Colonne de droite - Informations détaillées */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Informations personnelles */}
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Informations personnelles</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white">{profileData.email}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white">{profileData.phone}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Localisation</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white">{profileData.location}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Expérience (années)</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={profileData.experience}
                                        onChange={(e) => handleInputChange('experience', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white">{profileData.experience} ans</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Biographie</label>
                            {isEditing ? (
                                <textarea
                                    value={profileData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                                    placeholder="Décrivez votre expérience et vos services..."
                                />
                            ) : (
                                <p className="text-white">{profileData.bio}</p>
                            )}
                        </div>
                    </div>

                    {/* Informations du véhicule */}
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Véhicule</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Modèle</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.vehicle}
                                        onChange={(e) => handleInputChange('vehicle', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white">{profileData.vehicle}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Couleur</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.vehicleColor}
                                        onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white">{profileData.vehicleColor}</p>
                                )}
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Plaque d'immatriculation</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.licensePlate}
                                        onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-white font-mono">{profileData.licensePlate}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Permis de conduire */}
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Permis de conduire
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Numéro de permis</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.drivingLicense}
                                        onChange={(e) => handleInputChange('drivingLicense', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Ex: CI123456789"
                                    />
                                ) : (
                                    <p className="text-white font-mono">{profileData.drivingLicense}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie</label>
                                {isEditing ? (
                                    <select
                                        value={profileData.licenseCategory}
                                        onChange={(e) => handleInputChange('licenseCategory', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="A">A - Moto</option>
                                        <option value="B">B - Voiture</option>
                                        <option value="C">C - Poids lourd</option>
                                        <option value="D">D - Transport en commun</option>
                                    </select>
                                ) : (
                                    <p className="text-white">
                                        Catégorie {profileData.licenseCategory}
                                        {profileData.licenseCategory === 'A' && ' - Moto'}
                                        {profileData.licenseCategory === 'B' && ' - Voiture'}
                                        {profileData.licenseCategory === 'C' && ' - Poids lourd'}
                                        {profileData.licenseCategory === 'D' && ' - Transport en commun'}
                                    </p>
                                )}
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Date d'expiration</label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        value={profileData.licenseExpiryDate}
                                        onChange={(e) => handleInputChange('licenseExpiryDate', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-white">
                                            {new Date(profileData.licenseExpiryDate).toLocaleDateString('fr-FR')}
                                        </p>
                                        {new Date(profileData.licenseExpiryDate) > new Date() ? (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
                                                Valide
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs border border-red-500/30">
                                                Expiré
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Upload des documents */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-3">Documents du permis</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Recto */}
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-2">Recto du permis</label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors bg-slate-700/50">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload('licenseRectoFile', e.target.files[0])}
                                                        className="hidden"
                                                    />
                                                    {profileData.licenseRectoFile ? (
                                                        <img
                                                            src={profileData.licenseRectoFile}
                                                            alt="Recto du permis"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center">
                                                            <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className="text-xs text-slate-400 text-center">Cliquez pour uploader le recto</p>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="w-full h-32 bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                                                {profileData.licenseRectoFile ? (
                                                    <img
                                                        src={profileData.licenseRectoFile}
                                                        alt="Recto du permis"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <svg className="w-6 h-6 text-slate-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <p className="text-xs text-slate-500">Aucun document</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Verso */}
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-2">Verso du permis</label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors bg-slate-700/50">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload('licenseVersoFile', e.target.files[0])}
                                                        className="hidden"
                                                    />
                                                    {profileData.licenseVersoFile ? (
                                                        <img
                                                            src={profileData.licenseVersoFile}
                                                            alt="Verso du permis"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center">
                                                            <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className="text-xs text-slate-400 text-center">Cliquez pour uploader le verso</p>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="w-full h-32 bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                                                {profileData.licenseVersoFile ? (
                                                    <img
                                                        src={profileData.licenseVersoFile}
                                                        alt="Verso du permis"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <svg className="w-6 h-6 text-slate-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <p className="text-xs text-slate-500">Aucun document</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {isEditing && (
                                    <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <div>
                                                <p className="text-yellow-300 text-xs font-medium">Important</p>
                                                <p className="text-yellow-200 text-xs">Assurez-vous que les photos sont claires et que toutes les informations sont lisibles.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Services proposés */}
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Services proposés</h3>
                        
                        {isEditing ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {availableServices.map((service) => (
                                    <label key={service} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profileData.services.includes(service)}
                                            onChange={() => handleServiceToggle(service)}
                                            className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-white">{service}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profileData.services.map((service, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Langues parlées */}
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Langues parlées</h3>
                        
                        {isEditing ? (
                            <div className="relative" ref={languageDropdownRef}>
                                {/* Dropdown Button */}
                                <button
                                    ref={dropdownButtonRef}
                                    type="button"
                                    onClick={handleDropdownToggle}
                                    className={`w-full px-4 py-3 bg-slate-700 border-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between transition-all duration-200 ${
                                        isLanguageDropdownOpen 
                                            ? 'border-blue-500 bg-slate-600 shadow-lg' 
                                            : 'border-slate-500 hover:border-slate-400 hover:bg-slate-600'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        <span className="text-left font-medium">
                                            {profileData.languages.length > 0 
                                                ? `${profileData.languages.length} langue${profileData.languages.length > 1 ? 's' : ''} sélectionnée${profileData.languages.length > 1 ? 's' : ''}`
                                                : "Sélectionner des langues"
                                            }
                                        </span>
                                    </div>
                                    <svg 
                                        className={`w-5 h-5 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu - Desktop */}
                                {isLanguageDropdownOpen && dropdownPosition !== 'modal' && (
                                    <div className={`absolute z-[100] w-full bg-slate-800 border-2 border-slate-500 rounded-xl shadow-2xl max-h-64 overflow-hidden backdrop-blur-sm ${
                                        dropdownPosition === 'top' 
                                            ? 'bottom-full mb-2' 
                                            : 'top-full mt-2'
                                    }`}>
                                        {/* Header du dropdown */}
                                        <div className="bg-slate-700 px-4 py-2 border-b border-slate-600">
                                            <p className="text-sm font-medium text-white">Sélectionner les langues</p>
                                        </div>
                                        
                                        {/* Liste scrollable */}
                                        <div className="max-h-48 overflow-y-auto p-2 bg-slate-800">
                                            {availableLanguages.map((language) => (
                                                <label 
                                                    key={language} 
                                                    className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-200 group"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={profileData.languages.includes(language)}
                                                        onChange={() => handleLanguageToggle(language)}
                                                        className="w-4 h-4 text-blue-500 bg-slate-700 border-2 border-slate-500 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
                                                    />
                                                    <span className="text-sm text-white flex-1 group-hover:text-blue-200 transition-colors">{language}</span>
                                                    {profileData.languages.includes(language) && (
                                                        <div className="bg-blue-500 rounded-full p-1">
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                        
                                        {/* Actions du dropdown */}
                                        <div className="bg-slate-700 border-t-2 border-slate-600 p-3 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfileData(prev => ({ ...prev, languages: [] }));
                                                }}
                                                className="flex-1 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
                                            >
                                                Tout désélectionner
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsLanguageDropdownOpen(false)}
                                                className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg"
                                            >
                                                Terminé
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Modal Mobile */}
                                {isLanguageDropdownOpen && dropdownPosition === 'modal' && (
                                    <div 
                                        className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
                                        onClick={(e) => {
                                            if (e.target === e.currentTarget) {
                                                setIsLanguageDropdownOpen(false);
                                            }
                                        }}
                                    >
                                        <div className="w-full max-w-md bg-slate-800 rounded-t-3xl shadow-2xl border-t-2 border-slate-500 max-h-[80vh] overflow-hidden transform transition-transform duration-300 ease-out translate-y-0">
                                            {/* Header du modal */}
                                            <div className="bg-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-white">Langues parlées</h3>
                                                <button
                                                    onClick={() => setIsLanguageDropdownOpen(false)}
                                                    className="p-2 hover:bg-slate-600 rounded-full transition-colors"
                                                >
                                                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            {/* Compteur de sélection */}
                                            <div className="px-6 py-3 bg-slate-750 border-b border-slate-600">
                                                <p className="text-sm text-slate-300">
                                                    {profileData.languages.length > 0 
                                                        ? `${profileData.languages.length} langue${profileData.languages.length > 1 ? 's' : ''} sélectionnée${profileData.languages.length > 1 ? 's' : ''}`
                                                        : "Aucune langue sélectionnée"
                                                    }
                                                </p>
                                            </div>
                                            
                                            {/* Liste scrollable */}
                                            <div className="flex-1 overflow-y-auto p-4 bg-slate-800 max-h-96">
                                                <div className="space-y-2">
                                                    {availableLanguages.map((language) => (
                                                        <label 
                                                            key={language} 
                                                            className="flex items-center gap-4 p-4 hover:bg-slate-700 rounded-xl cursor-pointer transition-all duration-200 group border border-transparent hover:border-slate-600"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={profileData.languages.includes(language)}
                                                                onChange={() => handleLanguageToggle(language)}
                                                                className="w-5 h-5 text-blue-500 bg-slate-700 border-2 border-slate-500 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
                                                            />
                                                            <span className="text-base text-white flex-1 group-hover:text-blue-200 transition-colors font-medium">{language}</span>
                                                            {profileData.languages.includes(language) && (
                                                                <div className="bg-blue-500 rounded-full p-1.5">
                                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Actions du modal */}
                                            <div className="bg-slate-700 border-t-2 border-slate-600 p-4 space-y-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setProfileData(prev => ({ ...prev, languages: [] }));
                                                    }}
                                                    className="w-full px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-600 rounded-xl transition-all duration-200 border border-slate-600 hover:border-slate-500"
                                                >
                                                    Tout désélectionner
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLanguageDropdownOpen(false)}
                                                    className="w-full px-4 py-3 text-base bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all duration-200 font-semibold shadow-lg"
                                                >
                                                    Terminé ({profileData.languages.length})
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Langues sélectionnées */}
                                {profileData.languages.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {profileData.languages.map((language, index) => (
                                            <span 
                                                key={index} 
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30"
                                            >
                                                {language}
                                                <button
                                                    type="button"
                                                    onClick={() => handleLanguageToggle(language)}
                                                    className="ml-1 hover:text-indigo-100 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profileData.languages.map((language, index) => (
                                    <span key={index} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30">
                                        {language}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
