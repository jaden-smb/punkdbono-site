import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PresentationControls, Stage, Environment } from '@react-three/drei'
import './App.css'

// Diorama model component with enhanced styling
function DioramaModel(props) {
  const { scene } = useGLTF('/models/Prueba.glb')
  const modelRef = useRef()
  
  // Rotation animation
  useFrame((state, delta) => {
    if (!props.isRotating) return
    modelRef.current.rotation.y += delta * 0.5
  })
  
  return <primitive ref={modelRef} object={scene} scale={1.2} {...props} />
}

// Navbar Component with mobile menu
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.navbar-menu') && !e.target.closest('.hamburger')) {
        setMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        PunkD'Bono
      </div>
      
      {/* Hamburger icon for mobile */}
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Music</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Tour</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Merch</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>About</a></li>
      </ul>
    </nav>
  );
}

// Main App Component
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
    <div className="app-container">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="content">
        <div className="hero-section">
          <h1 className="band-title">PunkD'Bono</h1>
          <p className="band-subtitle">Rock your world with our latest album</p>
        </div>
        
        {/* 3D Diorama */}
        <div className="diorama-container">
          <Canvas shadows camera={{ position: isMobile ? [2, 0, 2] : [2, 0, 2] }}>
            <color attach="background" args={['#0D0D0D']} />
            <fog attach="fog" args={['#0D0D0D', 10, 50]} />
            
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={1} 
                color="#05F2DB"
                castShadow 
              />
              <spotLight 
                position={[-10, -10, -10]} 
                angle={0.2} 
                penumbra={1} 
                intensity={3} 
                color="#F21B07"
              />
              
              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
                config={{ mass: 1, tension: 170, friction: 26 }} // Smoother for touch devices
              >
                <Stage 
                  environment="night" 
                  intensity={0.5}
                >
                  <DioramaModel 
                    isRotating={isRotating}
                    onClick={() => setIsRotating(!isRotating)}
                  />
                </Stage>
              </PresentationControls>
              <Environment preset="night" />
              <OrbitControls 
                enablePan={false} 
                maxPolarAngle={Math.PI / 2} 
                minPolarAngle={Math.PI / 6}
                enableDamping
                dampingFactor={0.1}
                rotateSpeed={isMobile ? 0.7 : 1} // Slower rotation on mobile for better control
              />
            </Suspense>
          </Canvas>
          
          <div className="diorama-info">
            <h2>Interactive 3D Experience</h2>
            <p>{isMobile ? 'Tap' : 'Click'} on the model to start/stop rotation</p>
            <p>{isMobile ? 'Swipe' : 'Drag'} to explore different angles</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App