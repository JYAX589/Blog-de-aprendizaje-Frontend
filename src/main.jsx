import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Asegúrate de que la ruta a tu App sea correcta
// Importa el CSS de Bootstrap justo aquí:
import 'bootstrap/dist/css/bootstrap.min.css';
// Si tienes estilos globales personalizados, impórtalos después de Bootstrap
// import './index.css'; // Si usas o creas un archivo de estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);