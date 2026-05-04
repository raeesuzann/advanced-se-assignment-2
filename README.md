# 🎮 Visual Tic Tac Toe

> Advanced Topics in Software Engineering — Assessment 2
> A React web application built iteratively across three sprint versions using **ScrumBan**, with a full **CI/CD pipeline** deployed to **Google Kubernetes Engine**.

---

## 👥 Team

| Role | Member |
|---|---|
| Scrum Master | Ujjwal Shrestha |
| Developer | Emilio Hagisoteri |
| Developer | Shyam Pariyar |
| DevOps Engineer | Sujan Rai |

---

## 🚀 Quick Start

```bash
git clone https://github.com/raeesuzann/advanced-se-assignment-2.git
cd advanced-se-assignment-2
npm ci
npm run dev
```

Open **http://localhost:5173**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Testing | Vitest + React Testing Library |
| Containerisation | Docker (multi-stage) |
| CI/CD | GitHub Actions |
| Deployment | Kubernetes on GKE |

---

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run test      # Run unit tests
npm run lint      # Run ESLint
```

---

## 🐳 Run with Docker

```bash
npm run docker:build
docker run -p 8080:80 tictactoe
```

Open **http://localhost:8080**

---

## 🔄 Three Versions

| Version | Highlights |
|---|---|
| **V1** | Core game board, win/draw detection, restart |
| **V2** | Player names, score tracking, responsive design, Docker |
| **V3** | AI opponent (minimax), GKE deployment |

---

## ⚙️ CI/CD Pipeline

- **CI** — Lint, test, and build run on every pull request (`test.yml`)
- **CD** — Docker build → push to GCR → deploy to GKE on merge to `main` (`deploy.yml`)


## 📁 Project Structure

```
src/
├── components/     # React UI components
├── utils/          # minimax AI algorithm

tests/      # Vitest unit tests

k8s
├── deployment.yaml # Kubernetes Deployment
└── service.yaml    # Kubernetes LoadBalancer Service
.github/workflows/
├── test.yml          # CI pipeline
└── deploy.yml          # CD pipeline to GKE
```