import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

// Define prop types for Diorama model
export interface DioramaModelProps {
  isRotating: boolean;
  onClick?: () => void;
  onLoad?: () => void;
  [key: string]: any; // For other props that might be passed
}

/**
 * 3D Diorama model component with animation and rotation controls
 */
const DioramaModel = (props: DioramaModelProps) => {
  // Using useGLTF with Suspense for lazy loading
  const { scene, animations } = useGLTF('/models/DioramaAnimacion.glb', true);
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
  }, [actions, props]);
  
  // Rotation animation
  useFrame((_, delta) => {
    if (!props.isRotating || !modelRef.current) return;
    modelRef.current.rotation.y += delta * 0.5;
  });
  
  return <primitive ref={modelRef} object={scene} scale={1.2} {...props} />;
};

// Use automatic asset preloading for better performance after initial load
useGLTF.preload('/models/DioramaAnimacion.glb');

export default DioramaModel;