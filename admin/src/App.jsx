import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import TestConnection from './pages/TestConnection'
import AdminDashboard from './pages/AdminDashboard'
import DriversValidation from './pages/DriversValidation'
import OffersModeration from './pages/OffersModeration'
import VehiclesManagement from './pages/VehiclesManagement'
import MissionsManagement from './pages/MissionsManagement'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Route publique */}
            <Route path="/login" element={<Login />} />
            
            {/* Routes protégées */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              
              {/* Gestion des Chauffeurs */}
              <Route path="/drivers" element={<DriversValidation />} />
              <Route path="/drivers-validation" element={<DriversValidation />} />
              
              {/* Gestion des Offres */}
              <Route path="/offers" element={<OffersModeration />} />
              <Route path="/offers-moderation" element={<OffersModeration />} />
              
              {/* Gestion des Véhicules */}
              <Route path="/vehicles" element={<VehiclesManagement />} />
              
              {/* Gestion des Missions */}
              <Route path="/missions" element={<MissionsManagement />} />
              
              {/* Autres pages */}
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/test-connection" element={<TestConnection />} />
              
              {/* Pages futures */}
              <Route path="/transactions" element={
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Gestion Financière
                  </h2>
                  <p className="text-gray-600">
                    Transactions et commissions - À venir
                  </p>
                </div>
              } />
              
              <Route path="/support" element={
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Support Client
                  </h2>
                  <p className="text-gray-600">
                    Gestion des tickets - À venir
                  </p>
                </div>
              } />
              
              <Route path="/platform-config" element={
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Configuration
                  </h2>
                  <p className="text-gray-600">
                    Paramètres de la plateforme - À venir
                  </p>
                </div>
              } />
            </Route>
            
            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Notifications Toast */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
