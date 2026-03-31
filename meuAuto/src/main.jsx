import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Mainpage.jsx';
import App from './App.jsx'
import Calculadora from './Calculadora.jsx';
import RegistrarManutencao from './RegistrarManutencao.jsx';
import Pesquisa from './Pesquisa.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/mainpage', element: <Main /> },
  { path: '/calculadora', element: <Calculadora /> },
  { path: '/registrar', element: <RegistrarManutencao /> },
  { path: '/pesquisa', element: <Pesquisa /> }

]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
