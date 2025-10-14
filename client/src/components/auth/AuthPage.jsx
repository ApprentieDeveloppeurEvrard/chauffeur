import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpDriver from "./SignUpDriver";
import SignUpClient from "./SignUpClient";

export default function AuthPage({ onBackToHome, onAuthSuccess }) {
    const [currentView, setCurrentView] = useState('signin'); // 'signin' or 'signup'

    return (
        <div className="relative min-h-screen bg-[#0b0f19] text-white font-poppins overflow-hidden">
            {/* Background SVG - Same as platform */}
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
            
            {/* Navigation Header */}
            <nav className="relative z-10 flex items-center justify-between w-full py-6 px-6 md:px-16 lg:px-24 xl:px-32">
                {/* Logo */}
                <button
                    onClick={onBackToHome}
                    className="hover:opacity-80 transition-opacity"
                    title="Retour à l'accueil"
                >
                    <svg
                        width="155"
                        height="40"
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
                
                {/* Back Link */}
                
            </nav>
            
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-140px)] p-6">
                <div className="w-full max-w-md">
                    {/* Navigation buttons */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                            <button
                                onClick={() => setCurrentView('signin')}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                                    currentView === 'signin'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-slate-300 hover:text-white'
                                }`}
                            >
                                Connexion
                            </button>
                            <button
                                onClick={() => setCurrentView('signup')}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                                    currentView === 'signup'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-slate-300 hover:text-white'
                                }`}
                            >
                                Inscription
                            </button>
                        </div>
                    </div>

                    {/* Auth forms */}
                    {currentView === 'signin'
                      ? <SignIn onAuthSuccess={onAuthSuccess} />
                      : <SignUp onAuthSuccess={onAuthSuccess} onSwitchToSignIn={() => setCurrentView('signin')} />}
                </div>
            </div>
        </div>
    );
}
