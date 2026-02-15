import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface CustomNodeData {
  title: string;
  description: string;
  isSelected?: boolean;
}

export const CustomNode = memo(({ data, type }: NodeProps<CustomNodeData>) => {
  const getNodeStyle = () => {
    switch (type) {
      case 'start':
        return 'bg-green-600 border-green-400';
      case 'end':
        return 'bg-red-600 border-red-400';
      case 'branch':
        return 'bg-purple-600 border-purple-400';
      default:
        return 'bg-blue-600 border-blue-400';
    }
  };

  const isSelected = data.isSelected ?? false;

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 shadow-lg min-w-[200px] ${getNodeStyle()} ${
        isSelected ? 'ring-4 ring-yellow-400' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="text-white">
        <div className="font-bold text-sm uppercase mb-1">{type}</div>
        <div className="font-semibold">{data.title}</div>
        <div className="text-xs mt-1 opacity-80 truncate">{data.description}</div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
