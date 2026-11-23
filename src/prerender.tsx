/* =============================================================================
   prerender.tsx — usado só no build (por ferramentas/prerender.mjs).
   Gera o HTML da página inteira, que vai direto para o dist/index.html.
   Assim o Google e os leitores de link recebem o conteúdo pronto, e a foto do
   topo começa a carregar antes de qualquer JavaScript.
   ========================================================================== */

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App.tsx';

export function renderizar(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
