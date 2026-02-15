import React from 'react';
import FlowEditor from './components/FlowEditor';
import Viewer3D from './components/Viewer3D';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="header">
        <h1>3DOC v2 - 3D Workflow Visualization</h1>
        <p>Edit the workflow on the left - parallel steps will appear side by side in 3D on the right</p>
      </div>
      <div className="content">
        <div className="panel flow-panel">
          <h2>Flow Editor</h2>
          <div className="panel-content">
            <FlowEditor />
          </div>
        </div>
        <div className="panel viewer-panel">
          <h2>3D Visualization</h2>
          <div className="panel-content">
            <Viewer3D />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
