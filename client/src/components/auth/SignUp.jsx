import { useState } from "react";
import { authApi } from "../../services/api";

export default function SignUp({ onAuthSuccess, onSwitchToSignIn }) {
    const [formData, setFormData] = useState({
        userType: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        // Champs spécifiques chauffeur
        licenseNumber: '',
        experience: '',
        vehicleType: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const payload = { email: formData.email, password: formData.password, role: formData.userType || 'client' };
            await authApi.register(payload);
            if (formData.userType === 'driver') {
                // Rediriger vers la page de connexion pour que le chauffeur se connecte
                onSwitchToSignIn && onSwitchToSignIn();
            } else {
                // Employé: connecter directement
                const { role } = await authApi.login({ email: formData.email, password: formData.password });
                onAuthSuccess && onAuthSuccess(role === 'driver' ? 'driver' : 'connected');
            }
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || 'Erreur lors de la création du compte';
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl pb-6 overflow-hidden border border-white/20 hover:bg-white/15 transition-all max-w-[450px] w-full mx-auto">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Inscription</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type d'utilisateur */}
                    <div className="space-y-1">
                        <label className="block text-sm text-slate-300 mb-1">Je suis</label>
                        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="8.5" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
                                <path d="M20 8v6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M23 11h-6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <select 
                                className="w-full ml-3 outline-none bg-transparent text-white text-sm cursor-pointer" 
                                name="userType"
                                value={formData.userType}
                                onChange={handleInputChange}
                                required 
                            >
                                <option value="" className="bg-slate-800">Sélectionner votre profil</option>
                                <option value="client" className="bg-slate-800">Je cherche un chauffeur</option>
                                <option value="driver" className="bg-slate-800">Je suis chauffeur</option>
                            </select>
                        </div>
                    </div>

                    {/* Champs communs */}
                    {formData.userType && (
                        <>
                            <div className="space-y-1">
                                <label className="block text-sm text-slate-300 mb-1">Nom complet</label>
                                <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="12" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
                                    </svg>
                                    <input 
                                        className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Votre nom complet" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="block text-sm text-slate-300 mb-1">Email</label>
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
                                        placeholder="Votre email" 
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
                                        placeholder="Votre téléphone" 
                                        required 
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Champs spécifiques chauffeur */}
                    {formData.userType === 'driver' && (
                        <>
                            <div className="space-y-1">
                                <label className="block text-sm text-slate-300 mb-1">Numéro de permis</label>
                                <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#94A3B8" strokeWidth="2"/>
                                        <line x1="8" y1="21" x2="16" y2="21" stroke="#94A3B8" strokeWidth="2"/>
                                        <line x1="12" y1="17" x2="12" y2="21" stroke="#94A3B8" strokeWidth="2"/>
                                    </svg>
                                    <input 
                                        className="w-full ml-3 outline-none bg-transparent text-white placeholder-slate-400 text-sm" 
                                        type="text" 
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleInputChange}
                                        placeholder="Numéro de permis de conduire" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm text-slate-300 mb-1">Expérience</label>
                                    <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                                        <select 
                                            className="w-full outline-none bg-transparent text-white text-sm cursor-pointer" 
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            required 
                                        >
                                            <option value="" className="bg-slate-800">Sélectionner</option>
                                            <option value="1-2 ans" className="bg-slate-800">1-2 ans</option>
                                            <option value="3-5 ans" className="bg-slate-800">3-5 ans</option>
                                            <option value="5+ ans" className="bg-slate-800">5+ ans</option>
                                            <option value="10+ ans" className="bg-slate-800">10+ ans</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="block text-sm text-slate-300 mb-1">Type de véhicule</label>
                                    <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5">
                                        <select 
                                            className="w-full outline-none bg-transparent text-white text-sm cursor-pointer" 
                                            name="vehicleType"
                                            value={formData.vehicleType}
                                            onChange={handleInputChange}
                                            required 
                                        >
                                            <option value="" className="bg-slate-800">Sélectionner</option>
                                            <option value="Berline" className="bg-slate-800">Berline</option>
                                            <option value="SUV" className="bg-slate-800">SUV</option>
                                            <option value="Van" className="bg-slate-800">Van</option>
                                            <option value="Luxury" className="bg-slate-800">Véhicule de luxe</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mot de passe */}
                    {formData.userType && (
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
                    )}
                    
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                            <p className="text-red-300 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {formData.userType && (
                        <button 
                            type="submit"
                            disabled={submitting}
                            className="w-full mt-6 bg-white hover:bg-slate-200 text-black transition-all active:scale-95 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Création...' : (formData.userType === 'driver' ? 'Devenir chauffeur' : 'Créer un compte')}
                        </button>
                    )}
                </form>
                
                <p className="text-center mt-4 text-slate-300 text-sm">
                    Déjà un compte? 
                    <a href="#" className="text-white hover:text-slate-300 transition-colors ml-1">Se connecter</a>
                </p>
            </div>
        </div>
    );
}
