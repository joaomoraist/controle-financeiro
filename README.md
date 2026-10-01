# Controle Financeiro

Aplicação web para controle de despesas pessoais, desenvolvida com Java e React.

O sistema permite cadastrar, consultar, editar e excluir despesas, além de visualizar um resumo mensal dos gastos, exportar relatórios para Excel e receber uma sugestão financeira gerada por Inteligência Artificial.

## Tecnologias Utilizadas

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- SQLite
- Maven
- Bean Validation
- Apache POI
- Google GenAI SDK

### Frontend

- React
- TypeScript
- Vite
- CSS

### Infraestrutura

- Docker
- Docker Compose
- Nginx

## Estrutura do projeto

```text
controle-financeiro/
├── backend/
│   ├── src/
│   ├── data/
│   │   └── finance.db
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

## Como executar

### Pré-requisitos

Para executar o projeto localmente utilizando Docker, é necessário ter:

- Docker Desktop
- Git

O Docker Desktop deve estar aberto e com o Docker Engine em execução.

### 1. Clone o repositório

```bash
git clone https://github.com/joaomoraist/controle-financeiro.git
```

Entre na pasta:

```bash
cd controle-financeiro
```

### 2. Configure a API do Gemini

O projeto utiliza o Google Gemini para gerar sugestões financeiras. Crie uma variável de ambiente chamada `GEMINI_API_KEY`.

No Windows, pelo CMD:

```cmd
setx GEMINI_API_KEY "SUA_CHAVE_AQUI"
```

Depois de executar o comando, abra um novo terminal.

### 3. Inicie o projeto com Docker

Na raiz do projeto:

```bash
docker compose up -d --build
```

O Docker irá construir as imagens do backend e do frontend e iniciar os containers.

### 4. Acesse a aplicação

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8080

## Comandos Docker (Caso necessário):

### Iniciar os containers

```bash
docker compose up -d
```

### Iniciar reconstruindo as imagens

Use quando houver alterações no código ou nos Dockerfiles:

```bash
docker compose up -d --build
```

### Parar os containers

```bash
docker compose down
```
