import {describe,it,expect,afterEach} from 'vitest';
import {getResend,getSupabaseAdmin} from '../lib/server-clients';

const original={...process.env};

afterEach(()=>{process.env={...original}});

describe('server integrations',()=>{
  it('keeps the appointment route server imports resolvable from app/api/appointment',async()=>{
    const route=await import('../app/api/appointment/route');
    expect(typeof route.POST).toBe('function');
    const condition=await import('../app/conditions/[slug]/page');
    expect(typeof condition.default).toBe('function');
    expect(typeof condition.generateStaticParams).toBe('function');
  });
  it('does not require production secrets just to import the module',()=>{
    expect(typeof getSupabaseAdmin).toBe('function');
    expect(typeof getResend).toBe('function');
  });

  it('fails lazily when Supabase credentials are missing',()=>{
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(()=>getSupabaseAdmin()).toThrow('Missing Supabase server environment variables');
  });

  it('fails lazily when Resend credentials are missing',()=>{
    delete process.env.RESEND_API_KEY;
    expect(()=>getResend()).toThrow('Missing RESEND_API_KEY');
  });
});
