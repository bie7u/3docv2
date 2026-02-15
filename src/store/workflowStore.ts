import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

export interface WorkflowNode extends Node {
  data: {
    label: string;
  };
}

interface WorkflowStore {
  nodes: WorkflowNode[];
  edges: Edge[];
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [
    {
      id: '1',
      type: 'default',
      data: { label: 'Start' },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      type: 'default',
      data: { label: 'Step A' },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      type: 'default',
      data: { label: 'Step B' },
      position: { x: 400, y: 100 },
    },
    {
      id: '4',
      type: 'default',
      data: { label: 'End' },
      position: { x: 250, y: 200 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-4', source: '3', target: '4' },
  ],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onNodesChange: (changes) => {
    const { nodes } = get();
    const updatedNodes = nodes.map(node => {
      const change = changes.find((c: any) => c.id === node.id);
      if (change) {
        if (change.type === 'position' && change.position) {
          return { ...node, position: change.position };
        }
        if (change.type === 'remove') {
          return null;
        }
      }
      return node;
    }).filter(Boolean) as WorkflowNode[];
    set({ nodes: updatedNodes });
  },
  onEdgesChange: (changes) => {
    const { edges } = get();
    const updatedEdges = edges.filter(edge => {
      return !changes.find((c: any) => c.id === edge.id && c.type === 'remove');
    });
    set({ edges: updatedEdges });
  },
  onConnect: (connection) => {
    const { edges } = get();
    const newEdge = {
      id: `e${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
    };
    set({ edges: [...edges, newEdge] });
  },
}));
