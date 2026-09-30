import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "96176629168";
const DEFAULT_MESSAGE =
  process.env.WHATSAPP_MESSAGE ||
  "Hello BTC Energy Solutions, I'm interested in your solar solutions.";

app.disable("x-powered-by");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
  maxAge: "1h"
}));

// Health endpoint for hosting/deployment checks.
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "btc-energy-whatsapp" });
});

// Returns the canonical WhatsApp URL. Keeping this server-side means the
// destination number/message can be changed without editing the frontend.
app.get("/api/whatsapp", (_req, res) => {
  const message = _req.query.message || DEFAULT_MESSAGE;
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  res.json({ url, phone: WHATSAPP_NUMBER });
});

// This endpoint is useful as the public CTA URL. It redirects to WhatsApp.
// NOTE: iOS/TikTok webviews may block an automatic external-app handoff.
app.get("/go/whatsapp", (req, res) => {
  const message = req.query.message || DEFAULT_MESSAGE;
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  res.redirect(302, url);
});

app.get("*splat", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`BTC Energy Solutions website running on http://localhost:${PORT}`);
});
