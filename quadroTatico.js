const jogadores = document.querySelectorAll('.jogador');
let jogadoresData = [];

// Configuração da API
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINTS = {
  JOGADORES: '/jogadores'
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

// Carregar posições dos jogadores da API
async function carregarPosicoesJogadores() {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      console.warn('Servidor não está rodando, usando posições padrão');
      carregarPosicoesPadrao();
      return;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.JOGADORES));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    jogadoresData = await response.json();
    aplicarPosicoesJogadores();
  } catch (error) {
    console.error('Erro ao carregar posições dos jogadores:', error);
    carregarPosicoesPadrao();
  }
}

// Fallback para posições padrão
function carregarPosicoesPadrao() {
  const salvas = localStorage.getItem('posicoesJogadores');
  if (salvas) {
    jogadoresData = JSON.parse(salvas);
  } else {
    // Posições padrão se não houver nenhuma
    jogadoresData = [
      { id: 1, nome: "João Lucas", posicao: "Armador", numero: "5", x: 100, y: 150 },
      { id: 2, nome: "Adonay", posicao: "Ala", numero: "8", x: 200, y: 100 },
      { id: 3, nome: "Anthony", posicao: "Pivô", numero: "15", x: 300, y: 200 }
    ];
    localStorage.setItem('posicoesJogadores', JSON.stringify(jogadoresData));
  }
  aplicarPosicoesJogadores();
}

// Aplicar posições aos elementos DOM
function aplicarPosicoesJogadores() {
  jogadores.forEach((jogador, index) => {
    if (jogadoresData[index]) {
      jogador.style.left = jogadoresData[index].x + "px";
      jogador.style.top = jogadoresData[index].y + "px";
    }
  });
}

// Salvar posição do jogador via API
async function salvarPosicaoJogador(id, x, y) {
  try {
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      // Fallback para localStorage
      const jogador = jogadoresData.find(j => j.id === id);
      if (jogador) {
        jogador.x = x;
        jogador.y = y;
        localStorage.setItem('posicoesJogadores', JSON.stringify(jogadoresData));
      }
      return;
    }

    const jogador = jogadoresData.find(j => j.id === id);
    if (!jogador) return;

    const jogadorAtualizado = { ...jogador, x, y };

    const response = await fetch(buildApiUrl(`${API_ENDPOINTS.JOGADORES}/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jogadorAtualizado)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Atualizar dados locais
    jogador.x = x;
    jogador.y = y;
  } catch (error) {
    console.error('Erro ao salvar posição do jogador:', error);
    // Fallback para localStorage
    const jogador = jogadoresData.find(j => j.id === id);
    if (jogador) {
      jogador.x = x;
      jogador.y = y;
      localStorage.setItem('posicoesJogadores', JSON.stringify(jogadoresData));
    }
  }
}

// Configurar drag and drop para cada jogador
jogadores.forEach((jogador, index) => {
    let offsetX, offsetY;
    let isArrastando = false;

    jogador.addEventListener('mousedown', (e) => {
        isArrastando = true;
        offsetX = e.clientX - jogador.offsetLeft;
        offsetY = e.clientY - jogador.offsetTop;
        jogador.style.cursor = "grabbing";

        const mover = (e) => {
            if (isArrastando) {
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;

                const quadra = document.getElementById('quadra');

                if (
                    x >= 0 &&
                    y >= 0 &&
                    x + jogador.offsetWidth <= quadra.clientWidth &&
                    y + jogador.offsetHeight <= quadra.clientHeight
                ) {
                    jogador.style.left = x + "px";
                    jogador.style.top = y + "px";
                }
            }
        };

        const soltar = () => {
            if (isArrastando) {
                isArrastando = false;
                jogador.style.cursor = "grab";
                
                // Salvar posição final
                const x = parseInt(jogador.style.left);
                const y = parseInt(jogador.style.top);
                const jogadorId = jogadoresData[index]?.id;
                
                if (jogadorId) {
                    salvarPosicaoJogador(jogadorId, x, y);
                }
            }
            
            document.removeEventListener('mousemove', mover);
            document.removeEventListener('mouseup', soltar);
        };

        document.addEventListener('mousemove', mover);
        document.addEventListener('mouseup', soltar);
    });
});

// Carregar posições ao iniciar
carregarPosicoesJogadores();
