import { useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import { GraphEditor } from './components/GraphEditor';
import { Viewer3D } from './components/Viewer3D';
import { PropertiesPanel } from './components/PropertiesPanel';
import { useStore } from './store';
import { createSampleProject } from './utils/sampleProject';

function App() {
  const { nodes, setNodes, setEdges } = useStore();

  useEffect(() => {
    // Initialize with sample project if no nodes exist
    if (nodes.length === 0) {
      const { nodes: sampleNodes, edges: sampleEdges } = createSampleProject();
      setNodes(sampleNodes);
      setEdges(sampleEdges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Toolbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Graph Editor - Left Panel */}
        <div className="w-1/3 min-w-[400px]">
          <GraphEditor />
        </div>

        {/* 3D Viewer - Center */}
        <div className="flex-1">
          <Viewer3D />
        </div>

        {/* Properties Panel - Right */}
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
