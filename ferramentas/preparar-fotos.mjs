/* =============================================================================
   ferramentas/preparar-fotos.mjs

   Transforma as fotos originais (do celular, da câmera, do fotógrafo) em todos
   os arquivos que o site usa, já no tamanho certo, em WebP e JPG:

     fotos-originais/hero.jpg            → public/img/hero.webp/.jpg            (1920x1080)
     fotos-originais/hero-retrato.jpg    → public/img/hero-retrato.webp/.jpg    (900x1600)
        (opcional: se não existir, é recortada da hero.jpg)
     fotos-originais/eventos/<id>.jpg    → public/img/eventos/<id>.webp/.jpg    (800x1000)
     fotos-originais/galeria/<nome>.jpg  → public/img/galeria/<nome>.webp/.jpg  (1600x1200 ou 1200x1600)
                                           public/img/galeria/<nome>-p.webp/.jpg (miniatura)
     e ainda gera public/img/og.jpg (1200x630, cartão do link no WhatsApp) a partir da
     foto do topo, com o nome e a nota do Google escritos por cima.

   Aceita .jpg, .jpeg, .png, .webp e .tif. Fotos deitadas viram 4:3 e fotos em pé
   viram 3:4 (com corte central). No fim, a ferramenta confere se a galeria do
   src/dados-espaco.ts bate com os arquivos gerados.

   Uso (na pasta do projeto, depois do "npm install"):
     npm run fotos                          (lê de fotos-originais/)
     npm run fotos -- --origem outra/pasta

   Precisa do Node.js 22.18 ou mais novo (ele lê o arquivo .ts de dados direto).
   A pasta fotos-originais NÃO vai para o servidor.
   ========================================================================== */

import { readdir, mkdir, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pastaImg = path.join(raiz, 'public', 'img');

// Pasta de origem: --origem <pasta> ou "fotos-originais" dentro do site.
const indiceOrigem = process.argv.indexOf('--origem');
const origem = path.resolve(indiceOrigem > -1 ? process.argv[indiceOrigem + 1] : path.join(raiz, 'fotos-originais'));

// Procura o sharp no site e, se não achar, na pasta de onde o comando foi rodado.
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  try {
    sharp = createRequire(path.join(process.cwd(), 'index.js'))('sharp');
  } catch {
    console.error('Preciso do "sharp" para mexer nas fotos. Rode antes:  npm install');
    process.exit(1);
  }
}

// Dados do negócio (para o texto da imagem de compartilhamento e a conferência).
const { espaco } = await import(pathToFileURL(path.join(raiz, 'src', 'dados-espaco.ts')).href);

const EXTENSOES = ['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'];
const existe = (p) => access(p).then(() => true, () => false);

// Acha "pasta/nome.<qualquer extensão aceita>".
async function acharArquivo(pasta, nome) {
  for (const ext of EXTENSOES) {
    for (const variacao of [ext, ext.toUpperCase()]) {
      const p = path.join(pasta, nome + variacao);
      if (await existe(p)) return p;
    }
  }
  return null;
}

// Lista as fotos de uma subpasta da origem.
async function listarFotos(pasta) {
  if (!(await existe(pasta))) return [];
  return (await readdir(pasta)).filter((f) => EXTENSOES.includes(path.extname(f).toLowerCase())).map((f) => path.join(pasta, f));
}

// Salva uma imagem recortada no tamanho exato, em WebP e JPG.
async function salvar(entrada, destinoSemExtensao, largura, altura) {
  await mkdir(path.dirname(destinoSemExtensao), { recursive: true });
  const base = sharp(entrada).rotate().resize(largura, altura, { fit: 'cover', position: 'attention' });
  await base.clone().webp({ quality: 76 }).toFile(`${destinoSemExtensao}.webp`);
  await base.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(`${destinoSemExtensao}.jpg`);
  console.log(`  ✓ ${path.relative(raiz, destinoSemExtensao)} (${largura}x${altura})`);
}

// Orientação real da foto (considera a rotação gravada pelo celular).
async function orientacao(entrada) {
  const m = await sharp(entrada).metadata();
  const girada = (m.orientation || 1) >= 5;
  const largura = girada ? m.height : m.width;
  const altura = girada ? m.width : m.height;
  return largura >= altura ? 'paisagem' : 'retrato';
}

const escXml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Imagem de compartilhamento: foto do topo + véu escuro + nome + nota.
async function gerarImagemCompartilhamento(fotoBase) {
  const nota = espaco.avaliacao.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 });
  const estrela = 'M12 2.6l2.84 5.98 6.56.8-4.84 4.52 1.25 6.5L12 17.2l-5.81 3.2 1.25-6.5L2.6 9.38l6.56-.8z';
  const estrelas = [0, 1, 2, 3, 4]
    .map((i) => `<path transform="translate(${80 + i * 34} 488) scale(1.3)" d="${estrela}" fill="#dcc08c"/>`)
    .join('');
  const sobreposicao = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#081020" stop-opacity="0.15"/>
      <stop offset="0.45" stop-color="#081020" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#081020" stop-opacity="0.82"/>
    </linearGradient></defs>
    <rect width="1200" height="630" fill="url(#v)"/>
    <rect x="80" y="372" width="56" height="2" fill="#dcc08c"/>
    <text x="80" y="456" font-family="Georgia, 'Times New Roman', serif" font-size="74" fill="#ffffff">${escXml(espaco.nome)}</text>
    ${estrelas}
    <text x="262" y="517" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="30" fill="#ffffff">${escXml(`${nota} no ${espaco.avaliacao.fonte} · ${espaco.avaliacao.total} avaliações`)}</text>
    <text x="80" y="570" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="24" letter-spacing="3" fill="#c8d1e1">${escXml(`${espaco.endereco.regiao.toUpperCase()} · ${espaco.endereco.cidade.toUpperCase()} - ${espaco.endereco.uf}`)}</text>
  </svg>`);
  await sharp(fotoBase)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .composite([{ input: sobreposicao }])
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(path.join(pastaImg, 'og.jpg'));
  console.log('  ✓ img/og (1200x630, com nome e nota)');
}

// --------------------------------------------------------------------------------
console.log(`Lendo fotos de: ${origem}\n`);

// Hero
const hero = await acharArquivo(origem, 'hero');
if (hero) {
  console.log('Topo (hero):');
  await salvar(hero, path.join(pastaImg, 'hero'), 1920, 1080);
  const heroRetrato = (await acharArquivo(origem, 'hero-retrato')) || hero;
  await salvar(heroRetrato, path.join(pastaImg, 'hero-retrato'), 900, 1600);
  await gerarImagemCompartilhamento(hero);
}

// Cartões de tipo de evento
const fotosEventos = await listarFotos(path.join(origem, 'eventos'));
if (fotosEventos.length) console.log('\nCartões de evento:');
for (const f of fotosEventos) {
  await salvar(f, path.join(pastaImg, 'eventos', path.parse(f).name), 800, 1000);
}

// Galeria
const fotosGaleria = await listarFotos(path.join(origem, 'galeria'));
const orientacoes = {};
if (fotosGaleria.length) console.log('\nGaleria:');
for (const f of fotosGaleria) {
  const nome = path.parse(f).name;
  const o = await orientacao(f);
  orientacoes[`img/galeria/${nome}`] = o;
  const [g, p] = o === 'paisagem' ? [[1600, 1200], [600, 450]] : [[1200, 1600], [450, 600]];
  await salvar(f, path.join(pastaImg, 'galeria', nome), ...g);
  await salvar(f, path.join(pastaImg, 'galeria', `${nome}-p`), ...p);
}

// Conferência: a galeria do dados-espaco.ts aponta para arquivos que existem?
console.log('\nConferindo src/dados-espaco.ts…');
let problemas = 0;
for (const item of espaco.galeria) {
  if (!(await existe(path.join(raiz, 'public', `${item.arquivo}.jpg`)))) {
    console.log(`  ! Falta a foto ${item.arquivo}.jpg`);
    problemas++;
  } else if (orientacoes[item.arquivo] && orientacoes[item.arquivo] !== item.orientacao) {
    console.log(`  ! ${item.arquivo}: no arquivo de dados está '${item.orientacao}', mas a foto é '${orientacoes[item.arquivo]}'. Corrija o campo orientacao.`);
    problemas++;
  }
}
for (const t of espaco.tiposDeEvento.filter((x) => x.cartao)) {
  if (!(await existe(path.join(pastaImg, 'eventos', `${t.id}.jpg`)))) {
    console.log(`  ! Falta a foto do cartão public/img/eventos/${t.id}.jpg`);
    problemas++;
  }
}
console.log(problemas ? `\n${problemas} ponto(s) para corrigir.` : '  Tudo certo.');
