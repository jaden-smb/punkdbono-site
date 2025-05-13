import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, Environment, Stars } from '@react-three/drei';
import DioramaModel, { MODELS, preloadAllModels } from './DioramaModel';
import LoadingSpinner from './LoadingSpinner';
import './Diorama.css';

interface DioramaSceneProps {
  isMobile: boolean;
}

/**
 * DioramaScene component that wraps the 3D scene and controls
 */
const DioramaScene: React.FC<DioramaSceneProps> = ({ isMobile }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dioramaActivated, setDioramaActivated] = useState(false);
  const [modelsPreloaded, setModelsPreloaded] = useState(false);
  const animationInterval = useRef<number | null>(null);
  
  // Function to switch to the next model
  const nextModel = () => {
    setCurrentModelIndex((prev) => (prev + 1) % MODELS.length);
  };

  // Function to switch to the previous model
  const prevModel = () => {
    setCurrentModelIndex((prev) => (prev - 1 + MODELS.length) % MODELS.length);
  };
  
  // Toggle animation playback
  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
  };
  
  // Activate the diorama and start preloading models
  const activateDiorama = () => {
    setDioramaActivated(true);
    
    // Start preloading models after activation
    setTimeout(() => {
      preloadAllModels();
      setModelsPreloaded(true);
    }, 100);
  };
  
  // Handle animation playback
  useEffect(() => {
    if (isPlaying) {
      // Start animation with a frame rate of about 5 frames per second (200ms)
      animationInterval.current = window.setInterval(() => {
        nextModel();
      }, 200);
    } else if (animationInterval.current) {
      // Stop animation
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }
    
    // Clean up interval on component unmount
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, [isPlaying]);
  
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
  
  if (!dioramaActivated) {
    return (
      <div className="diorama-container">
        <div className="diorama-activate-overlay">
          <button 
            className="diorama-activate-button" 
            onClick={activateDiorama}
            aria-label="Activate 3D Diorama"
          >
            <div className="button-icon">▶</div>
            <div className="button-text">Dele playyy</div>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="diorama-container">
      {!modelLoaded && <LoadingSpinner />}
      
      <Canvas shadows={false} camera={{ position: isMobile ? [2, 0, 2] : [2, 0, 2] }}>
        <color attach="background" args={['#050505']} />
        
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
          
          <ambientLight intensity={1.0} /> {/* Reduced ambient light intensity */}
          <spotLight 
            position={[10, 15, 10]} 
            angle={0.15} 
            penumbra={90} 
            intensity={1.5} 
            color="#ffffff"
            castShadow={false}
          />
          <spotLight 
            position={[-10, -5, -10]} 
            angle={0.2} 
            penumbra={1} 
            intensity={1.5} 
            color="#ffffff"
            castShadow={false}
          />
          
          {/* Subtle fill light */}
          <pointLight
            position={[0, 10, 0]}
            intensity={1.0}
            color="#ffffff"
            distance={900}
            decay={2}
          />
          
          {/* Additional fill light */}
          <pointLight
            position={[0, -5, 0]}
            intensity={1.0}
            color="#ffffff"
            distance={15}
            decay={2}
          />
          
          {/* Add more fill lights with neutral colors */}
          <pointLight
            position={[5, 0, 5]}
            intensity={1.0}
            color="#ffffff"
            distance={90}
            decay={2}
          />
          
          <pointLight
            position={[-3, 0, -5]}
            intensity={1.0}
            color="#ffffff"
            distance={90}
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
              intensity={1} // Increased intensity for better overall visibility
              preset="rembrandt" // More dramatic lighting
              shadows={false} // Disable shadows in Stage component
            >
              <DioramaModel 
                onLoad={() => setModelLoaded(true)}
                modelIndex={currentModelIndex}
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
      
      <div className="model-controls">
        <button onClick={prevModel} className="model-button">Previous</button>
        <button onClick={nextModel} className="model-button">Next</button>
      </div>
    </div>
  );
};

export default DioramaScene;