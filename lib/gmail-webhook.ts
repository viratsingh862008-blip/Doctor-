import {appointmentEmailHtml,appointmentEmailSubject,appointmentEmailText} from './email';

export type GmailWebhookEnquiry = {
  name:string;
  phone:string;
  concern:string;
  preferredDate?:string;
};

export function buildGmailWebhookPayload(secret:string,input:GmailWebhookEnquiry,to='easypzbuisness@gmail.com'){
  return {
    secret,
    to,
    subject:appointmentEmailSubject(input.name),
    text:appointmentEmailText(input),
    html:appointmentEmailHtml(input),
  };
}

export async function sendGmailWebhook(
  webhookUrl:string,
  secret:string,
  input:GmailWebhookEnquiry,
  to='easypzbuisness@gmail.com',
){
  const response=await fetch(webhookUrl,{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify(buildGmailWebhookPayload(secret,input,to)),
    cache:'no-store',
  });

  if(!response.ok){
    throw new Error(`Gmail webhook returned HTTP ${response.status}`);
  }

  return response.json() as Promise<{ok:boolean}>;
}
