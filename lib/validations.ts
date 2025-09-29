import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  businessEmail: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters'),
  companyWebsite: z.string()
    .url('Please enter a valid website URL')
    .min(8, 'Website URL must be at least 8 characters'),
  primaryInterest: z.string()
    .min(1, 'Please select your primary interest'),
  monthlyBudget: z.string()
    .min(1, 'Please select your monthly budget range'),
  reason: z.string()
    .min(10, 'Please provide at least 10 characters describing your needs')
    .max(500, 'Description must be less than 500 characters')
})

export const subscribeFormSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type SubscribeFormData = z.infer<typeof subscribeFormSchema>

export const primaryInterestOptions = [
  { value: 'social-media-management', label: 'Social Media Management' },
  { value: 'paid-social-advertising', label: 'Paid Social Advertising' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'strategy-consulting', label: 'Strategy & Consulting' },
  { value: 'full-service-package', label: 'Full-Service Package' },
  { value: 'not-sure', label: 'Not Sure Yet' }
]

export const monthlyBudgetOptions = [
  { value: 'under-2500', label: 'Under $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-25000', label: '$10,000 - $25,000' },
  { value: '25000-50000', label: '$25,000 - $50,000' },
  { value: '50000-plus', label: '$50,000+' },
  { value: 'prefer-to-discuss', label: 'Prefer to Discuss' }
]