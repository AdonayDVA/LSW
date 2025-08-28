# Instruções de Instalação - LSW Basketball Project

## Passo a Passo para Configurar o Projeto

### 1. Verificar Pré-requisitos

Certifique-se de que você tem o Node.js instalado na sua máquina:

```bash
node --version
npm --version
```

Se não tiver o Node.js instalado, baixe-o em: https://nodejs.org/

### 2. Navegar para o Diretório do Projeto

```bash
cd "c:\Users\Dev\Downloads\LSW-1"
```

### 3. Instalar Dependências

```bash
npm install
```

Este comando irá instalar o json-server como dependência de desenvolvimento.

### 4. Iniciar o Servidor da API

```bash
npm run json-server-watch
```

Ou alternativamente:

```bash
npm start
```

**IMPORTANTE**: Mantenha este terminal aberto enquanto usar a aplicação!

### 5. Verificar se o Servidor Está Funcionando

O terminal deve mostrar algo como:
```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/postagens
  http://localhost:3000/refeicoes
  http://localhost:3000/treinos
  http://localhost:3000/jogadores

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
```

### 6. Acessar a Aplicação

- Abra o arquivo `index.html` no seu navegador
- Ou navegue para `file:///c:/Users/Dev/Downloads/LSW-1/index.html`

### 7. Testar a API

Para verificar se a API está funcionando, acesse no navegador:
- http://localhost:3000/postagens
- http://localhost:3000/refeicoes
- http://localhost:3000/treinos
- http://localhost:3000/jogadores

Você deve ver os dados em formato JSON.

## Estrutura de Arquivos Após Instalação

```
LSW-1/
├── node_modules/        # Dependências instaladas
├── index.html           # Página principal
├── mural.html           # Página do mural
├── nutricao.html        # Página de nutrição
├── treinos.html         # Página de treinos
├── quadroTatico.html    # Página do quadro tático
├── *.css                # Arquivos de estilo
├── *.js                 # Arquivos JavaScript refatorados
├── db.json              # Dados da API
├── package.json         # Configuração do projeto
├── package-lock.json    # Versões exatas das dependências
├── README.md            # Documentação completa
└── INSTALACAO.md        # Este arquivo
```

## Comandos Úteis

### Iniciar o servidor
```bash
npm start
```

### Parar o servidor
- No terminal onde o servidor está rodando, pressione `Ctrl + C`

### Ver logs do servidor
- O servidor mostra automaticamente todas as requisições no terminal

### Criar snapshot do banco
- No terminal do servidor, digite `s` e pressione Enter

## Solução de Problemas

### Erro: "Port 3000 is already in use"
```bash
# Encerre o processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Erro: "Cannot find module 'json-server'"
```bash
# Reinstale as dependências
npm install
```

### Servidor não inicia
```bash
# Verifique se está no diretório correto
dir
# Deve mostrar package.json e db.json

# Tente instalar globalmente
npm install -g json-server
json-server --watch db.json --port 3000
```

### Aplicação não carrega dados
- Verifique se o servidor está rodando
- Verifique o console do navegador (F12) para erros
- Confirme que acessou http://localhost:3000 no navegador

## Funcionalidades da API

### Endpoints Disponíveis
- **GET** `/postagens` - Listar postagens
- **POST** `/postagens` - Criar postagem
- **PUT** `/postagens/:id` - Atualizar postagem
- **DELETE** `/postagens/:id` - Remover postagem

- **GET** `/refeicoes` - Listar refeições
- **POST** `/refeicoes` - Criar refeição
- **PUT** `/refeicoes/:id` - Atualizar refeição
- **DELETE** `/refeicoes/:id` - Remover refeição

- **GET** `/treinos` - Listar treinos
- **POST** `/treinos` - Criar treino
- **PUT** `/treinos/:id` - Atualizar treino
- **DELETE** `/treinos/:id` - Remover treino

- **GET** `/jogadores` - Listar jogadores
- **POST** `/jogadores` - Criar jogador
- **PUT** `/jogadores/:id` - Atualizar jogador
- **DELETE** `/jogadores/:id` - Remover jogador

## Modo Offline

A aplicação funciona mesmo sem o servidor:
- Dados são salvos no localStorage do navegador
- Funcionalidades básicas continuam funcionando
- Quando o servidor voltar online, os dados são sincronizados

## Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique o terminal do servidor
3. Confirme que todos os arquivos estão presentes
4. Verifique se o Node.js está instalado corretamente
