import {z} from 'zod';

export const appointmentSchema=z.object({
  name:z.string().trim().min(2).max(80),
  phone:z.string().trim().regex(/^[0-9 +()\-]{10,16}$/),
  concern:z.string().trim().min(2).max(120),
  preferredDate:z.string().date().optional().or(z.literal('')),
});

export type AppointmentInput=z.infer<typeof appointmentSchema>;
