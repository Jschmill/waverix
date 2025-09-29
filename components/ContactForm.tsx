'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { contactFormSchema, type ContactFormData, primaryInterestOptions, monthlyBudgetOptions } from '@/lib/validations'

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
    mode: 'onChange'
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would normally send data to your API endpoint
      console.log('Form submitted:', data)
      
      setIsSubmitted(true)
      reset()
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Submission error:', error)
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
            type="url"
            label="Company Website"
            placeholder="https://company.com"
            error={errors.companyWebsite?.message}
            {...register('companyWebsite')}
          />
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Primary Interest"
            placeholder="Select your main interest"
            options={primaryInterestOptions}
            error={errors.primaryInterest?.message}
            {...register('primaryInterest')}
          />
          <Select
            label="Monthly Budget Range"
            placeholder="Select your budget range"
            options={monthlyBudgetOptions}
            error={errors.monthlyBudget?.message}
            {...register('monthlyBudget')}
          />
        </div>

        {/* Message */}
        <Textarea
          label="Project Details"
          placeholder="Tell us about your business goals, target audience, current challenges, and what you hope to achieve with social media marketing..."
          error={errors.reason?.message}
          {...register('reason')}
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