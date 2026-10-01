import {NextResponse} from 'next/server';
import {appointmentSchema} from '../../../lib/appointment-schema';
import {getSupabaseAdmin,getResend} from '../../../lib/server-clients';
import {appointmentEmailHtml} from '../../../lib/email';

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
    const notificationEmail=process.env.CLINIC_NOTIFICATION_EMAIL;
    const from=process.env.RESEND_FROM_EMAIL;
    if(notificationEmail&&from){
      const {error:emailError}=await getResend().emails.send({
        from,
        to:[notificationEmail],
        subject:'New dermatology consultation enquiry',
        html:appointmentEmailHtml({name,phone,concern,preferredDate}),
        text:[`New consultation enquiry`,`Name: ${name}`,`Phone: ${phone}`,`Concern: ${concern}`,`Preferred date: ${preferredDate||'Not specified'}`].join('\\n')
      });
      emailSent=!emailError;
      await supabaseAdmin.from('appointment_enquiries').update({email_sent:emailSent,updated_at:new Date().toISOString()}).eq('id',row.id);
    }

    const message='Hello Dr. Mugdha Mohan’s clinic, I would like to request a consultation.\\nName: '+name+'\\nPhone: '+phone+'\\nConcern: '+concern+(preferredDate?'\\nPreferred date: '+preferredDate:'');
    return NextResponse.json({ok:true,id:row.id,emailSent,whatsappUrl:'https://wa.me/919217002598?text='+encodeURIComponent(message)});
  }catch(error){
    console.error('appointment_enquiry_failed',error);
    return NextResponse.json({error:{code:'SERVER_ERROR',message:'Something went wrong. Please use WhatsApp instead.'}},{status:500});
  }
}
