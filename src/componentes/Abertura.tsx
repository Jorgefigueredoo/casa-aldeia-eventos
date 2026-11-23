/* =============================================================================
   Abertura.tsx — tudo o que aparece na primeira tela:
   aviso de exemplo, topo com menu, hero em tela cheia e faixa de avaliação.
   ========================================================================== */

import { espaco } from '../dados-espaco.ts';
import { formatarNota, linkWhatsApp } from '../util/formatar.ts';
import { Estrelas } from './Base.tsx';

/** Faixa discreta "Página de exemplo". Para remover, apague a linha dela no App.tsx. */
export function AvisoExemplo() {
  return (
    <div className="aviso-exemplo" role="note">
      Página de exemplo
    </div>
  );
}

/** Logotipo e menu, sobrepostos à foto do hero. */
export function Topo() {
  return (
    <header className="topo">
      <a className="topo__marca" href="#inicio">
        {espaco.nomeCurto}
      </a>
      <nav className="topo__menu" aria-label="Seções da página">
        <a href="#eventos">Eventos</a>
        <a href="#galeria">Galeria</a>
        <a href="#espaco">O espaço</a>
        <a href="#perguntas">Perguntas</a>
        <a href="#localizacao">Localização</a>
      </nav>
      <a className="topo__acao" href={linkWhatsApp(espaco.consulta.mensagem)} target="_blank" rel="noopener">
        Consultar data
      </a>
    </header>
  );
}

/** 1. Hero em tela cheia: foto, nome, frase e botão principal. */
export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo">
      {/* FOTO REAL: substitua public/img/hero.webp + hero.jpg (1920x1080, deitada)
          e public/img/hero-retrato.webp + hero-retrato.jpg (720x1280, celular em pé).
          Ideal: o espaço ao entardecer. Mantenha os mesmos nomes de arquivo. */}
      <picture className="hero__foto">
        <source media="(orientation: portrait)" type="image/webp" srcSet="img/hero-retrato.webp" />
        <source media="(orientation: portrait)" srcSet="img/hero-retrato.jpg" />
        <source type="image/webp" srcSet="img/hero.webp" />
        <img src="img/hero.jpg" width={1920} height={1080} alt={espaco.hero.alt} fetchPriority="high" decoding="async" />
      </picture>
      <div className="hero__conteudo">
        <h1 className="hero__titulo" id="hero-titulo">
          {espaco.nome}
        </h1>
        <p className="hero__slogan">{espaco.slogan}</p>
        {/* Abre o WhatsApp com a mensagem de consulta de data já escrita. */}
        <a className="botao botao--claro" href={linkWhatsApp(espaco.consulta.mensagem)} target="_blank" rel="noopener">
          {espaco.hero.chamada}
        </a>
      </div>
    </section>
  );
}

/** 2. Faixa de prova social. Precisa caber na primeira tela do celular. */
export function ProvaSocial() {
  const a = espaco.avaliacao;
  const conteudo = (
    <>
      <Estrelas nota={a.nota} tamanho={20} />
      <p className="prova__texto">
        <strong>{formatarNota(a.nota)}</strong> no {a.fonte} <span aria-hidden="true">·</span> {a.total} avaliações
      </p>
    </>
  );
  return (
    <section className="prova" aria-label={`Avaliação no ${a.fonte}`}>
      {a.link ? (
        <a className="prova__conteudo" href={a.link} target="_blank" rel="noopener">
          {conteudo}
          <span className="sr-only"> (abre as avaliações no {a.fonte})</span>
        </a>
      ) : (
        <div className="prova__conteudo">{conteudo}</div>
      )}
    </section>
  );
}
