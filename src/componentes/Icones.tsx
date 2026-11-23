/* =============================================================================
   Icones.tsx — ícones em SVG inline (sem biblioteca). Traço fino, herdam a cor
   do texto ao redor (currentColor).
   ========================================================================== */

import type { ReactNode } from 'react';

/** Moldura padrão dos ícones de traço (24x24). */
function Traco({ children, tamanho = 24 }: { children: ReactNode; tamanho?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const DESENHOS = {
  arvore: (
    <>
      <path d="M12 21.5v-6" />
      <path d="M12 15.5c-4.1 0-7-2.4-7-5.8a4.9 4.9 0 0 1 2.9-4.5A4.4 4.4 0 0 1 12 2.5a4.4 4.4 0 0 1 4.1 2.7A4.9 4.9 0 0 1 19 9.7c0 3.4-2.9 5.8-7 5.8z" />
      <path d="M12 12.5l-2.5-2.2M12 10.5l2-1.8" />
    </>
  ),
  piscina: (
    <>
      <path d="M8 14.5V5.2A2.2 2.2 0 0 1 12.2 4" />
      <path d="M15 14.5V5.2A2.2 2.2 0 0 1 19.2 4" />
      <path d="M8 8h7M8 11.5h7" />
      <path d="M2.5 18c1.6 0 2.4-1 4-1s2.4 1 4 1 2.4-1 4-1 2.4 1 4 1 2.4-1 3-1" />
      <path d="M2.5 21.5c1.6 0 2.4-1 4-1s2.4 1 4 1 2.4-1 4-1 2.4 1 4 1 2.4-1 3-1" />
    </>
  ),
  gramado: (
    <>
      <path d="M2.5 20.5h19" />
      <path d="M5 20.5c0-4 1-7 3-9" />
      <path d="M9 20.5c0-5-1-8.5-3-10.5" />
      <path d="M12.5 20.5c0-6 1-10 3-13" />
      <path d="M15.5 20.5c0-3.5 1.2-6.5 3.5-8.5" />
      <path d="M19.5 20.5c0-2.8-.6-4.8-2-6.5" />
    </>
  ),
  carro: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M9.5 17V7h3.8a3 3 0 0 1 0 6H9.5" />
    </>
  ),
  banheiro: (
    <>
      <circle cx="7" cy="4.8" r="1.7" />
      <path d="M5.2 21.5V16H4l1.4-6.5h3.2L10 16H8.8v5.5" />
      <circle cx="17" cy="4.8" r="1.7" />
      <path d="M15 21.5v-6h-.5V9.5h5v6H19v6" />
      <path d="M12 3v18.5" />
    </>
  ),
  pessoas: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.6 14.3A5 5 0 0 1 21 19.2" />
    </>
  ),
  cartao: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <path d="M2.5 9.8h19" />
      <path d="M6 15h4.5" />
    </>
  ),
  pino: (
    <>
      <path d="M12 21.5s-6.5-6-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.5 12 21.5 12 21.5z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  mensagem: (
    <>
      <path d="M4 18.5V6.5A2 2 0 0 1 6 4.5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5z" />
      <path d="M8 9h8M8 12.5h5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </>
  ),
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
  anterior: <path d="M15 5l-7 7 7 7" />,
  proxima: <path d="M9 5l7 7-7 7" />,
  mais: <path d="M12 5v14M5 12h14" />,
  seta: <path d="M5 12h14M13 6l6 6-6 6" />,
} satisfies Record<string, ReactNode>;

export type NomeIcone = keyof typeof DESENHOS;

/** Ícone de traço pelo nome: <Icone nome="piscina" />. */
export function Icone({ nome, tamanho }: { nome: NomeIcone; tamanho?: number }) {
  return <Traco tamanho={tamanho}>{DESENHOS[nome]}</Traco>;
}

/** Logotipo do WhatsApp (preenchido, para ser reconhecido de longe). */
export function IconeWhatsApp({ tamanho = 28 }: { tamanho?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.41" />
    </svg>
  );
}
