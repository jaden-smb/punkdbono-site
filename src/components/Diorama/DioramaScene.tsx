import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, Environment } from '@react-three/drei';
import DioramaModel from './DioramaModel';
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
  return (
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
  );
};

export default DioramaScene;