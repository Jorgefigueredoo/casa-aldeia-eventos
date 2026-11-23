/* =============================================================================
   Final.tsx — parte de baixo da página:
   8. Perguntas frequentes (acordeão)
   9. Localização (mapa sob demanda, "Como chegar", referências)
   10. Rodapé
   + botão flutuante de WhatsApp
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { espaco } from '../dados-espaco.ts';
import { atraso, CabecalhoSecao, useRevelar } from './Base.tsx';
import { Icone, IconeWhatsApp } from './Icones.tsx';
import { enderecoCompleto, linkWhatsApp } from '../util/formatar.ts';

// --- 8. Perguntas frequentes -----------------------------------------------------

function Pergunta({ indice, pergunta, resposta }: { indice: number; pergunta: string; resposta: string }) {
  const [aberta, setAberta] = useState(false);
  const [ref, revelar] = useRevelar<HTMLDivElement>();
  return (
    <div ref={ref} className={`acordeao__item ${aberta ? 'aberto ' : ''}${revelar}`} style={atraso(indice, 50)}>
      <h3 className="acordeao__titulo">
        <button type="button" id={`pergunta-${indice}`} aria-expanded={aberta} aria-controls={`resposta-${indice}`} onClick={() => setAberta(!aberta)}>
          <span>{pergunta}</span>
          <span className="acordeao__icone">
            <Icone nome="mais" tamanho={16} />
          </span>
        </button>
      </h3>
      <div className="acordeao__painel" id={`resposta-${indice}`} role="region" aria-labelledby={`pergunta-${indice}`}>
        <div className="acordeao__interno">
          <p>{resposta}</p>
        </div>
      </div>
    </div>
  );
}

export function Perguntas() {
  return (
    <section className="secao" id="perguntas" aria-labelledby="perguntas-titulo">
      <CabecalhoSecao dados={espaco.secoes.perguntas} idTitulo="perguntas-titulo" />
      <div className="acordeao">
        {espaco.perguntasFrequentes.map((p, i) => (
          <Pergunta key={p.pergunta} indice={i} pergunta={p.pergunta} resposta={p.resposta} />
        ))}
      </div>
    </section>
  );
}

// --- 9. Localização --------------------------------------------------------------

export function Localizacao() {
  const e = espaco.endereco;
  const loc = espaco.localizacao;
  const busca = encodeURIComponent(loc.buscaNoMapa);

  // O iframe do Google Maps é pesado: só é criado quando a seção se aproxima.
  const caixaMapa = useRef<HTMLDivElement>(null);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  useEffect(() => {
    const caixa = caixaMapa.current;
    if (!caixa) return;
    if (!('IntersectionObserver' in window)) return setMostrarMapa(true);
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((x) => x.isIntersecting)) {
          setMostrarMapa(true);
          obs.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    obs.observe(caixa);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="secao secao--localizacao" id="localizacao" aria-labelledby="localizacao-titulo">
      <div className="localizacao">
        <div className="localizacao__texto">
          <CabecalhoSecao dados={espaco.secoes.localizacao} idTitulo="localizacao-titulo" className="localizacao__cabecalho" esquerda />
          <address className="localizacao__endereco">
            {e.rua}
            <br />
            {e.bairro}, {e.cidade} - {e.uf}
            <br />
            CEP {e.cep}
          </address>
          <ul className="referencias">
            {loc.referencias.map((r) => (
              <li key={r.titulo}>
                <Icone nome="pino" tamanho={20} />
                <div>
                  <strong>{r.titulo}</strong>
                  <span>{r.texto}</span>
                </div>
              </li>
            ))}
          </ul>
          <a className="botao botao--principal" href={`https://www.google.com/maps/dir/?api=1&destination=${busca}`} target="_blank" rel="noopener">
            Como chegar
          </a>
        </div>
        <div className="mapa" ref={caixaMapa}>
          {mostrarMapa && (
            <iframe
              title={`Mapa: ${espaco.nome} em ${e.bairro}, ${e.cidade}`}
              src={`https://maps.google.com/maps?q=${busca}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}

// --- 10. Rodapé e botão flutuante ------------------------------------------------

export function Rodape() {
  const c = espaco.contato;
  return (
    <footer className="rodape">
      <div className="rodape__interno">
        <div className="rodape__marca">
          <p className="rodape__nome">{espaco.nome}</p>
          <p className="rodape__slogan">{espaco.slogan}</p>
        </div>
        <address className="rodape__contatos">
          <p>
            <Icone nome="pino" tamanho={18} />
            <span>{enderecoCompleto()}</span>
          </p>
          <p>
            <IconeWhatsApp tamanho={18} />
            <a href={linkWhatsApp(c.mensagemPadrao)} target="_blank" rel="noopener">
              WhatsApp {c.whatsappExibicao}
            </a>
          </p>
          <p>
            <Icone nome="instagram" tamanho={18} />
            <a href={`https://www.instagram.com/${c.instagram}/`} target="_blank" rel="noopener">
              @{c.instagram}
            </a>
          </p>
          <p>
            <Icone nome="relogio" tamanho={18} />
            <span>{c.atendimento}</span>
          </p>
        </address>
      </div>
      <p className="rodape__direitos">
        {/* O ano é o do build; suppressHydrationWarning evita aviso se o visitante já estiver no ano seguinte. */}© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {espaco.nome}
      </p>
    </footer>
  );
}

/** Botão flutuante de WhatsApp, sempre visível, com mensagem pré-preenchida. */
export function WhatsAppFlutuante() {
  return (
    <a
      className="whatsapp-flutuante"
      href={linkWhatsApp(espaco.contato.mensagemPadrao)}
      target="_blank"
      rel="noopener"
      aria-label="Conversar pelo WhatsApp"
    >
      <IconeWhatsApp />
    </a>
  );
}
