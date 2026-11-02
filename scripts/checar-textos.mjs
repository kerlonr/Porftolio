// Confere as traduções: toda chave usada no index.html existe em inglês E em português,
// e os dois idiomas têm as mesmas chaves. Rode antes de publicar: node scripts/checar-textos.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const contexto = {};
vm.runInNewContext(`${fs.readFileSync('scripts/textos.js', 'utf8')}; this.TEXTOS = TEXTOS; this.PALAVRAS = PALAVRAS;`, contexto);
const { TEXTOS, PALAVRAS } = contexto;

const html = fs.readFileSync('index.html', 'utf8');
const usadas = new Set([
  ...[...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/data-i18n-attr="[^:"]+:([^"]+)"/g)].map((m) => m[1]),
]);

for (const chave of usadas) {
  assert.ok(TEXTOS.en[chave], `falta "${chave}" em inglês`);
  assert.ok(TEXTOS.pt[chave], `falta "${chave}" em português`);
}
assert.deepEqual(Object.keys(TEXTOS.pt).sort(), Object.keys(TEXTOS.en).sort(), 'pt e en com chaves diferentes');
assert.equal(PALAVRAS.pt.length, PALAVRAS.en.length, 'listas de digitação com tamanhos diferentes');

console.log(`ok: ${usadas.size} chaves usadas no HTML, todas traduzidas.`);
