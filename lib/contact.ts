export const clinicPhone="+91 92170 02598";
export const clinicWhatsappNumber=clinicPhone.replace(/\D/g,"");

export function normalizePhone(phone:string){
  return phone.replace(/\D/g,"");
}

export function buildWhatsAppUrl(message:string){
  return "https://wa.me/"+clinicWhatsappNumber+"?text="+encodeURIComponent(message);
}

export function buildAppointmentWhatsAppMessage(input:{name:string;phone:string;concern:string;preferredDate?:string}){
  return "Hello Dr. Mugdha Mohan’s clinic, I would like to request a consultation.\nName: "+input.name+"\nPhone: "+input.phone+"\nConcern: "+input.concern+(input.preferredDate?"\nPreferred date: "+input.preferredDate:"");
}
