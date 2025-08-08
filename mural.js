const form = document.getElementById('postagemForm');
const listaPostagens = document.getElementById('listaPostagens');
const filtros = document.querySelectorAll('.filtro-btn');

let postagens = [];
let filtroAtivo = 'todos';

// Carregar postagens do localStorage
function carregarPostagens() {
  const salvas = localStorage.getItem('postagens');
  if (salvas) {
    postagens = JSON.parse(salvas);
    exibirPostagens();
  }
}

// Salvar postagens no localStorage
function salvarPostagens() {
  localStorage.setItem('postagens', JSON.stringify(postagens));
}

// Criar uma nova postagem
function criarPostagem(nome, titulo, conteudo, categoria) {
  const postagem = {
    id: Date.now(),
    nome: nome,
    titulo: titulo,
    conteudo: conteudo,
    categoria: categoria,
    data: new Date().toLocaleString('pt-BR'),
    curtidas: 0
  };

  postagens.unshift(postagem); // Adiciona no início
  salvarPostagens();
  exibirPostagens();
}

// Exibir postagens filtradas
function exibirPostagens() {
  listaPostagens.innerHTML = '';

  const postagensFiltradas = filtroAtivo === 'todos'
    ? postagens
    : postagens.filter(p => p.categoria === filtroAtivo);

  if (postagensFiltradas.length === 0) {
    listaPostagens.innerHTML = '<p class="sem-postagens">Nenhuma postagem encontrada.</p>';
    return;
  }

  postagensFiltradas.forEach(postagem => {
    const postElement = document.createElement('div');
    postElement.className = 'postagem';
    postElement.innerHTML = `
      <div class="postagem-header">
        <h3>${postagem.titulo}</h3>
        <span class="categoria">${postagem.categoria}</span>
      </div>
      <div class="postagem-content">
        <p>${postagem.conteudo}</p>
      </div>
      <div class="postagem-footer">
        <span class="autor">Por: ${postagem.nome}</span>
        <span class="data">${postagem.data}</span>
        <button class="curtir-btn" onclick="curtirPostagem(${postagem.id})">
          👍 ${postagem.curtidas}
        </button>
      </div>
    `;
    listaPostagens.appendChild(postElement);
  });
}

// Função para curtir postagem
function curtirPostagem(id) {
  const postagem = postagens.find(p => p.id === id);
  if (postagem) {
    postagem.curtidas++;
    salvarPostagens();
    exibirPostagens();
  }
}

// Event listener para o formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  const categoria = document.getElementById('categoria').value;

  criarPostagem(nome, titulo, conteudo, categoria);
  form.reset();
});

// Event listeners para filtros
filtros.forEach(filtro => {
  filtro.addEventListener('click', function() {
    // Remove classe ativo de todos os filtros
    filtros.forEach(f => f.classList.remove('ativo'));
    // Adiciona classe ativo ao filtro clicado
    this.classList.add('ativo');

    filtroAtivo = this.dataset.categoria;
    exibirPostagens();
  });
});

// Carregar postagens ao iniciar
carregarPostagens();

// Adicionar postagens de exemplo se não houver nenhuma
if (postagens.length === 0) {
  const postagensExemplo = [
    {
      id: Date.now() - 300000,
      nome: "João Lucas",
      titulo: "Treino de Arremesso Incrível!",
      conteudo: "Hoje tive um treino fantástico de arremesso! Consegui acertar 15 cestas de 3 pontos consecutivas. O segredo foi focar na respiração e manter a técnica consistente. Recomendo para todos que querem melhorar o arremesso!",
      categoria: "Treino",
      data: new Date(Date.now() - 300000).toLocaleString('pt-BR'),
      curtidas: 8
    },
    {
      id: Date.now() - 600000,
      nome: "Adonay",
      titulo: "Campeonato Regional",
      conteudo: "Nosso time venceu o campeonato regional! Foi uma partida emocionante, ganhamos por 78-72. Todos jogaram muito bem, especialmente nossa defesa que foi fundamental para a vitória.",
      categoria: "Evento",
      data: new Date(Date.now() - 600000).toLocaleString('pt-BR'),
      curtidas: 15
    },
    {
      id: Date.now() - 900000,
      nome: "Anthony",
      titulo: "Dica de Defesa",
      conteudo: "Uma dica valiosa para melhorar a defesa: sempre mantenha os pés em movimento e fique na ponta dos pés. Isso te permite reagir mais rapidamente aos movimentos do adversário. Testei hoje e funcionou perfeitamente!",
      categoria: "Dica",
      data: new Date(Date.now() - 900000).toLocaleString('pt-BR'),
      curtidas: 12
    }
  ];

  postagens = postagensExemplo;
  salvarPostagens();
  exibirPostagens();
} 