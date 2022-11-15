import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import FirebaseContextProvider from './contexts/Firebase';
import AuthContextProvider from './contexts/Auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="App">
      <FirebaseContextProvider>
        <AuthContextProvider />
      </FirebaseContextProvider>
    </div>
  </React.StrictMode>
);