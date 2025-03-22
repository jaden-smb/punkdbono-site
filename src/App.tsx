import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  Effects, 
  PresentationControls,
  ContactShadows,
  MeshReflectorMaterial,
  Stage,
  useDetectGPU
} from '@react-three/drei'

import * as THREE from 'three'
import './App.css'

// NavBar component with mobile menu
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">PunkDBono</div>
      
      {/* Mobile menu toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#" onClick={() => setMenuOpen(false)}>Gallery</a>
        <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  )
}

// Performance optimized model component
function Model(props: any) {
  const { scene } = useGLTF('/models/model.glb')
  const ref = useRef<THREE.Group>(null)
  
  // Add subtle rotation animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1
    }
  })
  
  return (
    <group ref={ref}>
      <primitive object={scene} {...props} />
      {/* Add wireframe effect to make untextured model look better */}
      <mesh position={props.position} scale={props.scale * 1.01}>
        <meshStandardMaterial 
          wireframe 
          color="#88ccff" 
          emissive="#003366"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

function App() {
  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="model-container">
        <Canvas 
          camera={{ 
            position: [0, 1, isMobile ? 6 : 5], 
            fov: isMobile ? 60 : 75 
          }}
          dpr={[1, Math.min(window.devicePixelRatio, 2)]} // Performance optimization
          performance={{ min: 0.5 }}
          gl={{ powerPreference: "high-performance" }}
        >
          {/* Better lighting setup */}
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 5, 25]} />
          <ambientLight intensity={0.2} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1.5} 
            castShadow
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8080ff" />
          
          {/* Enhanced model presentation */}
          <PresentationControls
            global
            rotation={[0, -0.3, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-0.8, 0.8]}
            speed={1.5}
            zoom={0.7}
            snap={true}
          >
            <Model position={[0, -1, 0]} scale={isMobile ? 25 : 30} />
          </PresentationControls>
          
          {/* Simplified reflective floor for mobile */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={isMobile ? [100, 50] : [300, 100]}
              resolution={isMobile ? 256 : 2048}
              mixBlur={1}
              mixStrength={50}
              roughness={0.8}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.8}
            />
          </mesh>
          
          {/* Environment light for better reflections */}
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={isMobile ? 1 : 2} 
          />
          
          {/* Touch-enabled controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5}
            minDistance={3}
            maxDistance={10}
            // Touch properties
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
          />
        </Canvas>
      </div>
      
      <div className="card">
        <p>
          {isMobile 
            ? "Touch the model to rotate. Pinch to zoom." 
            : "Interact with the 3D model above using your mouse!"}
        </p>
      </div>
    </>
  )
}

export default App