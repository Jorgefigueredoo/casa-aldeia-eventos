/* =============================================================================
   util/consulta.ts — regras do formulário de consulta de data.
   Funções puras (sem React), fáceis de testar e de reaproveitar.
   ========================================================================== */

/** DDDs válidos no Brasil (Anatel). */
const DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** Deixa só os dígitos do telefone, tirando +55 e o zero de operadora. */
export function digitosDoTelefone(valor: string): string {
  let d = valor.replace(/\D/g, '');
  if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
  if (d.length > 10 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 11);
}

/** Formata enquanto a pessoa digita: (81) 98534-0822 ou (81) 3534-0822. */
export function mascaraTelefone(valor: string): string {
  const d = digitosDoTelefone(valor);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Mensagem de erro do telefone, ou '' se for um número brasileiro válido. */
export function erroDoTelefone(valor: string): string {
  const d = digitosDoTelefone(valor);
  if (!d) return 'Digite seu WhatsApp com DDD.';
  if (d.length < 10) return 'Número incompleto. Use o DDD + número, por exemplo (81) 99999-9999.';
  if (!DDDS.has(Number(d.slice(0, 2)))) return 'Esse DDD não existe. Confira os dois primeiros números.';
  if (d.length === 11 && d[2] !== '9') return 'Celular com 11 dígitos começa com 9 depois do DDD.';
  if (d.length === 10 && !/[2-5]/.test(d[2] ?? '')) return 'Confira o número: celular tem 9 dígitos depois do DDD.';
  if (/^(\d)\1+$/.test(d.slice(2))) return 'Confira o número digitado.';
  return '';
}

/** Data de hoje no fuso do aparelho, no formato do campo de data (AAAA-MM-DD). */
export function hojeISO(agora = new Date()): string {
  const m = String(agora.getMonth() + 1).padStart(2, '0');
  const d = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${m}-${d}`;
}

/** "2027-03-14" → "14/03" se for este ano, ou "14/03/2027" se for outro. */
export function dataParaTexto(iso: string, agora = new Date()): string {
  const [ano, mes, dia] = iso.split('-');
  return Number(ano) === agora.getFullYear() ? `${dia}/${mes}` : `${dia}/${mes}/${ano}`;
}

/** Campos do formulário. */
export interface CamposDaConsulta {
  data: string;
  tipo: string;
  convidados: string;
  nome: string;
  whatsapp: string;
}

export type NomeDoCampo = keyof CamposDaConsulta;

/** Regras de cada campo: devolvem a mensagem de erro, ou '' se estiver ok. */
export const regras: Record<NomeDoCampo, (valor: string) => string> = {
  data: (v) => {
    if (!v) return 'Escolha a data do evento.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return 'Data inválida.';
    if (v < hojeISO()) return 'Essa data já passou. Escolha uma data a partir de hoje.';
    return '';
  },
  tipo: (v) => (v ? '' : 'Escolha o tipo de evento.'),
  convidados: (v) => {
    const n = Number(v);
    if (!v) return 'Informe um número aproximado de convidados.';
    if (!Number.isInteger(n) || n < 1) return 'Use um número inteiro, por exemplo 150.';
    if (n > 5000) return 'Confira o número de convidados.';
    return '';
  },
  nome: (v) => (v.trim().length >= 2 ? '' : 'Digite seu nome.'),
  whatsapp: erroDoTelefone,
};

/** Troca {data}, {tipo}, {convidados}, {nome} e {whatsapp} no modelo da mensagem. */
export function montarMensagem(modelo: string, valores: Record<string, string>): string {
  return modelo.replace(/\{(\w+)\}/g, (_, chave: string) => valores[chave] ?? '');
}

/** Link do WhatsApp com a mensagem já escrita. */
export function linkWhatsApp(numero: string, mensagem: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
