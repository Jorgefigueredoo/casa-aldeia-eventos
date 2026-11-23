/* =============================================================================
   ferramentas/prerender.mjs — última etapa do "npm run build".

   Renderiza o React em HTML (src/prerender.tsx) e coloca o resultado dentro do
   <div id="raiz"> do dist/index.html. O visitante recebe a página pronta; o
   JavaScript só "assume" depois (hydrate), deixando galeria, formulário e
   acordeão interativos.
   ========================================================================== */

import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const ARQUIVO = 'dist/index.html';
const VAZIO = '<div id="raiz"></div>';

const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { renderizar } = await vite.ssrLoadModule('/src/prerender.tsx');
  const conteudo = renderizar();
  const html = await readFile(ARQUIVO, 'utf8');
  if (!html.includes(VAZIO)) throw new Error(`Não encontrei ${VAZIO} em ${ARQUIVO}.`);
  await writeFile(ARQUIVO, html.replace(VAZIO, () => `<div id="raiz">${conteudo}</div>`));
  console.log(`Pré-renderização: ${ARQUIVO} (${Math.round(conteudo.length / 1024)} KB de HTML).`);
} finally {
  await vite.close();
}
