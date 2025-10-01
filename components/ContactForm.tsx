'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { contactFormSchema, type ContactFormData, industryOptions, companySizeOptions, interestedServicesOptions, budgetOptions } from '@/lib/validations'

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      businessEmail: '',
      companyName: '',
      industry: '',
      companySize: '',
      currentChallenges: '',
      interestedServices: '',
      budget: '',
      additionalInfo: ''
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'contact_form'
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }
      
      console.log('Form submitted successfully:', result)
      setIsSubmitted(true)
      reset()
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Submission error:', error)
      // You could add error state handling here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center"
      >
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">
          Message Sent Successfully!
        </h3>
        <p className="text-purple-200 leading-relaxed">
          Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        {/* Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="email"
            label="Business Email"
            placeholder="john@company.com"
            error={errors.businessEmail?.message}
            {...register('businessEmail')}
          />
          <Input
            label="Company Name"
            placeholder="Acme Corporation"
            error={errors.companyName?.message}
            {...register('companyName')}
          />
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Industry"
            placeholder="Select your industry"
            options={industryOptions}
            error={errors.industry?.message}
            {...register('industry')}
          />
          <Select
            label="Company Size"
            placeholder="Select company size"
            options={companySizeOptions}
            error={errors.companySize?.message}
            {...register('companySize')}
          />
        </div>

        {/* Project Details */}
        <Select
          label="Interested Services"
          placeholder="Select services you're interested in"
          options={interestedServicesOptions}
          error={errors.interestedServices?.message}
          {...register('interestedServices')}
        />

        {/* Budget */}
        <Select
          label="Budget Range"
          placeholder="Select your budget range"
          options={budgetOptions}
          error={errors.budget?.message}
          {...register('budget')}
        />

        {/* Current Challenges */}
        <Textarea
          label="Current Challenges"
          placeholder="Describe your current marketing challenges, goals, and what you hope to achieve..."
          error={errors.currentChallenges?.message}
          {...register('currentChallenges')}
        />

        {/* Additional Info */}
        <Textarea
          label="Additional Information (Optional)"
          placeholder="Any additional details you'd like to share..."
          error={errors.additionalInfo?.message}
          {...register('additionalInfo')}
        />

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
          icon={!isSubmitting ? <Send className="h-5 w-5" /> : undefined}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  )
}