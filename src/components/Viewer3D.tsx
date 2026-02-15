import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkflowStore } from '../store/workflowStore';
import { calculate3DPositions, Node3DPosition } from '../utils/layout3D';

interface NodeBoxProps {
  position: Node3DPosition;
}

const NodeBox: React.FC<NodeBoxProps> = ({ position }) => {
  const color = position.isParallel ? '#4CAF50' : '#2196F3';

  return (
    <group position={[position.position.x, position.position.y, position.position.z]}>
      <mesh>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {position.label}
      </Text>
      {position.isParallel && (
        <Text
          position={[0, -0.7, 0.6]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          (Parallel)
        </Text>
      )}
    </group>
  );
};

interface ConnectionLineProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ start, end }) => {
  const points = [start, end];

  return (
    <Line
      points={points}
      color="#666666"
      lineWidth={2}
    />
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
