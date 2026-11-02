// Comportamentos do portfólio. Sem bibliotecas: tudo com recursos do navegador.
//   1. Idioma (PT/EN) — inglês lido do próprio HTML, português de scripts/textos.js
//   2. Efeito de digitação no título ("Hey, I'm ...")
//   3. Elementos aparecendo ao rolar a página
//   4. Prévias (iframes): carregam só perto da tela e são escaladas para caber
//   5. Ano do rodapé

document.documentElement.classList.add('js'); // o CSS só esconde o que anima quando há JS

const poucoMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- 1. Idioma ----------
// Escolha salva no navegador; na primeira visita, segue o idioma do sistema.
function idiomaInicial() {
  try {
    const salvo = localStorage.getItem('idioma');
    if (salvo === 'pt' || salvo === 'en') return salvo;
  } catch {
    // modo privado ou armazenamento bloqueado: segue sem salvar
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

// O inglês vem do HTML (fonte única): lido uma vez, antes de qualquer troca de idioma.
TEXTOS.en = { titulo: document.title, descricao: document.querySelector('meta[name="description"]').content };
document.querySelectorAll('[data-i18n]').forEach((el) => (TEXTOS.en[el.dataset.i18n] = el.textContent.trim()));
document.querySelectorAll('[data-i18n-html]').forEach((el) => (TEXTOS.en[el.dataset.i18nHtml] = el.innerHTML.trim()));
document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
  const [atributo, chave] = el.dataset.i18nAttr.split(':');
  TEXTOS.en[chave] = el.getAttribute(atributo);
});

let idioma = idiomaInicial();

function aplicarIdioma(novo) {
  idioma = novo;
  const t = TEXTOS[novo];
  document.documentElement.lang = novo === 'pt' ? 'pt-BR' : 'en';
  document.title = t.titulo;
  document.querySelector('meta[name="description"]').content = t.descricao;

  document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t[el.dataset.i18n]));
  // Só textos do próprio site (HTML e textos.js, confiáveis) entram como HTML.
  document.querySelectorAll('[data-i18n-html]').forEach((el) => (el.innerHTML = t[el.dataset.i18nHtml]));
  // data-i18n-attr="atributo:chave"
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const [atributo, chave] = el.dataset.i18nAttr.split(':');
    el.setAttribute(atributo, t[chave]);
  });

  // O botão mostra o idioma para o qual ele troca.
  document.getElementById('trocar-idioma').textContent = novo === 'pt' ? 'EN' : 'PT';
  reiniciarDigitacao();
}

document.getElementById('trocar-idioma').addEventListener('click', () => {
  const novo = idioma === 'pt' ? 'en' : 'pt';
  try {
    localStorage.setItem('idioma', novo);
  } catch {
    // sem armazenamento: a troca vale só até fechar a página
  }
  aplicarIdioma(novo);
});

// ---------- 2. Digitação ----------
// Escreve uma palavra, espera, apaga e passa para a próxima, em loop.
const alvo = document.getElementById('digitando');
let temporizador = null;

function reiniciarDigitacao() {
  clearTimeout(temporizador);
  const palavras = PALAVRAS[idioma];
  alvo.textContent = palavras[0];
  if (poucoMovimento) return; // quem pede menos movimento vê só o nome

  let palavra = 0;
  let letras = palavras[0].length; // começa com a primeira palavra já escrita
  let apagando = true;

  function passo() {
    const atual = palavras[palavra];
    letras += apagando ? -1 : 1;
    alvo.textContent = atual.slice(0, letras);

    let espera = apagando ? 40 : 100;
    if (!apagando && letras === atual.length) {
      apagando = true;
      espera = 2000; // pausa com a palavra inteira na tela
    } else if (apagando && letras === 0) {
      apagando = false;
      palavra = (palavra + 1) % palavras.length;
    }
    temporizador = setTimeout(passo, espera);
  }
  temporizador = setTimeout(passo, 2000);
}

aplicarIdioma(idioma); // também inicia a digitação

// ---------- 3. Aparecer ao rolar ----------
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

// ---------- 4. Prévias ----------
// Só os projetos com site têm prévia (iframe); os outros mostram uma ilustração.
// O iframe é desenhado como uma tela de 1280px e reduzido para caber no espaço disponível.
const LARGURA_PREVIA = 1280;
const ajustarTela = new ResizeObserver((entradas) => {
  for (const e of entradas) e.target.style.setProperty('--escala', String(e.contentRect.width / LARGURA_PREVIA));
});

// Cada prévia carrega um site inteiro: só busca quando o projeto está a ~1 tela de distância.
const carregarPrevia = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      const iframe = e.target.querySelector('iframe');
      iframe.src = iframe.dataset.src;
      carregarPrevia.unobserve(e.target);
    }
  },
  { rootMargin: '100% 0px' },
);

document.querySelectorAll('.tela iframe[data-src]').forEach((iframe) => {
  ajustarTela.observe(iframe.parentElement);
  carregarPrevia.observe(iframe.parentElement);
});

// ---------- 5. Ano do rodapé ----------
document.getElementById('ano').textContent = String(new Date().getFullYear());
