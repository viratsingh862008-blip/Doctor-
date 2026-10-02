import {describe,it,expect} from 'vitest';
import {appointmentEmailHtml,appointmentEmailText,appointmentEmailSubject} from '../lib/email';

describe('appointment enquiry email templates',()=>{
  const enquiry={name:'Aarav Kumar',phone:'+91 98765 43210',concern:'Acne & acne scars',preferredDate:'2026-10-08'};

  it('renders a professional branded HTML enquiry email with escaped patient data',()=>{
    const html=appointmentEmailHtml({...enquiry,name:'Aarav <script>'});
    expect(html).toContain('Dr. Mugdha Mohan');
    expect(html).toContain('New Consultation Enquiry');
    expect(html).toContain('Aarav &lt;script&gt;');
    expect(html).toContain('Acne &amp; acne scars');
    expect(html).toContain('2026-10-08');
  });

  it('provides a readable plain-text fallback',()=>{
    const text=appointmentEmailText(enquiry);
    expect(text).toContain('NEW CONSULTATION ENQUIRY');
    expect(text).toContain('Patient: Aarav Kumar');
    expect(text).toContain('Phone: +91 98765 43210');
    expect(text).toContain('Concern: Acne & acne scars');
  });

  it('creates a patient-specific subject line',()=>{
    expect(appointmentEmailSubject(enquiry.name)).toBe('New Consultation Enquiry — Aarav Kumar | Dr. Mugdha Mohan');
  });
});
