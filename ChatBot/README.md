# ChatBot

O **ChatBot** é uma aplicação completa de chat com autenticação segura, conversas em tempo real e busca avançada. A aplicação foi desenvolvida utilizando um stack moderno, integrando **Node.js com TypeScript e express** no backend e **Next.js com TypeScript** no frontend, garantindo performance, segurança e escalabilidade.

---

## Sumário

- [Características](#características)
- [Tecnologias e Conceitos Utilizados](#tecnologias-utilizadas)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Configuração e Setup](#configuração-e-setup)
- [Executando a Aplicação](#executando-a-aplicação)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [CI/CD e Containerização](#cicd-e-containerização)
- [Considerações de Segurança e Performance](#considerações-de-segurança-e-performance)
- [Licença](#licença)

---

## Características

- **Autenticação Segura:**
  - Login com email/senha usando JWT e bcrypt.
  - Autenticação de dois fatores (2FA) com tokens TOTP e OAuth2 (GitHub).

- **Chat em Tempo Real:**
  - Comunicação instantânea via **Socket.IO**.
  - Histórico de mensagens com armazenamento em **MongoDB** e indexação no **Elasticsearch**.

- **Interface Responsiva:**
  - Desenvolvida com **Next.js**, **Tailwind CSS** e suporte a **react-i18next** para múltiplos idiomas.
  - Modo escuro integrado e animações suaves com **Lottie**.

- **Processamento Assíncrono:**
  - Tarefas enfileiradas utilizando **RabbitMQ**.

- **Testes Automatizados:**
  - Testes unitários no backend e testes E2E no frontend com **Cypress**.


---

# Tecnologias e Conceitos Utilizados

## Frontend
- **Next.js** com suporte a Server-Side Rendering e rotas dinâmicas
- **React** (componentes, hooks, Suspense, lazy loading)
- **TypeScript**
- **Tailwind CSS** para estilização e design responsivo (mobile-first)
- **i18next / react-i18next** para internacionalização (i18n)
- **React Icons** para ícones
- **React Markdown** para renderizar conteúdos em Markdown
- **Lottie-web** para animações suaves
- **react-select** para seleção (ex.: troca de idioma)
- **Dynamic Imports** (Next.js dynamic) para carregamento sob demanda
- **Protected Route** – controle de acesso a páginas via componentes de proteção
- **Context API (ThemeContext)** para gerenciamento de temas (dark mode)

## Backend
- **Node.js com Express** para criação da API
- **TypeScript** (ou JavaScript com tipagem, dependendo do módulo)
- **MongoDB com Mongoose** para modelagem e persistência de dados
- **Redis** para caching de respostas (por exemplo, conversas)
- **RabbitMQ** (via **amqplib**) para enfileiramento e processamento assíncrono de tarefas
- **Elasticsearch** para busca avançada (indexação de conversas)
- **JWT (JSON Web Tokens)** para autenticação e autorização
- **OAuth2 com Passport.js** para login via GitHub
- **2FA (Autenticação de Dois Fatores)** utilizando Speakeasy e QRCode
- **bcrypt** para hash de senhas
- **Helmet** para segurança dos headers HTTP
- **CORS** para configuração de acesso entre domínios
- **csurf** para proteção contra CSRF
- **express-rate-limit** para limitar requisições (rate limiting)
- **express-mongo-sanitize** para prevenir injeções (especialmente em MongoDB)
- **cookie-parser** para manipulação de cookies
- **express-session com connect-mongo** para gerenciamento de sessão persistente
- **Socket.IO** para comunicação em tempo real (chat e eventos)
- **dotenv** para gerenciamento de variáveis de ambiente
- **Winston** para logging estruturado e monitoramento de performance

## DevOps, Containerização e CI/CD
- **Docker e Docker Compose** para containerização de serviços (Redis, Elasticsearch, RabbitMQ)
- **GitHub Actions** para pipeline de CI/CD (build, lint, testes e deploy)
- **Git** para versionamento e repositório público

## Testes e Qualidade
- **Cypress** para testes end-to-end (E2E) da interface
- **Testes unitários** (exemplo com Jest/Mocha para modelos Mongoose)
- **ESLint** para linting e manutenção da qualidade do código

## Conceitos e Práticas Adicionais
- Arquitetura de monolito
- **CRUD completo** de usuários e conversas
- **Chat em tempo real** com histórico, paginação e busca
- **Caching em múltiplas camadas** (frontend e backend)
- **Processamento assíncrono com filas** (RabbitMQ)
- **Segurança da aplicação** (prevenção contra SQL Injection, XSS, CSRF, sanitização de inputs, criptografia de dados sensíveis)
- **Acessibilidade** (conformidade com WCAG 2.1)
- **Otimização de assets** (code splitting, lazy loading)
- **Dark Mode e temas dinâmicos**
- **Logging estruturado** e métricas de performance


---

## Arquitetura da Aplicação

- **Backend:** API RESTful, endpoints para autenticação, gerenciamento de usuários, conversas e comunicação em tempo real usando WebSockets.
- **Frontend:** Interface amigável e responsiva com Next.js, internacionalização, modo escuro e interação dinâmica.

---

## Configuração e Setup

### Pré-requisitos

- Node.js ≥ 16
- MongoDB
- Redis
- Elasticsearch
- RabbitMQ
- Docker

### Instalação

Baixe o projeto

Em seu terminal, nos diretorios de backend e frontend, execute: 
npm install


### Variáveis de Ambiente

Arquivo `.env`:

env
PORT=6000
API_URL=http://localhost:6000
MONGO_URI=mongodb://localhost:27017/chatbot
JWT_SECRET=chaveSecreta
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200
RABBITMQ_URL=amqp://localhost
CORS_ORIGIN=http://localhost:3000


---

## Executando a Aplicação

### Backend


npm run dev


### Frontend


npm run dev


---

## Testes

- Unitários:


npm test


- Cypress (E2E):


npx cypress open


---

## Documentação da API


---

## CI/CD e Containerização

### Docker Compose


docker-compose up -d


### GitHub Actions

Configuração disponível em `.github/workflows/ci.yml`.

---

## Considerações de Segurança e Performance

- Proteção com Helmet, csurf, CORS;
- Redis (cache), RabbitMQ (assíncrono);
- Logging com Winston.

---

## Licença

Licenciado sob a [MIT License](LICENSE).

---

## Conclusão

Este projeto segue boas práticas modernas para desenvolvimento web, oferecendo segurança, desempenho, escalabilidade e uma experiência de usuário de alta qualidade.

