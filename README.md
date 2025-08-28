# LSW Basketball Project - Miniprojeto 2

## Visão Geral

Este projeto é uma aplicação web completa para gerenciamento de equipes de basquete, incluindo funcionalidades de mural, nutrição, treinos e quadro tático. O projeto foi refatorado para usar uma API REST simulada pelo json-server, implementando programação assíncrona com async/await.

## Funcionalidades

- **Mural**: Sistema de postagens com categorias e curtidas
- **Nutrição**: Gerenciamento de refeições e cálculo de calorias
- **Treinos**: Cadastro e organização de exercícios
- **Quadro Tático**: Posicionamento visual de jogadores na quadra

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript (ES6+)
- Fetch API para requisições HTTP
- json-server para simulação de API REST
- localStorage como fallback offline

## Instalação e Configuração

### Pré-requisitos

- Node.js instalado na sua máquina
- Navegador web moderno

### Passos de Instalação

1. **Clone ou baixe o projeto**
   ```bash
   # Se estiver usando git
   git clone [URL_DO_REPOSITORIO]
   cd LSW-1
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor json-server**
   ```bash
   npm run json-server-watch
   ```
   
   Ou alternativamente:
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   - Abra o arquivo `index.html` no seu navegador
   - O servidor da API estará rodando em `http://localhost:3000`

## Estrutura da API

### Endpoints Disponíveis

- **POST** `/postagens` - Criar nova postagem
- **GET** `/postagens` - Listar todas as postagens
- **PUT** `/postagens/:id` - Atualizar postagem
- **DELETE** `/postagens/:id` - Remover postagem

- **POST** `/refeicoes` - Criar nova refeição
- **GET** `/refeicoes` - Listar todas as refeições
- **PUT** `/refeicoes/:id` - Atualizar refeição
- **DELETE** `/refeicoes/:id` - Remover refeição

- **POST** `/treinos` - Criar novo treino
- **GET** `/treinos` - Listar todos os treinos
- **PUT** `/treinos/:id` - Atualizar treino
- **DELETE** `/treinos/:id` - Remover treino

- **POST** `/jogadores` - Criar novo jogador
- **GET** `/jogadores` - Listar todos os jogadores
- **PUT** `/jogadores/:id` - Atualizar jogador
- **DELETE** `/jogadores/:id` - Remover jogador

## Funcionalidades da API

### Programação Assíncrona
- Uso de `async/await` para operações assíncronas
- Tratamento de erros com try/catch
- Fallback para localStorage quando o servidor não está disponível

### Operações CRUD
- **CREATE**: Adicionar novos itens (POST)
- **READ**: Carregar dados existentes (GET)
- **UPDATE**: Modificar itens existentes (PUT)
- **DELETE**: Remover itens (DELETE)

### Estados de Carregamento e Erro
- Verificação automática do status do servidor
- Fallback gracioso para modo offline
- Tratamento de erros de rede

## Como Usar

### Mural
1. Acesse a página do mural
2. Preencha o formulário com nome, título, conteúdo e categoria
3. As postagens são salvas automaticamente na API
4. Use os filtros para visualizar postagens por categoria
5. Clique no botão de curtir para interagir

### Nutrição
1. Acesse a página de nutrição
2. Adicione refeições com horário, calorias e alimentos
3. O total de calorias é calculado automaticamente
4. Use o botão "Carregar Modelo" para uma dieta pré-definida
5. Clique no ícone de lixeira para remover refeições

### Treinos
1. Acesse a página de treinos
2. Cadastre exercícios com nome, categoria, séries e repetições
3. Os treinos são organizados por categoria
4. Use o ícone de lixeira para remover treinos

### Quadro Tático
1. Acesse a página do quadro tático
2. Arraste os jogadores para posicioná-los na quadra
3. As posições são salvas automaticamente na API
4. As posições são restauradas ao recarregar a página

## Modo Offline

O projeto inclui funcionalidade de fallback offline:
- Quando o servidor não está disponível, os dados são salvos no localStorage
- Todas as funcionalidades continuam funcionando localmente
- Os dados são sincronizados quando o servidor volta online

## Desenvolvimento

### Estrutura de Arquivos
```
LSW-1/
├── index.html          # Página principal
├── mural.html          # Página do mural
├── nutricao.html       # Página de nutrição
├── treinos.html        # Página de treinos
├── quadroTatico.html   # Página do quadro tático
├── *.css               # Arquivos de estilo
├── *.js                # Arquivos JavaScript
├── db.json             # Dados da API
├── package.json        # Dependências do projeto
└── README.md           # Este arquivo
```

### Scripts Disponíveis
- `npm start` - Inicia o servidor json-server
- `npm run json-server-watch` - Inicia o servidor em modo watch

## Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento.
