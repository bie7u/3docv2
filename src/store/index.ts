import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StepNode, StepEdge } from '../types';

interface AppStore {
  nodes: StepNode[];
  edges: StepEdge[];
  selectedNodeId: string | null;
  previewMode: boolean;
  currentPreviewNodeId: string | null;
  
  setNodes: (nodes: StepNode[]) => void;
  setEdges: (edges: StepEdge[]) => void;
  addNode: (node: StepNode) => void;
  updateNode: (id: string, updates: Partial<StepNode['data']>) => void;
  deleteNode: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setPreviewMode: (mode: boolean) => void;
  setCurrentPreviewNodeId: (id: string | null) => void;
  getNextNodes: (nodeId: string) => StepNode[];
  getPreviousNodes: (nodeId: string) => StepNode[];
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      previewMode: false,
      currentPreviewNodeId: null,

      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      
      addNode: (node) => set((state) => ({ 
        nodes: [...state.nodes, node] 
      })),
      
      updateNode: (id, updates) => set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...updates } } : node
        ),
      })),
      
      deleteNode: (id) => set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== id),
        edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
        selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
      })),
      
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setPreviewMode: (mode) => set({ previewMode: mode }),
      setCurrentPreviewNodeId: (id) => set({ currentPreviewNodeId: id }),
      
      getNextNodes: (nodeId) => {
        const { nodes, edges } = get();
        const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
        return nodes.filter((node) => 
          outgoingEdges.some((edge) => edge.target === node.id)
        );
      },
      
      getPreviousNodes: (nodeId) => {
        const { nodes, edges } = get();
        const incomingEdges = edges.filter((edge) => edge.target === nodeId);
        return nodes.filter((node) => 
          incomingEdges.some((edge) => edge.source === node.id)
        );
      },
    }),
    {
      name: '3d-instruction-builder-storage',
    }
  )
);
