import { create } from 'zustand';
import { Node, Edge, applyNodeChanges, applyEdgeChanges, addEdge, Connection, NodeChange, EdgeChange } from 'reactflow';

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
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
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
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));
