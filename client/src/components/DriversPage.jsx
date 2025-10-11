import { useState } from "react";
import Hero from "./hero";
import DriversList from "./DriversList";
import AuthPage from "./auth/AuthPage";

export default function DriversPage() {
    const [currentView, setCurrentView] = useState('hero'); // 'hero', 'drivers', 'auth'
    const [searchData, setSearchData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleShowDrivers = (formData = null) => {
        setSearchData(formData);
        setCurrentView('drivers');
    };

    const handleBackToHome = () => {
        setCurrentView('hero');
        setSearchData(null);
    };

    const handleShowAuth = () => {
        setCurrentView('auth');
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setCurrentView('hero');
    };

    return (
        <div className="min-h-screen">
            {currentView === 'hero' ? (
                <Hero onShowDrivers={handleShowDrivers} onShowAuth={handleShowAuth} isAuthenticated={isAuthenticated} />
            ) : currentView === 'auth' ? (
                <AuthPage onBackToHome={handleBackToHome} />
            ) : (
                <div className="relative min-h-screen bg-[#0b0f19] text-white font-poppins overflow-hidden">
                    {/* Background SVG - Same as Hero */}
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
                    
                    {/* Drivers List */}
                    <DriversList searchData={searchData} onBackToHome={handleBackToHome} />
                </div>
            )}
        </div>
    );
}
