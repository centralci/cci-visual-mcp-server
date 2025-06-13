import React from 'react';
import './app.css';

function onButtonClick() {
   window.electronAPI?.modifyTitle("IPC baby!")
}

const App = () => {
  return (
    <div className="app">
      <h1 className="text-primary text-4xl font-bold">I'm React running in Electron App!!</h1>
      <button onClick={onButtonClick}>
        Play Movie
      </button>
    </div>
  );
}

export default App;