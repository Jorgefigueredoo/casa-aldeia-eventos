/* =============================================================================
   Base.tsx — peças pequenas usadas por várias seções:
   - <Estrelas>: nota em estrelas, aceita notas quebradas (4,8)
   - <Foto>: <picture> com WebP e JPG de reserva, largura e altura declaradas
   - <CabecalhoSecao>: sobretítulo, título e texto de apoio de cada seção
   - useRevelar(): faz o elemento surgir suavemente ao entrar na tela
   ========================================================================== */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { CabecalhoDeSecao } from '../tipos.ts';
import { classes, formatarNota, menosMovimento } from '../util/formatar.ts';

// --- Estrelas ------------------------------------------------------------------

const ESTRELA = 'M12 2.6l2.84 5.98 6.56.8-4.84 4.52 1.25 6.5L12 17.2l-5.81 3.2 1.25-6.5L2.6 9.38l6.56-.8z';

function FileiraDeEstrelas({ tamanho, className }: { tamanho: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 24" width={tamanho * 5} height={tamanho} aria-hidden="true" focusable="false">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} transform={`translate(${i * 24} 0)`} d={ESTRELA} />
      ))}
    </svg>
  );
}

/**
 * Cinco estrelas vazias e, por cima, cinco cheias cortadas na largura
 * proporcional à nota (4,8 → 96%).
 */
export function Estrelas({ nota, tamanho = 18 }: { nota: number; tamanho?: number }) {
  return (
    <span
      className="estrelas"
      role="img"
      aria-label={`Nota ${formatarNota(nota)} de 5`}
      style={{ '--preenchido': `${(nota / 5) * 100}%` } as CSSProperties}
    >
      <FileiraDeEstrelas tamanho={tamanho} className="estrelas__vazias" />
      <span className="estrelas__cheias">
        <FileiraDeEstrelas tamanho={tamanho} />
      </span>
    </span>
  );
}

// --- Foto ------------------------------------------------------------------------

interface PropsFoto {
  /** Caminho sem extensão, ex.: 'img/galeria/casamento-01'. */
  base: string;
  largura: number;
  altura: number;
  alt: string;
  /** false só para a foto do topo, que precisa carregar na hora. */
  lazy?: boolean;
}

/** <picture> com WebP e JPG de reserva. */
export function Foto({ base, largura, altura, alt, lazy = true }: PropsFoto) {
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img src={`${base}.jpg`} width={largura} height={altura} alt={alt} loading={lazy ? 'lazy' : undefined} decoding="async" />
    </picture>
  );
}

// --- Revelar ao rolar ------------------------------------------------------------

// Um único observador para a página toda (mais leve que um por elemento).
let observador: IntersectionObserver | null = null;
const aoAparecer = new WeakMap<Element, () => void>();

function obterObservador(): IntersectionObserver {
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        aoAparecer.get(entrada.target)?.();
        observador?.unobserve(entrada.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  return observador;
}

/**
 * Devolve [ref, classe]. Coloque a ref no elemento e a classe no className:
 *   const [ref, revelar] = useRevelar<HTMLDivElement>();
 *   <div ref={ref} className={revelar}>…</div>
 */
export function useRevelar<T extends Element>() {
  const ref = useRef<T>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    if (menosMovimento() || !('IntersectionObserver' in window)) {
      setVisivel(true);
      return;
    }
    const obs = obterObservador();
    aoAparecer.set(elemento, () => setVisivel(true));
    obs.observe(elemento);
    return () => {
      obs.unobserve(elemento);
      aoAparecer.delete(elemento);
    };
  }, []);

  return [ref, classes('revelar', visivel && 'visivel')] as const;
}

/** Atraso em cascata para itens de uma lista (0ms, 70ms, 140ms…). */
export const atraso = (indice: number, passo = 70): CSSProperties => ({ '--atraso': `${indice * passo}ms` }) as CSSProperties;

// --- Cabeçalho de seção ----------------------------------------------------------

interface PropsCabecalho {
  dados: CabecalhoDeSecao;
  idTitulo: string;
  /** Alinha à esquerda (padrão: centralizado). */
  esquerda?: boolean;
  /** Sobretítulo dourado claro, para fundo escuro. */
  claro?: boolean;
  /** Título alternativo (quando vem de outro campo dos dados). */
  titulo?: string;
  /** Texto alternativo (quando vem de outro campo dos dados). */
  texto?: string;
  className?: string;
  textoClassName?: string;
}

export function CabecalhoSecao({ dados, idTitulo, esquerda, claro, titulo, texto, className, textoClassName = 'secao__texto' }: PropsCabecalho) {
  const [ref, revelar] = useRevelar<HTMLDivElement>();
  const tituloFinal = titulo ?? dados.titulo;
  const textoFinal = texto ?? dados.texto;
  return (
    <div ref={ref} className={classes(className ?? 'secao__cabecalho', esquerda && 'secao__cabecalho--esquerda', revelar)}>
      {dados.sobretitulo && <p className={classes('sobretitulo', claro && 'sobretitulo--claro')}>{dados.sobretitulo}</p>}
      {tituloFinal && (
        <h2 className="secao__titulo" id={idTitulo}>
          {tituloFinal}
        </h2>
      )}
      {textoFinal && <p className={textoClassName}>{textoFinal}</p>}
    </div>
  );
}
