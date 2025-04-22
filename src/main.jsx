import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Create root
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);