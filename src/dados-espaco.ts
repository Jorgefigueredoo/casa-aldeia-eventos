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
      'Cerimônia montada no gramado do CasAldeia Eventos, com a nota 5,0 no Google e 80 avaliações',

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

    // Horário de atendimento comercial, mostrado na seção de consulta e no rodapé.
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
    // Texto do botão principal. Ele abre o WhatsApp já com a mensagem de
    // consulta de data (consulta.mensagem, mais abaixo).
    chamada: 'Consultar minha data',
    // Descrição da foto do topo, para leitores de tela e para o Google.
    // A foto em si fica em public/img/hero.jpg / .webp (computador) e
    // public/img/hero-retrato.jpg / .webp (celular em pé).
    alt: 'Cerimônia de casamento montada no gramado ao lado da piscina, com arco de flores e palmeiras',
  },

  // ---------------------------------------------------------------------------
  // Títulos das seções. "sobretitulo" é a palavra pequena acima do título;
  // "texto" é a frase de apoio abaixo dele (pode ficar vazia: '').
  // ---------------------------------------------------------------------------
  secoes: {
    eventos: { sobretitulo: 'Celebrações', titulo: 'Cada evento, no seu tom', texto: 'Toque em um cartão para ver as fotos na galeria.' },
    galeria: { sobretitulo: 'Galeria', titulo: 'Veja como fica', texto: '' },
    espaco: { sobretitulo: 'O espaço', titulo: 'Natureza, piscina e gramado' },
    depoimentos: { sobretitulo: 'Quem celebrou aqui', titulo: 'O que dizem os clientes', texto: '' },
    consulta: { sobretitulo: 'Disponibilidade' },
    perguntas: { sobretitulo: 'Dúvidas', titulo: 'Perguntas frequentes', texto: '' },
    localizacao: { sobretitulo: 'Como chegar', titulo: 'Em Aldeia, Camaragibe' },
  },

  // ---------------------------------------------------------------------------
  // Tipos de evento atendidos
  // - id: identificador curto, sem espaço nem acento (liga cartão e galeria).
  // - nome: como aparece no cartão e no Google (lista de serviços).
  // - descricao: frase curta no cartão.
  // - cartao: true = aparece na grade de cartões com foto (public/img/eventos/<id>).
  // - destaque: true = cartão maior, ocupando duas colunas (use em um só).
  // - alt: descrição da foto do cartão (descreva o que aparece na foto).
  // Os tipos sem cartão também valem: vão para o Google como serviços oferecidos.
  // ---------------------------------------------------------------------------
  tiposDeEvento: [
    {
      id: 'casamento',
      nome: 'Casamento',
      descricao: 'Cerimônia no gramado e recepção ao ar livre, cercadas pela mata de Aldeia.',
      cartao: true,
      destaque: true,
      alt: 'Cerimônia montada no gramado, com cadeiras, arco de flores e a piscina ao fundo',
    },
    {
      id: 'mini-wedding',
      nome: 'Mini wedding',
      descricao: 'Para quem quer só as pessoas mais próximas, sem abrir mão de nada.',
      cartao: true,
      alt: 'Corredor da cerimônia enfeitado com flores, sob a pérgola do espaço',
    },
    {
      id: 'noivado',
      nome: 'Noivado',
      cartao: false,
    },
    {
      id: 'formatura',
      nome: 'Formatura',
      descricao: 'Espaço amplo para a turma, as famílias e a festa que segue noite adentro.',
      cartao: true,
      alt: 'Festa à noite no gramado, com mesas, palmeiras e luzes quentes',
    },
    {
      id: '15-anos',
      nome: '15 anos',
      descricao: 'Valsa, pista e fotos inesquecíveis num cenário verde.',
      cartao: true,
      alt: 'Entrada do espaço com muros de pedra e cordão de luzes à noite',
    },
    {
      id: 'aniversario',
      nome: 'Aniversário',
      cartao: false,
    },
    {
      id: 'infantil',
      nome: 'Infantil',
      descricao: 'Gramado e espaço de sobra para as crianças brincarem à vontade.',
      cartao: true,
      alt: 'Gramado amplo ao lado da piscina, em dia de sol',
    },
    {
      id: 'corporativo',
      nome: 'Corporativo',
      descricao: 'Confraternizações, conferências e encontros longe do escritório.',
      cartao: true,
      alt: 'Vista aérea do espaço ao entardecer, com tenda e mesas montadas',
    },
    {
      id: 'escolar',
      nome: 'Evento escolar',
      cartao: false,
    },
    {
      id: 'religioso',
      nome: 'Religioso',
      descricao: 'Celebrações, retiros e encontros num ambiente de paz e natureza.',
      cartao: true,
      alt: 'Casa principal do espaço ao entardecer, cercada de jardim',
    },
    {
      id: 'tematica',
      nome: 'Festa temática',
      cartao: false,
    },
    {
      id: 'outro',
      nome: 'Outro tipo de evento',
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
    // FOTOS PROVISÓRIAS: miniaturas de 225 px tiradas da busca do Google.
    // Troque em fotos-originais/ pela versão original (mesmo nome) e rode "npm run fotos".
    { arquivo: 'img/galeria/casamento-cerimonia', tipo: 'casamento', orientacao: 'paisagem', alt: 'Cerimônia montada no gramado, com cadeiras, arco de flores e a piscina ao fundo', legenda: 'Cerimônia no gramado' },
    { arquivo: 'img/galeria/casamento-altar', tipo: 'casamento', orientacao: 'paisagem', alt: 'Corredor da cerimônia enfeitado com flores, sob a pérgola', legenda: 'Altar sob a pérgola' },
    { arquivo: 'img/galeria/espaco-entardecer', tipo: 'espaco', orientacao: 'paisagem', alt: 'Casa principal do espaço ao entardecer, cercada de jardim e palmeiras', legenda: 'A casa ao entardecer' },
    { arquivo: 'img/galeria/espaco-piscina-noite', tipo: 'espaco', orientacao: 'paisagem', alt: 'Piscina iluminada de azul à noite, com a casa ao fundo', legenda: 'A piscina à noite' },
    { arquivo: 'img/galeria/espaco-gramado', tipo: 'espaco', orientacao: 'paisagem', alt: 'Gramado, piscina e pérgola do espaço em dia de sol', legenda: 'Gramado e piscina' },
    { arquivo: 'img/galeria/espaco-piscina', tipo: 'espaco', orientacao: 'paisagem', alt: 'Piscina cercada de gramado, palmeiras e mata', legenda: 'A piscina' },
    { arquivo: 'img/galeria/espaco-evento-noite', tipo: 'espaco', orientacao: 'paisagem', alt: 'Evento à noite no gramado, com convidados nas mesas e palmeiras iluminadas', legenda: 'Festa no gramado' },
    { arquivo: 'img/galeria/espaco-entrada', tipo: 'espaco', orientacao: 'paisagem', alt: 'Entrada do espaço com muros de pedra e cordão de luzes à noite', legenda: 'A entrada' },
    { arquivo: 'img/galeria/espaco-aerea-entardecer', tipo: 'espaco', orientacao: 'paisagem', alt: 'Vista aérea do espaço ao entardecer, com tenda e mesas montadas no gramado', legenda: 'Vista do alto' },
    { arquivo: 'img/galeria/espaco-aerea', tipo: 'espaco', orientacao: 'paisagem', alt: 'Vista aérea de cima do espaço, cercado pela mata de Aldeia', legenda: 'Cercado pela mata' },
  ],

  // Categorias da galeria que não são tipos de evento (ex.: fotos do próprio
  // espaço vazio). Aparecem como botão de filtro depois dos tipos de evento.
  categoriasExtrasDaGaleria: [{ id: 'espaco', nome: 'O espaço' }],

  // ---------------------------------------------------------------------------
  // O espaço: estrutura física
  // ---------------------------------------------------------------------------

  // Capacidade máxima de convidados (só o número), ou null enquanto não souber.
  // PENDENTE: perguntar ao dono. Quando preenchida, ela vai para o Google.
  capacidadeMaxima: null,

  // Foto grande da seção "O espaço" (reaproveita uma foto da galeria).
  fotoDoEspaco: {
    arquivo: 'img/galeria/espaco-gramado',
    orientacao: 'paisagem',
    alt: 'Gramado, piscina e pérgola do espaço em dia de sol',
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
  // Consulta de data (faixa com botão de WhatsApp, sem formulário)
  // ---------------------------------------------------------------------------
  consulta: {
    titulo: 'Consulte sua data',
    texto: 'Toque no botão e fale direto com a gente no WhatsApp. A mensagem já vai escrita: é só dizer a data, o tipo de evento e quantos convidados.',
    // Texto do botão desta seção.
    botao: 'Consultar pelo WhatsApp',
    // Mensagem que já vem escrita no WhatsApp (botão do topo e desta seção).
    mensagem: 'Olá! Vim pelo site da CasAldeia e gostaria de saber se uma data está disponível para o meu evento.',
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
        'A capacidade varia conforme o formato do evento: cerimônia no gramado, recepção com mesas ou coquetel. Conte pelo WhatsApp o número aproximado de convidados e indicamos a melhor configuração para você.',
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
