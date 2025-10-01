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
  phoneNumber: z.string()
    .refine(val => {
      if (!val || val.trim() === '') return true // Allow empty
      // Remove all non-digit characters for validation
      const digits = val.replace(/\D/g, '')
      return digits.length === 10
    }, 'Phone number must be a valid 10-digit US number (e.g., 555-123-4567)')
    .optional(),
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  industry: z.string()
    .min(1, 'Please select your industry'),
  companySize: z.string()
    .min(1, 'Please select your company size'),
  currentChallenges: z.string()
    .min(1, 'Please describe your current challenges'),
  interestedServices: z.string()
    .min(1, 'Please select the services you\'re interested in'),
  budget: z.string()
    .min(1, 'Please select your budget range'),
  additionalInfo: z.string()
    .max(1000, 'Additional info must be less than 1000 characters')
    .optional()
})

export const subscribeFormSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type SubscribeFormData = z.infer<typeof subscribeFormSchema>

export const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'education', label: 'Education' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Professional Services' },
  { value: 'other', label: 'Other' }
]

export const companySizeOptions = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small Business (11-50 employees)' },
  { value: 'medium', label: 'Medium Business (51-200 employees)' },
  { value: 'large', label: 'Large Business (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
]

export const interestedServicesOptions = [
  { value: 'social-media-management', label: 'Social Media Management' },
  { value: 'paid-social-advertising', label: 'Paid Social Advertising' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'strategy-consulting', label: 'Strategy & Consulting' },
  { value: 'full-service-package', label: 'Full-Service Package' },
  { value: 'not-sure', label: 'Not Sure Yet' }
]

export const budgetOptions = [
  { value: 'under-2500', label: 'Under $2,500/month' },
  { value: '2500-5000', label: '$2,500 - $5,000/month' },
  { value: '5000-10000', label: '$5,000 - $10,000/month' },
  { value: '10000-25000', label: '$10,000 - $25,000/month' },
  { value: '25000-50000', label: '$25,000 - $50,000/month' },
  { value: '50000-plus', label: '$50,000+/month' },
  { value: 'prefer-to-discuss', label: 'Prefer to Discuss' }
]