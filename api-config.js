// Configuração da API
const API_BASE_URL = 'http://localhost:3000';

// Endpoints da API
const API_ENDPOINTS = {
  POSTAGENS: '/postagens',
  REFEICOES: '/refeicoes',
  TREINOS: '/treinos',
  JOGADORES: '/jogadores'
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

// Exportar configurações para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_BASE_URL, API_ENDPOINTS, buildApiUrl, handleApiError, checkServerStatus };
}
