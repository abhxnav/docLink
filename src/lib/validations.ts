import { z } from 'zod'

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .max(50, 'Username must be less than 50 characters.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      'Please enter a valid phone number.'
    ),
})

export type UserFormData = z.infer<typeof UserFormValidation>
