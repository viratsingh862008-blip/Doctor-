import {describe,it,expect} from 'vitest';
import {appointmentSchema} from '../lib/appointment-schema';

describe('appointment enquiry contract',()=>{
  it('accepts a valid enquiry',()=>expect(appointmentSchema.safeParse({name:'Aarav Kumar',phone:'9876543210',concern:'Acne'}).success).toBe(true));
  it('rejects malformed phone',()=>expect(appointmentSchema.safeParse({name:'Aarav Kumar',phone:'123',concern:'Acne'}).success).toBe(false));
  it('rejects empty concern',()=>expect(appointmentSchema.safeParse({name:'Aarav Kumar',phone:'9876543210',concern:''}).success).toBe(false));
  it('rejects malformed preferred dates',()=>expect(appointmentSchema.safeParse({name:'Aarav Kumar',phone:'9876543210',concern:'Acne',preferredDate:'not-a-date'}).success).toBe(false));
  it('accepts an ISO preferred date',()=>expect(appointmentSchema.safeParse({name:'Aarav Kumar',phone:'9876543210',concern:'Acne',preferredDate:'2026-10-10'}).success).toBe(true));
});
