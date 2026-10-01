import {Resend} from 'resend';
const key=process.env.RESEND_API_KEY;
if(!key) throw new Error('Missing RESEND_API_KEY');
export const resend=new Resend(key);
