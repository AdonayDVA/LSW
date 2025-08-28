const form = document.getElementById('dietaForm');
const lista = document.getElementById('listaRefeicoes');
const totalCaloriasTexto = document.getElementById('totalCalorias');
let totalCalorias = 0;
let refeicoes = [];

// Configuração da API
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINTS = {
  REFEICOES: '/refeicoes'
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

// Carregar refeições da API
async function carregarRefeicoes() {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      console.warn('Servidor não está rodando, usando dados locais como fallback');
      carregarRefeicoesLocais();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.REFEICOES));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    refeicoes = await response.json();
    exibirRefeicoes();
    calcularTotalCalorias();
  } catch (error) {
    console.error('Erro ao carregar refeições da API:', error);
    carregarRefeicoesLocais();
  }
}

// Fallback para dados locais
function carregarRefeicoesLocais() {
  const salvas = localStorage.getItem('refeicoes');
  if (salvas) {
    refeicoes = JSON.parse(salvas);
  } else {
    // Dados de exemplo se não houver nenhuma
    refeicoes = [
      {
        id: 1,
        nome: 'Café da Manhã',
        horario: '07:00',
        calorias: 800,
        alimentos: 'Ovos mexidos, pão integral, leite com aveia e banana'
      },
      {
        id: 2,
        nome: 'Lanche da Manhã',
        horario: '10:00',
        calorias: 400,
        alimentos: 'Iogurte natural com granola e mel'
      },
      {
        id: 3,
        nome: 'Almoço',
        horario: '12:30',
        calorias: 1000,
        alimentos: 'Arroz, feijão, frango grelhado, salada, batata-doce'
      },
      {
        id: 4,
        nome: 'Lanche da Tarde',
        horario: '16:00',
        calorias: 500,
        alimentos: 'Pão com pasta de amendoim e vitamina de frutas'
      },
      {
        id: 5,
        nome: 'Jantar',
        horario: '19:30',
        calorias: 600,
        alimentos: 'Macarrão com carne moída, legumes e suco natural'
      },
      {
        id: 6,
        nome: 'Ceia',
        horario: '22:00',
        calorias: 200,
        alimentos: 'Leite morno com bolachas integrais'
      }
    ];
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
  }
  exibirRefeicoes();
  calcularTotalCalorias();
}

// Exibir refeições na lista
function exibirRefeicoes() {
  lista.innerHTML = '';
  refeicoes.forEach(refeicao => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${refeicao.nome}</strong> (${refeicao.horario}) - ${refeicao.calorias} kcal<br/>
      <em>${refeicao.alimentos}</em>
      <button class="remover-btn" onclick="removerRefeicao(${refeicao.id})">🗑️</button>
    `;
    lista.appendChild(item);
  });
}

// Calcular total de calorias
function calcularTotalCalorias() {
  totalCalorias = refeicoes.reduce((total, ref) => total + ref.calorias, 0);
  totalCaloriasTexto.textContent = `Total de calorias: ${totalCalorias}`;
}

// Adicionar nova refeição via API
async function adicionarRefeicao(nome, horario, calorias, alimentos) {
  const novaRefeicao = {
    nome: nome,
    horario: horario,
    calorias: parseInt(calorias),
    alimentos: alimentos
  };

  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      novaRefeicao.id = Date.now();
      refeicoes.push(novaRefeicao);
      localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
      exibirRefeicoes();
      calcularTotalCalorias();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.REFEICOES), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaRefeicao)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const refeicaoCriada = await response.json();
    refeicoes.push(refeicaoCriada);
    exibirRefeicoes();
    calcularTotalCalorias();
  } catch (error) {
    console.error('Erro ao adicionar refeição:', error);
    // Fallback para localStorage
    novaRefeicao.id = Date.now();
    refeicoes.push(novaRefeicao);
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
    exibirRefeicoes();
    calcularTotalCalorias();
  }
}

// Remover refeição via API
async function removerRefeicao(id) {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      refeicoes = refeicoes.filter(ref => ref.id !== id);
      localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
      exibirRefeicoes();
      calcularTotalCalorias();
      return;
    }

    const response = await fetch(buildApiUrl(`${API_ENDPOINTS.REFEICOES}/${id}`), {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    refeicoes = refeicoes.filter(ref => ref.id !== id);
    exibirRefeicoes();
    calcularTotalCalorias();
  } catch (error) {
    console.error('Erro ao remover refeição:', error);
    // Fallback para localStorage
    refeicoes = refeicoes.filter(ref => ref.id !== id);
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
    exibirRefeicoes();
    calcularTotalCalorias();
  }
}

// Carregar modelo de dieta
async function carregarModelo() {
  const modelo = [
    {
      nome: 'Café da Manhã',
      horario: '07:00',
      calorias: 800,
      alimentos: 'Ovos mexidos, pão integral, leite com aveia e banana'
    },
    {
      nome: 'Lanche da Manhã',
      horario: '10:00',
      calorias: 400,
      alimentos: 'Iogurte natural com granola e mel'
    },
    {
      nome: 'Almoço',
      horario: '12:30',
      calorias: 1000,
      alimentos: 'Arroz, feijão, frango grelhado, salada, batata-doce'
    },
    {
      nome: 'Lanche da Tarde',
      horario: '16:00',
      calorias: 500,
      alimentos: 'Pão com pasta de amendoim e vitamina de frutas'
    },
    {
      nome: 'Jantar',
      horario: '19:30',
      calorias: 600,
      alimentos: 'Macarrão com carne moída, legumes e suco natural'
    },
    {
      nome: 'Ceia',
      horario: '22:00',
      calorias: 200,
      alimentos: 'Leite morno com bolachas integrais'
    }
  ];

  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      refeicoes = modelo.map((ref, index) => ({ ...ref, id: Date.now() + index }));
      localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
      exibirRefeicoes();
      calcularTotalCalorias();
      return;
    }

    // Limpar refeições existentes
    for (const refeicao of refeicoes) {
      try {
        await fetch(buildApiUrl(`${API_ENDPOINTS.REFEICOES}/${refeicao.id}`), {
          method: 'DELETE'
        });
      } catch (error) {
        console.warn('Erro ao remover refeição existente:', error);
      }
    }

    // Adicionar modelo
    for (const refeicao of modelo) {
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.REFEICOES), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(refeicao)
        });

        if (response.ok) {
          const refeicaoCriada = await response.json();
          refeicoes.push(refeicaoCriada);
        }
      } catch (error) {
        console.error('Erro ao adicionar refeição do modelo:', error);
      }
    }

    exibirRefeicoes();
    calcularTotalCalorias();
  } catch (error) {
    console.error('Erro ao carregar modelo:', error);
    // Fallback para localStorage
    refeicoes = modelo.map((ref, index) => ({ ...ref, id: Date.now() + index }));
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
    exibirRefeicoes();
    calcularTotalCalorias();
  }
}

// Event listener para o formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('refeicao').value;
  const horario = document.getElementById('horario').value;
  const calorias = document.getElementById('calorias').value;
  const alimentos = document.getElementById('alimentos').value;

  adicionarRefeicao(nome, horario, calorias, alimentos);
  form.reset();
});

// Carregar refeições ao iniciar
carregarRefeicoes(); 