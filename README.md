# Fullstack Pairing Exercise

Welcome! Think of this less as an interview and more as your first pairing session with your new teammates.

You will be **driving** and the interviewers will be **navigating**. They are there to help you and will interact with you throughout. There are no "right answers" and finishing the exercise is not a goal, so don't stress and take your time. Work as you would on a normal day: search the web for what you don't know, ask questions, iterate on ideas and code.

You'll be working on a small, pre-existing app designed only for this exercise. The frontend uses **React with TypeScript**. The backend is your choice of **Node.js, Python, Ruby or Kotlin**. We do not evaluate you on any specific framework: we will help with syntax and APIs. We evaluate you as an engineer.

## Please come prepared to

- Clone this repository (or download it as a zip)
- Install dependencies (`npm install`, `pip install`, `bundle install` or `./gradlew`)
- Code in your favourite editor or IDE
- Open the app in a browser (preferably Chrome)
- Share your screen

## Technical areas we'll cover

- Web development (HTML, CSS, JS)
- REST API design
- Data filtering and state management
- Problem decomposition and trade-off discussion

## Structure

```
fullstack-list/
├── web/                        React 19 + Vite + TypeScript frontend
├── backends/
│   ├── node-express/           TypeScript + Express
│   ├── python-fastapi/         Python 3.10+ + FastAPI
│   ├── ruby-sinatra/           Ruby 2.7+ + Sinatra
│   └── kotlin-spring/          Kotlin + Spring Boot 3 (JDK 17+)
├── data/
│   ├── people.json             Shared dataset (87 Star Wars characters)
│   └── schema.sql              Reference schema for DB discussion
└── README.md
```

## Setup

### 1. Start a backend (use the language you are most comfortable with)

| Language | Command | Port |
|----------|---------|------|
| **Node.js** (18+) | `cd backends/node-express && npm install && npm start` | 3001 |
| **Python** (3.10+) | `cd backends/python-fastapi && pip install -r requirements.txt && uvicorn main:app --reload --port 3001` | 3001 |
| **Ruby** (2.7+) | `cd backends/ruby-sinatra && bundle install && ruby app.rb` | 3001 |
| **Kotlin** (JDK 17+) | `cd backends/kotlin-spring && ./gradlew bootRun` | 3001 |

### 2. Start the frontend

```bash
cd web && npm install && npm start
```

The frontend is available at http://localhost:5173. It shows a list of people, clicking an item shows its details and the back button returns to the list. It currently reads from a local mock (`web/src/core/usePeople.ts`) that mirrors the backend response. `/api/*` is already proxied to the backend on port 3001.

## API Contract

```
GET /people?page=<n>&limit=<n>
→ { "data": [...], "meta": { "total": N, "page": N, "limit": N } }

GET /people/:id
→ Person object | 404
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 3001 or 5173 already in use | `lsof -i :<port>`, then `kill <PID>` (usually a stale process) |
| `npm install` fails | Check `node -v` (18+ needed), then `rm -rf node_modules && npm install` |
| Python `ModuleNotFoundError` | `pip install -r requirements.txt` (you may need `pip3`) |
| Kotlin build fails | Needs JDK 17+, check `java -version` |
| Ruby `bundle install` fails | you may need `gem install bundler` first |
| Can't clone | Ask for a zip file |
