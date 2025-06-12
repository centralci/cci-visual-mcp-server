import React from 'react';
import { createRoot } from 'react-dom/client'
import App from '@/app/app';

// const domNode = document.getElementById('root')!;
const root = createRoot(document.body);
root.render(<App />)
// root.render(<h2>Hello from React!</h2>);
