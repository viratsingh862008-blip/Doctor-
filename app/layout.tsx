import type {Metadata} from 'next';
import './globals.css';

export const metadata:Metadata={
  title:{
    default:'Dr. Mugdha Mohan | MD Dermatologist in Bettiah',
    template:'%s | Dr. Mugdha Mohan',
  },
  description:'Dr. Mugdha Mohan is an MBBS, MD (Dermatology, Venereology & Leprosy) dermatologist in Bettiah. Consult for acne, hair loss, pigmentation, psoriasis, eczema, skin allergies and selected dermatological procedures.',
  keywords:['dermatologist in Bettiah','skin doctor in Bettiah','Dr Mugdha Mohan','acne doctor Bettiah','hair fall doctor Bettiah','skin specialist Bettiah','pigmentation doctor Bettiah'],
  metadataBase:new URL('https://www.drmugdhamohan.in'),
  alternates:{canonical:'/'},
  openGraph:{
    title:'Dr. Mugdha Mohan | Dermatologist in Bettiah',
    description:'Evidence-led dermatology care for skin, hair and scalp concerns in Bettiah.',
    type:'website',
    locale:'en_IN',
    siteName:'Dr. Mugdha Mohan',
    url:'https://www.drmugdhamohan.in',
  },
  twitter:{
    card:'summary_large_image',
    title:'Dr. Mugdha Mohan | Dermatologist in Bettiah',
    description:'Dermatology care for skin, hair and scalp concerns in Bettiah.',
  },
  robots:{index:true,follow:true},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
