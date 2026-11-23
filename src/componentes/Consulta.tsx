/* =============================================================================
   Consulta.tsx — 7. Consulta de data: a seção mais importante.
   Uma faixa com chamada e um botão que abre o WhatsApp do espaço com a
   mensagem já escrita. Sem formulário e sem backend.
   ========================================================================== */

import { espaco } from '../dados-espaco.ts';
import { formatarNota, linkWhatsApp } from '../util/formatar.ts';
import { CabecalhoSecao, Estrelas, useRevelar } from './Base.tsx';
import { Icone, IconeWhatsApp } from './Icones.tsx';

export function Consulta() {
  const [ref, revelar] = useRevelar<HTMLDivElement>();
  const a = espaco.avaliacao;

  return (
    <section className="secao secao--consulta" id="consulta" aria-labelledby="consulta-titulo" tabIndex={-1}>
      <div className="consulta">
        <CabecalhoSecao
          dados={espaco.secoes.consulta}
          idTitulo="consulta-titulo"
          titulo={espaco.consulta.titulo}
          texto={espaco.consulta.texto}
          className="consulta__cabecalho"
          textoClassName="consulta__texto"
          claro
        />

        <div ref={ref} className={`consulta__acao ${revelar}`}>
          <a className="botao botao--destaque" href={linkWhatsApp(espaco.consulta.mensagem)} target="_blank" rel="noopener">
            <IconeWhatsApp tamanho={22} />
            {espaco.consulta.botao}
          </a>
          <p className="consulta__whatsapp">{espaco.contato.whatsappExibicao}</p>

          <ul className="consulta__garantias">
            <li>
              <Icone nome="relogio" tamanho={20} />
              <span>{espaco.contato.atendimento}</span>
            </li>
            <li>
              <Estrelas nota={a.nota} tamanho={14} />
              <span>
                {formatarNota(a.nota)} no {a.fonte} · {a.total} avaliações
              </span>
            </li>
          </ul>
          <p className="consulta__nota">{espaco.contato.atendimentoDetalhe}</p>
        </div>
      </div>
    </section>
  );
}
