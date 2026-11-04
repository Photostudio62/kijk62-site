// Cloudflare Pages Function: ontvangt het contactformulier van kijk62.nl en mailt het door.
// Instellen in Cloudflare Pages (Settings > Variables and Secrets):
//   RESEND_API_KEY  (secret)    API-sleutel van resend.com
//   FORM_TO         (optioneel) ontvanger, standaard info@kijk62.nl
//   FORM_FROM       (optioneel) afzender, standaard "KIJK62 <formulier@kijk62.nl>"
//                               (het domein van de afzender moet in Resend geverifieerd zijn)
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clean = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("origin");
  if (origin) { try { if (new URL(origin).host !== new URL(request.url).host) return json({ ok: false }, 403); } catch (e) { return json({ ok: false }, 403); } }
  let d;
  try { d = await request.json(); } catch (e) { return json({ ok: false }, 400); }
  if (d.website) return json({ ok: true }); // honeypot: bots vullen dit veld
  const replyTo = clean(d.replyTo, 200), subject = clean(d.subject, 200), name = clean(d.name, 120);
  const body = String(d.body == null ? "" : d.body).slice(0, 12000);
  const en = d.lang === "en";
  if (!EMAIL.test(replyTo) || !subject || !body || !name) return json({ ok: false, error: "invalid" }, 400);
  if (!env.RESEND_API_KEY) return json({ ok: false, error: "not-configured" }, 500);

  const to = env.FORM_TO || "info@kijk62.nl";
  const from = env.FORM_FROM || "KIJK62 <formulier@kijk62.nl>";
  const send = (payload) => fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "authorization": "Bearer " + env.RESEND_API_KEY, "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const r = await send({ from, to: [to], reply_to: replyTo, subject, text: body });
  if (!r.ok) return json({ ok: false, error: "send-failed" }, 502);

  // bevestiging naar de klant; mislukt dit, dan blijft de aanvraag gewoon geldig
  const intro = en
    ? "Thank you for your request at KIJK62. We have received it and will get back to you within one working day.\n\nYour details:\n\n"
    : "Bedankt voor je aanvraag bij KIJK62. We hebben hem ontvangen en nemen binnen één werkdag contact met je op.\n\nJouw gegevens:\n\n";
  try {
    await send({ from, to: [replyTo], reply_to: to, subject: (en ? "We received your request: " : "We hebben je aanvraag ontvangen: ") + subject, text: intro + body });
  } catch (e) {}
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false }, 405);
