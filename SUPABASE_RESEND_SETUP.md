# Supabase + Resend setup

## Supabase

Project: `ixewwincbdgesmpesmlq`

Created table: `public.appointment_enquiries`.

The table has RLS enabled and intentionally has no anon/authenticated policies. The Next.js server uses the Supabase service-role key to write enquiries. Never expose that key through `NEXT_PUBLIC_*`.

## Resend

The app expects:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CLINIC_NOTIFICATION_EMAIL`

The sender must use a verified domain in Resend for production sending. The currently connected Resend account has an existing domain, but it is unrelated to this doctor website, so it is intentionally not reused.

## Flow

1. Visitor submits appointment enquiry.
2. Next.js validates the payload.
3. Supabase stores the enquiry.
4. Resend emails the clinic.
5. The response returns a WhatsApp handoff URL.
6. The user can continue the conversation in WhatsApp.

## Vercel variables

Add the variables from `.env.example` to the production/preview environments. Never commit real credentials.
