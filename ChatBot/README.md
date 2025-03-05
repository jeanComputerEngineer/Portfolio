

# URL Do Deploy da Aplicação: chatbot.jeanhenrique.site
# ChatBot Application


Este projeto é uma aplicação de ChatBot com autenticação e suporte multilíngue, desenvolvida com Next.js/React no frontend e Express/Node.js no backend. O sistema utiliza MongoDB para persistência, Redis e Bull para filas de processamento, Socket.IO para comunicação em tempo real e integra-se com uma API externa (OpenRouter) para gerar respostas de chat.



## Sumário

- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Setup e Instalação](#setup-e-instalação)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Documentação da API (Swagger/OpenAPI)](#documentação-da-api)
- [Requisitos Implementados](#requisitos-implementados)
- [Requisitos Não Implementados](#requisitos-não-implementados)

---

## 🏗 Arquitetura

A aplicação é dividida em duas camadas principais:

### **Frontend**  
- Desenvolvido com **Next.js e React**.
- Utiliza **Context API** para gerenciamento de temas e tradução (**i18next**).
- Implementa **rotas protegidas**, testes com **Jest** e **Cypress** e **testes unitários** com Testing Library.
- Suporte a **múltiplos idiomas** através de um recurso robusto de tradução.

### **Backend**  
- Desenvolvido com **Express e Node.js**.
- Utiliza **Passport** para autenticação (**estratégia local**), sessões e proteção via **CSRF**.
- Persistência com **MongoDB** (usando **Mongoose**) e gerenciamento de **conversas e mensagens**.
- Comunicação em tempo real por meio do **Socket.IO**.
- **Fila de jobs** para processamento assíncrono de chamadas à API do OpenRouter usando **Bull e Redis**.
- Middleware de segurança com **Helmet, CORS e csurf**.

---

## ⚙️ Pré-requisitos

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **MongoDB** (instância local ou remota)
- **Chave de API do OpenRouter** (caso necessário)

---

## 🚀 Setup e Instalação

### **Frontend**

1. Navegue até a pasta do frontend:
   cd frontend
2. Instale as dependências:
   npm install
3. Inicie o servidor de desenvolvimento:
   npm run dev
4. Acesse a aplicação em [http://chatbot.jeanhenrique.site](http://chatbot.jeanhenrique.site).



### **Backend**

1. Navegue até a pasta do backend:
   cd my-chat-backend
2. Instale as dependências:
   npm install
3. Crie um arquivo **.env** na raiz do backend e configure as variáveis:
   env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mychat
   SESSION_SECRET=seuSegredoAqui
   ENCRYPTION_KEY=0123456789abcdef0123456789abcdef
   # (Opcional) YOUR_API_KEY para o OpenRouter, se necessário
   
4. Inicie o servidor:
   npm start
   
5. O servidor estará disponível em [https://backchat.jeanhenrique.site/](https://backchat.jeanhenrique.site/).



## 📂 Estrutura de Diretórios


/ (raiz do projeto)
│
├── frontend/              # Código da aplicação Next.js/React
│   ├── app/               # Páginas (login, chat, register, etc.)
│   ├── components/        # Componentes React (TopMenu, Footer, ChatPageComponent, etc.)
│   ├── context/           # Gerenciamento de temas e tradução (ThemeContext, i18n)
│   ├── hooks/             # Hooks customizados (useCsrfToken, etc.)
│   ├── cypress/           # Testes end-to-end com Cypress
│   ├── package.json
│   └── README.md          # Documentação do frontend (opcional)
│
├── backend/               # Código da API Express/Node.js
│   ├── config/            # Configurações (MongoDB, Passport, Redis, etc.)
│   ├── models/            # Modelos Mongoose (Account, Conversation)
│   ├── routes/            # Rotas da API (auth, chat, csrf)
│   ├── jobs/              # Processamento de filas com Bull
│   ├── logger.js          # Logger (morgan integrado)
│   ├── index.js           # Entry point da aplicação
│   ├── package.json
│   └── README.md          # Documentação do backend (opcional)
│
└── swagger.yaml           # Especificação da API (Swagger/OpenAPI)


## 📜 Documentação da API (Swagger/OpenAPI)

### **Endpoints de Autenticação**
- `POST /api/auth/register` – Registro de novos usuários.
- `POST /api/auth/login` – Login de usuários.
- `PUT /api/auth/account` – Atualização de conta.
- `DELETE /api/auth/account` – Exclusão de conta.

### **Endpoints de Chat**
- `POST /api/chat/async` – Requisição síncrona para chat.
- `POST /api/chat/conversations` – Criação/atualização de conversas.
- `GET /api/chat/conversations` – Listagem de conversas (suporta paginação).
- `PUT /api/chat/conversations/{conversationId}` – Atualização de uma conversa.
- `DELETE /api/chat/conversations/{conversationId}` – Exclusão de uma conversa.

### **Endpoint para CSRF Token**
- `GET /csrf-token` – Retorna o token CSRF para requisições seguras.

**A documentação interativa pode ser visualizada no Swagger UI ou outro visualizador de arquivos OpenAPI.**



## ✅ Requisitos Implementados

### **Backend**
- ✅ **Node.js com TypeScript**.
- ✅ **Arquitetura monolítica** (único projeto com múltiplos módulos).
- ✅ **Persistência com MongoDB**.
- ✅ **CRUD de usuários** (registro, login, atualização e exclusão).
- ✅ **Chat em tempo real** com WebSockets (Socket.IO).
- ✅ **Histórico de conversas com paginação**.
- ✅ **Processamento assíncrono com filas** usando Bull.
- ✅ **Segurança com CSRF, Helmet e bcrypt**.
- ✅ **Pipeline de CI/CD** com GitHub Actions.
- ✅ **Logging estruturado** com morgan.

### **Frontend**
- ✅ **Next.js com TypeScript**.
- ✅ **Tailwind CSS para estilização**.
- ✅ **Design responsivo, mobile-first**.
- ✅ **Suporte a múltiplos idiomas** (i18next).
- ✅ **Testes de componentes e E2E** (Jest, Cypress).
- ✅ **Code splitting e otimização de assets**.
- ✅ **Modo escuro** (ThemeContext).
- ✅ **Indicador de "IA pensando" no chat**.

### **Outros**
- ✅ **Documentação completa de setup e README detalhado**.

### **Bônus**
- ✅ **Integração com LLM para respostas automáticas**.



## ❌ Requisitos Não Implementados

- ❌ Redis/Memcache para caching.
- ❌ Elasticsearch para busca avançada.
- ❌ Autenticação com OAuth2 e 2FA.
- ❌ Caching em múltiplas camadas (backend/frontend).
- ❌ Animações suaves (Rive, Lottie).
- ❌ Cobertura mínima de 80% de testes.
- ❌ Containerização com Docker.
- ❌ Implementação em React Native.
- ❌ Testes de performance com k6.


