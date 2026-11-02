// Confere as traduções: toda chave usada no index.html tem português em scripts/textos.js,
// e o textos.js não guarda chave que o HTML não usa mais. (O inglês vem do próprio HTML.)
// Rode antes de publicar: node scripts/checar-textos.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const contexto = {};
vm.runInNewContext(`${fs.readFileSync('scripts/textos.js', 'utf8')}; this.TEXTOS = TEXTOS; this.PALAVRAS = PALAVRAS;`, contexto);
const { TEXTOS, PALAVRAS } = contexto;

const html = fs.readFileSync('index.html', 'utf8');
const usadas = new Set([
  'titulo', // <title>
  'descricao', // <meta name="description">
  ...[...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/data-i18n-attr="[^:"]+:([^"]+)"/g)].map((m) => m[1]),
]);

const faltando = [...usadas].filter((chave) => !TEXTOS.pt[chave]);
const sobrando = Object.keys(TEXTOS.pt).filter((chave) => !usadas.has(chave));
assert.deepEqual(faltando, [], `sem português: ${faltando.join(', ')}`);
assert.deepEqual(sobrando, [], `no textos.js mas não usadas no HTML: ${sobrando.join(', ')}`);
assert.equal(PALAVRAS.pt.length, PALAVRAS.en.length, 'listas de digitação com tamanhos diferentes');

console.log(`ok: ${usadas.size} chaves, todas com português.`);
