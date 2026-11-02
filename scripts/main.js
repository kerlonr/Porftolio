// Comportamentos do portfólio. Sem bibliotecas: tudo com recursos do navegador.
//   1. Efeito de digitação no título ("Hey, I'm ...")
//   2. Projetos aparecendo ao rolar a página
//   3. Prévias (iframes): carregam só perto da tela e são escaladas para caber
//   4. Ano do rodapé

document.documentElement.classList.add('js'); // o CSS só esconde o que anima quando há JS

const poucoMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- 1. Digitação ----------
// Escreve uma palavra, espera, apaga e passa para a próxima, em loop.
function digitar(elemento, palavras, { escrever = 100, apagar = 40, pausa = 2000 } = {}) {
  let palavra = 0;
  let letras = palavras[0].length; // começa com a primeira palavra já escrita
  let apagando = true;

  function passo() {
    const atual = palavras[palavra];
    letras += apagando ? -1 : 1;
    elemento.textContent = atual.slice(0, letras);

    let espera = apagando ? apagar : escrever;
    if (!apagando && letras === atual.length) {
      apagando = true;
      espera = pausa;
    } else if (apagando && letras === 0) {
      apagando = false;
      palavra = (palavra + 1) % palavras.length;
    }
    setTimeout(passo, espera);
  }
  setTimeout(passo, pausa);
}

const alvo = document.getElementById('digitando');
if (alvo && !poucoMovimento) {
  digitar(alvo, ['Kerlon', 'an Innovator', 'an IoT Developer', 'a 3D Maker']);
}

// ---------- 2. Aparecer ao rolar ----------
const observador = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (e.isIntersecting) {
        e.target.classList.add('visivel');
        observador.unobserve(e.target); // anima uma vez só
      }
    }
  },
  { threshold: 0.15 },
);
document.querySelectorAll('.revelar').forEach((el) => observador.observe(el));

// ---------- 3. Escala das prévias ----------
// O iframe é renderizado como uma tela de 1280px e reduzido para caber no espaço disponível.
const ajustarTela = new ResizeObserver((entradas) => {
  for (const e of entradas) {
    const largura = Number(e.target.dataset.largura) || 1280;
    e.target.style.setProperty('--escala', String(e.contentRect.width / largura));
  }
});
document.querySelectorAll('.tela').forEach((tela) => ajustarTela.observe(tela));

// Cada prévia carrega um site inteiro: só busca quando o projeto está a ~1 tela de distância.
const carregarPrevia = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      const iframe = e.target.querySelector('iframe[data-src]');
      iframe.src = iframe.dataset.src;
      carregarPrevia.unobserve(e.target);
    }
  },
  { rootMargin: '100% 0px' },
);
document.querySelectorAll('.tela').forEach((tela) => carregarPrevia.observe(tela));

// ---------- 4. Ano do rodapé ----------
document.getElementById('ano').textContent = String(new Date().getFullYear());
