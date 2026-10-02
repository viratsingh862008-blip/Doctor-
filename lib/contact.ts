export const clinicPhone="+91 92170 02598";
export const clinicWhatsappNumber=clinicPhone.replace(/\D/g,"");

export function normalizePhone(phone:string){
  return phone.replace(/\D/g,"");
}

export function buildWhatsAppUrl(message:string){
  return "https://wa.me/"+clinicWhatsappNumber+"?text="+encodeURIComponent(message);
}
