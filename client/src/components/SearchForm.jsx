import { useState } from "react";

export default function SearchForm({ onSearch }) {
    const [formData, setFormData] = useState({
        departure: '',
        destination: '',
        date: '',
        time: '',
        serviceType: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Recherche de chauffeurs:', formData);
        
        // Call the onSearch callback if provided
        if (onSearch) {
            onSearch(formData);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Rechercher un chauffeur</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-300 mb-2">Ville de départ</label>
                    <input 
                        type="text"
                        name="departure"
                        value={formData.departure}
                        onChange={handleInputChange}
                        placeholder="Abidjan, Bouaké, Yamoussoukro..."
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white/40"
                    />
                </div>
                
                <div>
                    <label className="block text-sm text-slate-300 mb-2">Destination</label>
                    <input 
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        placeholder="Aéroport, gare, adresse..."
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white/40"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Date</label>
                        <input 
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Heure</label>
                        <input 
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm text-slate-300 mb-2">Type de service</label>
                    <select 
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    >
                        <option value="" className="bg-slate-800">Sélectionner...</option>
                        <option value="personnel" className="bg-slate-800">Personnel</option>
                        <option value="professionnel" className="bg-slate-800">Professionnel</option>
                        <option value="evenement" className="bg-slate-800">Événement</option>
                    </select>
                </div>
                
                <button 
                    type="submit"
                    className="w-full bg-white hover:bg-slate-200 text-black font-medium py-3 rounded-lg active:scale-95 transition-all"
                >
                    Rechercher des chauffeurs
                </button>
            </form>
        </div>
    );
}
