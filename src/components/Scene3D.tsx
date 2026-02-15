import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store';

export const Scene3D = ({ activeNodeId }: { activeNodeId: string | null }) => {
  const { camera } = useThree();
  const { nodes } = useStore();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!activeNodeId) return;

    const activeNode = nodes.find((n) => n.id === activeNodeId);
    if (!activeNode) return;

    const { cameraPosition, cameraTarget } = activeNode.data;

    // Animate camera position
    targetPosition.current.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    targetLookAt.current.set(
      cameraTarget.x,
      cameraTarget.y,
      cameraTarget.z
    );

    // Smooth camera transition
    const startPos = camera.position.clone();
    const startTime = Date.now();
    const duration = 1000; // 1 second

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.position.lerpVectors(startPos, targetPosition.current, eased);
      camera.lookAt(targetLookAt.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [activeNodeId, nodes, camera]);

  // Default scene with a simple 3D object (cube as placeholder)
  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh position={[2, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      <mesh position={[-2, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
};
