import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, Environment, Stars } from '@react-three/drei';
import DioramaModel from './DioramaModel';
import LoadingSpinner from './LoadingSpinner';
import './Diorama.css';

interface DioramaSceneProps {
  isRotating: boolean;
  setIsRotating: (isRotating: boolean) => void;
  isMobile: boolean;
}

/**
 * DioramaScene component that wraps the 3D scene and controls
 */
const DioramaScene: React.FC<DioramaSceneProps> = ({ isRotating, setIsRotating, isMobile }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Hide loading spinner after model loads with a small delay for smoother transition
  useEffect(() => {
    if (modelLoaded) {
      const timer = setTimeout(() => {
        const loadingEl = document.querySelector('.loading-container');
        if (loadingEl) {
          loadingEl.classList.add('fade-out');
          setTimeout(() => {
            if (loadingEl.parentNode) {
              loadingEl.parentNode.removeChild(loadingEl);
            }
          }, 500);
        }
      }, 1000); // Give a second for the scene to stabilize
      
      return () => clearTimeout(timer);
    }
  }, [modelLoaded]);
  
  return (
    <div className="diorama-container">
      {!modelLoaded && <LoadingSpinner />}
      
      <Canvas shadows camera={{ position: isMobile ? [2, 0, 2] : [2, 0, 2] }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 20, 40]} /> {/* Reduced fog density for better visibility */}
        
        <Suspense fallback={null}>
          {/* Gothic skybox with stars */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0.5} 
            fade
            speed={1}
          />
          
          <ambientLight intensity={0.8} /> {/* Increased ambient light for better overall exposure */}
          <spotLight 
            position={[10, 15, 10]} 
            angle={0.15} 
            penumbra={90} 
            intensity={3.5} 
            color="#05F2DB"
            castShadow 
            shadow-bias={-0.0001}
          />
          <spotLight 
            position={[-10, -5, -10]} 
            angle={0.2} 
            penumbra={1} 
            intensity={4.5} 
            color="#F21B07"
            castShadow
          />
          {/* Additional atmospheric light for gothic effect */}
          <pointLight
            position={[0, 10, 0]}
            intensity={1.8}
            color="#8A2BE2" // Purple hue for gothic atmosphere
            distance={900}
            decay={2}
          />
          
          {/* Additional fill light to brighten dark areas */}
          <pointLight
            position={[0, -5, 0]}
            intensity={1.2}
            color="#ffffff"
            distance={15}
            decay={2}
          />
          
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Stage 
              environment="night" 
              intensity={1.2} // Increased intensity for better overall visibility
              preset="rembrandt" // More dramatic lighting
              shadows={{ type: 'contact', opacity: 0.6, blur: 2 }}
            >
              <DioramaModel 
                isRotating={isRotating}
                onClick={() => setIsRotating(!isRotating)}
                onLoad={() => setModelLoaded(true)}
              />
            </Stage>
          </PresentationControls>
          {/* Custom environment with night preset to enhance gothic feel */}
          <Environment 
            preset="night" 
            background={false} 
            blur={0.8}
          />
          
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
  );
};

export default DioramaScene;