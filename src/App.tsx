import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PresentationControls, Stage, Environment, useAnimations } from '@react-three/drei'
import { Group } from 'three'
import * as THREE from 'three'
import './App.css'

// Define prop types for components
interface DioramaModelProps {
  isRotating: boolean;
  onClick?: () => void;
  [key: string]: any; // For other props that might be passed
}

// Diorama model component with enhanced styling
function DioramaModel(props: DioramaModelProps) {
  const { scene, animations } = useGLTF('/models/DioramaAnimacion.glb')
  const { actions } = useAnimations(animations, scene)
  const modelRef = useRef<Group>(null)
  
  // Play animation on mount
  useEffect(() => {
    // Play all animations
    Object.values(actions).forEach(action => {
      if (action) {
        action.reset().play()
        action.setLoop(THREE.LoopRepeat, Infinity)
      }
    })
  }, [actions])
  
  // Rotation animation
  useFrame((_, delta) => {
    if (!props.isRotating || !modelRef.current) return
    modelRef.current.rotation.y += delta * 0.5
  })
  
  return <primitive ref={modelRef} object={scene} scale={1.2} {...props} />
}

// Navbar Component with mobile menu
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && 
          !(e.target as Element).closest('.navbar-menu') && 
          !(e.target as Element).closest('.hamburger')) {
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
        </div>
      </div>
    </div>
  )
}

export default App