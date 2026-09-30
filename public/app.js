
const waButton = document.querySelectorAll("[data-whatsapp]");
const fallback = document.querySelector("#wa-fallback");

async function getWhatsAppUrl() {
  try {
    const r = await fetch("/api/whatsapp");
    if (!r.ok) throw new Error("API unavailable");
    return (await r.json()).url;
  } catch {
    return "https://wa.me/96176629168?text=Hello%20BTC%20Energy%20Solutions%2C%20I%27m%20interested%20in%20your%20solar%20solutions.";
  }
}

waButton.forEach((button) => {
  button.addEventListener("click", async (event) => {
    // Use a direct navigation from a real click. This is the most compatible
    // approach with iOS/TikTok; a script cannot override TikTok's webview policy.
    event.preventDefault();
    const url = await getWhatsAppUrl();
    window.location.href = url;
  });
});

if (fallback) fallback.textContent = "WhatsApp: +961 76 629 168";
