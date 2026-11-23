/* =============================================================================
   Lightbox.tsx — foto ampliada em tela cheia.
   - Usa o <dialog> nativo: prende o foco dentro dele e fecha com Esc.
   - Setas do teclado navegam; no celular, arrastar para o lado troca a foto
     e arrastar para baixo fecha.
   - Percorre só as fotos do filtro ativo.
   ========================================================================== */

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { FotoDaGaleria } from '../tipos.ts';
import { TAMANHOS, menosMovimento } from '../util/formatar.ts';
import { Icone } from './Icones.tsx';

interface Props {
  fotos: FotoDaGaleria[];
  /** Posição da foto aberta em "fotos", ou null quando fechado. */
  posicao: number | null;
  aoMudar: (posicao: number) => void;
  aoFechar: () => void;
}

export function Lightbox({ fotos, posicao, aoMudar, aoFechar }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const imagem = useRef<HTMLImageElement>(null);
  const [direcao, setDirecao] = useState(0); // -1 anterior, 1 próxima (para a animação)
  const aberto = posicao !== null;
  const foto = aberto ? fotos[posicao] : undefined;
  const total = fotos.length;

  // Abre e fecha o <dialog> conforme o estado, e trava a rolagem da página.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberto && !d.open) d.showModal();
    if (!aberto && d.open) d.close();
    document.documentElement.classList.toggle('travado', aberto);
  }, [aberto]);

  // Pré-carrega a anterior e a próxima para a troca ser instantânea.
  useEffect(() => {
    if (posicao === null || total < 2) return;
    for (const passo of [1, -1]) {
      const vizinha = fotos[(posicao + passo + total) % total];
      if (vizinha) new Image().src = `${vizinha.arquivo}.jpg`;
    }
  }, [posicao, fotos, total]);

  function navegar(passo: number) {
    if (posicao === null || total < 2) return;
    setDirecao(passo);
    aoMudar((posicao + passo + total) % total);
  }

  // --- Arraste no celular -------------------------------------------------------
  const toque = useRef<{ x: number; y: number } | null>(null);
  const arrastou = useRef(false);

  const moverImagem = (dx: number) => {
    if (imagem.current && !menosMovimento()) imagem.current.style.transform = dx ? `translateX(${dx}px)` : '';
  };

  const aoTocar = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    toque.current = { x: e.clientX, y: e.clientY };
    arrastou.current = false;
  };
  const aoMover = (e: PointerEvent) => {
    if (!toque.current) return;
    const dx = e.clientX - toque.current.x;
    if (Math.abs(dx) > 8) arrastou.current = true;
    moverImagem(dx);
  };
  const aoSoltar = (e: PointerEvent) => {
    if (!toque.current) return;
    const dx = e.clientX - toque.current.x;
    const dy = e.clientY - toque.current.y;
    toque.current = null;
    moverImagem(0);
    if (dy > 90 && Math.abs(dy) > Math.abs(dx)) aoFechar();
    else if (Math.abs(dx) > 50) navegar(dx < 0 ? 1 : -1);
    setTimeout(() => (arrastou.current = false), 0);
  };
  const aoCancelar = () => {
    toque.current = null;
    arrastou.current = false;
    moverImagem(0);
  };

  const [largura, altura] = foto ? TAMANHOS[foto.orientacao] : [0, 0];

  return (
    <dialog
      ref={dialogo}
      className="lightbox"
      aria-label="Foto ampliada"
      onClose={() => aberto && aoFechar()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          navegar(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navegar(-1);
        }
      }}
    >
      <div
        className="lightbox__palco"
        onPointerDown={aoTocar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoCancelar}
        onClick={(e) => {
          // Clique no fundo escuro (fora da foto) fecha.
          if (e.target === e.currentTarget && !arrastou.current) aoFechar();
        }}
      >
        {foto && (
          <figure className="lightbox__figura">
            <picture>
              <source type="image/webp" srcSet={`${foto.arquivo}.webp`} />
              <img
                ref={imagem}
                key={foto.arquivo}
                src={`${foto.arquivo}.jpg`}
                width={largura}
                height={altura}
                alt={foto.alt}
                decoding="async"
                className={direcao && !menosMovimento() ? 'entrando' : undefined}
                style={{ '--entrada': `${direcao * 40}px` } as CSSProperties}
              />
            </picture>
            <figcaption className="lightbox__legenda">
              {foto.legenda && <span>{foto.legenda}</span>}
              <span className="lightbox__contador">
                {(posicao ?? 0) + 1} de {total}
              </span>
            </figcaption>
          </figure>
        )}
      </div>

      <button type="button" className="lightbox__botao lightbox__fechar" aria-label="Fechar foto" onClick={aoFechar}>
        <Icone nome="fechar" />
      </button>
      {total > 1 && (
        <>
          <button type="button" className="lightbox__botao lightbox__anterior" aria-label="Foto anterior" onClick={() => navegar(-1)}>
            <Icone nome="anterior" />
          </button>
          <button type="button" className="lightbox__botao lightbox__proxima" aria-label="Próxima foto" onClick={() => navegar(1)}>
            <Icone nome="proxima" />
          </button>
        </>
      )}
    </dialog>
  );
}
