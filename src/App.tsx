/* =============================================================================
   App.tsx — monta a página na ordem das seções.
   Não há texto do negócio aqui: tudo vem de dados-espaco.ts.
   ========================================================================== */

import { useCallback, useEffect, useState } from 'react';
import { AvisoExemplo, Hero, ProvaSocial, Topo } from './componentes/Abertura.tsx';
import { Consulta } from './componentes/Consulta.tsx';
import { Depoimentos, OEspaco } from './componentes/Espaco.tsx';
import { Localizacao, Perguntas, Rodape, WhatsAppFlutuante } from './componentes/Final.tsx';
import { Galeria, temFotos } from './componentes/Galeria.tsx';
import { TiposDeEvento } from './componentes/TiposDeEvento.tsx';
import { menosMovimento } from './util/formatar.ts';

export function App() {
  // Filtro da galeria. Fica aqui porque os cartões de tipo de evento também mudam ele.
  const [filtro, setFiltro] = useState('todos');

  // Liga as animações de "surgir ao rolar" só depois que o React assumiu a
  // página: sem JavaScript, nada fica escondido.
  useEffect(() => {
    document.documentElement.classList.add('revelacao');
  }, []);

  // Cartão de tipo de evento: filtra a galeria e leva a pessoa até ela.
  const escolherTipo = useCallback((id: string) => {
    // Sem fotos desse tipo? Mostra todas, para não cair numa galeria vazia.
    setFiltro(temFotos(id) ? id : 'todos');
    requestAnimationFrame(() => {
      document.getElementById('galeria')?.scrollIntoView({ behavior: menosMovimento() ? 'auto' : 'smooth', block: 'start' });
      document.querySelector<HTMLButtonElement>('.filtro[aria-pressed="true"]')?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <>
      {/* ===== AVISO "PÁGINA DE EXEMPLO" · para remover, apague a linha abaixo ===== */}
      <AvisoExemplo />

      <a className="pular-conteudo" href="#consulta">
        Pular para a consulta de data
      </a>
      <Topo />

      <main id="conteudo">
        <Hero />
        <ProvaSocial />
        <TiposDeEvento aoEscolher={escolherTipo} />
        <Galeria filtro={filtro} aoFiltrar={setFiltro} />
        <OEspaco />
        <Depoimentos />
        <Consulta />
        <Perguntas />
        <Localizacao />
      </main>

      <Rodape />
      <WhatsAppFlutuante />
    </>
  );
}
