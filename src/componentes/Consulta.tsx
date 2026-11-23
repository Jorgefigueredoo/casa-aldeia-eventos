/* =============================================================================
   Consulta.tsx — 7. Consulta de data: a seção mais importante.
   Sem backend: ao enviar, abre o WhatsApp do espaço com a mensagem montada.
   As regras de validação ficam em util/consulta.ts.
   ========================================================================== */

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { espaco } from '../dados-espaco.ts';
import {
  dataParaTexto,
  digitosDoTelefone,
  hojeISO,
  linkWhatsApp,
  mascaraTelefone,
  montarMensagem,
  regras,
  type CamposDaConsulta,
  type NomeDoCampo,
} from '../util/consulta.ts';
import { formatarNota } from '../util/formatar.ts';
import { CabecalhoSecao, Estrelas } from './Base.tsx';
import { Icone } from './Icones.tsx';

const VAZIO: CamposDaConsulta = { data: '', tipo: '', convidados: '', nome: '', whatsapp: '' };
const ORDEM: NomeDoCampo[] = ['data', 'tipo', 'convidados', 'nome', 'whatsapp'];

export function Consulta() {
  const [campos, setCampos] = useState<CamposDaConsulta>(VAZIO);
  // Só mostra o erro de um campo depois que a pessoa passou por ele (ou tentou enviar).
  const [tocados, setTocados] = useState<Set<NomeDoCampo>>(new Set());
  const [linkEnviado, setLinkEnviado] = useState('');
  // Data mínima do calendário: definida só no navegador (na pré-renderização
  // não existe "hoje" do visitante).
  const [hoje, setHoje] = useState<string | undefined>(undefined);
  useEffect(() => setHoje(hojeISO()), []);

  const referencias = useRef<Partial<Record<NomeDoCampo, HTMLInputElement | HTMLSelectElement | null>>>({});

  const erro = (nome: NomeDoCampo) => (tocados.has(nome) ? regras[nome](campos[nome]) : '');
  const tocar = (nome: NomeDoCampo) => setTocados((t) => new Set(t).add(nome));
  const mudar = (nome: NomeDoCampo, valor: string) =>
    setCampos((c) => ({ ...c, [nome]: nome === 'whatsapp' ? mascaraTelefone(valor) : valor }));

  // Aviso (que não bloqueia) quando passa da capacidade informada nos dados.
  const max = espaco.capacidadeMaxima;
  const avisoCapacidade =
    max && Number(campos.convidados) > max ? `Nossa capacidade é de até ${max} convidados. Envie mesmo assim que avaliamos com você.` : '';

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    setTocados(new Set(ORDEM));
    const primeiroInvalido = ORDEM.find((n) => regras[n](campos[n]));
    if (primeiroInvalido) {
      referencias.current[primeiroInvalido]?.focus();
      return;
    }

    const tipo = espaco.tiposDeEvento.find((t) => t.id === campos.tipo);
    const mensagem = montarMensagem(espaco.consulta.modeloDaMensagem, {
      data: dataParaTexto(campos.data),
      tipo: tipo?.naMensagem ?? tipo?.nome ?? '',
      convidados: Number(campos.convidados).toLocaleString('pt-BR'),
      nome: campos.nome.trim().replace(/\s+/g, ' '),
      whatsapp: mascaraTelefone(digitosDoTelefone(campos.whatsapp)),
    });
    const url = linkWhatsApp(espaco.contato.whatsapp, mensagem);

    // Nova aba no computador; se o navegador bloquear, abre na mesma aba.
    const janela = window.open(url, '_blank');
    if (janela) janela.opener = null;
    else window.location.href = url;
    setLinkEnviado(url);
  }

  // Propriedades comuns de acessibilidade de cada campo.
  const acessibilidade = (nome: NomeDoCampo, extra = '') => ({
    'aria-invalid': erro(nome) ? true : false,
    'aria-describedby': `erro-${nome}${extra}`,
    onBlur: () => {
      if (campos[nome]) tocar(nome);
    },
  });

  const mensagemDeErro = (nome: NomeDoCampo) => (
    <p className="campo__erro" id={`erro-${nome}`} aria-live="polite">
      {erro(nome)}
    </p>
  );

  const a = espaco.avaliacao;

  return (
    <section className="secao secao--consulta" id="consulta" aria-labelledby="consulta-titulo" tabIndex={-1}>
      <div className="consulta">
        <div className="consulta__intro">
          <CabecalhoSecao
            dados={espaco.secoes.consulta}
            idTitulo="consulta-titulo"
            titulo={espaco.consulta.titulo}
            texto={espaco.consulta.texto}
            className="consulta__cabecalho"
            textoClassName="consulta__texto"
            claro
            esquerda
          />
          <ul className="consulta__garantias">
            <li>
              <Icone nome="mensagem" />
              <span>Resposta direto no seu WhatsApp</span>
            </li>
            <li>
              <Icone nome="relogio" />
              <span>{espaco.contato.atendimento}</span>
            </li>
            <li>
              <Estrelas nota={a.nota} tamanho={14} />
              <span>
                {formatarNota(a.nota)} no {a.fonte} · {a.total} avaliações
              </span>
            </li>
          </ul>
        </div>

        <form className="formulario" noValidate onSubmit={enviar}>
          <div className="campo">
            <label htmlFor="campo-data">Data pretendida</label>
            <input
              ref={(el) => void (referencias.current.data = el)}
              id="campo-data"
              type="date"
              required
              min={hoje}
              value={campos.data}
              onChange={(e) => mudar('data', e.target.value)}
              {...acessibilidade('data')}
            />
            {mensagemDeErro('data')}
          </div>

          <div className="campo">
            <label htmlFor="campo-tipo">Tipo de evento</label>
            <select
              ref={(el) => void (referencias.current.tipo = el)}
              id="campo-tipo"
              required
              value={campos.tipo}
              onChange={(e) => {
                mudar('tipo', e.target.value);
                tocar('tipo');
              }}
              {...acessibilidade('tipo')}
            >
              <option value="">Selecione</option>
              {espaco.tiposDeEvento.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
            {mensagemDeErro('tipo')}
          </div>

          <div className="campo">
            <label htmlFor="campo-convidados">Número aproximado de convidados</label>
            <input
              ref={(el) => void (referencias.current.convidados = el)}
              id="campo-convidados"
              type="number"
              inputMode="numeric"
              min={1}
              max={5000}
              step={1}
              placeholder="Ex.: 150"
              required
              value={campos.convidados}
              onChange={(e) => mudar('convidados', e.target.value)}
              {...acessibilidade('convidados', ' aviso-convidados')}
            />
            {mensagemDeErro('convidados')}
            <p className="campo__aviso" id="aviso-convidados" aria-live="polite">
              {avisoCapacidade}
            </p>
          </div>

          <div className="campo">
            <label htmlFor="campo-nome">Seu nome</label>
            <input
              ref={(el) => void (referencias.current.nome = el)}
              id="campo-nome"
              type="text"
              autoComplete="name"
              maxLength={80}
              required
              value={campos.nome}
              onChange={(e) => mudar('nome', e.target.value)}
              {...acessibilidade('nome')}
            />
            {mensagemDeErro('nome')}
          </div>

          <div className="campo">
            <label htmlFor="campo-whatsapp">Seu WhatsApp</label>
            <input
              ref={(el) => void (referencias.current.whatsapp = el)}
              id="campo-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(81) 99999-9999"
              required
              value={campos.whatsapp}
              onChange={(e) => mudar('whatsapp', e.target.value)}
              {...acessibilidade('whatsapp')}
            />
            {mensagemDeErro('whatsapp')}
          </div>

          <button className="botao botao--principal botao--largo" type="submit">
            Consultar pelo WhatsApp
          </button>
          <p className="formulario__nota">{espaco.contato.atendimentoDetalhe}</p>
          {linkEnviado && (
            <p className="formulario__confirmacao" role="status">
              Abrimos o WhatsApp com a sua mensagem. Não abriu?{' '}
              <a href={linkEnviado} target="_blank" rel="noopener">
                Toque aqui
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
