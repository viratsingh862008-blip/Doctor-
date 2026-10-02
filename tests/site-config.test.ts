import {describe,it,expect} from 'vitest';
import {buildWhatsAppUrl,normalizePhone} from '../lib/contact';

describe('clinic contact helpers',()=>{
  it('normalizes the clinic phone number to digits',()=>{
    expect(normalizePhone('+91 92170 02598')).toBe('919217002598');
  });

  it('builds a WhatsApp URL with encoded patient context',()=>{
    const url=buildWhatsAppUrl('Hello Dr. Mugdha Mohan’s clinic, I would like to enquire about acne.');
    expect(url).toBe('https://wa.me/919217002598?text=Hello%20Dr.%20Mugdha%20Mohan%E2%80%99s%20clinic%2C%20I%20would%20like%20to%20enquire%20about%20acne.');
  });
});
