import type { StepNode, StepEdge } from '../types';

export const createSampleProject = (): { nodes: StepNode[]; edges: StepEdge[] } => {
  const nodes: StepNode[] = [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 0, y: 0 },
      data: {
        title: 'Start Assembly',
        description: 'Begin the assembly process',
        cameraPosition: { x: 0, y: 8, z: 12 },
        cameraTarget: { x: 0, y: 0, z: 0 },
      },
    },
    {
      id: 'main-1',
      type: 'main',
      position: { x: 250, y: 0 },
      data: {
        title: 'Place Base Component',
        description: 'Position the base component on the work surface',
        cameraPosition: { x: 0, y: 5, z: 10 },
        cameraTarget: { x: 0, y: 0, z: 0 },
      },
    },
    {
      id: 'branch-1',
      type: 'branch',
      position: { x: 500, y: -150 },
      data: {
        title: 'Option A: Red Parts',
        description: 'Use red components for this variation',
        cameraPosition: { x: 2, y: 4, z: 8 },
        cameraTarget: { x: 2, y: 0.3, z: 0 },
      },
    },
    {
      id: 'branch-2',
      type: 'branch',
      position: { x: 500, y: 150 },
      data: {
        title: 'Option B: Green Parts',
        description: 'Use green components for this variation',
        cameraPosition: { x: -2, y: 4, z: 8 },
        cameraTarget: { x: -2, y: 0.5, z: 0 },
      },
    },
    {
      id: 'main-2',
      type: 'main',
      position: { x: 750, y: 0 },
      data: {
        title: 'Secure Components',
        description: 'Fasten all components together',
        cameraPosition: { x: 0, y: 3, z: 8 },
        cameraTarget: { x: 0, y: 0.5, z: 0 },
      },
    },
    {
      id: 'end-1',
      type: 'end',
      position: { x: 1000, y: 0 },
      data: {
        title: 'Assembly Complete',
        description: 'The assembly is now complete',
        cameraPosition: { x: -3, y: 6, z: 10 },
        cameraTarget: { x: 0, y: 0, z: 0 },
      },
    },
  ];

  const edges: StepEdge[] = [
    { id: 'e1', source: 'start-1', target: 'main-1', label: 'Begin' },
    { id: 'e2', source: 'main-1', target: 'branch-1', label: 'Red Option' },
    { id: 'e3', source: 'main-1', target: 'branch-2', label: 'Green Option' },
    { id: 'e4', source: 'branch-1', target: 'main-2' },
    { id: 'e5', source: 'branch-2', target: 'main-2' },
    { id: 'e6', source: 'main-2', target: 'end-1', label: 'Finish' },
  ];

  return { nodes, edges };
};
