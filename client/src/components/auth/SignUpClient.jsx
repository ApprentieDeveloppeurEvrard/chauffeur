import { useState } from "react";

export default function SignUpClient() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        businessType: '',
        employeesCount: ''
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
        console.log('Client sign up data:', formData);
        // Add client sign up logic here
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl pb-6 overflow-hidden border border-white/20 hover:bg-white/15 transition-all max-w-[450px] w-full mx-auto">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Inscription Client</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Nom de l'entreprise</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 21h18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 21V7l8-4v18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 21V11l-6-4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                type="text" 
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Nom de votre entreprise" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Nom du contact</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
                            </svg>
                            <input 
                                className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                type="text" 
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleInputChange}
                                placeholder="Votre nom complet" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Email professionnel</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email de l'entreprise" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Téléphone</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Téléphone de l'entreprise" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Adresse de l'entreprise</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#94A3B8" strokeWidth="2"/>
                                <circle cx="12" cy="10" r="3" stroke="#94A3B8" strokeWidth="2"/>
                            </svg>
                            <input 
                                className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                type="text" 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Adresse complète" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm text-slate-300 mb-1">Type d'activité</label>
                            <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                                <select 
                                    className="w-full outline-none bg-transparent text-white text-sm cursor-pointer" 
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleInputChange}
                                    required 
                                >
                                    <option value="" className="bg-slate-800">Sélectionner</option>
                                    <option value="Entreprise privée" className="bg-slate-800">Entreprise privée</option>
                                    <option value="Administration" className="bg-slate-800">Administration</option>
                                    <option value="Hôtellerie" className="bg-slate-800">Hôtellerie</option>
                                    <option value="Événementiel" className="bg-slate-800">Événementiel</option>
                                    <option value="Transport" className="bg-slate-800">Transport</option>
                                    <option value="Autre" className="bg-slate-800">Autre</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="block text-sm text-slate-300 mb-1">Nombre d'employés</label>
                            <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                                <select 
                                    className="w-full outline-none bg-transparent text-white text-sm cursor-pointer" 
                                    name="employeesCount"
                                    value={formData.employeesCount}
                                    onChange={handleInputChange}
                                    required 
                                >
                                    <option value="" className="bg-slate-800">Sélectionner</option>
                                    <option value="1-10" className="bg-slate-800">1-10</option>
                                    <option value="11-50" className="bg-slate-800">11-50</option>
                                    <option value="51-200" className="bg-slate-800">51-200</option>
                                    <option value="200+" className="bg-slate-800">200+</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Mot de passe</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#94A3B8" strokeWidth="2"/>
                                <circle cx="12" cy="16" r="1" fill="#94A3B8"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Votre mot de passe" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full mt-6 bg-white hover:bg-slate-200 text-black transition-all active:scale-95 py-3 rounded-lg font-medium"
                    >
                        Créer un compte client
                    </button>
                </form>
                
                <p className="text-center mt-4 text-slate-300 text-sm">
                    Déjà un compte? 
                    <a href="#" className="text-white hover:text-slate-300 transition-colors ml-1">Se connecter</a>
                </p>
            </div>
        </div>
    );
}
