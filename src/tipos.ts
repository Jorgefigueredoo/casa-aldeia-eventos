/* =============================================================================
   tipos.ts — formato do arquivo de dados (dados-espaco.ts).
   Se faltar um campo obrigatório ou o tipo estiver errado, o editor sublinha
   em vermelho e o "npm run build" para com uma mensagem dizendo onde.
   ========================================================================== */

/** Ícones disponíveis para os itens da estrutura do espaço. */
export type NomeDoIcone = 'arvore' | 'piscina' | 'gramado' | 'carro' | 'banheiro' | 'pessoas' | 'cartao';

/** Foto deitada (4:3) ou em pé (3:4). */
export type Orientacao = 'paisagem' | 'retrato';

export interface TipoDeEvento {
  id: string;
  nome: string;
  naMensagem: string;
  descricao?: string;
  cartao: boolean;
  destaque?: boolean;
  alt?: string;
}

export interface FotoDaGaleria {
  arquivo: string;
  tipo: string;
  orientacao: Orientacao;
  alt: string;
  legenda?: string;
}

export interface CabecalhoDeSecao {
  sobretitulo: string;
  titulo?: string;
  texto?: string;
}

export interface DadosEspaco {
  nome: string;
  nomeCurto: string;
  slogan: string;
  urlDoSite: string;
  seo: {
    titulo: string;
    descricao: string;
    tituloCompartilhamento: string;
    descricaoCompartilhamento: string;
    imagemCompartilhamento: string;
    altImagemCompartilhamento: string;
    corDoTema: string;
    corDoTemaEscuro: string;
  };
  contato: {
    whatsapp: string;
    whatsappExibicao: string;
    telefoneInternacional: string;
    mensagemPadrao: string;
    instagram: string;
    atendimento: string;
    atendimentoDetalhe: string;
  };
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
    regiao: string;
  };
  avaliacao: {
    nota: number;
    total: number;
    fonte: string;
    link: string;
  };
  hero: {
    chamada: string;
    alt: string;
  };
  secoes: {
    eventos: CabecalhoDeSecao;
    galeria: CabecalhoDeSecao;
    espaco: CabecalhoDeSecao;
    depoimentos: CabecalhoDeSecao;
    consulta: CabecalhoDeSecao;
    perguntas: CabecalhoDeSecao;
    localizacao: CabecalhoDeSecao;
  };
  tiposDeEvento: TipoDeEvento[];
  galeria: FotoDaGaleria[];
  categoriasExtrasDaGaleria: { id: string; nome: string }[];
  capacidadeMaxima: number | null;
  fotoDoEspaco: { arquivo: string; orientacao: Orientacao; alt: string };
  textoDoEspaco: string;
  formasDePagamento: string[];
  estrutura: { icone: NomeDoIcone; titulo: string; texto: string }[];
  depoimentos: { texto: string; nome: string; evento?: string; ilustrativo: boolean }[];
  consulta: {
    titulo: string;
    texto: string;
    modeloDaMensagem: string;
  };
  perguntasFrequentes: { pergunta: string; resposta: string }[];
  localizacao: {
    buscaNoMapa: string;
    referencias: { titulo: string; texto: string }[];
  };
}
