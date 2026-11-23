/* =============================================================================
   vite.config.ts — configuração do build.
   O plugin "seo-do-espaco" coloca no index.html as tags de busca e de
   compartilhamento e gera robots.txt e sitemap.xml, tudo a partir de
   src/dados-espaco.ts. (A pré-renderização do conteúdo acontece depois, em
   ferramentas/prerender.mjs.)
   ========================================================================== */

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { montarHead, robotsTxt, sitemapXml } from './config/seo.ts';
import { espaco } from './src/dados-espaco.ts';

function seoDoEspaco(): Plugin {
  return {
    name: 'seo-do-espaco',
    transformIndexHtml(html) {
      if (!html.includes('<!--seo-->')) throw new Error('Marcador <!--seo--> não encontrado no index.html');
      return html.replace('<!--seo-->', () => montarHead(espaco));
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(espaco) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(espaco) });
    },
  };
}

export default defineConfig({
  plugins: [react(), seoDoEspaco()],
  build: {
    target: 'es2020',
    // Arquivos com hash no nome (ex.: index-a1b2c3.js): podem ficar em cache
    // por um ano no navegador, porque cada build gera nomes novos.
    assetsDir: 'assets',
  },
});
