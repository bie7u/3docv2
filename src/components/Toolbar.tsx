import { useStore } from '../store';

export const Toolbar = () => {
  const { previewMode, setPreviewMode, addNode, nodes, setCurrentPreviewNodeId } = useStore();

  const handleAddStep = (type: 'main' | 'branch' | 'start' | 'end') => {
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      position: { x: nodes.length * 250, y: type === 'branch' ? 200 : 0 },
      data: {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Step`,
        description: 'Add description here...',
        cameraPosition: { x: 0, y: 5, z: 10 },
        cameraTarget: { x: 0, y: 0, z: 0 },
      },
    };
    addNode(newNode);
  };

  const handleTogglePreview = () => {
    if (!previewMode) {
      // Enter preview mode - start from the first 'start' node
      const startNode = nodes.find((n) => n.type === 'start');
      if (startNode) {
        setCurrentPreviewNodeId(startNode.id);
      }
    } else {
      setCurrentPreviewNodeId(null);
    }
    setPreviewMode(!previewMode);
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex items-center gap-4 border-b border-gray-700">
      <h1 className="text-xl font-bold">3D Instruction Builder</h1>
      
      <div className="flex-1 flex gap-2">
        <button
          onClick={() => handleAddStep('start')}
          disabled={previewMode}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition"
        >
          + Start
        </button>
        <button
          onClick={() => handleAddStep('main')}
          disabled={previewMode}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition"
        >
          + Main Step
        </button>
        <button
          onClick={() => handleAddStep('branch')}
          disabled={previewMode}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition"
        >
          + Branch Step
        </button>
        <button
          onClick={() => handleAddStep('end')}
          disabled={previewMode}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition"
        >
          + End
        </button>
      </div>

      <button
        onClick={handleTogglePreview}
        className={`px-6 py-2 rounded font-semibold transition ${
          previewMode
            ? 'bg-orange-600 hover:bg-orange-700'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {previewMode ? 'Exit Preview' : 'Preview Mode'}
      </button>
    </div>
  );
};
