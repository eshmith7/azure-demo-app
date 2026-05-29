# Azure Demo App

A minimal single-page AI chat app built with Node.js + Express, ready to deploy to Azure App Service.

## Run locally

1. Clone the repo.
2. `npm install`
3. Copy `.env.example` to `.env` and paste your real OpenAI key:
   ```
   cp .env.example .env
   ```
4. `npm start`
5. Open http://localhost:3000

## Deploy to Azure

Covered in the session — see App Service setup.

## The three things that matter for Azure

- **PORT comes from env** — the server reads `process.env.PORT` (App Service injects it), falling back to 3000 locally.
- **API key comes from env** — the OpenAI key is read from `process.env.OPENAI_API_KEY`, never hardcoded.
- **Start script is `node server.js`** — Azure App Service runs `npm start` by default.
