export interface StepNode {
  id: string;
  type: 'start' | 'main' | 'branch' | 'end';
  position: { x: number; y: number };
  data: {
    title: string;
    description: string;
    modelRef?: string;
    cameraPosition: { x: number; y: number; z: number };
    cameraTarget: { x: number; y: number; z: number };
    annotations?: Array<{
      position: { x: number; y: number; z: number };
      text: string;
    }>;
  };
}

export interface StepEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string;
}

export interface AppState {
  nodes: StepNode[];
  edges: StepEdge[];
  selectedNodeId: string | null;
  previewMode: boolean;
  currentPreviewNodeId: string | null;
}
