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

    const handleCallDriver = (driver) => {
        console.log("Calling driver:", driver);
        // Add call logic here
        if (driver.phone) {
            window.location.href = `tel:${driver.phone}`;
        }
    };

    const handleSMSDriver = (driver) => {
        console.log("Sending SMS to driver:", driver);
        // Add SMS logic here
        if (driver.phone) {
            window.location.href = `sms:${driver.phone}`;
        }
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

            <div className="flex flex-wrap items-center justify-center gap-6">
                {filteredDrivers.map((driver) => (
                    <div key={driver.id} className="bg-slate-800/90 backdrop-blur-sm rounded-2xl pb-4 overflow-hidden border border-slate-600/50 hover:bg-slate-700/90 hover:border-slate-500/60 transition-all">
                        {/* Image rectangulaire en haut */}
                        <div className="relative">
                            <img 
                                className="w-64 h-52 object-cover object-top" 
                                src={driver.avatar} 
                                alt={driver.name} 
                            />
                        </div>
                        
                        <div className="flex flex-col items-center px-4">
                            {/* Nom du chauffeur */}
                            <p className="font-medium mt-3 text-white text-center">{driver.name}</p>
                            
                            {/* Localisation et prix */}
                            <p className="text-slate-300 text-sm text-center">{driver.location}</p>
                            <p className="text-blue-300 text-sm font-medium mt-1">{driver.price}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(driver.rating) ? 'fill-current' : 'text-slate-600'}`} viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-slate-400">{driver.rating}</span>
                            </div>
                            
                            {/* Services */}
                            <div className="flex gap-1 mt-2 flex-wrap justify-center">
                                {driver.services.slice(0, 2).map((service, index) => (
                                    <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                                        {service}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Boutons d'action alignés */}
                            <div className="flex gap-3 mt-5 items-center">
                                <button 
                                    onClick={() => handleContactDriver(driver)}
                                    className="border text-sm text-slate-300 border-slate-500/50 w-28 h-8 rounded-full flex items-center justify-center gap-1 hover:bg-slate-600/50 hover:text-white hover:border-slate-400 transition-colors"
                                >
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m7.107 11.684.31-.521-.736-.436-.309.522zm-2.28-.521.308.521.735-.435-.309-.522zm1.545.086a.297.297 0 0 1-.502 0l-.735.435a1.15 1.15 0 0 0 1.972 0zM5.267.854h1.708V0H5.267zm6.121 4.413v.57h.854v-.57zm-10.534.57v-.57H0v-.57zm-.854 0c0 .657 0 1.171.028 1.586.029.42.088.768.221 1.09l.79-.327c-.084-.2-.133-.446-.159-.82-.026-.38-.026-.86-.026-1.53zm3.731 3.838c-.715-.012-1.09-.058-1.383-.18l-.327.79c.459.19.98.232 1.695.244zM.249 8.513c.333.802.97 1.44 1.772 1.772l.327-.79a2.42 2.42 0 0 1-1.31-1.309zm11.14-2.677c0 .67-.001 1.15-.027 1.53-.026.374-.075.62-.158.82l.79.327c.133-.322.192-.67.22-1.09.028-.415.028-.93.028-1.587zM8.525 10.53c.715-.012 1.237-.054 1.695-.244l-.327-.79c-.293.122-.668.168-1.383.18zm2.678-2.343a2.42 2.42 0 0 1-1.31 1.31l.327.789a3.27 3.27 0 0 0 1.772-1.772zM6.975.854c.94 0 1.616 0 2.142.05.52.05.852.145 1.116.307l.446-.729C10.259.225 9.78.11 9.199.054 8.621 0 7.898 0 6.974 0zm5.267 4.413c0-.924 0-1.646-.054-2.223-.056-.583-.17-1.06-.428-1.48l-.728.446c.161.264.256.595.306 1.115.05.527.05 1.202.05 2.142zm-2.01-4.056c.326.2.6.473.8.799l.728-.447c-.27-.44-.64-.81-1.081-1.08zM5.268 0c-.924 0-1.646 0-2.223.054-.583.056-1.06.17-1.48.428l.446.729c.264-.162.595-.257 1.115-.306.527-.05 1.202-.05 2.142-.05zM.854 5.267c0-.94 0-1.615.05-2.142.05-.52.145-.851.307-1.115l-.729-.447c-.257.421-.372.898-.428 1.481C0 3.621 0 4.344 0 5.267zm.71-4.785A3.3 3.3 0 0 0 .482 1.563l.729.447c.2-.326.473-.6.799-.8zM5.56 10.728a6 6 0 0 0-.316-.503 1.3 1.3 0 0 0-.388-.368l-.43.739a.4.4 0 0 1 .128.131c.07.095.147.226.271.436zm-1.845-.199c.25.004.409.008.53.02a.45.45 0 0 1 .182.047l.429-.739a1.3 1.3 0 0 0-.518-.156c-.169-.019-.374-.022-.608-.026zm3.7.634c.124-.21.202-.34.271-.436a.4.4 0 0 1 .128-.131l-.43-.739a1.3 1.3 0 0 0-.388.368c-.099.135-.2.307-.316.502zM8.51 9.675c-.234.004-.439.007-.608.026-.178.02-.351.06-.518.156l.43.739a.45.45 0 0 1 .182-.046 6 6 0 0 1 .529-.20z" fill="currentColor"/>
                                        <path d="M3.844 5.552h.005m2.268 0h.005m2.272 0H8.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>message</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleViewProfile(driver)}
                                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                                >
                                    Voir profil
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
                                
                                {/* Contact Actions */}
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <button 
                                        onClick={() => handleCallDriver(selectedDriver)}
                                        className="py-2.5 px-4 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Appeler
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleSMSDriver(selectedDriver)}
                                        className="py-2.5 px-4 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        SMS
                                    </button>
                                </div>

                                {/* Close Button */}
                                <form method="dialog">
                                    <button type="submit" className="w-full py-2.5 px-4 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors text-sm">
                                        Fermer
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </dialog>
        </div>
    );
}
