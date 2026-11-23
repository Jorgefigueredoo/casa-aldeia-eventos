/* =============================================================================
   config/seo.ts — monta, a partir dos dados do negócio, o que precisa estar
   escrito no HTML (e não montado pelo JavaScript), porque WhatsApp, Facebook e
   outros leitores de link não executam JavaScript:

     - <title> e meta description (busca no Google)
     - Open Graph e Twitter Card (cartão do link no WhatsApp/Instagram/X)
     - JSON-LD schema.org (endereço, telefone, nota, serviços)
     - robots.txt e sitemap.xml

   É chamado pelo plugin "seo-do-espaco" em vite.config.ts a cada build.
   ========================================================================== */

import type { DadosEspaco } from '../src/tipos.ts';

/** Escapa texto para dentro de atributos HTML. */
const attr = (t: string | number): string =>
  String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Endereço do site sem barra no final. */
const urlBase = (espaco: DadosEspaco): string => espaco.urlDoSite.replace(/\/+$/, '');

/** Dados estruturados schema.org (EventVenue + LocalBusiness). */
export function montarJsonLd(espaco: DadosEspaco): Record<string, unknown> {
  const { seo, contato, endereco: e, avaliacao } = espaco;
  const url = urlBase(espaco);
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EventVenue', 'LocalBusiness'],
    '@id': `${url}/#espaco`,
    name: espaco.nome,
    description: seo.descricao,
    url: `${url}/`,
    image: [`${url}/${seo.imagemCompartilhamento}.jpg`, `${url}/img/hero.jpg`],
    telephone: contato.telefoneInternacional,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${e.rua} - ${e.bairro}`,
      addressLocality: e.cidade,
      addressRegion: e.uf,
      postalCode: e.cep,
      addressCountry: e.pais,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(espaco.localizacao.buscaNoMapa)}`,
    sameAs: [`https://www.instagram.com/${contato.instagram}/`],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avaliacao.nota.toFixed(1),
      reviewCount: avaliacao.total,
      bestRating: '5',
      worstRating: '1',
    },
    currenciesAccepted: 'BRL',
    amenityFeature: espaco.estrutura
      .filter((item) => item.icone !== 'pessoas' && item.icone !== 'cartao')
      .map((item) => ({ '@type': 'LocationFeatureSpecification', name: item.titulo, value: true })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Eventos atendidos',
      itemListElement: espaco.tiposDeEvento
        .filter((t) => t.id !== 'outro')
        .map((t) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: t.nome, areaServed: `${e.regiao}, ${e.cidade} - ${e.uf}` },
        })),
    },
  };
  if (espaco.formasDePagamento.length) jsonLd.paymentAccepted = espaco.formasDePagamento.join(', ');
  if (espaco.capacidadeMaxima) jsonLd.maximumAttendeeCapacity = espaco.capacidadeMaxima;
  return jsonLd;
}

/** Bloco de tags que substitui o marcador <!--seo--> do index.html. */
export function montarHead(espaco: DadosEspaco): string {
  const { seo, endereco: e } = espaco;
  const url = urlBase(espaco);
  const imagemOG = `${url}/${seo.imagemCompartilhamento}.jpg`;
  // "<" vira < para o JSON nunca fechar a tag <script> por acidente.
  const jsonLd = JSON.stringify(montarJsonLd(espaco), null, 2).replace(/</g, '\\u003c').replace(/\n/g, '\n    ');

  return `<title>${attr(seo.titulo)}</title>
    <meta name="description" content="${attr(seo.descricao)}" />
    <link rel="canonical" href="${attr(url)}/" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="${attr(seo.corDoTema)}" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="${attr(seo.corDoTemaEscuro)}" media="(prefers-color-scheme: dark)" />
    <meta name="geo.region" content="BR-${attr(e.uf)}" />
    <meta name="geo.placename" content="${attr(e.cidade)}" />

    <!-- Open Graph: cartão do link no WhatsApp, Facebook e Instagram -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${attr(espaco.nome)}" />
    <meta property="og:title" content="${attr(seo.tituloCompartilhamento)}" />
    <meta property="og:description" content="${attr(seo.descricaoCompartilhamento)}" />
    <meta property="og:url" content="${attr(url)}/" />
    <meta property="og:image" content="${attr(imagemOG)}" />
    <meta property="og:image:secure_url" content="${attr(imagemOG)}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${attr(seo.altImagemCompartilhamento)}" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${attr(seo.tituloCompartilhamento)}" />
    <meta name="twitter:description" content="${attr(seo.descricaoCompartilhamento)}" />
    <meta name="twitter:image" content="${attr(imagemOG)}" />
    <meta name="twitter:image:alt" content="${attr(seo.altImagemCompartilhamento)}" />

    <!-- Dados estruturados para o Google (schema.org) -->
    <script type="application/ld+json">
    ${jsonLd}
    </script>`;
}

export const robotsTxt = (espaco: DadosEspaco): string =>
  `User-agent: *\nAllow: /\n\nSitemap: ${urlBase(espaco)}/sitemap.xml\n`;

export const sitemapXml = (espaco: DadosEspaco): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${urlBase(espaco)}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`;
