Sistema de Gerenciamento de Projetos com Times
Um sistema completo para gerenciar projetos, equipes e tarefas, com funcionalidades avançadas, como chat em tempo real, kanban e notificações, utilizando as mais modernas tecnologias.

Tecnologias Utilizadas
Frontend
Angular
Angular CDK (Drag and Drop)
Angular Signals
Chart.js (ou ng2-charts) para gráficos
Backend
C# (ASP.NET Core)
SignalR para atualizações em tempo real
Banco de Dados
SQL Server
Funcionalidades Principais
Gestão de Usuários:

Personalização de perfis.
Gestão de Projetos e Equipes:

Relacionamento muitos-para-muitos entre usuários e equipes.
Kanban para acompanhamento visual.
Priorização e definição de status.
Gestão de Tarefas:

Sistema de tags para organização.
Histórico de alterações (log de atividades).
Filtros avançados por status, data e prioridade.
Funcionalidades em Tempo Real:

Chat integrado por equipe e projeto.
Notificações para atualizações importantes.
Relatórios e Gráficos:

Painéis interativos com métricas detalhadas.
Gráficos de desempenho e progresso.
Extras:

Exportação de relatórios.
Sistema de permissões avançadas.
Log de atividades por usuário.
Instalação e Configuração
Pré-requisitos
Node.js
.NET SDK
SQL Server
Instruções
Backend
Clone o repositório: ``` git clone https://github.com/suarepositorio.git cd api ```
Configure a string de conexão no arquivo appsettings.json.
Restaure os pacotes e execute as migrações: ``` dotnet restore dotnet ef database update ```
Inicie a aplicação: ``` dotnet run ```
Frontend
Instale as dependências do Angular: ``` cd app npm install ```
Execute o projeto: ``` ng serve ```
Rotas Importantes
Backend
GET /api/projects: Lista de projetos.
POST /api/projects: Criação de projetos.
GET /api/teams: Lista de equipes.
POST /api/tasks: Criação de tarefas.
GET /api/chat: Recupera mensagens de chat.
Frontend
/dashboard: Painel principal com gráficos e relatórios.
/projects: Gestão de projetos.
/teams: Gestão de equipes.
/tasks: Kanban e tarefas.
/chat: Chat em tempo real.
Contribuindo
Faça um fork do repositório.
Crie um branch para sua feature: ``` git checkout -b minha-feature ```
Envie suas alterações: ``` git push origin minha-feature ```
Licença
Este projeto está licenciado sob a MIT License.

