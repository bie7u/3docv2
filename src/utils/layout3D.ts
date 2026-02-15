import { WorkflowNode } from '../store/workflowStore';
import { Edge } from 'reactflow';

export interface Node3DPosition {
  id: string;
  label: string;
  position: { x: number; y: number; z: number };
  level: number;
  isParallel: boolean;
  parallelGroup?: number;
}

/**
 * Calculate the level (depth) of each node in the workflow graph
 * Level 0 = nodes with no incoming edges (start nodes)
 * Level n = max(levels of parent nodes) + 1
 */
function calculateNodeLevels(
  nodes: WorkflowNode[],
  edges: Edge[]
): Map<string, number> {
  const levels = new Map<string, number>();
  const visited = new Set<string>();

  // Find nodes with no incoming edges (start nodes)
  const incomingEdges = new Map<string, Edge[]>();
  edges.forEach((edge) => {
    if (!incomingEdges.has(edge.target)) {
      incomingEdges.set(edge.target, []);
    }
    incomingEdges.get(edge.target)!.push(edge);
  });

  // Start nodes have level 0
  nodes.forEach((node) => {
    if (!incomingEdges.has(node.id)) {
      levels.set(node.id, 0);
    }
  });

  // Process nodes level by level using BFS
  const queue: string[] = [];
  levels.forEach((_, nodeId) => queue.push(nodeId));

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    const currentLevel = levels.get(nodeId) || 0;

    // Find all children and update their levels
    edges.forEach((edge) => {
      if (edge.source === nodeId) {
        const childLevel = levels.get(edge.target) || 0;
        const newLevel = currentLevel + 1;

        if (newLevel > childLevel) {
          levels.set(edge.target, newLevel);
        }

        if (!visited.has(edge.target)) {
          queue.push(edge.target);
        }
      }
    });
  }

  return levels;
}

/**
 * Identify parallel nodes (nodes at the same level with same parents)
 */
function identifyParallelGroups(
  nodes: WorkflowNode[],
  edges: Edge[],
  levels: Map<string, number>
): Map<string, number> {
  const parallelGroups = new Map<string, number>();
  let groupId = 0;

  // Group nodes by level
  const nodesByLevel = new Map<number, string[]>();
  levels.forEach((level, nodeId) => {
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)!.push(nodeId);
  });

  // For each level, group nodes with common parents
  nodesByLevel.forEach((nodesAtLevel, level) => {
    if (nodesAtLevel.length <= 1) return;

    // Get parents for each node
    const nodeParents = new Map<string, Set<string>>();
    nodesAtLevel.forEach((nodeId) => {
      const parents = new Set<string>();
      edges.forEach((edge) => {
        if (edge.target === nodeId) {
          parents.add(edge.source);
        }
      });
      nodeParents.set(nodeId, parents);
    });

    // Group nodes with same parents
    const processed = new Set<string>();
    nodesAtLevel.forEach((nodeId) => {
      if (processed.has(nodeId)) return;

      const parents = nodeParents.get(nodeId)!;
      const parallelNodes = [nodeId];

      // Find other nodes with same parents
      nodesAtLevel.forEach((otherNodeId) => {
        if (otherNodeId === nodeId || processed.has(otherNodeId)) return;

        const otherParents = nodeParents.get(otherNodeId)!;

        // Check if they have the same parents
        if (
          parents.size === otherParents.size &&
          [...parents].every((p) => otherParents.has(p))
        ) {
          parallelNodes.push(otherNodeId);
        }
      });

      // If there are parallel nodes, assign them to a group
      if (parallelNodes.length > 1) {
        parallelNodes.forEach((id) => {
          parallelGroups.set(id, groupId);
          processed.add(id);
        });
        groupId++;
      }
    });
  });

  return parallelGroups;
}

/**
 * Calculate 3D positions for all nodes
 * Parallel nodes are positioned side by side on the X-axis
 */
export function calculate3DPositions(
  nodes: WorkflowNode[],
  edges: Edge[]
): Node3DPosition[] {
  const levels = calculateNodeLevels(nodes, edges);
  const parallelGroups = identifyParallelGroups(nodes, edges, levels);

  // Group nodes by level and parallel group
  const nodesByLevel = new Map<number, Map<number | null, string[]>>();
  nodes.forEach((node) => {
    const level = levels.get(node.id) || 0;
    const group = parallelGroups.get(node.id) ?? null;

    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, new Map());
    }
    if (!nodesByLevel.get(level)!.has(group)) {
      nodesByLevel.get(level)!.set(group, []);
    }
    nodesByLevel.get(level)!.get(group)!.push(node.id);
  });

  // Calculate positions
  const positions: Node3DPosition[] = [];
  const spacing = { x: 3, y: 0, z: 4 }; // Spacing between nodes

  nodes.forEach((node) => {
    const level = levels.get(node.id) || 0;
    const group = parallelGroups.get(node.id) ?? null;
    const nodesInGroup = nodesByLevel.get(level)!.get(group)!;
    const indexInGroup = nodesInGroup.indexOf(node.id);
    const groupSize = nodesInGroup.length;

    // Calculate X position to center the parallel group
    const xOffset = (indexInGroup - (groupSize - 1) / 2) * spacing.x;

    positions.push({
      id: node.id,
      label: node.data.label,
      position: {
        x: xOffset,
        y: spacing.y,
        z: -level * spacing.z, // Negative Z to flow away from camera
      },
      level,
      isParallel: groupSize > 1,
      parallelGroup: group ?? undefined,
    });
  });

  return positions;
}
