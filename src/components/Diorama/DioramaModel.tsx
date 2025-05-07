import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

// Define prop types for Diorama model
export interface DioramaModelProps {
  onClick?: () => void;
  onLoad?: () => void;
  modelIndex?: number;
  [key: string]: any; // For other props that might be passed
}

// Define available models
export const MODELS = [
  '/models/Model_1.glb',
  '/models/Model_2.glb',
  '/models/Model_3.glb',
  '/models/Model_4.glb',
];

/**
 * 3D Diorama model component with animation controls
 */
const DioramaModel = (props: DioramaModelProps) => {
  // Get current model based on the modelIndex or default to first model
  const currentModel = MODELS[props.modelIndex || 0];
  
  // Using useGLTF with Suspense for lazy loading
  const { scene, animations } = useGLTF(currentModel, true);
  const { actions } = useAnimations(animations, scene);
  const modelRef = useRef<Group>(null);
  
  // Play animation on mount and notify parent that model is loaded
  useEffect(() => {
    // Play all animations
    Object.values(actions).forEach(action => {
      if (action) {
        action.reset().play();
        action.setLoop(THREE.LoopRepeat, Infinity);
      }
    });
    
    // Notify parent component that model has loaded
    if (props.onLoad) {
      props.onLoad();
    }
  }, [actions, props, currentModel]);
  
  return <primitive ref={modelRef} object={scene} scale={1.2} {...props} />;
};

// Export a function to preload all models
export const preloadAllModels = () => {
  MODELS.forEach(model => {
    useGLTF.preload(model);
  });
};

export default DioramaModel;