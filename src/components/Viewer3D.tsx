import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import { useStore } from '../store';
import { Scene3D } from './Scene3D';

export const Viewer3D = () => {
  const { selectedNodeId, currentPreviewNodeId, previewMode } = useStore();
  
  const activeNodeId = previewMode ? currentPreviewNodeId : selectedNodeId;

  return (
    <div className="w-full h-full bg-gray-950 relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Scene3D activeNodeId={activeNodeId} />
        
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#4b5563"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />
      </Canvas>
      
      {!activeNodeId && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white text-center bg-gray-800 bg-opacity-80 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">3D Viewer</h2>
            <p className="text-gray-300">Select a step to view its 3D camera position</p>
          </div>
        </div>
      )}
    </div>
  );
};
