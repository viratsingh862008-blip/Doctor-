type AppointmentEmailInput = {
  name:string;
  phone:string;
  concern:string;
  preferredDate?:string;
};

const clinicName='Dr. Mugdha Mohan';
const clinicLocation='Bettiah, Bihar';
const clinicPhone='+91 92170 02598';
const siteUrl='https://doctor-mugdamohan.vercel.app';

export function appointmentEmailSubject(name:string){
  return `New Consultation Enquiry — ${name.trim()} | ${clinicName}`;
}

export function appointmentEmailText(input:AppointmentEmailInput){
  return [
    'NEW CONSULTATION ENQUIRY',
    'Dr. Mugdha Mohan · Dermatology · Bettiah',
    '',
    'A new patient enquiry has been submitted through the clinic website.',
    '',
    `Patient: ${input.name}`,
    `Phone: ${input.phone}`,
    `Concern: ${input.concern}`,
    `Preferred date: ${input.preferredDate||'Not specified'}`,
    '',
    'Action required:',
    'Please contact the patient to confirm availability and next steps.',
    '',
    `Website: ${siteUrl}`,
    `Clinic: ${clinicName}, ${clinicLocation}`,
  ].join('\\n');
}

export function appointmentEmailHtml(input:AppointmentEmailInput){
  const name=escapeHtml(input.name);
  const phone=escapeHtml(input.phone);
  const concern=escapeHtml(input.concern);
  const preferredDate=escapeHtml(input.preferredDate||'Not specified');
  const tel=encodeURIComponent(input.phone.replace(/[^+\\d]/g,''));

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f3f1ea;font-family:Arial,Helvetica,sans-serif;color:#17241f">
  <div style="padding:32px 14px">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e3e5df;border-radius:18px;overflow:hidden">
      <div style="padding:28px 30px;background:#17241f;color:#ffffff">
        <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#cbd5cf;font-weight:700">Dr. Mugdha Mohan · Dermatology</div>
        <div style="margin-top:12px;font-family:Georgia,serif;font-size:28px;line-height:1.2">New consultation enquiry</div>
        <div style="margin-top:8px;font-size:13px;color:#dce4df">A new patient has contacted the clinic through the website.</div>
      </div>
      <div style="padding:30px">
        <div style="padding:14px 16px;background:#f7f8f5;border-left:3px solid #8d9d92;border-radius:8px;font-size:13px;color:#52615a">Please review the details below and contact the patient to confirm availability.</div>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:24px">
          <tr><td style="padding:13px 0;border-bottom:1px solid #e8ebe6;width:38%;font-size:12px;color:#7a8781">Patient name</td><td style="padding:13px 0;border-bottom:1px solid #e8ebe6;font-size:15px;font-weight:700">${name}</td></tr>
          <tr><td style="padding:13px 0;border-bottom:1px solid #e8ebe6;font-size:12px;color:#7a8781">Phone number</td><td style="padding:13px 0;border-bottom:1px solid #e8ebe6;font-size:15px;font-weight:700"><a href="tel:${tel}" style="color:#17241f;text-decoration:none">${phone}</a></td></tr>
          <tr><td style="padding:13px 0;border-bottom:1px solid #e8ebe6;font-size:12px;color:#7a8781">Primary concern</td><td style="padding:13px 0;border-bottom:1px solid #e8ebe6;font-size:15px;font-weight:700">${concern}</td></tr>
          <tr><td style="padding:13px 0;font-size:12px;color:#7a8781">Preferred date</td><td style="padding:13px 0;font-size:15px;font-weight:700">${preferredDate}</td></tr>
        </table>
        <div style="margin-top:28px">
          <a href="tel:${tel}" style="display:inline-block;background:#17241f;color:#ffffff;text-decoration:none;padding:13px 18px;border-radius:9px;font-size:13px;font-weight:700">Call patient</a>
          <a href="${siteUrl}" style="display:inline-block;margin-left:8px;background:#eef1ed;color:#17241f;text-decoration:none;padding:13px 18px;border-radius:9px;font-size:13px;font-weight:700">Open website</a>
        </div>
      </div>
      <div style="padding:20px 30px;background:#fafaf7;border-top:1px solid #e8ebe6">
        <div style="font-size:12px;font-weight:700;color:#17241f">${clinicName}</div>
        <div style="margin-top:5px;font-size:12px;color:#74817b">${clinicLocation} · ${clinicPhone}</div>
        <div style="margin-top:12px;font-size:11px;line-height:1.6;color:#8a948f">This is an automated notification from the clinic website. Please do not treat this email as a confirmed appointment; availability should be confirmed with the patient.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(value:string){
  return value.replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]||c));
}
