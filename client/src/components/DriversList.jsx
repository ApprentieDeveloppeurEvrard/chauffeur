import { useState, useEffect } from "react";

export default function DriversList({ onBackToHome }) {
    // Mock data for drivers
    const [drivers] = useState([
        {
            id: 1,
            name: "Kouassi Jean-Baptiste",
            rating: 4.8,
            reviews: 127,
            experience: "5 years",
            vehicle: "Toyota Camry 2020",
            services: ["Personal", "Professional", "Airport"],
            location: "Abidjan, Cocody",
            price: "15,000 CFA/hour",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
            verified: true,
            languages: ["French", "English", "Baoulé"],
            availability: "Available now"
        },
        {
            id: 2,
            name: "Aminata Traoré",
            rating: 4.9,
            reviews: 89,
            experience: "3 years",
            vehicle: "Honda Accord 2019",
            services: ["Personal", "Events", "City Tours"],
            location: "Abidjan, Plateau",
            price: "12,000 CFA/hour",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
            verified: true,
            languages: ["French", "English"],
            availability: "Available in 30 min"
        },
        {
            id: 3,
            name: "Ibrahim Ouattara",
            rating: 4.7,
            reviews: 156,
            experience: "7 years",
            vehicle: "Mercedes E-Class 2021",
            services: ["Professional", "VIP", "Airport"],
            location: "Abidjan, Marcory",
            price: "25,000 CFA/hour",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
            verified: true,
            languages: ["French", "English", "Arabic"],
            availability: "Available now"
        },
        {
            id: 4,
            name: "Marie-Claire Koffi",
            rating: 4.6,
            reviews: 73,
            experience: "4 years",
            vehicle: "Nissan Altima 2020",
            services: ["Personal", "Shopping", "Medical"],
            location: "Bouaké, Centre",
            price: "10,000 CFA/hour",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
            verified: false,
            languages: ["French", "Baoulé"],
            availability: "Available tomorrow"
        }
    ]);

    const [selectedDriver, setSelectedDriver] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState(drivers);
    const [showFilters, setShowFilters] = useState(false);

    const handleBookDriver = (driver) => {
        console.log("Booking driver:", driver);
        // Add booking logic here
    };

    const handleViewProfile = (driver) => {
        setSelectedDriver(driver);
        document.getElementById('driver_profile_modal').showModal();
        console.log("Viewing profile:", driver);
    };

    const handleContactDriver = (driver) => {
        console.log("Contacting driver:", driver);
        // Add contact logic here (phone, WhatsApp, etc.)
    };

    // Filter logic
    useEffect(() => {
        let filtered = drivers.filter(driver => {
            // Search in multiple fields
            const matchesSearch = searchTerm === '' || 
                driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                driver.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                driver.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesLocation = locationFilter === '' || driver.location.includes(locationFilter);
            const matchesService = serviceFilter === '' || driver.services.includes(serviceFilter);
            const matchesAvailability = availabilityFilter === '' || driver.availability.includes(availabilityFilter);
            const matchesRating = ratingFilter === '' || driver.rating >= parseFloat(ratingFilter);
            
            // Price filter logic
            const matchesPrice = priceFilter === '' || (() => {
                const driverPrice = parseInt(driver.price.replace(/[^\d]/g, ''));
                switch(priceFilter) {
                    case 'low': return driverPrice <= 15000;
                    case 'medium': return driverPrice > 15000 && driverPrice <= 20000;
                    case 'high': return driverPrice > 20000;
                    default: return true;
                }
            })();
            
            return matchesSearch && matchesLocation && matchesService && matchesAvailability && matchesRating && matchesPrice;
        });
        
        setFilteredDrivers(filtered);
    }, [searchTerm, locationFilter, serviceFilter, availabilityFilter, ratingFilter, priceFilter, drivers]);

    // Get unique values for filter options
    const uniqueLocations = [...new Set(drivers.map(driver => driver.location))];
    const uniqueServices = [...new Set(drivers.flatMap(driver => driver.services))];
    const uniqueAvailability = [...new Set(drivers.map(driver => driver.availability))];

    const clearFilters = () => {
        setSearchTerm('');
        setLocationFilter('');
        setServiceFilter('');
        setAvailabilityFilter('');
        setRatingFilter('');
        setPriceFilter('');
    };

    return (
        <div className="relative z-10 max-w-7xl mx-auto p-6">
            {/* Desktop: Logo and Centered Filters */}
            <div className="mb-6 hidden lg:flex flex-row gap-4 items-center max-w-6xl mx-auto">
                {/* Logo à gauche */}
                <button
                    onClick={() => onBackToHome && onBackToHome()}
                    className="hover:opacity-80 transition-opacity flex-shrink-0"
                >
                    <svg
                        width="100"
                        height="26"
                        viewBox="0 0 155 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754"
                            stroke="#fff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Filtres centrés */}
                <div className="flex flex-row gap-3 items-center justify-center flex-1">
                    {/* Search Bar */}
                    <div className="relative">
                        <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 pr-3 py-2 w-64 bg-white/10 border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-white/40 text-sm"
                        />
                    </div>

                    {/* Location Filter */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-sm bg-slate-700 border-slate-600 text-white hover:bg-slate-600 rounded-full">
                            {locationFilter ? locationFilter.split(',')[0] : 'Ville'}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-slate-800 border border-slate-600 rounded-box w-56 p-2 shadow text-white z-50">
                            <li><a onClick={() => setLocationFilter('')}>Toutes les villes</a></li>
                            {uniqueLocations.map((location, index) => (
                                <li key={index}><a onClick={() => setLocationFilter(location)}>{location.split(',')[0]}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Service Filter */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-sm bg-slate-700 border-slate-600 text-white hover:bg-slate-600 rounded-full">
                            {serviceFilter || 'Service'}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-slate-800 border border-slate-600 rounded-box w-56 p-2 shadow text-white z-50">
                            <li><a onClick={() => setServiceFilter('')}>Tous les services</a></li>
                            {uniqueServices.map((service, index) => (
                                <li key={index}><a onClick={() => setServiceFilter(service)}>{service}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Rating Filter */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-sm bg-slate-700 border-slate-600 text-white hover:bg-slate-600 rounded-full">
                            {ratingFilter ? `${ratingFilter}+ étoiles` : 'Note'}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-slate-800 border border-slate-600 rounded-box w-56 p-2 shadow text-white z-50">
                            <li><a onClick={() => setRatingFilter('')}>Toutes les notes</a></li>
                            <li><a onClick={() => setRatingFilter('4.5')}>4.5+ étoiles</a></li>
                            <li><a onClick={() => setRatingFilter('4.0')}>4.0+ étoiles</a></li>
                            <li><a onClick={() => setRatingFilter('3.5')}>3.5+ étoiles</a></li>
                        </ul>
                    </div>

                    {/* Price Filter */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-sm bg-slate-700 border-slate-600 text-white hover:bg-slate-600 rounded-full">
                            {priceFilter === 'low' ? 'Économique' : priceFilter === 'medium' ? 'Standard' : priceFilter === 'high' ? 'Premium' : 'Prix'}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-slate-800 border border-slate-600 rounded-box w-56 p-2 shadow text-white z-50">
                            <li><a onClick={() => setPriceFilter('')}>Tous les prix</a></li>
                            <li><a onClick={() => setPriceFilter('low')}>Économique (≤15k CFA)</a></li>
                            <li><a onClick={() => setPriceFilter('medium')}>Standard (15k-20k CFA)</a></li>
                            <li><a onClick={() => setPriceFilter('high')}>Premium (+20k CFA)</a></li>
                        </ul>
                    </div>

                    {(searchTerm || locationFilter || serviceFilter || ratingFilter || priceFilter) && (
                        <button
                            onClick={clearFilters}
                            className="px-3 py-2 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile: Header with Logo and Filter Toggle */}
            <div className="mb-6 lg:hidden">
                {/* Top row: Logo and Filter Toggle */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => onBackToHome && onBackToHome()}
                        className="hover:opacity-80 transition-opacity flex-shrink-0"
                    >
                        <svg
                            width="100"
                            height="26"
                            viewBox="0 0 155 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754"
                                stroke="#fff"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/15 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtres
                        {(locationFilter || serviceFilter || availabilityFilter || ratingFilter || priceFilter) && (
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        )}
                    </button>
                </div>

                {/* Search Bar - Always visible on mobile */}
                <div className="relative max-w-md mx-auto mb-4">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Rechercher par nom, ville ou véhicule..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                    />
                </div>

                {/* Mobile Filters */}
                <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                        {/* Location Filter Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Ville</label>
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                            >
                                <option value="">Toutes les villes</option>
                                {uniqueLocations.map((location, index) => (
                                    <option key={index} value={location} className="bg-slate-800">
                                        {location.split(',')[0]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Service Filter Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Service</label>
                            <select
                                value={serviceFilter}
                                onChange={(e) => setServiceFilter(e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                            >
                                <option value="">Tous les services</option>
                                {uniqueServices.map((service, index) => (
                                    <option key={index} value={service} className="bg-slate-800">
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Note minimum</label>
                            <select
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                            >
                                <option value="">Toutes les notes</option>
                                <option value="4.5" className="bg-slate-800">4.5+ étoiles</option>
                                <option value="4.0" className="bg-slate-800">4.0+ étoiles</option>
                                <option value="3.5" className="bg-slate-800">3.5+ étoiles</option>
                            </select>
                        </div>

                        {/* Price Filter Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Gamme de prix</label>
                            <select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                            >
                                <option value="">Tous les prix</option>
                                <option value="low" className="bg-slate-800">Économique (≤15k CFA)</option>
                                <option value="medium" className="bg-slate-800">Standard (15k-20k CFA)</option>
                                <option value="high" className="bg-slate-800">Premium (+20k CFA)</option>
                            </select>
                        </div>

                        {/* Clear Filters Button Mobile */}
                        {(locationFilter || serviceFilter || availabilityFilter || ratingFilter || priceFilter) && (
                            <button
                                onClick={clearFilters}
                                className="w-full px-4 py-2 text-sm text-slate-300 hover:text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Effacer tous les filtres
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 text-center">
                <p className="text-slate-300">
                    {filteredDrivers.length} chauffeur{filteredDrivers.length !== 1 ? 's' : ''} trouvé{filteredDrivers.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {filteredDrivers.map((driver) => (
                    <div key={driver.id} className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl pb-3 overflow-hidden border border-white/20 hover:bg-white/15 transition-all">
                        <div className="relative">
                            <img 
                                className="w-full h-40 object-cover object-center" 
                                src={driver.avatar} 
                                alt={driver.name} 
                            />
                            {driver.verified && (
                                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mt-2">
                                <p className="font-medium text-white">{driver.name}</p>
                                {driver.verified && (
                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">✓</span>
                                )}
                            </div>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-1">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(driver.rating) ? 'fill-current' : 'text-slate-600'}`} viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-slate-300">{driver.rating}</span>
                            </div>
                            
                            <p className="text-slate-300 text-sm mt-1">{driver.location}</p>
                            <p className="text-white text-sm font-medium mt-1">{driver.price}</p>
                            
                            {/* Services */}
                            <div className="flex gap-1 mt-1">
                                {driver.services.slice(0, 2).map((service, index) => (
                                    <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                                        {service}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-2 mt-3 px-2">
                                <button 
                                    onClick={() => handleViewProfile(driver)}
                                    className="border text-sm text-slate-300 border-white/30 px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-colors flex-1"
                                >
                                    Voir profil
                                </button>
                                <button 
                                    onClick={() => handleContactDriver(driver)}
                                    className="text-sm text-black bg-white px-4 py-2 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 flex-1"
                                >
                                    Contacter
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDrivers.length === 0 && (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012 2v1.306z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">No drivers found</h3>
                    <p className="text-slate-400">Try adjusting your search criteria</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn bg-white text-black hover:bg-slate-200 border-none mt-4"
                    >
                        Reload
                    </button>
                </div>
            )}

            {/* Driver Profile Modal */}
            <dialog id="driver_profile_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl max-h-[90vh] bg-slate-800 border border-slate-600 p-4 sm:p-6 overflow-y-auto">
                    {selectedDriver && (
                        <>
                            {/* Header with photo and basic info */}
                            <div className="flex flex-col items-center text-center mb-6">
                                {/* Close button for mobile */}
                                <div className="w-full flex justify-end mb-2 sm:hidden">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>

                                {/* Photo and verification */}
                                <div className="relative mb-4">
                                    <img
                                        src={selectedDriver.avatar}
                                        alt={selectedDriver.name}
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                                    />
                                    {selectedDriver.verified && (
                                        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 rounded-full p-1.5 sm:p-2">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Name and verification badge */}
                                <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
                                    <h3 className="font-bold text-xl sm:text-2xl text-white">{selectedDriver.name}</h3>
                                    {selectedDriver.verified && (
                                        <span className="badge badge-success badge-sm">Vérifié</span>
                                    )}
                                </div>
                                
                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(selectedDriver.rating) ? 'fill-current' : 'text-slate-600'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-white font-medium">{selectedDriver.rating}/5</span>
                                    <span className="text-slate-300 text-sm">({selectedDriver.reviews} avis)</span>
                                </div>
                                
                                {/* Price */}
                                <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 mb-4">
                                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{selectedDriver.price}</div>
                                    <div className="text-slate-300 text-sm">Tarif de base</div>
                                </div>
                            </div>

                            {/* Detailed Information */}
                            <div className="space-y-4 mb-6">
                                {/* Information Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {/* Location */}
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Localisation
                                        </h4>
                                        <p className="text-slate-300 text-sm">{selectedDriver.location}</p>
                                    </div>
                                    
                                    {/* Experience */}
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Expérience
                                        </h4>
                                        <p className="text-slate-300 text-sm">{selectedDriver.experience} d'expérience</p>
                                    </div>
                                    
                                    {/* Vehicle */}
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Véhicule
                                        </h4>
                                        <p className="text-slate-300 text-sm">{selectedDriver.vehicle}</p>
                                    </div>
                                    
                                    {/* Availability */}
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Disponibilité
                                        </h4>
                                        <p className="text-slate-300 text-sm">{selectedDriver.availability}</p>
                                    </div>
                                </div>
                                
                                {/* Languages */}
                                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Langues parlées
                                    </h4>
                                    <p className="text-slate-300 text-sm">{selectedDriver.languages.join(", ")}</p>
                                </div>
                                
                                {/* Services */}
                                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                    <h4 className="font-semibold text-white mb-3 text-sm">Services proposés</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDriver.services.map((service, index) => (
                                            <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                {/* Primary Action - Book */}
                                <button 
                                    onClick={() => handleBookDriver(selectedDriver)}
                                    className="w-full bg-white text-black hover:bg-slate-200 border-none py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Réserver maintenant
                                </button>
                                
                                {/* Secondary Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleContactDriver(selectedDriver)}
                                        className="py-2.5 px-4 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Contacter
                                    </button>
                                    
                                    {/* Close Button for Desktop */}
                                    <form method="dialog" className="hidden sm:block">
                                        <button type="submit" className="w-full py-2.5 px-4 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors text-sm">
                                            Fermer
                                        </button>
                                    </form>
                                    
                                    {/* Close Button for Mobile */}
                                    <form method="dialog" className="sm:hidden">
                                        <button type="submit" className="w-full py-2.5 px-4 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors text-sm">
                                            Fermer
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </dialog>
        </div>
    );
}
