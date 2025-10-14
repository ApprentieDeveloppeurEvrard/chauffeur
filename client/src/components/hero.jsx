import { useState } from "react";
import SearchForm from "./SearchForm";
import { auth } from "../services/api";

export default function Hero({ onShowDrivers, onShowAuth, isAuthenticated }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#0b0f19] text-white font-poppins overflow-hidden">
            {/* Background SVG */}
            <svg
                className="size-full absolute -z-10 inset-0"
                width="1440"
                height="720"
                viewBox="0 0 1440 720"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path stroke="#1D293D" strokeOpacity=".7" d="M-15.227 702.342H1439.7" />
                <circle cx="711.819" cy="372.562" r="308.334" stroke="#1D293D" strokeOpacity=".7" />
                <circle cx="16.942" cy="20.834" r="308.334" stroke="#1D293D" strokeOpacity=".7" />
                <path stroke="#1D293D" strokeOpacity=".7" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
                <circle cx="782.595" cy="411.166" r="308.334" stroke="#1D293D" strokeOpacity=".7" />
            </svg>

            {/* Navigation */}
            <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-white text-sm">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <svg
                        width="155"
                        height="40"
                        viewBox="0 0 155 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* === Simplified logo for brevity === */}
                        <path
                            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754"
                            stroke="#fff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <a href="/" className="hover:text-slate-300 transition">Accueil</a>
                    <a href="/chauffeurs" className="hover:text-slate-300 transition">Chauffeurs</a>
                    <a href="/services" className="hover:text-slate-300 transition">Services</a>
                    <a href="/tarifs" className="hover:text-slate-300 transition">Tarifs</a>
                </div>

                {/* Desktop Button */}
                <div className="hidden md:block relative">
                    {isAuthenticated ? (
                        <div
                            onClick={() => setProfileMenuOpen((v) => !v)}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img alt="avatar" src={`https://api.dicebear.com/9.x/initials/svg?seed=user`} />
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => onShowAuth && onShowAuth()}
                            className="px-6 py-2.5 text-black bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-full"
                        >
                            Connexion
                        </button>
                    )}
                    {isAuthenticated && profileMenuOpen && (
                        <ul className="menu bg-white/10 border border-white/20 rounded-box w-56 absolute right-0 mt-2 z-[200] shadow text-white backdrop-blur">
                          <li><a onClick={() => { setProfileMenuOpen(false); onShowAuth && onShowAuth(); }}>Profil</a></li>
                          <li><a onClick={() => { auth.clear(); setProfileMenuOpen(false); }}>Déconnexion</a></li>
                        </ul>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden active:scale-90 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 5h16" />
                        <path d="M4 12h16" />
                        <path d="M4 19h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Nav */}
            <div
                className={`fixed inset-0 z-[100] bg-black/40 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <a href="/">Accueil</a>
                <a href="/chauffeurs">Chauffeurs</a>
                <a href="/services">Services</a>
                <a href="/tarifs">Tarifs</a>
                
                <div className="w-full px-6">
                    <div className="relative flex flex-col items-center">
                        {isAuthenticated ? (
                            <div
                                onClick={() => setProfileMenuOpen((v) => !v)}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="avatar" src={`https://api.dicebear.com/9.x/initials/svg?seed=user`} />
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={() => { setMenuOpen(false); onShowAuth && onShowAuth(); }}
                                className="w-full px-6 py-2.5 text-black bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-full"
                            >
                                Connexion
                            </button>
                        )}
                        {isAuthenticated && profileMenuOpen && (
                            <ul className="menu bg-white/10 border border-white/20 rounded-box w-56 mt-2 z-[200] shadow text-white backdrop-blur">
                              <li><a onClick={() => { setProfileMenuOpen(false); onShowAuth && onShowAuth(); }}>Profil</a></li>
                              <li><a onClick={() => { auth.clear(); setProfileMenuOpen(false); }}>Déconnexion</a></li>
                            </ul>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setMenuOpen(false)}
                    className="active:ring-3 active:ring-white aspect-square size-10 p-1 flex items-center justify-center bg-white hover:bg-slate-200 transition text-black rounded-md"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            {/* Hero Section */}
            <section className="flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between mt-20 px-4 md:px-16 lg:px-24 xl:px-32">
                {/* Left Content */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex flex-wrap items-center justify-center p-1.5 rounded-full border border-slate-600 text-white text-xs">
                        <div className="flex items-center">
                            <img
                                className="size-7 rounded-full border-3 border-white"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                                alt="userImage1"
                            />
                            <img
                                className="size-7 rounded-full border-3 border-white -translate-x-2"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                                alt="userImage2"
                            />
                            <img
                                className="size-7 rounded-full border-3 border-white -translate-x-4"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                                alt="userImage3"
                            />
                        </div>
                        <p className="-translate-x-2">Rejoignez plus de 10k+ utilisateurs</p>
                    </div>

                    <h1 className="text-center md:text-left text-5xl leading-[68px] md:text-6xl md:leading-[84px] font-medium max-w-xl text-slate-50 mt-4">
                        Trouvez votre chauffeur idéal.
                    </h1>

                    <p className="text-center md:text-left text-sm text-slate-200 max-w-lg mt-4">
                        Marketplace de confiance pour connecter passagers et chauffeurs professionnels. 
                        Service personnel ou professionnel, trouvez le chauffeur parfait en quelques clics.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 text-sm">
                        <button className="bg-white hover:bg-slate-200 text-black active:scale-95 rounded-md px-7 h-11 w-full sm:w-auto">
                            Devenir chauffeur
                        </button>
                        <button 
                            onClick={() => onShowDrivers && onShowDrivers()}
                            className="flex items-center justify-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-white rounded-md px-6 h-11 w-full sm:w-auto"
                        >
                            <span>Trouver un chauffeur</span>
                        </button>
                    </div>
                </div>

                {/* Search Form */}
                <SearchForm onSearch={onShowDrivers} />
            </section>
        </div>
    );
}
