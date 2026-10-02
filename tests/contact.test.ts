import {describe,it,expect} from 'vitest';
import {buildAppointmentWhatsAppMessage} from '../lib/contact';

describe('appointment WhatsApp handoff',()=>{
  it('builds a complete enquiry message for the clinic',()=>{
    const message=buildAppointmentWhatsAppMessage({
      name:'Aarav Kumar',
      phone:'+91 98765 43210',
      concern:'Acne & acne scars',
      preferredDate:'2026-10-08',
    });
    expect(message).toContain('Name: Aarav Kumar');
    expect(message).toContain('Phone: +91 98765 43210');
    expect(message).toContain('Concern: Acne & acne scars');
    expect(message).toContain('Preferred date: 2026-10-08');
  });
});
