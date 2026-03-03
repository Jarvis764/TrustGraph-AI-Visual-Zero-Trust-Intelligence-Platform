# TrustGraph AI — Visual Zero Trust Intelligence Platform

> **EY Technology Consulting | Cybersecurity Practice**  
> A full-stack enterprise demo showcasing Zero Trust network topology analysis with AI-powered risk insights.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)

## Overview

TrustGraph AI visualizes enterprise infrastructure as an interactive graph where every node (users, devices, applications, databases, cloud) and every edge (access paths) is color-coded by risk level. An AI panel provides instant GPT-4o–powered (or mock) analysis with remediation steps, business impact, and risk scores. A Zero Trust toggle demonstrates how blocking high-risk paths reduces overall exposure.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, TailwindCSS 3, Framer Motion, React Flow v11 |
| Backend | Node.js, Express 4, OpenAI GPT-4o, Helmet, Rate Limiting |
| Theme | Dark cyber `#0B0F19`, accent `#00D4FF`/`#3B82F6` |

## Quick Start

### Prerequisites
- Node.js 18+
- (Optional) OpenAI API key for live AI analysis

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY (optional — mock mode works without it)
npm install
npm start          # runs on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev        # runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

---

## Running in VS Code

This repository includes a `.vscode/` folder with ready-to-use configurations.

### One-time setup

1. **Clone the repo** and open the root folder in VS Code:
   ```
   File → Open Folder → select TrustGraph-AI-Visual-Zero-Trust-Intelligence-Platform/
   ```
2. **Install recommended extensions** — VS Code will show a prompt. Click **Install All**, or run:
   - `Ctrl+Shift+P` → *Extensions: Show Recommended Extensions*
3. **Copy the environment files:**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
   Optionally add your `OPENAI_API_KEY` to `backend/.env`.

### Option A — Run with Tasks (easiest)

1. Press `Ctrl+Shift+P` → **Tasks: Run Task** → **Install All Dependencies** *(first run only)*
2. Press `Ctrl+Shift+B` (or `Ctrl+Shift+P` → **Tasks: Run Build Task**) → **Start Full Stack**

Both the backend (`http://localhost:3001`) and the Vite dev server (`http://localhost:5173`) will launch in separate integrated terminals.

### Option B — Run with the Debugger (supports breakpoints)

1. Open the **Run and Debug** panel (`Ctrl+Shift+D`).
2. From the dropdown at the top select **Full Stack: Backend + Frontend**.
3. Press **F5** (or the green ▶ button).

VS Code will start both servers. You can set breakpoints in `backend/server.js`, `backend/routes/analysis.js`, `backend/services/aiService.js`, and any frontend file.

### Option C — Run manually in integrated terminals

Open two separate terminals (`Ctrl+`` ` then the `+` button to split):

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Features

- **Interactive Graph** — 19 nodes, 26 edges; drag, zoom, pan
- **Risk-coded Nodes** — Critical / High / Medium / Low with glow animations
- **Animated Attack Paths** — Critical-risk edges pulse with dashed animation
- **Zero Trust Toggle** — Instantly filters out high/critical risk paths to demonstrate ZTA impact
- **AI Risk Analysis** — Click any node or edge for instant AI analysis (GPT-4o or rich mock)
  - Risk explanation, 5-step remediation plan, business impact, risk reduction %
- **Executive Summary Modal** — Board-level report with attack paths, strategic recommendations, CFO summary, compliance status
- **Export** — Download report as text file
- **Live Clock & Status** — Real-time monitoring indicator in header

## File Structure

```
├── backend/
│   ├── server.js              # Express server with Helmet, CORS, rate limiting
│   ├── routes/analysis.js     # POST /api/analyze-risk, POST /api/executive-summary
│   ├── services/aiService.js  # OpenAI GPT-4o integration with mock fallback
│   ├── data/mockInfrastructure.json
│   └── prompts/templates.js
└── frontend/
    └── src/
        ├── App.jsx             # Main layout, state orchestration
        ├── components/
        │   ├── Graph/          # TrustGraph, CustomNode, CustomEdge, GraphControls
        │   ├── Panels/         # AIInsightsPanel, RiskLegend
        │   ├── Controls/       # ZeroTrustToggle
        │   ├── Modals/         # ExecutiveSummaryModal
        │   ├── Layout/         # Header, Sidebar
        │   └── Common/         # LoadingSpinner, GlowCard, Toast
        ├── hooks/              # useGraphData, useAIAnalysis
        ├── services/api.js     # axios wrappers
        ├── data/graphData.js   # 19 nodes + 26 edges
        └── utils/riskCalculator.js
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=3001
OPENAI_API_KEY=sk-...   # optional
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:3001
```

## Demo Scenario

1. Open the graph — you'll see 19 enterprise assets color-coded by risk
2. Click the **BYOD Mobile** node (critical) → AI panel opens with risk analysis
3. Click **Analyze with AI** → get remediation steps and business impact
4. Toggle **Zero Trust** — watch 15 high-risk paths disappear
5. Click **Executive Report** → board-level briefing with CFO summary

---

*Built for EY Tech Consulting Cyber Security demo purposes.*
