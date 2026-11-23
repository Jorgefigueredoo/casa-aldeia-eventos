/* =============================================================================
   util/formatar.ts — pequenas funções de apoio usadas por vários componentes.
   ========================================================================== */

import { espaco } from '../dados-espaco.ts';
import type { Orientacao } from '../tipos.ts';

/** Nota no formato brasileiro: 5 → "5,0". */
export const formatarNota = (nota: number): string =>
  nota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Endereço em uma linha. */
export const enderecoCompleto = (): string => {
  const e = espaco.endereco;
  return `${e.rua} - ${e.bairro}, ${e.cidade} - ${e.uf}, ${e.cep}`;
};

/**
 * Tamanho real (em pixels) de cada tipo de imagem. Precisa bater com os
 * arquivos em public/img para o navegador reservar o espaço antes de carregar.
 */
export const TAMANHOS = {
  cartao: [800, 1000], // public/img/eventos/<id>: 4:5
  paisagem: [1600, 1200], // foto grande deitada: 4:3
  retrato: [1200, 1600], // foto grande em pé: 3:4
} as const satisfies Record<string, readonly [number, number]>;

/** Tamanho da miniatura da galeria conforme a orientação. */
export const tamanhoMiniatura = (o: Orientacao): readonly [number, number] => (o === 'paisagem' ? [600, 450] : [450, 600]);

/** Junta classes CSS, ignorando as vazias: classes('a', cond && 'b'). */
export const classes = (...lista: (string | false | null | undefined)[]): string => lista.filter(Boolean).join(' ');

/** O aparelho pediu menos movimento? (falso durante a pré-renderização) */
export const menosMovimento = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
