import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Firebase from './components/Firebase';
import Auth from './components/Auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="App">
      <Firebase>
        <Auth />
      </Firebase>
    </div>
  </React.StrictMode>
);