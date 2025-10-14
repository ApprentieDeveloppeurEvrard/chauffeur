import { useState } from "react";
import { authApi } from "../../services/api";

export default function SignIn({ onAuthSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const { role } = await authApi.login({ email: formData.email, password: formData.password });
            if (role === 'driver') {
                onAuthSuccess && onAuthSuccess('driver');
            } else {
                onAuthSuccess && onAuthSuccess('connected');
            }
        } catch (err) {
            const msg = err?.response?.data?.error || 'Email ou mot de passe incorrect';
            setError(msg);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl pb-6 overflow-hidden border border-white/20 hover:bg-white/15 transition-all max-w-[400px] w-full mx-auto">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Connexion</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
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

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-4">
                            <p className="text-red-300 text-sm text-center">{error}</p>
                        </div>
                    )}

                    

                    <div className="flex justify-between items-center pt-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-white" />
                            <span className="text-xs text-slate-300">Se souvenir de moi</span>
                        </label>
                        <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Mot de passe oublié?</a>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 bg-white hover:bg-slate-200 text-black transition-all active:scale-95 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Connexion...
                            </>
                        ) : (
                            'Se connecter'
                        )}
                    </button>
                </form>
                
                <p className="text-center mt-4 text-slate-300 text-sm">
                    Pas encore de compte? 
                    <a href="#" className="text-white hover:text-slate-300 transition-colors ml-1">S'inscrire</a>
                </p>
            </div>
        </div>
    );
}
