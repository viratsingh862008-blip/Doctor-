import {describe,it,expect} from 'vitest';
import {buildGmailWebhookPayload} from '../lib/gmail-webhook';

describe('Gmail webhook payload',()=>{
  const enquiry={name:'Aarav Kumar',phone:'+91 98765 43210',concern:'Acne & acne scars',preferredDate:'2026-10-08'};

  it('builds a secret-protected payload with the existing professional email content',()=>{
    const payload=buildGmailWebhookPayload('test-secret',enquiry);
    expect(payload.secret).toBe('test-secret');
    expect(payload.subject).toBe('New Consultation Enquiry — Aarav Kumar | Dr. Mugdha Mohan');
    expect(payload.text).toContain('Patient: Aarav Kumar');
    expect(payload.html).toContain('Acne &amp; acne scars');
  });

  it('does not require a professional-domain sender address',()=>{
    const payload=buildGmailWebhookPayload('test-secret',enquiry);
    expect(payload.to).toBe('easypzbuisness@gmail.com');
  });
});
