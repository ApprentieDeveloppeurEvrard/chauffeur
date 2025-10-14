import React, { useEffect, useState } from 'react'
import { auth, getCurrentUserRole } from '../services/api'

function Navbar() {
    const [role, setRole] = useState(null)
    const [isAuthed, setIsAuthed] = useState(false)

    const refreshAuth = () => {
        const token = auth.getToken()
        setIsAuthed(!!token)
        setRole(getCurrentUserRole())
    }

    useEffect(() => {
        refreshAuth()
        const onFocus = () => refreshAuth()
        const onAuthChanged = () => refreshAuth()
        window.addEventListener('focus', onFocus)
        window.addEventListener('auth-changed', onAuthChanged)
        return () => {
            window.removeEventListener('focus', onFocus)
            window.removeEventListener('auth-changed', onAuthChanged)
        }
    }, [])

    const handleLogout = () => {
        auth.clear()
        refreshAuth()
    }

    const goToDriverProfile = () => {
        // Placeholder navigation: integrate with your router if available
        // e.g., useNavigate('/driver/profile')
        window.location.href = '#driver-profile'
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <div className="form-control">
      <input type="text" placeholder="Rechercher..." className="input input-bordered w-64" />
    </div>
  </div>
  <div className="navbar-end">
    {!isAuthed ? (
      <a className="btn">Connexion</a>
    ) : (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="avatar" src={`https://api.dicebear.com/9.x/initials/svg?seed=${role || 'user'}`} />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          {role === 'driver' && (
            <li><a onClick={goToDriverProfile}>Mon profil chauffeur</a></li>
          )}
          <li><a onClick={handleLogout}>Déconnexion</a></li>
        </ul>
      </div>
    )}
  </div>
</div>
    )
}

export default Navbar
