const form = document.getElementById('treinoForm');
const lista = document.getElementById('listaTreinos');
let treinos = [];

// Configuração da API
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINTS = {
  TREINOS: '/treinos'
};

// Função para construir URL completa
function buildApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
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

// Carregar treinos da API
async function carregarTreinos() {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      console.warn('Servidor não está rodando, usando dados locais como fallback');
      carregarTreinosLocais();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.TREINOS));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    treinos = await response.json();
    exibirTreinos();
  } catch (error) {
    console.error('Erro ao carregar treinos da API:', error);
    carregarTreinosLocais();
  }
}

// Fallback para dados locais
function carregarTreinosLocais() {
  const salvos = localStorage.getItem('treinos');
  if (salvos) {
    treinos = JSON.parse(salvos);
  } else {
    // Dados de exemplo se não houver nenhuma
    treinos = [
      {
        id: 1,
        nome: "Arremesso de 3 pontos",
        categoria: "Arremesso",
        repeticoes: "20",
        series: "5"
      },
      {
        id: 2,
        nome: "Drible com mudança de direção",
        categoria: "Drible",
        repeticoes: "30",
        series: "3"
      },
      {
        id: 3,
        nome: "Defesa lateral",
        categoria: "Defesa",
        repeticoes: "15",
        series: "4"
      }
    ];
    localStorage.setItem('treinos', JSON.stringify(treinos));
  }
  exibirTreinos();
}

// Exibir treinos na lista
function exibirTreinos() {
  lista.innerHTML = '';
  treinos.forEach(treino => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${treino.nome}</strong> - ${treino.categoria} (${treino.series}x${treino.repeticoes})
      <button class="remover-btn" onclick="removerTreino(${treino.id})">🗑️</button>
    `;
    lista.appendChild(item);
  });
}

// Adicionar novo treino via API
async function adicionarTreino(nome, categoria, repeticoes, series) {
  const novoTreino = {
    nome: nome,
    categoria: categoria,
    repeticoes: repeticoes,
    series: series
  };

  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      novoTreino.id = Date.now();
      treinos.push(novoTreino);
      localStorage.setItem('treinos', JSON.stringify(treinos));
      exibirTreinos();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.TREINOS), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoTreino)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const treinoCriado = await response.json();
    treinos.push(treinoCriado);
    exibirTreinos();
  } catch (error) {
    console.error('Erro ao adicionar treino:', error);
    // Fallback para localStorage
    novoTreino.id = Date.now();
    treinos.push(novoTreino);
    localStorage.setItem('treinos', JSON.stringify(treinos));
    exibirTreinos();
  }
}

// Remover treino via API
async function removerTreino(id) {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      treinos = treinos.filter(treino => treino.id !== id);
      localStorage.setItem('treinos', JSON.stringify(treinos));
      exibirTreinos();
      return;
    }

    const response = await fetch(buildApiUrl(`${API_ENDPOINTS.TREINOS}/${id}`), {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    treinos = treinos.filter(treino => treino.id !== id);
    exibirTreinos();
  } catch (error) {
    console.error('Erro ao remover treino:', error);
    // Fallback para localStorage
    treinos = treinos.filter(treino => treino.id !== id);
    localStorage.setItem('treinos', JSON.stringify(treinos));
    exibirTreinos();
  }
}

// Event listener para o formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const repeticoes = document.getElementById('repeticoes').value;
  const series = document.getElementById('series').value;

  adicionarTreino(nome, categoria, repeticoes, series);
  form.reset();
});

// Carregar treinos ao iniciar
carregarTreinos();
