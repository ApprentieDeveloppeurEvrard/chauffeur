import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PublicRoute from './component/PublicRoute'
import PrivateRoute from './component/PrivateRoute'
import HomePage from './pages/HomePage.jsx'
import DriversPage from './pages/DriversPage.jsx'
import DriverDetailPage from './pages/DriverDetailPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import OfferDetailPage from './pages/OfferDetailPage.jsx'
import CreateOfferPage from './pages/CreateOfferPage.jsx'
import MarketingVentePage from './pages/MarketingVentePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import Auth from './component/Auth.jsx'
import TarifsPage from './pages/TarifsPage.jsx'
import DevenirPartenairePage from './pages/DevenirPartenairePage.jsx'
import FormationsPage from './pages/FormationsPage.jsx'
import CertificationsPage from './pages/CertificationsPage.jsx'
import CentreAidePage from './pages/CentreAidePage.jsx'
import StatsTestPage from './pages/StatsTestPage.jsx'

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
            
            {/* Page de détails chauffeur protégée */}
            <Route 
              path="/driver/:id" 
              element={
                <PrivateRoute>
                  <DriverDetailPage />
                </PrivateRoute>
              } 
            />

            {/* Page des offres d'emploi publique */}
            <Route 
              path="/offres" 
              element={<OffersPage />} 
            />

            {/* Page de détails offre protégée */}
            <Route 
              path="/offre/:id" 
              element={
                <PrivateRoute>
                  <OfferDetailPage />
                </PrivateRoute>
              } 
            />

            {/* Page de création d'offre */}
            <Route 
              path="/publier-offre" 
              element={<CreateOfferPage />} 
            />

            {/* Page Marketing & Vente publique */}
            <Route 
              path="/marketing-vente" 
              element={<MarketingVentePage />} 
            />

            {/* Page de détails produit protégée */}
            <Route 
              path="/produit/:id" 
              element={
                <PrivateRoute>
                  <ProductDetailPage />
                </PrivateRoute>
              } 
            />

            {/* Page d'authentification */}
            <Route 
              path="/auth" 
              element={<Auth />} 
            />

            {/* Page de profil utilisateur protégée */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              } 
            />
            
            {/* Pages publiques */}
            <Route path="/tarifs" element={<TarifsPage />} />
            <Route path="/devenir-partenaire" element={<DevenirPartenairePage />} />
            <Route path="/formations" element={<FormationsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/centre-aide" element={<CentreAidePage />} />
            
            {/* Page de test des statistiques */}
            <Route path="/test-stats" element={<StatsTestPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
