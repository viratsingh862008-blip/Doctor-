const WEBHOOK_SECRET = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
const DEFAULT_RECIPIENT = PropertiesService.getScriptProperties().getProperty('RECIPIENT_EMAIL');

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Missing request body' }, 400);
    }

    const payload = JSON.parse(e.postData.contents);

    if (!WEBHOOK_SECRET || payload.secret !== WEBHOOK_SECRET) {
      return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
    }

    const to = String(DEFAULT_RECIPIENT || payload.to || '').trim();
    const subject = String(payload.subject || '').trim();
    const text = String(payload.text || '');
    const html = String(payload.html || '');

    if (!to || !subject || !text || !html) {
      return jsonResponse({ ok: false, error: 'Incomplete email payload' }, 400);
    }

    GmailApp.sendEmail(to, subject, text, {
      htmlBody: html,
      name: 'Dr. Mugdha Mohan Clinic',
    });

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    console.error('gmail_webhook_failed', error);
    return jsonResponse({ ok: false, error: 'Unable to send email' }, 500);
  }
}

function jsonResponse(body, status) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
