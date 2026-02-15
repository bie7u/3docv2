# 3DOC v2 - 3D Workflow Visualization

A React-based application that visualizes workflow steps in 3D, with intelligent parallel step detection and side-by-side positioning.

## Features

- **Flow Editor**: Interactive workflow editor using ReactFlow
- **3D Visualization**: Real-time 3D representation using Three.js and React Three Fiber
- **Parallel Step Detection**: Automatically detects steps that run in parallel (same level, same parent nodes)
- **Side-by-Side Layout**: Parallel steps are displayed next to each other on the X-axis in 3D space
- **Visual Distinction**: Parallel steps are highlighted in green, sequential steps in blue

## How It Works

When you connect steps in parallel in the Flow editor (multiple steps from the same source), they are:
1. Detected as parallel by analyzing the workflow graph
2. Grouped together at the same depth level
3. Positioned side by side on the X-axis in the 3D visualization
4. Connected visually to show the workflow flow

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Building

```bash
npm run build
```

## Usage

1. Edit the workflow in the left panel using the Flow Editor
2. Connect nodes to create your workflow
3. Watch as parallel steps are automatically positioned side by side in the 3D view on the right
4. Use mouse to rotate, zoom, and pan the 3D view

## Example Workflow

The default workflow includes:
- Start node
- Two parallel steps (Step A and Step B)
- End node

This demonstrates how parallel execution paths are visualized side by side in 3D.