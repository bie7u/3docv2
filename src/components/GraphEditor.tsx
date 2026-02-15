import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import type { Connection, Edge, Node, NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../store';
import type { StepNode as StepNodeType } from '../types';
import { CustomNode } from './CustomNode';

const nodeTypes: NodeTypes = {
  start: CustomNode,
  main: CustomNode,
  branch: CustomNode,
  end: CustomNode,
};

export const GraphEditor = () => {
  const { 
    nodes: storeNodes, 
    edges: storeEdges, 
    setNodes: setStoreNodes, 
    setEdges: setStoreEdges,
    setSelectedNodeId,
    previewMode,
    currentPreviewNodeId,
  } = useStore();

  // Convert store nodes to ReactFlow nodes
  const flowNodes: Node[] = storeNodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      ...node.data,
      isSelected: currentPreviewNodeId === node.id,
    },
  }));

  const flowEdges: Edge[] = storeEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    label: edge.label,
    animated: currentPreviewNodeId === edge.source,
  }));

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        id: `edge-${Date.now()}`,
        source: params.source!,
        target: params.target!,
      };
      setStoreEdges([...storeEdges, newEdge]);
    },
    [storeEdges, setStoreEdges]
  );

  const onNodeDragStop = useCallback(
    (_event: any, node: Node) => {
      const updatedNodes = storeNodes.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      );
      setStoreNodes(updatedNodes as StepNodeType[]);
    },
    [storeNodes, setStoreNodes]
  );

  const onNodeClick = useCallback(
    (_event: any, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onEdgeClick = useCallback(
    (_event: any, edge: Edge) => {
      if (!previewMode) {
        // Allow edge deletion in edit mode
        const updatedEdges = storeEdges.filter((e) => e.id !== edge.id);
        setStoreEdges(updatedEdges);
      }
    },
    [previewMode, storeEdges, setStoreEdges]
  );

  return (
    <div className="w-full h-full bg-gray-900">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onConnect={previewMode ? undefined : onConnect}
        onNodeDragStop={previewMode ? undefined : onNodeDragStop}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-900"
      >
        <Background color="#374151" />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'start':
                return '#10b981';
              case 'end':
                return '#ef4444';
              case 'branch':
                return '#8b5cf6';
              default:
                return '#3b82f6';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};
