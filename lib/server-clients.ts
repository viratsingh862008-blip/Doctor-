import {createClient} from '@supabase/supabase-js';
import {Resend} from 'resend';

export function getSupabaseAdmin(){
  const url=process.env.SUPABASE_URL;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key) throw new Error('Missing Supabase server environment variables');
  return createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false}});
}

export function getResend(){
  const key=process.env.RESEND_API_KEY;
  if(!key) throw new Error('Missing RESEND_API_KEY');
  return new Resend(key);
}
