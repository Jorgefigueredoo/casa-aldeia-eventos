/* =============================================================================
   dados-espaco.ts — TODOS os dados do negócio ficam aqui.

   Para reusar este molde com outro cliente, edite SÓ este arquivo e rode
     npm run build
   O build monta a página, o título e a descrição para o Google, o cartão do
   link no WhatsApp (Open Graph), os dados estruturados (JSON-LD), o robots.txt
   e o sitemap.xml a partir daqui. Não há outro lugar para atualizar.

   Convenções:
   - Textos entre aspas simples '...'. Se o texto tiver apóstrofo, use crase `...`.
   - Caminhos de imagem são escritos SEM extensão: o site procura automaticamente
     o arquivo .webp e o .jpg com o mesmo nome (ex.: 'img/hero' → img/hero.webp
     e img/hero.jpg). As imagens ficam em public/img.
   - O formato de cada campo está em tipos.ts. Se algo estiver errado, o editor
     sublinha em vermelho e o build avisa a linha.
   - Campos marcados com "PENDENTE" ainda precisam ser confirmados com o dono.
   ========================================================================== */

import type { DadosEspaco } from './tipos.ts';

export const espaco: DadosEspaco = {
  // Nome completo, usado no título, no rodapé, no compartilhamento e na busca.
  nome: 'CasAldeia Eventos',

  // Versão curta do nome, usada no logotipo do topo e no título da aba.
  nomeCurto: 'CasAldeia',

  // Frase que aparece logo abaixo do nome, no topo da página.
  slogan: 'Espaço para casamentos e eventos em Aldeia, Camaragibe',

  // Endereço definitivo do site, com https e sem barra no final.
  // PENDENTE: confirmar o domínio. Ele é usado no link da foto de compartilhamento,
  // que precisa ser um endereço completo para o WhatsApp mostrar a imagem.
  urlDoSite: 'https://casaldeiaeventos.com.br',

  // ---------------------------------------------------------------------------
  // Busca no Google e compartilhamento (WhatsApp, Instagram, Facebook, X)
  // ---------------------------------------------------------------------------
  seo: {
    // Título da aba e do resultado no Google. Ideal: até 65 caracteres.
    titulo: 'Espaço para casamentos e eventos em Aldeia, Camaragibe — CasAldeia',

    // Resumo que aparece embaixo do título no Google. Ideal: até 160 caracteres.
    descricao:
      'Espaço para casamentos, formaturas e festas em Aldeia, Camaragibe - PE. Área ao ar livre, piscina e gramado. Nota 5,0 no Google. Consulte sua data pelo WhatsApp.',

    // Título que aparece no cartão do link quando ele é colado num grupo.
    tituloCompartilhamento: 'CasAldeia Eventos · 5,0 no Google (80 avaliações)',

    // Texto do cartão do link no grupo. Comece pelo que mais convence.
    descricaoCompartilhamento:
      'Casamentos e eventos em Aldeia, Camaragibe. Área ao ar livre, piscina e gramado. Consulte sua data pelo WhatsApp.',

    // Imagem do cartão do link: JPG de 1200 x 630 px (sem extensão aqui).
    // O comando "npm run fotos" gera essa imagem a partir da
    // foto do topo, já com o nome e a nota escritos por cima.
    imagemCompartilhamento: 'img/og',

    // Descrição da imagem de compartilhamento, para leitores de tela.
    altImagemCompartilhamento:
      'CasAldeia Eventos ao entardecer, com a nota 5,0 no Google e 80 avaliações',

    // Cor da barra do navegador no celular (modo claro e modo escuro).
    corDoTema: '#13294b',
    corDoTemaEscuro: '#0b1220',
  },

  // ---------------------------------------------------------------------------
  // Contato
  // ---------------------------------------------------------------------------
  contato: {
    // WhatsApp só com números: 55 (Brasil) + DDD + número. Usado nos links.
    whatsapp: '5581985340822',

    // O mesmo número no formato que as pessoas leem.
    whatsappExibicao: '(81) 98534-0822',

    // O mesmo número no formato internacional, usado para o Google.
    telefoneInternacional: '+55-81-98534-0822',

    // Mensagem que já vem escrita quando a pessoa toca no botão flutuante.
    mensagemPadrao: 'Olá! Vim pelo site da CasAldeia e gostaria de informações sobre o espaço.',

    // Usuário do Instagram, sem o @.
    instagram: 'casaldeiaeventos',

    // Horário de atendimento comercial, mostrado perto do formulário e no rodapé.
    atendimento: 'Atendimento comercial até 17h',

    // Explicação curta para quem manda mensagem fora do horário (de noite, por exemplo).
    atendimentoDetalhe: 'Mensagens enviadas depois das 17h são respondidas no próximo dia útil.',
  },

  // ---------------------------------------------------------------------------
  // Endereço
  // ---------------------------------------------------------------------------
  endereco: {
    rua: 'R. Artur Azevedo, 388', // Logradouro e número.
    bairro: 'Aldeia dos Camarás', // Bairro.
    cidade: 'Camaragibe', // Cidade.
    uf: 'PE', // Estado, em duas letras.
    cep: '54792-130', // CEP com hífen.
    pais: 'BR', // País, em duas letras (padrão internacional).
    regiao: 'Aldeia', // Nome da região que as pessoas usam na busca ("espaço em Aldeia").
  },

  // ---------------------------------------------------------------------------
  // Avaliação no Google: o maior ativo do negócio. Atualize sempre que mudar.
  // ---------------------------------------------------------------------------
  avaliacao: {
    nota: 5.0, // Nota média (use ponto, não vírgula: 4.9, 5.0...).
    total: 80, // Quantidade de avaliações.
    fonte: 'Google', // De onde vem a nota.
    // Link para a página de avaliações no Google (opcional). Se ficar vazio, a
    // faixa de avaliação não vira link. Para pegar: abra o perfil no Google Maps,
    // toque em "Compartilhar" e cole aqui.
    link: '',
  },

  // ---------------------------------------------------------------------------
  // Topo da página (hero)
  // ---------------------------------------------------------------------------
  hero: {
    // Texto do botão principal. Ele leva até o formulário de consulta.
    chamada: 'Consultar minha data',
    // Descrição da foto do topo, para leitores de tela e para o Google.
    // A foto em si fica em public/img/hero.jpg / .webp (computador) e
    // public/img/hero-retrato.jpg / .webp (celular em pé).
    alt: 'Vista do espaço CasAldeia ao entardecer, com o gramado e a área da piscina',
  },

  // ---------------------------------------------------------------------------
  // Títulos das seções. "sobretitulo" é a palavra pequena acima do título;
  // "texto" é a frase de apoio abaixo dele (pode ficar vazia: '').
  // ---------------------------------------------------------------------------
  secoes: {
    eventos: { sobretitulo: 'Celebrações', titulo: 'Cada evento, no seu tom', texto: 'Toque em um tipo de evento para ver as fotos dele na galeria.' },
    galeria: { sobretitulo: 'Galeria', titulo: 'Veja como fica', texto: '' },
    espaco: { sobretitulo: 'O espaço', titulo: 'Natureza, piscina e gramado' },
    depoimentos: { sobretitulo: 'Quem celebrou aqui', titulo: 'O que dizem os clientes', texto: '' },
    consulta: { sobretitulo: 'Disponibilidade' },
    perguntas: { sobretitulo: 'Dúvidas', titulo: 'Perguntas frequentes', texto: '' },
    localizacao: { sobretitulo: 'Como chegar', titulo: 'Em Aldeia, Camaragibe' },
  },

  // ---------------------------------------------------------------------------
  // Tipos de evento atendidos
  // - id: identificador curto, sem espaço nem acento (liga cartão, galeria e formulário).
  // - nome: como aparece no cartão e na lista do formulário.
  // - naMensagem: como o tipo entra na frase do WhatsApp ("...está livre para ___").
  // - descricao: frase curta no cartão.
  // - cartao: true = aparece na grade de cartões com foto (public/img/eventos/<id>).
  // - destaque: true = cartão maior, ocupando duas colunas (use em um só).
  // - alt: descrição da foto do cartão.
  // Todos os tipos aparecem na lista do formulário, na ordem abaixo.
  // ---------------------------------------------------------------------------
  tiposDeEvento: [
    {
      id: 'casamento',
      nome: 'Casamento',
      naMensagem: 'casamento',
      descricao: 'Cerimônia no gramado e recepção ao ar livre, cercadas pela mata de Aldeia.',
      cartao: true,
      destaque: true,
      alt: 'Cerimônia de casamento montada no gramado ao entardecer',
    },
    {
      id: 'mini-wedding',
      nome: 'Mini wedding',
      naMensagem: 'mini wedding',
      descricao: 'Para quem quer só as pessoas mais próximas, sem abrir mão de nada.',
      cartao: true,
      alt: 'Mesa posta para um mini wedding ao ar livre',
    },
    {
      id: 'noivado',
      nome: 'Noivado',
      naMensagem: 'noivado',
      cartao: false,
    },
    {
      id: 'formatura',
      nome: 'Formatura',
      naMensagem: 'formatura',
      descricao: 'Espaço amplo para a turma, as famílias e a festa que segue noite adentro.',
      cartao: true,
      alt: 'Festa de formatura com pista de dança iluminada',
    },
    {
      id: '15-anos',
      nome: '15 anos',
      naMensagem: 'festa de 15 anos',
      descricao: 'Valsa, pista e fotos inesquecíveis num cenário verde.',
      cartao: true,
      alt: 'Debutante na entrada da festa de 15 anos',
    },
    {
      id: 'aniversario',
      nome: 'Aniversário',
      naMensagem: 'aniversário',
      cartao: false,
    },
    {
      id: 'infantil',
      nome: 'Infantil',
      naMensagem: 'festa infantil',
      descricao: 'Gramado e espaço de sobra para as crianças brincarem à vontade.',
      cartao: true,
      alt: 'Decoração de festa infantil montada no gramado',
    },
    {
      id: 'corporativo',
      nome: 'Corporativo',
      naMensagem: 'evento corporativo',
      descricao: 'Confraternizações, conferências e encontros longe do escritório.',
      cartao: true,
      alt: 'Evento corporativo com convidados reunidos na área externa',
    },
    {
      id: 'escolar',
      nome: 'Evento escolar',
      naMensagem: 'evento escolar',
      cartao: false,
    },
    {
      id: 'religioso',
      nome: 'Religioso',
      naMensagem: 'evento religioso',
      descricao: 'Celebrações, retiros e encontros num ambiente de paz e natureza.',
      cartao: true,
      alt: 'Celebração religiosa ao ar livre com cadeiras no gramado',
    },
    {
      id: 'tematica',
      nome: 'Festa temática',
      naMensagem: 'festa temática',
      cartao: false,
    },
    {
      id: 'outro',
      nome: 'Outro tipo de evento',
      naMensagem: 'um evento',
      cartao: false,
    },
  ],

  // ---------------------------------------------------------------------------
  // Galeria de fotos
  // - arquivo: caminho sem extensão. Cada foto precisa de 4 arquivos:
  //   <nome>.webp e <nome>.jpg (grande, abre ao tocar) e
  //   <nome>-p.webp e <nome>-p.jpg (pequena, aparece na grade).
  //   O comando "npm run fotos" gera os quatro de uma vez.
  // - tipo: id de um tipo de evento acima, ou de uma categoria extra abaixo.
  //   É o que faz o filtro funcionar.
  // - orientacao: 'paisagem' (deitada, 4:3) ou 'retrato' (em pé, 3:4).
  // - alt: descrição da foto (o que aparece nela).
  // - legenda: texto opcional embaixo da foto ampliada.
  // ---------------------------------------------------------------------------
  galeria: [
    { arquivo: 'img/galeria/casamento-01', tipo: 'casamento', orientacao: 'paisagem', alt: 'Cerimônia de casamento no gramado ao pôr do sol', legenda: 'Cerimônia no gramado' },
    { arquivo: 'img/galeria/casamento-02', tipo: 'casamento', orientacao: 'retrato', alt: 'Noivos caminhando entre as árvores do espaço', legenda: 'Fotos entre as árvores' },
    { arquivo: 'img/galeria/casamento-03', tipo: 'casamento', orientacao: 'paisagem', alt: 'Recepção de casamento com mesas iluminadas à noite', legenda: 'Recepção ao ar livre' },
    { arquivo: 'img/galeria/casamento-04', tipo: 'casamento', orientacao: 'paisagem', alt: 'Mesa de doces do casamento com flores', legenda: 'Mesa de doces' },
    { arquivo: 'img/galeria/mini-wedding-01', tipo: 'mini-wedding', orientacao: 'paisagem', alt: 'Mesa única posta para mini wedding', legenda: 'Mesa única para os mais próximos' },
    { arquivo: 'img/galeria/mini-wedding-02', tipo: 'mini-wedding', orientacao: 'retrato', alt: 'Arco de flores do mini wedding', legenda: 'Altar de flores' },
    { arquivo: 'img/galeria/formatura-01', tipo: 'formatura', orientacao: 'paisagem', alt: 'Formandos reunidos na pista de dança', legenda: 'Baile de formatura' },
    { arquivo: 'img/galeria/formatura-02', tipo: 'formatura', orientacao: 'paisagem', alt: 'Área externa preparada para a festa de formatura', legenda: 'Montagem da festa' },
    { arquivo: 'img/galeria/15-anos-01', tipo: '15-anos', orientacao: 'retrato', alt: 'Debutante posando no jardim', legenda: 'Ensaio no jardim' },
    { arquivo: 'img/galeria/15-anos-02', tipo: '15-anos', orientacao: 'paisagem', alt: 'Salão decorado para a festa de 15 anos', legenda: 'Decoração da festa' },
    { arquivo: 'img/galeria/corporativo-01', tipo: 'corporativo', orientacao: 'paisagem', alt: 'Confraternização de empresa na área externa', legenda: 'Confraternização de fim de ano' },
    { arquivo: 'img/galeria/corporativo-02', tipo: 'corporativo', orientacao: 'paisagem', alt: 'Auditório montado para conferência', legenda: 'Formato conferência' },
    { arquivo: 'img/galeria/religioso-01', tipo: 'religioso', orientacao: 'paisagem', alt: 'Celebração religiosa ao ar livre', legenda: 'Celebração ao ar livre' },
    { arquivo: 'img/galeria/religioso-02', tipo: 'religioso', orientacao: 'retrato', alt: 'Detalhe do altar montado no gramado', legenda: 'Altar no gramado' },
    { arquivo: 'img/galeria/infantil-01', tipo: 'infantil', orientacao: 'paisagem', alt: 'Mesa de festa infantil temática', legenda: 'Mesa temática' },
    { arquivo: 'img/galeria/infantil-02', tipo: 'infantil', orientacao: 'paisagem', alt: 'Crianças brincando no gramado', legenda: 'Gramado livre para brincar' },
    { arquivo: 'img/galeria/espaco-01', tipo: 'espaco', orientacao: 'paisagem', alt: 'Piscina do espaço cercada pela mata', legenda: 'A piscina' },
    { arquivo: 'img/galeria/espaco-02', tipo: 'espaco', orientacao: 'paisagem', alt: 'Gramado amplo do espaço ao fim da tarde', legenda: 'O gramado' },
  ],

  // Categorias da galeria que não são tipos de evento (ex.: fotos do próprio
  // espaço vazio). Aparecem como botão de filtro depois dos tipos de evento.
  categoriasExtrasDaGaleria: [{ id: 'espaco', nome: 'O espaço' }],

  // ---------------------------------------------------------------------------
  // O espaço: estrutura física
  // ---------------------------------------------------------------------------

  // Capacidade máxima de convidados (só o número), ou null enquanto não souber.
  // PENDENTE: perguntar ao dono. Quando preenchida, ela vai para o Google e o
  // formulário avisa (sem bloquear) quando alguém digitar um número maior.
  capacidadeMaxima: null,

  // Foto grande da seção "O espaço" (reaproveita uma foto da galeria).
  fotoDoEspaco: {
    arquivo: 'img/galeria/espaco-01',
    orientacao: 'paisagem',
    alt: 'Piscina e área externa do espaço cercadas pela mata',
  },

  // Texto de abertura da seção "O espaço".
  textoDoEspaco:
    'Em Aldeia, cercado pela mata, o CasAldeia reúne área ao ar livre, piscina e gramado num só lugar. É o cenário pronto para a cerimônia, a festa e as fotos.',

  // Formas de pagamento aceitas (vão para o Google). Acrescente as confirmadas.
  formasDePagamento: ['Cartão de crédito'],

  // Itens da estrutura. "icone" escolhe o desenho; opções disponíveis:
  // 'arvore', 'piscina', 'gramado', 'carro', 'banheiro', 'pessoas', 'cartao'.
  estrutura: [
    { icone: 'arvore', titulo: 'Área ao ar livre', texto: 'Ambiente aberto, ventilado e cercado de verde.' },
    { icone: 'piscina', titulo: 'Piscina', texto: 'Um cenário a mais para as fotos e para a festa.' },
    { icone: 'gramado', titulo: 'Gramado', texto: 'Espaço amplo para cerimônia, pista e brincadeiras.' },
    { icone: 'carro', titulo: 'Estacionamento', texto: 'Estacionamento no local para os convidados.' },
    { icone: 'banheiro', titulo: 'Banheiros', texto: 'Banheiros para os convidados na área do evento.' },
    // PENDENTE: quando souber a capacidade, troque o texto. Ex.: 'Até 250 convidados.'
    { icone: 'pessoas', titulo: 'Capacidade', texto: 'Formatos para eventos íntimos e grandes. Consulte para o seu número de convidados.' },
    { icone: 'cartao', titulo: 'Cartão de crédito', texto: 'Aceitamos pagamento no cartão de crédito.' },
  ],

  // ---------------------------------------------------------------------------
  // Depoimentos (três cartões)
  // - texto: trecho da avaliação.
  // - nome: como a pessoa assina.
  // - evento: tipo de evento (opcional, aparece ao lado do nome).
  // - ilustrativo: true enquanto o texto for de exemplo. Nesse caso o cartão
  //   mostra "Texto ilustrativo" no lugar de "Avaliação no Google", para que
  //   nenhum texto inventado seja apresentado como avaliação real.
  //   IMPORTANTE: antes de publicar, copie três avaliações reais do Google
  //   (com o nome como aparece lá) e troque ilustrativo para false.
  // ---------------------------------------------------------------------------
  depoimentos: [
    {
      texto: 'Casamos no fim da tarde e a luz no gramado foi exatamente o que a gente sonhou. Equipe atenciosa do primeiro contato até o último convidado ir embora.',
      nome: 'Juliana e Rafael',
      evento: 'Casamento',
      ilustrativo: true,
    },
    {
      texto: 'Fizemos a festa da nossa turma aqui e todo mundo elogiou. Espaço amplo, estacionamento fácil e a festa foi até de madrugada sem nenhum problema.',
      nome: 'Comissão de formatura',
      evento: 'Formatura',
      ilustrativo: true,
    },
    {
      texto: 'Lugar lindo, cercado de verde, e muito bem cuidado. Os convidados ficaram encantados com a piscina iluminada à noite.',
      nome: 'Patrícia M.',
      evento: '15 anos',
      ilustrativo: true,
    },
  ],

  // ---------------------------------------------------------------------------
  // Consulta de data (formulário)
  // ---------------------------------------------------------------------------
  consulta: {
    titulo: 'Consulte sua data',
    texto: 'Preencha em menos de um minuto. Ao enviar, o WhatsApp abre com a sua mensagem pronta, é só tocar em enviar.',
    // Modelo da mensagem enviada. As palavras entre chaves são trocadas pelo
    // que a pessoa preencheu: {data} {tipo} {convidados} {nome} {whatsapp}
    modeloDaMensagem:
      'Olá! Gostaria de saber se o dia {data} está livre para {tipo}, aproximadamente {convidados} convidados. Meu nome é {nome} e meu WhatsApp é {whatsapp}.',
  },

  // ---------------------------------------------------------------------------
  // Perguntas frequentes (acordeão). Pergunta e resposta em texto simples.
  // ---------------------------------------------------------------------------
  perguntasFrequentes: [
    {
      // PENDENTE: quando souber a capacidade, troque por algo como
      // 'O espaço recebe até 250 convidados em formato de festa...'.
      pergunta: 'Quantos convidados o espaço comporta?',
      resposta:
        'A capacidade varia conforme o formato do evento: cerimônia no gramado, recepção com mesas ou coquetel. Informe o número aproximado de convidados na consulta de data e indicamos a melhor configuração para você.',
    },
    {
      // PENDENTE: confirmar se o buffet é próprio, terceirizado ou livre.
      pergunta: 'Como funciona o buffet?',
      resposta:
        'As opções de buffet são apresentadas junto com o orçamento, de acordo com o tipo de evento e o número de convidados. Conte o que você tem em mente na conversa pelo WhatsApp.',
    },
    {
      // PENDENTE: confirmar o horário limite (já houve evento até as 4h48).
      pergunta: 'Até que horas a festa pode ir?',
      resposta:
        'O horário de encerramento é combinado em contrato, de acordo com o tipo de evento. Já recebemos festas que seguiram madrugada adentro.',
    },
    {
      pergunta: 'Tem estacionamento?',
      resposta: 'Sim. O espaço tem estacionamento no local para os convidados.',
    },
    {
      pergunta: 'Quais são as formas de pagamento?',
      resposta:
        'Aceitamos cartão de crédito. As condições e as demais formas de pagamento são combinadas no orçamento.',
    },
    {
      pergunta: 'Posso visitar o espaço antes de fechar?',
      resposta:
        'Pode e recomendamos. As visitas são agendadas pelo WhatsApp, dentro do horário de atendimento comercial (até 17h).',
    },
  ],

  // ---------------------------------------------------------------------------
  // Localização
  // ---------------------------------------------------------------------------
  localizacao: {
    // Texto usado no Google Maps para achar o lugar (mapa e botão "Como chegar").
    // Se o mapa apontar para o lugar errado, troque pelo nome exato do perfil
    // no Google Maps, por exemplo: 'CasAldeia Eventos, Camaragibe'.
    buscaNoMapa: 'R. Artur Azevedo, 388 - Aldeia dos Camarás, Camaragibe - PE, 54792-130',

    // Três referências para quem não conhece a região.
    // PENDENTE: confirmar com o dono os pontos e os tempos de trajeto.
    referencias: [
      { titulo: 'Estrada de Aldeia (PE-27)', texto: 'Acesso principal até o espaço.' },
      { titulo: 'Centro de Camaragibe', texto: 'Cerca de 15 minutos de carro.' },
      { titulo: 'Recife', texto: 'Cerca de 40 minutos de carro, saindo da Zona Norte.' },
    ],
  },
};
