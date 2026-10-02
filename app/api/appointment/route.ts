import {NextResponse} from 'next/server';
import {appointmentSchema} from '../../../lib/appointment-schema';
import {getSupabaseAdmin,getResend} from '../../../lib/server-clients';
import {appointmentEmailHtml,appointmentEmailSubject,appointmentEmailText} from '../../../lib/email';
import {buildWhatsAppUrl} from '../../../lib/contact';

const clinicNotificationEmail=process.env.CLINIC_NOTIFICATION_EMAIL||'easypzbuisness@gmail.com';

export async function POST(request:Request){
  try{
    const parsed=appointmentSchema.safeParse(await request.json());
    if(!parsed.success)return NextResponse.json({error:{code:'VALIDATION_ERROR',message:'Please check the enquiry details.'}},{status:422});

    const {name,phone,concern,preferredDate}=parsed.data;
    const supabaseAdmin=getSupabaseAdmin();
    const {data:row,error:dbError}=await supabaseAdmin
      .from('appointment_enquiries')
      .insert({name,phone,concern,preferred_date:preferredDate||null,source:'website'})
      .select('id')
      .single();

    if(dbError||!row)return NextResponse.json({error:{code:'DATABASE_ERROR',message:'We could not save your enquiry. Please use WhatsApp instead.'}},{status:500});

    let emailSent=false;
    const from=process.env.RESEND_FROM_EMAIL;
    if(clinicNotificationEmail&&from){
      const {error:emailError}=await getResend().emails.send({
        from,
        to:[clinicNotificationEmail],
        subject:appointmentEmailSubject(name),
        html:appointmentEmailHtml({name,phone,concern,preferredDate}),
        text:appointmentEmailText({name,phone,concern,preferredDate})
      });
      emailSent=!emailError;
      await supabaseAdmin.from('appointment_enquiries').update({email_sent:emailSent,updated_at:new Date().toISOString()}).eq('id',row.id);
    }

    const message='Hello Dr. Mugdha Mohan’s clinic, I would like to request a consultation.\\nName: '+name+'\\nPhone: '+phone+'\\nConcern: '+concern+(preferredDate?'\\nPreferred date: '+preferredDate:'');
    return NextResponse.json({ok:true,id:row.id,emailSent,whatsappUrl:buildWhatsAppUrl(message)});
  }catch(error){
    console.error('appointment_enquiry_failed',error);
    return NextResponse.json({error:{code:'SERVER_ERROR',message:'Something went wrong. Please use WhatsApp instead.'}},{status:500});
  }
}
