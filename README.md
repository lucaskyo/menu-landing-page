# Hony Cookies 🍪

Landing page responsiva do cardápio da Hony Cookies, uma confeitaria artesanal de Itapetininga, SP. O site apresenta os produtos disponíveis e direciona os clientes para fazer pedidos pelo Instagram ou WhatsApp.

Você pode ver o site funcionando ao vivo [clicando aqui.](https://lucaskyo.github.io/menu-landing-page/)

## 📌 Funcionalidades

- Layout responsivo para celular, tablet e desktop.
- Catálogo de cookies, marmitinhas e kits.
- Filtros por disponibilidade e categoria.
- Indicação visual de produtos disponíveis e esgotados.
- Links diretos para Instagram e WhatsApp.
- Imagens dos produtos armazenadas localmente.
- HTML semântico, meta description, favicon e suporte a navegação por teclado.
- Metadados para compartilhamento, dados estruturados e carregamento otimizado de imagens.

## 💻 Tecnologias

- HTML5
- CSS3
- JavaScript 

## 📁 Estrutura do projeto

```text
.
├── index.html
├── styles.css
├── app.js
├── imagens/
│   ├── logo-hony.webp
│   ├── icone-hony.webp
│   └── ... imagens dos produtos
└── README.md
```

## 🛠️ Atualizando o cardápio

Os produtos ficam na constante `produtos`, dentro do arquivo `app.js`. Para adicionar ou alterar um item, edite um objeto seguindo este formato:

```javascript
{
  id: "nome-produto",
  nome: "Nome do produto",
  preco: 15.00,
  descricao: "Descrição do produto.",
  disponivel: true,
  visivel: true,
  categoria: "cookie",
  imagem: "imagens/nome-da-imagem.webp"
}
```

### Campos disponíveis

- `id`: identificador estável e único do produto; use letras minúsculas, números e hífens para permitir futura integração com CMS.
- `nome`: nome exibido no card.
- `preco`: valor numérico do produto.
- `descricao`: descrição exibida no cardápio.
- `disponivel`: use `true` para disponível ou `false` para esgotado.
- `visivel`: use `false` para ocultar temporariamente um produto do cardápio.
- `categoria`: use `cookie`, `marmitinha` ou `kit`.
- `imagem`: caminho da imagem dentro da pasta `imagens`. 

Os produtos visíveis são ordenados automaticamente pelo preço. Após atualizar o arquivo, salve e publique a alteração no serviço de hospedagem utilizado.

Antes de publicar, confira o console do navegador. Produtos com preço, categoria, disponibilidade ou descrição inválidos são excluídos da renderização e geram um erro explícito.

## 🎨️ Personalização

Os textos e links ficam no `index.html`:

- Logo, título e textos: seção HTML do cabeçalho.
- Instagram e WhatsApp: seção de pedido.
- Cores, tipografia, layout e responsividade: `styles.css`.
- Produtos, disponibilidade, validação e filtros: constante `produtos` e lógica em `app.js`.

Ao substituir imagens, mantenha os caminhos referenciados no catálogo e prefira arquivos WebP otimizados para preservar o desempenho.

### Preparação para CMS

O catálogo é acessado pela função `obterProdutos()` em `app.js`. Atualmente ela retorna os dados locais, mas essa fronteira permite substituir a origem por um CMS no futuro sem alterar filtros, validações ou renderização. A fonte externa deverá manter o mesmo formato documentado acima.

## 🚀 Publicação

O projeto pode ser publicado em qualquer serviço que hospede arquivos estáticos, como GitHub Pages, Netlify, Vercel ou hospedagem compartilhada. Basta disponibilizar `index.html`, `styles.css`, `app.js` e a pasta `imagens/` no diretório público.
