import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';

describe('consultation flow is WhatsApp-only',()=>{
  it('builds a WhatsApp URL containing the complete enquiry',async()=>{
    const {buildWhatsAppUrl,buildAppointmentWhatsAppMessage}=await import('../lib/contact');
    const message=buildAppointmentWhatsAppMessage({
      name:'Aarav Kumar',
      phone:'+91 98765 43210',
      concern:'Acne & acne scars',
      preferredDate:'2026-10-08',
    });
    const url=buildWhatsAppUrl(message);
    expect(url.startsWith('https://wa.me/919217002598?text=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('Name: Aarav Kumar');
    expect(decodeURIComponent(url)).toContain('Preferred date: 2026-10-08');
  });

  it('contains no mail/API submission path in the consultation UI',()=>{
    const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
    expect(page).not.toContain('/api/appointment');
    expect(page).not.toContain('emailSent');
    expect(page).not.toContain('Gmail');
    expect(page).toContain('window.location.href=whatsappUrl');
  });

  it('uses the faster scroll-reveal timing contract',()=>{
    const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
    expect(page).toContain('SCROLL_REVEAL_DURATION=.58');
    expect(page).toContain("start:'top 88%'");
  });
});
