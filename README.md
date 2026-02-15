# 3D Instruction Builder

A frontend-only web application prototype for creating interactive 3D instruction workflows with branching steps and connections. Built with React, TypeScript, and modern web technologies.

![3D Instruction Builder](https://github.com/user-attachments/assets/589d84a4-3a67-4522-863f-c556914d7b14)

## Features

### 🎨 Graph-Based Step Editor
- Visual node-based editor using React Flow
- Create and connect instruction steps
- Support for branching workflows and alternative paths
- Drag-and-drop node positioning
- Real-time visual feedback with color-coded nodes
- Mini-map for navigation

### 📝 Step Types
- **Start Step**: Beginning of the instruction flow (Green)
- **Main Step**: Primary instruction steps (Blue)
- **Branch Step**: Alternative paths and variations (Purple)
- **End Step**: Completion point (Red)

### 🎥 3D Viewer
- Interactive 3D scene using React Three Fiber
- Smooth camera animations between steps
- OrbitControls for manual scene exploration
- Grid and lighting for better visualization
- Camera position preview for each step

### 🎮 Preview Mode
- Navigate through instruction flow step-by-step
- View branching options dynamically
- Smooth camera transitions between steps
- Highlighted current step in graph
- Next step suggestions based on connections

### ⚙️ Properties Panel
- Edit step title and description
- Configure camera position (X, Y, Z)
- Set camera target point
- 3D model reference (GLB/GLTF support)
- Delete steps with confirmation

### 💾 State Management
- Zustand for centralized state
- LocalStorage persistence
- Automatic save/load

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Three Fiber** - 3D rendering with Three.js
- **@react-three/drei** - 3D helpers and components
- **React Flow** - Node-based graph editor
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Three.js** - 3D graphics library

## Project Structure

```
3docv2/
├── src/
│   ├── components/
│   │   ├── CustomNode.tsx       # React Flow custom node component
│   │   ├── GraphEditor.tsx      # Graph editor with React Flow
│   │   ├── PropertiesPanel.tsx  # Step properties editor
│   │   ├── Scene3D.tsx          # 3D scene with objects
│   │   ├── Toolbar.tsx          # Top toolbar with actions
│   │   ├── Viewer3D.tsx         # 3D viewer canvas
│   │   └── index.ts             # Component exports
│   ├── store/
│   │   └── index.ts             # Zustand store with persistence
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── sampleProject.ts     # Sample project data
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Tailwind CSS imports
│   └── main.tsx                 # App entry point
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3docv2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Creating Instruction Steps

1. **Add Steps**: Click the toolbar buttons to add different step types:
   - `+ Start` - Add a start node
   - `+ Main Step` - Add a main instruction step
   - `+ Branch Step` - Add a branching/alternative step
   - `+ End` - Add an end node

2. **Connect Steps**: Drag from a node's bottom handle to another node's top handle to create connections

3. **Edit Properties**: Click on any node to edit its properties in the right panel:
   - Title and description
   - Camera position and target
   - 3D model reference

4. **Position Nodes**: Drag nodes to arrange them in your preferred layout

### Preview Mode

1. Click **Preview Mode** to enter navigation mode
2. The system starts at the first "Start" node
3. Use the **Next Steps** buttons to navigate through the workflow
4. At branching points, choose which path to follow
5. The 3D camera animates to show the perspective of each step
6. Click **Exit Preview** to return to editing mode

### Navigation Logic

- The preview mode follows the graph structure
- At each step, it shows all possible next steps based on outgoing edges
- Users can navigate forward through the instruction flow
- Branching steps allow choosing between alternative paths
- Loops and complex paths are supported

### Sample Project

The application loads with a pre-configured sample project demonstrating:
- Linear instruction flow
- Branching paths (Option A vs Option B)
- Merge points where branches rejoin
- Different camera angles for each step

### LocalStorage Persistence

All changes are automatically saved to browser localStorage. To reset:
- Open browser DevTools
- Go to Application > Local Storage
- Delete the `3d-instruction-builder-storage` key
- Refresh the page

## Customization

### Adding 3D Models

To use custom GLB/GLTF models:

1. Place your model files in `public/models/`
2. Reference them in step properties: `models/your-model.glb`
3. Update `Scene3D.tsx` to load and display the models

### Styling

The app uses Tailwind CSS for styling. Customize:
- Colors in `tailwind.config.js`
- Component styles in component files
- Global styles in `src/index.css`

### Node Types

Add custom node types by:
1. Updating the `StepNode` type in `src/types/index.ts`
2. Adding the type to `nodeTypes` in `GraphEditor.tsx`
3. Styling the node in `CustomNode.tsx`

## Development

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Functional React components with hooks

### State Management

Zustand store structure:
```typescript
{
  nodes: StepNode[]           // All instruction steps
  edges: StepEdge[]           // Connections between steps
  selectedNodeId: string      // Currently selected node
  previewMode: boolean        // Preview/edit mode toggle
  currentPreviewNodeId: string // Current step in preview
}
```

### Key Components

- **App.tsx**: Main layout with three-column design
- **GraphEditor.tsx**: React Flow integration and node management
- **Viewer3D.tsx**: Three.js canvas and 3D rendering
- **PropertiesPanel.tsx**: Step editing and preview navigation
- **Scene3D.tsx**: 3D objects and camera animation logic

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari

WebGL support is required for 3D rendering.

## Known Limitations

- No backend - all data stored in browser
- No user authentication
- No collaborative editing
- Sample 3D objects only (cube, sphere, cylinder)
- No undo/redo functionality

## Future Enhancements

Potential improvements:
- [ ] Actual GLB/GLTF model loading and display
- [ ] Annotations and hotspots in 3D view
- [ ] Export/import project files
- [ ] Undo/redo support
- [ ] Node grouping and templates
- [ ] Keyboard shortcuts
- [ ] Touch/mobile support
- [ ] Animation timeline
- [ ] Multi-language support

## License

This is a prototype project for demonstration purposes.

## Contributing

This is a prototype project. For production use, consider adding:
- Unit tests
- E2E tests
- Error boundaries
- Loading states
- Better error handling
- Accessibility improvements
- Performance optimizations
