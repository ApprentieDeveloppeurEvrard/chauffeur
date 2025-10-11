import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DriversPage from './components/DriversPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DriversPage />
  </StrictMode>,
)
