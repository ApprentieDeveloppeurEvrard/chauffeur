import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Car } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: 'bahophilomeevrard@gmail.com',
    password: 'Philome98@'
  })

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login(formData)
      
      if (result.success) {
        toast.success('Connexion réussie !', {
          description: `Bienvenue dans l'administration`
        })
      } else {
        toast.error('Erreur de connexion', {
          description: result.error || 'Identifiants incorrects'
        })
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur technique', {
        description: 'Une erreur technique est survenue. Veuillez réessayer.'
      })
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-lg bg-gray-50 border border-gray-200 p-6">
        {/* Logo */}
        <div className="py-4 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Titre */}
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Administration Chauffeurs
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="nom@exemple.com"
              className="py-2 w-full rounded border border-gray-300 bg-white px-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block text-sm text-gray-600">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mot de passe"
              autoComplete="current-password"
              className="py-2 w-full rounded border border-gray-300 bg-white px-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="py-2.5 font-medium w-full rounded bg-indigo-500 text-white transition-colors duration-300 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Info d'identification */}
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <h4 className="text-sm font-medium text-indigo-900 mb-2">Identifiants Admin :</h4>
          <p className="text-xs text-indigo-700">
            <strong>Email :</strong> bahophilomeevrard@gmail.com<br />
            <strong>Mot de passe :</strong> Philome98@
          </p>
        </div>

        {/* Conditions d'utilisation */}
        <p className="mt-6 text-center text-xs text-gray-500">
          En vous connectant, vous acceptez nos
          <a href="#" className="underline hover:text-indigo-500"> Conditions d'utilisation</a> et notre 
          <a href="#" className="underline hover:text-indigo-500"> Politique de confidentialité</a>.
        </p>
      </div>
    </div>
  )
}

export default Login
