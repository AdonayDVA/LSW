const form = document.getElementById('postagemForm');
const listaPostagens = document.getElementById('listaPostagens');
const filtros = document.querySelectorAll('.filtro-btn');

let postagens = [];
let filtroAtivo = 'todos';

// Configuração da API
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINTS = {
  POSTAGENS: '/postagens'
};

// Função para construir URL completa
function buildApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

// Função para tratar erros da API
function handleApiError(error) {
  console.error('Erro na API:', error);
  throw new Error(`Erro na requisição: ${error.message}`);
}

// Função para verificar se o servidor está rodando
async function checkServerStatus() {
  try {
    const response = await fetch(API_BASE_URL);
    return response.ok;
  } catch (error) {
    console.warn('Servidor não está rodando:', error.message);
    return false;
  }
}

// Carregar postagens da API
async function carregarPostagens() {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      console.warn('Servidor não está rodando, usando dados locais como fallback');
      carregarPostagensLocais();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.POSTAGENS));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    postagens = await response.json();
    exibirPostagens();
  } catch (error) {
    console.error('Erro ao carregar postagens da API:', error);
    carregarPostagensLocais();
  }
}

// Fallback para dados locais
function carregarPostagensLocais() {
  const salvas = localStorage.getItem('postagens');
  if (salvas) {
    postagens = JSON.parse(salvas);
  } else {
    // Dados de exemplo se não houver nenhuma
    postagens = [
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
    localStorage.setItem('postagens', JSON.stringify(postagens));
  }
  exibirPostagens();
}

// Criar uma nova postagem via API
async function criarPostagem(nome, titulo, conteudo, categoria) {
  const novaPostagem = {
    nome: nome,
    titulo: titulo,
    conteudo: conteudo,
    categoria: categoria,
    data: new Date().toISOString(),
    curtidas: 0
  };

  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      novaPostagem.id = Date.now();
      postagens.unshift(novaPostagem);
      localStorage.setItem('postagens', JSON.stringify(postagens));
      exibirPostagens();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.POSTAGENS), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaPostagem)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const postagemCriada = await response.json();
    postagens.unshift(postagemCriada);
    exibirPostagens();
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    // Fallback para localStorage
    novaPostagem.id = Date.now();
    postagens.unshift(novaPostagem);
    localStorage.setItem('postagens', JSON.stringify(postagens));
    exibirPostagens();
  }
}

// Atualizar curtidas via API
async function curtirPostagem(id) {
  const postagem = postagens.find(p => p.id === id);
  if (!postagem) return;

  const postagemAtualizada = { ...postagem, curtidas: postagem.curtidas + 1 };

  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      postagem.curtidas++;
      localStorage.setItem('postagens', JSON.stringify(postagens));
      exibirPostagens();
      return;
    }

    const response = await fetch(buildApiUrl(`${API_ENDPOINTS.POSTAGENS}/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postagemAtualizada)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    postagem.curtidas++;
    exibirPostagens();
  } catch (error) {
    console.error('Erro ao atualizar curtidas:', error);
    // Fallback para localStorage
    postagem.curtidas++;
    localStorage.setItem('postagens', JSON.stringify(postagens));
    exibirPostagens();
  }
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
    
    // Formatar data
    const data = new Date(postagem.data);
    const dataFormatada = data.toLocaleString('pt-BR');
    
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
        <span class="data">${dataFormatada}</span>
        <button class="curtir-btn" onclick="curtirPostagem(${postagem.id})">
          👍 ${postagem.curtidas}
        </button>
      </div>
    `;
    listaPostagens.appendChild(postElement);
  });
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