# 🚀 Multi-Agent Base

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Production-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/LangGraph-Multi--Agent-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Redis-Caching-red?style=for-the-badge&logo=redis" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/AWS-S3-orange?style=for-the-badge&logo=amazonaws" />
</p>

> A production-grade AI Multi-Agent backend built with **Node.js**, **LangGraph**, **Microservices**, **Redis**, **MongoDB**, **AWS S3**, and **Docker**.

This project serves as a scalable foundation for building enterprise AI applications with multiple specialized agents, persistent chat, document intelligence, image understanding, authentication, payments, and cloud storage.

---

# ✨ Features

## 🤖 AI Agents

- 💻 Coding Agent
- 📄 PDF Question Answering
- 📚 PDF RAG Agent
- 🌐 Web Search Agent
- 👁️ Vision/Image Analysis Agent
- 🖼️ AI Image Generation
- 📊 PowerPoint Generator
- 💬 General Chat Agent

---

## 🧠 LangGraph Orchestration

- Intelligent agent routing
- Shared conversation state
- Memory management
- Tool calling
- Multi-agent workflows
- Extensible graph architecture

---

## 🔐 Authentication

- Firebase Authentication
- Google Sign-In
- JWT Authorization
- Protected APIs

---

## 💬 Chat System

- Persistent Conversations
- Message History
- Conversation Management
- MongoDB Storage

---

## ☁️ Cloud Storage

- AWS S3 Integration
- File Uploads
- Image Storage
- PDF Storage
- Generated Artifact Storage

---

## 💳 Billing

- Razorpay Integration
- Credit Based Usage
- Payment Verification
- Usage Limits

---

## ⚡ Infrastructure

- API Gateway
- Microservices Architecture
- Redis Cache
- MongoDB
- Docker
- Docker Compose

---

# 🏗️ Architecture

```text
                           React Frontend
                                 │
                                 ▼
                        API Gateway (Express)
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
 Authentication             Chat Service          Billing Service
        │                        │                        │
        └──────────────┬─────────┴──────────────┬─────────┘
                       │                        │
                       ▼                        ▼
                 MongoDB Database          Redis Cache
                       │
                       ▼
                Agent Service (LangGraph)
                       │
      ┌────────────┬────────────┬────────────┬────────────┐
      │            │            │            │
 Coding       PDF RAG      Vision       Search
      │            │            │            │
      └────────────┴────────────┴────────────┘
                       │
                  Google AI / Groq
                       │
               AWS S3 + Qdrant Vector DB
```

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- LangGraph
- LangChain
- MongoDB
- Redis
- Firebase Admin SDK
- AWS SDK
- Razorpay

## AI

- Google Gemini
- Groq
- Tavily Search
- Qdrant Vector Database

## Storage

- MongoDB
- AWS S3
- Redis

## Infrastructure

- Docker
- Docker Compose

---

# 📂 Project Structure

```text
backend/
│
├── gateway/
│
├── services/
│   ├── agent/
│   ├── auth/
│   ├── billing/
│   └── chat/
│
└── shared/
    └── redis/

frontend/
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/vips725/Multi-agent-base.git
```

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

# 🔑 Environment Variables

Create `.env` files for the respective services.

Example:

```env
PORT=

MONGODB_URI=

REDIS_URL=

JWT_SECRET=

GOOGLE_API_KEY=
GROQ_API_KEY=

TAVILY_API_KEY=

OPENROUTER_API_KEY=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=

QDRANT_URL=
QDRANT_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

# 🐳 Docker Setup

### 1. Install Docker Desktop

Verify installation

```bash
docker --version
docker compose version
```

---

### 2. Build Containers

```bash
docker compose build
```

---

### 3. Start All Services

```bash
docker compose up -d
```

This starts:

- API Gateway
- Agent Service
- Authentication Service
- Chat Service
- Billing Service
- MongoDB
- Redis

---

### 4. Verify Running Containers

```bash
docker ps
```

---

### 5. View Logs

```bash
docker compose logs -f
```

Specific service

```bash
docker compose logs -f gateway
docker compose logs -f agent
docker compose logs -f auth
docker compose logs -f billing
docker compose logs -f chat
docker compose logs -f redis
docker compose logs -f mongodb
```

---

### 6. Restart Containers

```bash
docker compose restart
```

---

### 7. Stop Containers

```bash
docker compose down
```

Remove everything

```bash
docker compose down -v
```

---

# 🚀 Running Without Docker

Backend

```bash
npm install
npm run dev
```

Frontend

```bash
npm install
npm run dev
```

---

# 📦 Current Features

- ✅ Multi-Agent Architecture
- ✅ LangGraph Workflow
- ✅ Coding Agent
- ✅ PDF Agent
- ✅ PDF RAG
- ✅ Vision Agent
- ✅ Image Generation
- ✅ Web Search
- ✅ Chat Memory
- ✅ Firebase Authentication
- ✅ Google Login
- ✅ Razorpay Billing
- ✅ AWS S3 Upload
- ✅ Redis Cache
- ✅ MongoDB
- ✅ API Gateway
- ✅ Dockerized Services

---

# 🔮 Future Improvements

- Streaming Responses
- Kafka Event Streaming
- Kubernetes Deployment
- CI/CD Pipeline
- Monitoring & Logging
- Rate Limiting
- Analytics Dashboard
- Multi-LLM Support

---

# 📜 License

This project is intended for educational purposes and production-grade learning.

---

# 👨‍💻 Author

**Vipul Shah**

GitHub: https://github.com/vips725

---

> If you found this project helpful, consider giving it a ⭐ on GitHub.
