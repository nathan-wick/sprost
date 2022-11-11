import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeL2Od5-EifO2pyz4BqNwfHVyyiZV0ULU",
  authDomain: "nathan-wick-sprost.firebaseapp.com",
  projectId: "nathan-wick-sprost",
  storageBucket: "nathan-wick-sprost.appspot.com",
  messagingSenderId: "896198305700",
  appId: "1:896198305700:web:ffba7ba3c9c04fcae3c331"
};

// Firebase Initialization
const firebase = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);