/* =============================================================================
   main.tsx — ponto de entrada no navegador.
   No site publicado, o HTML já vem pronto (pré-renderizado no build) e o React
   apenas "assume" a página (hydrate). No "npm run dev" a página é montada do zero.
   ========================================================================== */

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './estilo.css';

const raiz = document.getElementById('raiz');
if (!raiz) throw new Error('Elemento #raiz não encontrado no index.html');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (raiz.firstElementChild) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
