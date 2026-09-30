# BTC Energy Solutions — Full-stack WhatsApp website

## Stack
- Frontend: responsive HTML/CSS/vanilla JavaScript
- Backend: Node.js + Express
- WhatsApp destination: +961 76 629 168
- Server endpoint: `/go/whatsapp`
- API endpoint: `/api/whatsapp`
- Health check: `/api/health`

## Run locally

1. Install Node.js 18+.
2. In this folder run:
   `npm install`
3. Start:
   `npm start`
4. Open:
   `http://localhost:3000`

For development:
`npm run dev`

## Deploy
This is a normal Node/Express application and can be deployed to any host that supports Node.js.
Set:
- `PORT`
- `WHATSAPP_NUMBER`
- `WHATSAPP_MESSAGE`

The public CTA is `/go/whatsapp`.

## TikTok / iPhone note
The backend correctly redirects to WhatsApp, but TikTok's iOS in-app browser can restrict external-app handoffs. No backend can override a client-side restriction. The site therefore uses a real user click to `/go/whatsapp`, which is the correct web implementation.
