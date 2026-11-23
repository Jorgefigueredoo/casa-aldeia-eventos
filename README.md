# CasAldeia Eventos: site de página única

Site de um espaço de eventos feito em **React + TypeScript + Vite**. No build, a
página é **pré-renderizada** em HTML estático: o visitante, o Google e o WhatsApp
recebem a página pronta, e o React só assume depois para deixar galeria,
formulário e perguntas interativos. O resultado é uma pasta `dist/` com
arquivos estáticos, servida pelo Nginx.

O molde é reutilizável: **todos os dados do negócio ficam em `src/dados-espaco.ts`**.

```
src/
  dados-espaco.ts      ← O ÚNICO ARQUIVO QUE VOCÊ EDITA PARA TROCAR DE CLIENTE
  tipos.ts             formato dos dados (o editor avisa se algo estiver errado)
  App.tsx              ordem das seções e o aviso "Página de exemplo"
  componentes/         uma parte da página por arquivo
  util/                regras do formulário (telefone, data, mensagem) e formatação
  estilo.css           visual: cores, fontes, layout, modo escuro
  main.tsx             entrada no navegador
  prerender.tsx        entrada usada no build para gerar o HTML pronto
config/seo.ts          monta título, Open Graph, JSON-LD, robots.txt e sitemap.xml
vite.config.ts         configuração do build (inclui o plugin de SEO)
ferramentas/
  prerender.mjs        última etapa do build: coloca o HTML pronto no dist/
  preparar-fotos.mjs   converte suas fotos para todos os tamanhos e formatos
public/img/            fotos (WebP + JPG), ícones e a imagem de compartilhamento
index.html             esqueleto (o conteúdo entra no build)
```

Requisito: **Node.js 22.18 ou mais novo** ([nodejs.org](https://nodejs.org)).

---

## 1. Comandos

```bash
npm install          # uma vez, para baixar as dependências
npm run dev          # site no seu computador, atualiza sozinho ao salvar
npm run build        # gera a pasta dist/ pronta para o servidor
npm run preview      # abre o dist/ localmente para conferir antes de publicar
npm run verificar    # só confere os tipos (erros de digitação nos dados)
npm run fotos        # prepara as fotos (veja a seção 3)
```

---

## 2. Trocar os dados (outro cliente, ou atualizar este)

1. Abra `src/dados-espaco.ts`. Cada campo tem um comentário em português.
2. Altere o que precisar: nome, WhatsApp, endereço, nota do Google, tipos de
   evento, galeria, estrutura, depoimentos, perguntas frequentes, referências de
   localização, títulos das seções.
3. Rode `npm run build`.

Não há outro lugar para atualizar. O build monta a página e também o que
precisa estar escrito no HTML para quem não roda JavaScript: título e descrição
para o Google, cartão do link no WhatsApp (Open Graph e Twitter Card), dados
estruturados (JSON-LD com endereço, telefone, nota 5,0 / 80 e serviços),
`robots.txt` e `sitemap.xml`.

Se um campo obrigatório faltar ou estiver com o tipo errado (por exemplo, nota
escrita como texto), o editor sublinha em vermelho e o build para dizendo a linha.

Campos que exigem atenção:

| Campo | Observação |
|---|---|
| `urlDoSite` | Domínio definitivo, com `https://`. Sem ele a foto não aparece no WhatsApp. |
| `avaliacao.nota` / `total` | Atualize quando mudar no Google e rode o build. |
| `depoimentos[].ilustrativo` | Enquanto for `true`, o cartão mostra "Texto ilustrativo". Cole avaliações **reais** do Google e troque para `false`: só aí aparece "Avaliação no Google". |
| `capacidadeMaxima` | Número de convidados. Quando preenchido, vai para o Google e o formulário avisa (sem bloquear) quem passar do limite. |
| `localizacao.buscaNoMapa` | Se o mapa marcar o lugar errado, use o nome exato do perfil no Google Maps. |
| `tiposDeEvento[].naMensagem` | Como o tipo aparece na frase do WhatsApp: "...está livre para **festa de 15 anos**". |

Fora do arquivo de dados, só duas coisas mudam por cliente:

- **Paleta de cores**: bloco de variáveis no topo de `src/estilo.css`, com o modo
  escuro logo abaixo. Hoje: azul-marinho `#13294b`, branco e dourado `#b08d57`.
- **Ícone da aba**: as letras "CA" em `public/img/favicon.svg` (e `apple-touch-icon.png`).

---

## 3. Trocar as fotos

As fotos atuais são **placeholders cinza** nas proporções certas, com o nome de
cada foto escrito nelas. Nos componentes, um comentário `FOTO REAL` marca onde
cada uma entra.

### Jeito rápido (recomendado)

1. Crie a pasta `fotos-originais/` na raiz do projeto, com as fotos do jeito que
   vieram (JPG, PNG ou WebP, qualquer tamanho):

   ```
   fotos-originais/
     hero.jpg                 foto do topo (o espaço ao entardecer, deitada)
     hero-retrato.jpg         opcional: versão em pé para celular
     eventos/casamento.jpg    um por tipo com cartao: true (nome = id do tipo)
     eventos/formatura.jpg
     ...
     galeria/casamento-01.jpg nome = final do campo "arquivo" na galeria
     ...
   ```

2. Rode `npm run fotos` e depois `npm run build`.

A ferramenta recorta, redimensiona e salva em WebP e JPG dentro de `public/img`.
Ela também gera as miniaturas da galeria e a `og.jpg` (1200×630), com o nome e
a nota do Google escritos sobre a foto do topo. No fim, confere se a galeria do
arquivo de dados bate com as fotos e avisa se alguma `orientacao` estiver errada.

### Jeito manual

Substitua os arquivos em `public/img/` **mantendo nomes e tamanhos exatos** (os
tamanhos estão declarados no código para a página não "pular" enquanto carrega):

| Arquivo | Tamanho (px) | Formatos |
|---|---|---|
| `hero` | 1920 × 1080 | `.webp` e `.jpg` |
| `hero-retrato` | 900 × 1600 | `.webp` e `.jpg` |
| `eventos/<id>` | 800 × 1000 | `.webp` e `.jpg` |
| `galeria/<nome>` (deitada) | 1600 × 1200 | `.webp` e `.jpg` |
| `galeria/<nome>` (em pé) | 1200 × 1600 | `.webp` e `.jpg` |
| `galeria/<nome>-p` (miniatura) | 600 × 450 ou 450 × 600 | `.webp` e `.jpg` |
| `og.jpg` | 1200 × 630 | só `.jpg` (o WhatsApp não lê WebP) |

Para **adicionar ou remover fotos da galeria**, edite a lista `galeria` no
arquivo de dados. Os botões de filtro aparecem sozinhos para os tipos que têm foto.

---

## 4. Publicar com Nginx numa VPS Linux

### 4.1 Gerar e enviar

Só o conteúdo de `dist/` vai para o servidor:

```bash
npm run build
rsync -av --delete dist/ usuario@IP_DA_VPS:/var/www/casaldeia/
```

### 4.2 Configuração do site

Crie `/etc/nginx/sites-available/casaldeia` (troque o domínio):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name casaldeiaeventos.com.br www.casaldeiaeventos.com.br;

    root /var/www/casaldeia;
    index index.html;
    charset utf-8;

    # Compressão de texto (HTML, CSS, JS, SVG)
    gzip on;
    gzip_min_length 512;
    gzip_types text/css application/javascript text/javascript image/svg+xml
               application/xml text/plain application/json;

    # Cabeçalhos de segurança básicos
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    location / {
        try_files $uri $uri/ =404;
    }

    # index.html: o navegador sempre confere se mudou, então um novo build
    # aparece na hora para todo mundo.
    location = /index.html {
        expires -1;
    }

    # JS e CSS do build têm um código no nome (index-a1b2c3.js) que muda a cada
    # build, então podem ficar guardados por um ano sem risco de versão velha.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable" always;
        add_header X-Content-Type-Options "nosniff" always;
        access_log off;
    }

    # Fotos: guardadas por 30 dias no aparelho do visitante. Ao trocar uma foto,
    # quem já visitou pode ver a antiga por até 30 dias; para forçar, mude o
    # nome do arquivo (e no dados-espaco.ts).
    location /img/ {
        expires 30d;
        access_log off;
    }
}
```

Ative e recarregue:

```bash
sudo ln -s /etc/nginx/sites-available/casaldeia /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 4.3 HTTPS (obrigatório para a foto aparecer no WhatsApp)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d casaldeiaeventos.com.br -d www.casaldeiaeventos.com.br
```

### 4.4 Conferir o cartão do link

- Cole o endereço no [Depurador de Compartilhamento do Facebook](https://developers.facebook.com/tools/debug/)
  e clique em "Extrair novamente". O WhatsApp usa a mesma leitura.
- O WhatsApp guarda o cartão em cache. Se o cartão antigo continuar aparecendo,
  teste com `?v=2` no fim do link.

---

## 5. Antes de publicar de verdade

- [ ] Apagar o aviso "Página de exemplo": é **uma linha** (`<AvisoExemplo />`)
      no `src/App.tsx`, logo abaixo do comentário `AVISO "PÁGINA DE EXEMPLO"`.
- [ ] Trocar os três depoimentos por avaliações reais do Google e marcar `ilustrativo: false`.
- [ ] Confirmar com o dono os campos marcados `PENDENTE` no `src/dados-espaco.ts`:
      capacidade, buffet, horário limite, domínio e as três referências de proximidade.
- [ ] Colocar o link das avaliações do Google em `avaliacao.link`. A faixa de nota vira link.
- [ ] Trocar as fotos (`npm run fotos`).
- [ ] `npm run build` e enviar o `dist/`.
- [ ] Rodar o Lighthouse (Chrome → F12 → Lighthouse) no endereço publicado.

---

## Como funciona por dentro

- **Pré-renderização**: `npm run build` roda o TypeScript, o Vite e por fim
  `ferramentas/prerender.mjs`, que renderiza o `<App />` com `renderToString` e
  coloca o HTML dentro do `<div id="raiz">`. No navegador, o `main.tsx` usa
  `hydrateRoot` quando a página já veio pronta e `createRoot` no `npm run dev`.
- **SEO**: o plugin `seo-do-espaco` (em `vite.config.ts`) troca o marcador
  `<!--seo-->` do `index.html` pelas tags geradas em `config/seo.ts` e emite
  `robots.txt` e `sitemap.xml`.
- **Galeria**: o filtro ativo fica no `App` (os cartões de tipo de evento também
  mudam ele). O lightbox usa o `<dialog>` nativo, que prende o foco e fecha com
  Esc. Navega com as setas e com arraste no celular (arrastar para baixo fecha)
  e percorre só as fotos do filtro ativo.
- **Formulário**: regras em `src/util/consulta.ts`. Não aceita data no passado e
  confere o DDD (lista da Anatel) e o formato do celular brasileiro (11 dígitos
  começando com 9, ou fixo com 10). Ao enviar, monta a mensagem pelo
  `modeloDaMensagem` e abre `wa.me`. Não há backend.
- **Desempenho**: só a foto do topo carrega de imediato. As outras são `lazy` e
  o mapa do Google só é criado quando a seção se aproxima. Sem JavaScript de
  terceiros; o único recurso externo é o Google Fonts.
- **Acessibilidade**: contraste AA nos dois temas, foco visível, acordeão com
  `aria-expanded`, erros anunciados por leitor de tela e animações desligadas
  quando o aparelho pede menos movimento.
# casa-aldeia-eventos
