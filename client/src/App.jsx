import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './component/hero.jsx'
import Auth from './component/Auth.jsx'
import EmployerDashboard from './component/EmployerDashboard.jsx'
import DriverDashboard from './component/DriverDashboard.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<HeroSection />} />
          
          {/* Page d'authentification */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Dashboard employeur */}
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          
          {/* Dashboard chauffeur */}
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
