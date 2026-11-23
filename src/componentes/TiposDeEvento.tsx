/* =============================================================================
   TiposDeEvento.tsx — 3. Grade de cartões com foto. Tocar num cartão filtra a
   galeria por aquele tipo e leva a pessoa até ela.
   ========================================================================== */

import { espaco } from '../dados-espaco.ts';
import type { TipoDeEvento } from '../tipos.ts';
import { TAMANHOS, classes } from '../util/formatar.ts';
import { CabecalhoSecao, Foto, atraso, useRevelar } from './Base.tsx';
import { Icone } from './Icones.tsx';

function CartaoDeEvento({ tipo, indice, aoEscolher }: { tipo: TipoDeEvento; indice: number; aoEscolher: (id: string) => void }) {
  const [ref, revelar] = useRevelar<HTMLButtonElement>();
  const [largura, altura] = TAMANHOS.cartao;
  return (
    <button
      ref={ref}
      type="button"
      className={classes('evento', tipo.destaque && 'evento--destaque', revelar)}
      style={atraso(indice)}
      onClick={() => aoEscolher(tipo.id)}
    >
      <span className="evento__foto">
        {/* FOTO REAL: public/img/eventos/<id>.webp + .jpg (800x1000) */}
        <Foto base={`img/eventos/${tipo.id}`} largura={largura} altura={altura} alt={tipo.alt ?? tipo.nome} />
      </span>
      <span className="evento__info">
        <span className="evento__nome">{tipo.nome}</span>
        {tipo.descricao && <span className="evento__descricao">{tipo.descricao}</span>}
        <span className="evento__ver">
          Ver fotos <Icone nome="seta" tamanho={14} />
        </span>
      </span>
    </button>
  );
}

export function TiposDeEvento({ aoEscolher }: { aoEscolher: (id: string) => void }) {
  return (
    <section className="secao" id="eventos" aria-labelledby="eventos-titulo">
      <CabecalhoSecao dados={espaco.secoes.eventos} idTitulo="eventos-titulo" />
      <div className="eventos">
        {espaco.tiposDeEvento
          .filter((t) => t.cartao)
          .map((tipo, i) => (
            <CartaoDeEvento key={tipo.id} tipo={tipo} indice={i} aoEscolher={aoEscolher} />
          ))}
      </div>
    </section>
  );
}
