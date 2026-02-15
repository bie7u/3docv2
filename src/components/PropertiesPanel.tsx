import { useStore } from '../store';

export const PropertiesPanel = () => {
  const { nodes, selectedNodeId, updateNode, deleteNode, previewMode, currentPreviewNodeId, getNextNodes, setCurrentPreviewNodeId } = useStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleUpdate = (field: string, value: string) => {
    if (!selectedNodeId) return;
    updateNode(selectedNodeId, { [field]: value });
  };

  const handleCameraPositionUpdate = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selectedNode) return;
    const newPosition = { ...selectedNode.data.cameraPosition, [axis]: value };
    updateNode(selectedNodeId!, { cameraPosition: newPosition });
  };

  const handleCameraTargetUpdate = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selectedNode) return;
    const newTarget = { ...selectedNode.data.cameraTarget, [axis]: value };
    updateNode(selectedNodeId!, { cameraTarget: newTarget });
  };

  const handleDelete = () => {
    if (!selectedNodeId) return;
    if (window.confirm('Are you sure you want to delete this step?')) {
      deleteNode(selectedNodeId);
    }
  };

  const handleNavigateToNext = (nextNodeId: string) => {
    setCurrentPreviewNodeId(nextNodeId);
  };

  if (!selectedNode && !previewMode) {
    return (
      <div className="w-80 bg-gray-800 text-white p-6 overflow-y-auto border-l border-gray-700">
        <h2 className="text-lg font-bold mb-4">Properties</h2>
        <p className="text-gray-400 text-sm">Select a step to edit its properties</p>
      </div>
    );
  }

  if (previewMode && currentPreviewNodeId) {
    const currentNode = nodes.find((n) => n.id === currentPreviewNodeId);
    const nextNodes = getNextNodes(currentPreviewNodeId);

    return (
      <div className="w-80 bg-gray-800 text-white p-6 overflow-y-auto border-l border-gray-700">
        <h2 className="text-lg font-bold mb-4">Preview Mode</h2>
        
        {currentNode && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">{currentNode.data.title}</h3>
            <p className="text-gray-300 text-sm">{currentNode.data.description}</p>
          </div>
        )}

        {nextNodes.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <div className="space-y-2">
              {nextNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNavigateToNext(node.id)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-left transition"
                >
                  {node.data.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {nextNodes.length === 0 && (
          <p className="text-gray-400 text-sm">No next steps available</p>
        )}
      </div>
    );
  }

  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-800 text-white p-6 overflow-y-auto border-l border-gray-700">
        <h2 className="text-lg font-bold mb-4">Properties</h2>
        <p className="text-gray-400 text-sm">Select a step to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-800 text-white p-6 overflow-y-auto border-l border-gray-700">
      <h2 className="text-lg font-bold mb-4">Properties</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={selectedNode.data.title}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={selectedNode.data.description}
            onChange={(e) => handleUpdate('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Camera Position</label>
          <div className="grid grid-cols-3 gap-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis}>
                <label className="block text-xs mb-1 uppercase">{axis}</label>
                <input
                  type="number"
                  step="0.5"
                  value={selectedNode.data.cameraPosition[axis]}
                  onChange={(e) => handleCameraPositionUpdate(axis, parseFloat(e.target.value))}
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Camera Target</label>
          <div className="grid grid-cols-3 gap-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis}>
                <label className="block text-xs mb-1 uppercase">{axis}</label>
                <input
                  type="number"
                  step="0.5"
                  value={selectedNode.data.cameraTarget[axis]}
                  onChange={(e) => handleCameraTargetUpdate(axis, parseFloat(e.target.value))}
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">3D Model Reference</label>
          <input
            type="text"
            value={selectedNode.data.modelRef || ''}
            onChange={(e) => handleUpdate('modelRef', e.target.value)}
            placeholder="path/to/model.glb"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
          >
            Delete Step
          </button>
        </div>
      </div>
    </div>
  );
};
