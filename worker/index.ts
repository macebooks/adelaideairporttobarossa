// Cloudflare Worker: booking endpoint + static-asset fallthrough.
// POST /api/booking -> validate, notify business + auto-reply customer via SMTP2GO.
// Every other request -> env.ASSETS.fetch (the static Astro site in ./dist).
// Secrets/config: SMTP2GO_API_KEY (secret / .dev.vars), EMAIL_FROM, EMAIL_CC ([vars] / .dev.vars).
// EMAIL_CC accepts a comma-separated list — every address gets the booking notification.
// EMAIL_REPLY_TO is the business address customers reach when they reply to the auto-reply.

interface Env {
  SMTP2GO_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_CC: string;
  EMAIL_REPLY_TO: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  flight?: string;
  date?: string;
  passengers?: string;
  dropoff?: string;
  notes?: string;
  website?: string; // honeypot — real users never fill this
}

const ALLOWED_DROPOFFS = [
  'Cellar door (Barossa)',
  'Hotel / accommodation',
  'Town centre (Tanunda, Nuriootpa…)',
  'Not sure yet',
];

const BUSINESS = 'Adelaide Airport to Barossa';
const SITE = 'adelaideairporttobarossa.com.au';
const PHONE_DISPLAY = '0447 958 346';
const PHONE_HREF = '+61447958346';

// Simple per-IP rate limiting (in-memory, per isolate)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function sendEmail(
  env: Env,
  to: string | string[],
  subject: string,
  html: string,
  replyTo?: string
): Promise<boolean> {
  const apiKey = env.SMTP2GO_API_KEY;
  const fromEmail = env.EMAIL_FROM;
  const recipients = (Array.isArray(to) ? to : [to]).map((a) => a.trim()).filter(Boolean);

  if (!apiKey || !fromEmail) {
    console.error('Missing SMTP2GO configuration');
    return false;
  }

  if (!recipients.length) {
    console.error('No recipients for email:', subject);
    return false;
  }

  try {
    const payload: Record<string, unknown> = {
      api_key: apiKey,
      to: recipients,
      sender: fromEmail,
      subject: subject,
      html_body: html,
    };

    if (replyTo) {
      payload.custom_headers = [{ header: 'Reply-To', value: replyTo }];
    }

    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SMTP2GO API error:', errorText);
      return false;
    }

    // SMTP2GO reports `succeeded` as a COUNT of accepted recipients, not a boolean.
    const result = (await response.json()) as { data?: { succeeded?: number } };
    const succeeded = result.data?.succeeded ?? 0;
    if (succeeded < recipients.length) {
      console.error(`Partial send: ${succeeded}/${recipients.length} accepted for "${subject}"`);
    }
    return succeeded > 0;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

function row(label: string, value: string, shaded: boolean): string {
  return `<tr${shaded ? ' style="background: #f5f5f5;"' : ''}>
    <td style="padding: 12px; border: 1px solid #ddd; width: 150px;"><strong>${label}</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">${value}</td>
  </tr>`;
}

function generateBookingEmailHtml(data: BookingData): string {
  const rows = [
    row('Name', escapeHtml(data.name), true),
    row('Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`, false),
    row('Phone', `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>`, true),
    row('Flight no.', escapeHtml(data.flight || 'Not provided'), false),
    row('Arrival date', escapeHtml(data.date || 'Not provided'), true),
    row('Passengers', escapeHtml(data.passengers || 'Not provided'), false),
    row('Drop-off', escapeHtml(data.dropoff || 'Not provided'), true),
    row('Notes', escapeHtml(data.notes || 'Not provided'), false),
  ].join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Transfer Booking Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #241E1B; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2F5233; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #F3ECDD; margin: 0; font-size: 20px;">New Transfer Booking Request</h1>
  </div>

  <div style="background: #F3ECDD; padding: 25px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-top: 0;"><strong>A new airport transfer request has come in from ${SITE}.</strong></p>

    <table style="width: 100%; border-collapse: collapse; background: #FBF7EE; border-radius: 8px;">
      ${rows}
    </table>

    <p style="margin-top: 20px; padding: 15px; background: #FFFBE6; border-left: 4px solid #E8A33D; border-radius: 8px;">
      <strong>Tip:</strong> Reply directly to this email to quote the customer their flat fare.
    </p>
  </div>

  <div style="text-align: center; padding: 15px; color: #666; font-size: 12px;">
    <p>Sent from the ${escapeHtml(BUSINESS)} website booking form.</p>
  </div>
</body>
</html>
`;
}

function generateAutoReplyHtml(name: string, date?: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Transfer Request Has Been Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #241E1B; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2F5233; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #F3ECDD; margin: 0; font-size: 24px;">Booking Request Received</h1>
    <p style="color: rgba(243,236,221,0.9); margin: 10px 0 0 0;">${escapeHtml(BUSINESS)}</p>
  </div>

  <div style="background: #F3ECDD; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Hi ${escapeHtml(name)},</p>

    <p>Thanks for your Adelaide Airport to Barossa transfer request${
      date ? ` for <strong>${escapeHtml(date)}</strong>` : ''
    }. We've got your details and will reply with a flat fare and pick-up instructions, usually within a few hours.</p>

    <div style="background: #FBF7EE; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #E8A33D;">
      <h3 style="margin-top: 0; color: #241E1B;">Flying in within 24 hours?</h3>
      <p style="margin-bottom: 0;">Call us so we can confirm your car straight away:</p>
      <p style="font-size: 24px; font-weight: bold; margin: 15px 0;">
        <a href="tel:${PHONE_HREF}" style="color: #7A2C3B; text-decoration: none;">${PHONE_DISPLAY}</a>
      </p>
    </div>

    <p>We track your flight, so a delayed landing is not a problem — your driver waits.</p>

    <p>Cheers,<br><strong>${escapeHtml(BUSINESS)}</strong></p>
  </div>

  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>${escapeHtml(BUSINESS)}<br>
    Barossa Valley, South Australia<br>
    <a href="https://${SITE}" style="color: #7A2C3B;">${SITE}</a></p>
  </div>
</body>
</html>
`;
}

async function handleBooking(request: Request, env: Env): Promise<Response> {
  const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (isRateLimited(clientIp)) {
    return json(429, { error: 'Too many requests. Please wait a moment and try again.' });
  }

  let data: BookingData;
  try {
    data = (await request.json()) as BookingData;
  } catch {
    return json(400, { error: 'Invalid request body.' });
  }

  // Honeypot filled -> pretend success, send nothing.
  if (data.website) {
    return json(200, { success: true });
  }

  if (!data.name || !data.email || !data.phone || !data.date) {
    return json(400, {
      error: 'Please fill in all required fields: name, email, phone and arrival date.',
    });
  }

  if (data.dropoff && !ALLOWED_DROPOFFS.includes(data.dropoff)) {
    return json(400, { error: 'Please select a valid drop-off option.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return json(400, { error: 'Please enter a valid email address.' });
  }

  if (
    data.name.length > 100 ||
    data.email.length > 200 ||
    data.phone.length > 40 ||
    (data.flight || '').length > 40 ||
    (data.date || '').length > 40 ||
    (data.passengers || '').length > 20 ||
    (data.dropoff || '').length > 100 ||
    (data.notes || '').length > 5000
  ) {
    return json(400, { error: 'One of the fields is too long. Please shorten it and try again.' });
  }

  // EMAIL_CC is a comma-separated list; fall back to the sender if it's unset.
  const recipients = (env.EMAIL_CC || env.EMAIL_FROM)
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);

  const notificationSent = await sendEmail(
    env,
    recipients,
    `[ADL→Barossa] Transfer request: ${data.name} — ${data.date || 'date TBC'}`,
    generateBookingEmailHtml(data),
    data.email
  );

  if (!notificationSent) {
    console.error('Failed to send booking notification');
    return json(500, {
      error: `Failed to send your request. Please try again or call ${PHONE_DISPLAY}.`,
    });
  }

  // Reply-To the business inbox, so a customer replying to the auto-reply reaches a
  // monitored mailbox rather than the SMTP2GO sender address.
  const businessReplyTo = env.EMAIL_REPLY_TO || recipients[0];

  await sendEmail(
    env,
    data.email,
    `Your ${BUSINESS} transfer request has been received`,
    generateAutoReplyHtml(data.name, data.date),
    businessReplyTo
  );

  return json(200, { success: true, message: 'Request received. We will confirm shortly.' });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/booking') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      if (request.method !== 'POST') {
        return json(405, { error: 'Method Not Allowed' });
      }
      return handleBooking(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
