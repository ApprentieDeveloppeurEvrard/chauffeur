import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './component/ProtectedRoute'
import HeroSection from './component/hero.jsx'
import Auth from './component/Auth.jsx'
import EmployerDashboard from './component/EmployerDashboard.jsx'
import DriverDashboard from './component/DriverDashboardMain.jsx'
import SafeDriverDashboard from './component/SafeDriverDashboard.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<HeroSection />} />
            
            {/* Page d'authentification */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Dashboard employeur */}
            <Route 
              path="/employer-dashboard" 
              element={
                <ProtectedRoute requiredRole="client">
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Dashboard chauffeur */}
            <Route 
              path="/driver-dashboard" 
              element={
                <ProtectedRoute requiredRole="driver">
                  <SafeDriverDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
