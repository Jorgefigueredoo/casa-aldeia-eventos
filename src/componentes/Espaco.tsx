/* =============================================================================
   Espaco.tsx — 5. O espaço: foto grande + estrutura com ícones.
   6. Depoimentos: três cartões de avaliação.
   ========================================================================== */

import { espaco } from '../dados-espaco.ts';
import { TAMANHOS } from '../util/formatar.ts';
import { CabecalhoSecao, Estrelas, Foto, atraso, useRevelar } from './Base.tsx';
import { Icone } from './Icones.tsx';

function ItemDaEstrutura({ item, indice }: { item: (typeof espaco.estrutura)[number]; indice: number }) {
  const [ref, revelar] = useRevelar<HTMLLIElement>();
  return (
    <li ref={ref} className={`estrutura__item ${revelar}`} style={atraso(indice, 60)}>
      <span className="estrutura__icone">
        <Icone nome={item.icone} tamanho={22} />
      </span>
      <div>
        <h3 className="estrutura__titulo">{item.titulo}</h3>
        <p className="estrutura__texto">{item.texto}</p>
      </div>
    </li>
  );
}

export function OEspaco() {
  const [refFoto, revelarFoto] = useRevelar<HTMLDivElement>();
  const f = espaco.fotoDoEspaco;
  const [largura, altura] = TAMANHOS[f.orientacao];
  return (
    <section className="secao secao--espaco" id="espaco" aria-labelledby="espaco-titulo">
      <div className="espaco">
        <div ref={refFoto} className={`espaco__foto ${revelarFoto}`}>
          <Foto base={f.arquivo} largura={largura} altura={altura} alt={f.alt} />
        </div>
        <div className="espaco__texto">
          <CabecalhoSecao dados={espaco.secoes.espaco} idTitulo="espaco-titulo" texto={espaco.textoDoEspaco} esquerda />
          <ul className="estrutura">
            {espaco.estrutura.map((item, i) => (
              <ItemDaEstrutura key={item.titulo} item={item} indice={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CartaoDeDepoimento({ d, indice }: { d: (typeof espaco.depoimentos)[number]; indice: number }) {
  const [ref, revelar] = useRevelar<HTMLLIElement>();
  return (
    <li ref={ref} className={`depoimento ${revelar}`} style={atraso(indice, 90)}>
      <Estrelas nota={5} tamanho={16} />
      <blockquote className="depoimento__texto">
        <p>{d.texto}</p>
      </blockquote>
      <p className="depoimento__autor">
        <strong>{d.nome}</strong>
        {d.evento && (
          <>
            {' '}
            <span aria-hidden="true">·</span> {d.evento}
          </>
        )}
      </p>
      {/* Enquanto o texto for de exemplo, não é apresentado como avaliação real. */}
      <p className="depoimento__fonte">{d.ilustrativo ? 'Texto ilustrativo' : `Avaliação no ${espaco.avaliacao.fonte}`}</p>
    </li>
  );
}

export function Depoimentos() {
  return (
    <section className="secao secao--depoimentos" id="depoimentos" aria-labelledby="depoimentos-titulo">
      <CabecalhoSecao dados={espaco.secoes.depoimentos} idTitulo="depoimentos-titulo" />
      <ul className="depoimentos">
        {espaco.depoimentos.map((d, i) => (
          <CartaoDeDepoimento key={d.nome} d={d} indice={i} />
        ))}
      </ul>
    </section>
  );
}
