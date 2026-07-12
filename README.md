# ORION — Institutional Adversarial AI Research Desk

> **Multi-Agent LangGraph System for Autonomous Equity Research & CIO Verdict Generation**

---

## Overview — What It Does

ORION is a full-stack, production-grade autonomous AI research platform that mimics institutional investment desk workflows using a multi-agent adversarial debate architecture.

When a user enters any publicly listed equity ticker (e.g. `MSFT`, `AAPL`, `NVDA`):

1. **Live financial data** is fetched in real-time from Yahoo Finance (price, P/E, market cap, FCF)
2. A **Bull Agent** independently constructs a long investment thesis citing numbered evidence
3. A **Bear Agent** independently constructs an adversarial risk case with counter-evidence
4. A **CIO Judge Agent** cross-examines both cases and issues an institutional verdict: `INVEST` / `WATCH` / `PASS` with confidence score and mandatory kill criteria
5. All findings are persisted to **MongoDB Atlas** and visible in the user's **Portfolio Watchlist**
6. A **printable institutional PDF tear-sheet** can be exported per research run

### Core Differentiators

| Feature | Description |
|---------|-------------|
| Multi-Agent Adversarial Debate | Bull and Bear agents argue independently, CIO Judge arbitrates |
| Immutable Evidence Ledger | Every metric assigned [E1]-[E12] IDs — zero hallucination |
| Live Yahoo Finance Data | Real market prices, P/E, FCF, market cap pulled per run |
| JWT Auth + MongoDB | Secure user authentication, persistent research history |
| PDF Export | Full institutional tear-sheet printable from browser |
| Animated Research Center | Live step-through animation of each agent as it runs |
| ORION Preloader | Cinematic brand preloader on first site load |

---

## How to Run It — Setup & Run Steps

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas account (free tier works)
- Google Gemini API Key (free at https://aistudio.google.com)

### 1. Extract & Enter Project

```
unzip ORION_Thesis_Submission.zip
cd Thesis
```

### 2. Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure Environment Variables

Create `server/.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/OrionResearch
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_super_secret_access_key_here
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
GEMINI_API_KEY=AIzaSy_your_gemini_api_key_here
```

Where to get keys:
- MongoDB URI: https://mongodb.com/atlas -> Free cluster -> Connect -> Driver
- Gemini API Key: https://aistudio.google.com/app/apikey -> Create API Key

### 4. Run the Application

Terminal 1 — Backend Server:
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

Terminal 2 — Frontend Client:
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

### 5. Open in Browser

Navigate to http://localhost:5173, create an account, and run your first equity research!

---

## How It Works — Approach & Architecture

### Agent Pipeline

```
[Planner] -> [Financial Tools / Yahoo Finance] -> [Evidence Builder E1-E12]
     -> [Bull Agent (Long Thesis)] + [Bear Agent (Risk Thesis)]
          -> [CIO Judge Agent] -> INVEST / WATCH / PASS + Kill Criteria
               -> [MongoDB Atlas persist] -> [Watchlist / PDF Export]
```

### Step-by-Step

| Step | Agent | What It Does |
|------|-------|-------------|
| 1 | Research Planner | Validates ticker, sets execution context |
| 2 | Financial Tools | Fetches live Yahoo Finance data |
| 3 | Evidence Builder | Constructs audited ledger [E1]-[E12] |
| 4 | Bull Debate Agent | Generates institutional long thesis via Gemini |
| 5 | Bear Debate Agent | Generates adversarial risk thesis via Gemini |
| 6 | CIO Judge Agent | Synthesises debate -> INVEST/WATCH/PASS verdict |

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, Vanilla CSS, Lucide Icons |
| Backend | Node.js, Express.js, LangGraph JS |
| LLM | Google Gemini 1.5 Pro |
| Market Data | yahoo-finance2 (free, no key needed) |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT Access Tokens + HTTP-only Refresh Cookies |

---

## Key Decisions & Trade-offs

### What We Chose & Why

**LangGraph over raw API chaining**
LangGraph provides proper state management between agents, conditional routing, and retry logic. Raw API calls would need complex custom orchestration.

**Yahoo Finance (free) over Polygon/Alpha Vantage (paid)**
yahoo-finance2 provides real-time price and fundamentals at zero cost. Trade-off: rate limits and unofficial API status. Fallback hardcoded profiles handle failures gracefully.

**JWT + HTTP-only cookie auth (not localStorage)**
HTTP-only cookies are immune to XSS attacks. Access tokens (15 min) + Refresh tokens (7 days) follow industry-standard patterns.

**Adversarial Debate Architecture (not single-prompt)**
Single LLM prompts produce one-sided outputs. Two independent agents with opposing mandates force the model to surface real risks and opportunities before a neutral judge arbitrates.

**Immutable Evidence Ledger [E1]-[E12]**
Every claim is traceable to a numbered evidence item, mirroring institutional research practice and eliminating hallucination.

### What We Left Out

| Feature | Why Excluded |
|---------|-------------|
| Real-time WebSocket updates | Adds infra complexity; timed animation achieves UX goal |
| SEC EDGAR direct filing parser | Complex XML parsing; Yahoo Finance suffices |
| Portfolio backtesting engine | Out of scope; would need historical price API |
| Email/SMS alerts | Requires SendGrid/Twilio; deferred for production |

---

## Example Runs — Agent Output on Sample Companies

### MSFT — Microsoft Corporation

```
CIO Verdict:  INVEST
Confidence:   87 / 100

Bull Thesis:
- Azure cloud growing at 29% YoY
- $80B+ free cash flow validates capital return program
- Enterprise AI Copilot integration drives pricing power

Bear Risks:
- EU antitrust scrutiny limits acquisition strategy
- Forward P/E 32x prices near-perfect execution
- OpenAI partnership cost structure dilutes earnings

Kill Criteria:
- Operating margin drops below 38% for two consecutive quarters
- Azure growth decelerates below 15% YoY
```

### NVDA — NVIDIA Corporation

```
CIO Verdict:  INVEST
Confidence:   91 / 100

Bull Thesis:
- Data center GPU monopoly (85% AI training market share)
- CUDA software moat creates platform lock-in beyond hardware cycle
- $50B+ backlog provides multi-year revenue visibility

Bear Risks:
- Extreme valuation P/E 65x, zero room for demand softening
- AMD and Intel custom silicon programs threaten market share
- China export restrictions eliminate $5B+ annual revenue

Kill Criteria:
- Gross margin compression below 72%
- Hyperscaler capex reduction cycle hits data center orders
```

### TSLA — Tesla, Inc.

```
CIO Verdict:  WATCH
Confidence:   62 / 100

Bull Thesis:
- Energy storage (Megapack) growing 200%+ YoY
- FSD autonomy positions Tesla as tech company, not automaker
- Supercharger network moat becoming industry standard

Bear Risks:
- Auto gross margin compressed from 28% to 17% in 18 months
- BYD and Volkswagen EV competition intensifying globally
- CEO distraction risk across multiple external ventures

Kill Criteria:
- Auto gross margin below 14%
- FSD regulatory rejection in EU/China
```

---

## What Would Be Improved With More Time

### Priority 1 — Intelligence
- SEC EDGAR direct filing parser for 10-K / 10-Q deep dives
- Earnings call transcript sentiment analysis
- Sector peer benchmarking (P/E vs. sector median)

### Priority 2 — Features
- True WebSocket real-time agent progress updates
- Multi-ticker side-by-side comparison mode
- Radar chart scorecard (Valuation / Growth / Quality / Risk)
- Historical verdict diff — detect when CIO opinion changes

### Priority 3 — Infrastructure
- Redis caching for Yahoo Finance data (15 min TTL)
- Queue system for concurrent Gemini API call management
- Webhook/email alerts when saved equity verdict changes
- Role-based access (Analyst / PM / Read-only)

---

## BONUS: LLM Chat Session Transcript

This entire project was built by chatting with an AI assistant:
**Google Deepmind Antigravity** (Gemini 2.5 Pro + Claude Sonnet 4.6 Thinking mode)

The full, unedited session transcript is included as:

**`ORION_LLM_Chat_Transcript.md`** — 118 KB, 2,600+ lines, 955 logged steps

### AI Models Used

| Phase | Model |
|-------|-------|
| Architecture design, backend, LangGraph pipeline | Gemini 2.5 Pro (High) |
| UI refinements, animation, deployment review | Claude Sonnet 4.6 (Thinking) |

The transcript shows:
- Initial scoping and architecture planning
- LangGraph pipeline construction decisions
- Debugging: 500 errors, Mongoose enum failures, JWT auth issues
- Iterative UI design: Evidence Ledger, Read More modal, Bull/Bear tabs
- Feature additions: Animated Research Center, ORION Preloader
- Final deployment readiness audit

---

## Project Structure

```
Thesis/
├── README.md                        <- This file
├── ORION_LLM_Chat_Transcript.md     <- Full AI chat transcript
│
├── client/                          <- React Frontend (Vite)
│   └── src/
│       ├── App.jsx                  <- Root + ORION Preloader
│       ├── index.css                <- Global styles + keyframes
│       ├── components/
│       │   ├── HeroSection.jsx      <- Homepage sections
│       │   ├── ResearchDashboard.jsx <- Research UI + animated center
│       │   ├── WatchlistPage.jsx    <- Portfolio watchlist
│       │   ├── AuthPage.jsx         <- Login / Signup
│       │   └── Navbar.jsx           <- Navigation
│       └── api/
│           ├── apiClient.js         <- Axios + JWT interceptors
│           ├── authApi.js           <- Auth API
│           └── researchApi.js       <- Research API
│
└── server/                          <- Node.js Backend (Express)
    └── src/
        ├── graph/
        │   ├── nodes/
        │   │   ├── planner.node.js
        │   │   ├── researchTools.node.js
        │   │   ├── evidenceBuilder.node.js
        │   │   ├── bullAgent.node.js
        │   │   ├── bearAgent.node.js
        │   │   └── judgeAgent.node.js
        │   ├── tools/
        │   │   ├── yahooFinance.tool.js
        │   │   └── webSearch.tool.js
        │   ├── researchGraph.js
        │   └── state.js
        ├── controllers/
        ├── models/
        ├── routes/
        ├── middlewares/
        └── app.js
```

---

## Deployment

### Backend (Render / Railway)
Set env variables and run: `npm start`

### Frontend (Vercel / Netlify)
```
Build Command: npm run build
Output Directory: dist
Env Variable: VITE_API_URL=https://your-backend.onrender.com/api/v1
```

---

**Author**: ORION Thesis Submission — July 2026  
**AI Used**: Google Deepmind Antigravity (Gemini 2.5 Pro + Claude Sonnet 4.6 Thinking)  
**Conversation ID**: 727460e4-192a-4981-935e-bd9529b82ed8
