import { useState, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import DioramaScene from './components/Diorama/DioramaScene'
import './styles/global.css'

/**
 * Main App Component
 * Manages the application state and renders the main layout and content
 */
function App() {
  const [isRotating, setIsRotating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <MainLayout>
      <div className="hero-section">
        <h1 className="band-title">PunkD'Bono</h1>
        <p className="band-subtitle">Rock your world with our latest album</p>
      </div>
      
      {/* 3D Diorama */}
      <DioramaScene 
        isRotating={isRotating} 
        setIsRotating={setIsRotating} 
        isMobile={isMobile}
      />
    </MainLayout>
  )
}

export default App