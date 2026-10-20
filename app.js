const produtos = [
  { id: "tradicional-nutella", nome: "Tradicional Nutella", preco: 13.00, descricao: "Massa tradicional com recheio cremoso de Nutella.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/tradicional-nutella.webp" },
  { id: "choco-nutella", nome: "Choco Nutella", preco: 13.00, descricao: "Massa 100% cacau com recheio cremoso de Nutella.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/choco-nutella.webp" },
  { id: "choconinho", nome: "Choconinho", preco: 13.00, descricao: "Massa 100% cacau com recheio de brigadeiro de Ninho.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/choconinho.webp" },
  { id: "red-velvet", nome: "Red Velvet", preco: 13.00, descricao: "Massa aveludada Red Velvet recheada com brigadeiro de Ninho.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/red-velvet.webp" },
  { id: "limao-siciliano", nome: "Limão Siciliano", preco: 14.00, descricao: "Massa tradicional com recheio cremoso de brigadeiro de limão siciliano e raspas de limão siciliano.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/limao-siciliano.webp" },
  { id: "doce-de-leite", nome: "Doce de Leite", preco: 14.00, descricao: "Cookie recheado com doce de leite argentino e finalizado com flor de sal.", disponivel: false, visivel: false, categoria: "cookie", imagem: "" },
  { id: "brookie", nome: "Brookie", preco: 15.00, descricao: "Massa tradicional recheada com pedaços de brownie e Nutella, finalizado com brownie e Nutella.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/brookie.webp" },
  { id: "chocomaltine", nome: "Chocomaltine", preco: 15.00, descricao: "Massa 100% cacau com recheio de creme crocante Ovomaltine, finalizado com creme e Ovomaltine Rocks.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/chocomaltine.webp" },
  { id: "kinder-bueno", nome: "Kinder Bueno", preco: 15.00, descricao: "Massa tradicional com recheio de creme Bueno e pedaços de Kinder Bueno White, finalizado com Nutella e Kinder Bueno White.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/kinder-bueno.webp" },
  { id: "pistache", nome: "Pistache", preco: 18.00, descricao: "Massa tradicional com recheio premium de pistache, finalizado com pedaços crocantes de pistache.", disponivel: true, visivel: true, categoria: "cookie", imagem: "imagens/pistache.webp" },
  { id: "kit-12-mini-cookies", nome: "Kit 12 Mini Cookies", preco: 20.00, descricao: "Kit com 12 mini cookies tradicionais com gotas de chocolate.", disponivel: true, visivel: true, categoria: "kit", imagem: "imagens/kit-12-mini-cookies.webp" },
  { id: "kit-6-mini-cookies-brownie", nome: "Kit 6 Mini Cookies + Brownie", preco: 20.00, descricao: "Combinação perfeita com 6 mini cookies crocantes e pedaços de brownie artesanal.", disponivel: false, visivel: true, categoria: "kit", imagem: "imagens/kit-12-mini-cookies.webp" },
  { id: "marmitinha-trad-nutella", nome: "Marmitinha Trad Nutella", preco: 26.00, descricao: "Marmitinha de cookie tradicional com recheio generoso de Nutella.", disponivel: true, visivel: true, categoria: "marmitinha", imagem: "imagens/marmitinha-trad-nutella.webp" },
  { id: "marmitinha-red-velvet", nome: "Marmitinha Red Velvet", preco: 26.00, descricao: "Marmitinha de cookie Red Velvet recheada com brigadeiro de Ninho.", disponivel: true, visivel: true, categoria: "marmitinha", imagem: "imagens/marmitinha-red-velvet.webp" }
];
const categoriasPermitidas = new Set(['cookie', 'marmitinha', 'kit']);
function validarProdutos(itens) {
 const ids = new Set();
 const invalidos = itens.filter(item => {
  const invalido = !item.id || ids.has(item.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || !item.nome ||
   typeof item.preco !== 'number' || !Number.isFinite(item.preco) || item.preco < 0 ||
   typeof item.descricao !== 'string' || typeof item.disponivel !== 'boolean' ||
   typeof item.visivel !== 'boolean' || !categoriasPermitidas.has(item.categoria);
  if (item.id) ids.add(item.id);
  return invalido;
 });
 if (invalidos.length) console.error('Produtos inválidos no catálogo:', invalidos);
 return itens.filter(item => !invalidos.includes(item));
}
const produtosValidos = validarProdutos(produtos);
function obterProdutos() {
 return produtosValidos;
}
const formatarPreco = valor => valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const escapeHTML = valor => String(valor).replace(/[&<>"']/g,caractere => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[caractere]));
let timerAnimacaoCards;
function animarCards(area, cardsAntes) {
 if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const cardsDepois = [...area.querySelectorAll('.product')];
 const duracao = 480;
 clearTimeout(timerAnimacaoCards);

 cardsDepois.forEach(card => {
  const posicaoAnterior = cardsAntes.get(card.dataset.productKey);
  const posicaoAtual = card.getBoundingClientRect();
  card.classList.add('is-filtering');
  card.style.transition = 'none';

  if (posicaoAnterior) {
   const deslocamentoX = posicaoAnterior.left - posicaoAtual.left;
   const deslocamentoY = posicaoAnterior.top - posicaoAtual.top;
   card.style.transform = `translate(${deslocamentoX}px,${deslocamentoY}px)`;
  } else {
   card.style.transform = 'translateY(18px) scale(.96)';
   card.style.opacity = '0';
  }
 });

 requestAnimationFrame(() => {
  cardsDepois.forEach(card => {
   card.style.transition = `transform ${duracao}ms cubic-bezier(.22,1,.36,1),opacity ${Math.round(duracao * .75)}ms ease`;
   card.style.transform = '';
   card.style.opacity = '';
  });
 });

 timerAnimacaoCards = window.setTimeout(() => {
  cardsDepois.forEach(card => {
   card.classList.remove('is-filtering');
   card.style.transition = '';
   card.style.transform = '';
   card.style.opacity = '';
  });
 }, duracao + 40);
}
function renderizar(filtro='todos', animar=false) {
 const lista = obterProdutos().filter(p => p.visivel !== false && (filtro==='todos' || (filtro==='disponiveis' ? p.disponivel : p.categoria===filtro))).sort((a,b)=>a.preco-b.preco);
 const area = document.getElementById('produtos');
 const resultado = document.getElementById('resultado-filtro');
 const cardsAntes = animar ? new Map([...area.querySelectorAll('.product')].map(card => [card.dataset.productKey, card.getBoundingClientRect()])) : new Map();
 area.setAttribute('aria-busy', animar ? 'true' : 'false');
 area.innerHTML = lista.length ? lista.map(p => `<article class="product ${p.disponivel ? '' : 'unavailable'}" data-product-key="${escapeHTML(p.id)}"><div class="cardtop"><span class="brand">HONY COOKIES</span><span class="status ${p.disponivel ? '' : 'sold'}">${p.disponivel ? '● Disponível' : '× Esgotado'}</span></div><div class="photo">${p.imagem ? `<img src="${escapeHTML(p.imagem)}" alt="${escapeHTML(p.nome)}" loading="lazy" decoding="async">` : ''}</div><h2 class="cardname">${escapeHTML(p.nome)}</h2><p class="price">${formatarPreco(p.preco)}</p><p class="description">${escapeHTML(p.descricao)}</p><div class="divider"></div><span class="footnote">${p.disponivel ? 'Feito artesanalmente ♡' : 'Temporariamente indisponível'}</span></article>`).join('') : '<p class="empty">Nenhum produto nesta categoria no momento.</p>';
 area.querySelectorAll('img').forEach(imagem => imagem.addEventListener('error', () => {
  imagem.parentElement.classList.add('image-error');
  imagem.remove();
 }, { once: true }));
 resultado.textContent = `${lista.length} ${lista.length === 1 ? 'produto encontrado' : 'produtos encontrados'}.`;
 if (animar && lista.length) animarCards(area, cardsAntes);
 if (animar) window.setTimeout(() => area.setAttribute('aria-busy', 'false'), 520);
}
const filtro = document.querySelector('.filter');
const botoesFiltro = document.querySelectorAll('[data-filter]');
function posicionarPill() {
 const botaoAtivo = filtro.querySelector('.active');
 if (!botaoAtivo) return;
 filtro.style.setProperty('--pill-x', `${botaoAtivo.offsetLeft}px`);
 filtro.style.setProperty('--pill-y', `${botaoAtivo.offsetTop}px`);
 filtro.style.setProperty('--pill-width', `${botaoAtivo.offsetWidth}px`);
 filtro.style.setProperty('--pill-height', `${botaoAtivo.offsetHeight}px`);
}
botoesFiltro.forEach(botao => botao.addEventListener('click', () => {
 botoesFiltro.forEach(b => b.classList.remove('active'));
 botoesFiltro.forEach(b => b.setAttribute('aria-pressed', 'false'));
 botao.classList.add('active');
 botao.setAttribute('aria-pressed', 'true');
 posicionarPill();
 renderizar(botao.dataset.filter, true);
}));
renderizar();
posicionarPill();
window.addEventListener('resize', posicionarPill);
