/* =============================================================================
   Galeria.tsx — 4. Galeria filtrável por tipo de evento + lightbox.
   O filtro ativo fica no App (os cartões de tipo de evento também mudam ele).
   ========================================================================== */

import { useEffect, useMemo, useRef, useState } from 'react';
import { espaco } from '../dados-espaco.ts';
import type { FotoDaGaleria } from '../tipos.ts';
import { tamanhoMiniatura } from '../util/formatar.ts';
import { CabecalhoSecao, Foto } from './Base.tsx';
import { Lightbox } from './Lightbox.tsx';

/** Tipos de evento + categorias extras (ex.: "O espaço"), para achar o nome pelo id. */
const CATEGORIAS = [...espaco.tiposDeEvento, ...espaco.categoriasExtrasDaGaleria];
export const nomeDaCategoria = (id: string): string => CATEGORIAS.find((t) => t.id === id)?.nome ?? id;

/** Só os tipos que têm ao menos uma foto viram botão de filtro, na ordem dos dados. */
const FILTROS = [{ id: 'todos', nome: 'Todos' }, ...CATEGORIAS.filter((t) => espaco.galeria.some((f) => f.tipo === t.id))];

/** Diz se existe foto daquele tipo (usado pelos cartões). */
export const temFotos = (id: string): boolean => espaco.galeria.some((f) => f.tipo === id);

interface Props {
  filtro: string;
  aoFiltrar: (id: string) => void;
}

export function Galeria({ filtro, aoFiltrar }: Props) {
  // Fotos visíveis no filtro atual (é também a sequência do lightbox).
  const visiveis = useMemo<FotoDaGaleria[]>(
    () => espaco.galeria.filter((f) => filtro === 'todos' || f.tipo === filtro),
    [filtro]
  );

  // Frase anunciada ao trocar o filtro ("2 fotos de formatura").
  const [status, setStatus] = useState('');
  const primeiraVez = useRef(true);
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    const n = visiveis.length;
    setStatus(filtro === 'todos' ? `Mostrando todas as ${n} fotos` : `${n} ${n === 1 ? 'foto' : 'fotos'} de ${nomeDaCategoria(filtro).toLowerCase()}`);
  }, [filtro, visiveis.length]);

  // Lightbox: posição da foto aberta em "visiveis" (null = fechado).
  const [aberta, setAberta] = useState<number | null>(null);
  const quemAbriu = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="secao secao--galeria" id="galeria" aria-labelledby="galeria-titulo">
      <CabecalhoSecao dados={espaco.secoes.galeria} idTitulo="galeria-titulo" />

      <div className="filtros" role="group" aria-label="Filtrar fotos por tipo de evento">
        {FILTROS.map((f) => (
          <button key={f.id} type="button" className="filtro" aria-pressed={filtro === f.id} onClick={() => aoFiltrar(f.id)}>
            {f.nome}
          </button>
        ))}
      </div>

      <p className="galeria__status" aria-live="polite">
        {status}
      </p>

      <ul className="galeria">
        {espaco.galeria.map((foto) => {
          const posicao = visiveis.indexOf(foto);
          const [largura, altura] = tamanhoMiniatura(foto.orientacao);
          return (
            // Itens fora do filtro ficam escondidos (e não somem do DOM, assim
            // as miniaturas já carregadas não piscam ao voltar para "Todos").
            <li key={foto.arquivo} className="galeria__item" hidden={posicao === -1}>
              <button
                type="button"
                className="galeria__botao"
                aria-label={`Ampliar foto: ${foto.alt}`}
                onClick={(evento) => {
                  quemAbriu.current = evento.currentTarget;
                  setAberta(posicao);
                }}
              >
                {/* FOTO REAL: <arquivo>-p (miniatura) e <arquivo> (ampliada) em public/img/galeria */}
                <Foto base={`${foto.arquivo}-p`} largura={largura} altura={altura} alt={foto.alt} />
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox
        fotos={visiveis}
        posicao={aberta}
        aoMudar={setAberta}
        aoFechar={() => {
          setAberta(null);
          quemAbriu.current?.focus({ preventScroll: true });
        }}
      />
    </section>
  );
}
