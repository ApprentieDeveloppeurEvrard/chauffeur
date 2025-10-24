import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PublicRoute from './component/PublicRoute'
import HomePage from './pages/HomePage.jsx'
import DriversPage from './pages/DriversPage.jsx'
import DriverDetailPage from './pages/DriverDetailPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import OfferDetailPage from './pages/OfferDetailPage.jsx'
import MarketingVentePage from './pages/MarketingVentePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Auth from './component/Auth.jsx'
import TarifsPage from './pages/TarifsPage.jsx'
import DevenirPartenairePage from './pages/DevenirPartenairePage.jsx'
import FormationsPage from './pages/FormationsPage.jsx'
import CertificationsPage from './pages/CertificationsPage.jsx'
import CentreAidePage from './pages/CentreAidePage.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Page d'accueil publique - marketplace des chauffeurs */}
            <Route 
              path="/" 
              element={<HomePage />} 
            />

            {/* Page des chauffeurs */}
            <Route 
              path="/chauffeurs" 
              element={<DriversPage />} 
            />
            
            {/* Page de détails chauffeur publique */}
            <Route 
              path="/driver/:id" 
              element={<DriverDetailPage />} 
            />

            {/* Page des offres d'emploi publique */}
            <Route 
              path="/offres" 
              element={<OffersPage />} 
            />

            {/* Page de détails offre publique */}
            <Route 
              path="/offre/:id" 
              element={<OfferDetailPage />} 
            />

            {/* Page Marketing & Vente publique */}
            <Route 
              path="/marketing-vente" 
              element={<MarketingVentePage />} 
            />

            {/* Page de détails produit publique */}
            <Route 
              path="/produit/:id" 
              element={<ProductDetailPage />} 
            />

            {/* Page de connexion */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />

            {/* Page d'inscription */}
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } 
            />
            
            {/* Page d'authentification */}
            <Route 
              path="/auth" 
              element={<Auth />} 
            />
            
            {/* Pages publiques */}
            <Route path="/tarifs" element={<TarifsPage />} />
            <Route path="/devenir-partenaire" element={<DevenirPartenairePage />} />
            <Route path="/formations" element={<FormationsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/centre-aide" element={<CentreAidePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
