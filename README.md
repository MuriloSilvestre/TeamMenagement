# 📋 Sistema de Gerenciamento de Projetos com Times

Bem-vindo ao Sistema de Gerenciamento de Projetos com Times! Este sistema permite criar equipes, gerenciar tarefas, acompanhar o progresso dos projetos e colaborar em tempo real. O projeto é dividido em API (backend .NET) e App (frontend Angular).

---

## 🗂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

```bash
|-- api/     # Backend (API em .NET Core)
|-- app/     # Frontend (Aplicação em Angular)
```

## 🚀 Funcionalidades

### 🔧 API (Backend)
-Autenticação JWT com níveis de permissão:
 -- Admin: Acesso total.
 -- Auditor: Permissões gerais de cadastro e edição.
 -- User: Permissões limitadas aos seus próprios registros.
- Relacionamentos complexos entre usuários, equipes e projetos.
- Sistema de notificações em tempo real usando SignalR.
- Histórico de alterações e logs de atividades.
- Kanban com atualização em tempo real.

### 🌐 App (Frontend)
- Interface intuitiva e responsiva para gerenciar equipes, projetos e tarefas.
- Painel com gráficos e relatórios detalhados.
- Sistema de kanban para organização visual das tarefas.
- Chat integrado para comunicação em tempo real.
- Filtros avançados e sistema de tags para organização de tarefas.

---

## 💻 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/MuriloSilvestre/ToDoApp.git
cd ToDoApp
```

### 2. Executando a API

```bash
cd api
dotnet restore
dotnet run
```

- A API estará disponível em `http://localhost:37923`

### 3. Executando o App

```bash
cd app
npm install
ng serve
```

- O App estará disponível em `http://localhost:4200`

---

## 🔗 Endpoints da API

Alguns dos principais endpoints disponíveis:

- **POST** `/api/login` - Autenticação de usuário
- **GET** `/api/users` - Lista de usuários
- **GET** `/api/projects` -  Lista de projetos(com filtros)
- **POST** `/api/tasks` - Criar novo projeto
- **GET** `/api/tasks` - Lista de tarefas (com filtros)
- **POST** `/api/tasks` - Criar nova tarefa
- **PUT** `/api/tasks/{id}` - Atualizar tarefa
- **POST** `/api/chat` - Enviar mensagens no chat

---

## 🛠 Tecnologias Utilizadas

- **Backend**: ASP.NET Core, Entity Framework Core
- **Frontend**: Angular, Angular CDK, Chart.js (ou ng2-charts)
- **Banco de Dados**: SQL Server

---

Feito com ❤️ por [Murilo Silvestre](https://github.com/MuriloSilvestre)

