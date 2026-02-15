import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkflowStore } from '../store/workflowStore';
import { calculate3DPositions, Node3DPosition } from '../utils/layout3D';

interface NodeBoxProps {
  position: Node3DPosition;
}

const NodeBox: React.FC<NodeBoxProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = position.isParallel ? '#4CAF50' : '#2196F3';

  return (
    <group position={[position.position.x, position.position.y, position.position.z]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={8}
        style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div>
          {position.label}
          {position.isParallel && (
            <div style={{ fontSize: '10px', marginTop: '2px' }}>(Parallel)</div>
          )}
        </div>
      </Html>
    </group>
  );
};

interface ConnectionLineProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ start, end }) => {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      start,
      new THREE.Vector3(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2,
        (start.z + end.z) / 2
      ),
      end
    );
    return curve.getPoints(50);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#666666" linewidth={2} />
    </line>
  );
};

const Viewer3D: React.FC = () => {
  const { nodes, edges } = useWorkflowStore();

  const positions3D = useMemo(() => {
    return calculate3DPositions(nodes, edges);
  }, [nodes, edges]);

  const connections = useMemo(() => {
    const posMap = new Map(positions3D.map(p => [p.id, p]));
    return edges.map(edge => {
      const sourcePos = posMap.get(edge.source);
      const targetPos = posMap.get(edge.target);
      if (sourcePos && targetPos) {
        return {
          start: new THREE.Vector3(
            sourcePos.position.x,
            sourcePos.position.y,
            sourcePos.position.z
          ),
          end: new THREE.Vector3(
            targetPos.position.x,
            targetPos.position.y,
            targetPos.position.z
          ),
        };
      }
      return null;
    }).filter(Boolean) as { start: THREE.Vector3; end: THREE.Vector3 }[];
  }, [positions3D, edges]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Render nodes */}
        {positions3D.map((pos) => (
          <NodeBox key={pos.id} position={pos} />
        ))}

        {/* Render connections */}
        {connections.map((conn, idx) => (
          <ConnectionLine key={idx} start={conn.start} end={conn.end} />
        ))}

        <OrbitControls />
        <gridHelper args={[20, 20]} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
