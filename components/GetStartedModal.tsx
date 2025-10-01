'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, User, Globe, Target, DollarSign, MessageSquare } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select, Textarea } from '@/components/ui/Input'
import { contactFormSchema, type ContactFormData, industryOptions, companySizeOptions, interestedServicesOptions, projectTimelineOptions, budgetOptions } from '@/lib/validations'

interface GetStartedModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Business Info', icon: Globe },
  { id: 3, title: 'Project Details', icon: Target },
  { id: 4, title: 'Budget & Goals', icon: DollarSign },
]

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,

    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  })



  const handleClose = () => {
    onClose()
    // Use requestAnimationFrame for better hydration compatibility
    requestAnimationFrame(() => {
      setTimeout(() => {
        setCurrentStep(1)
        setIsSubmitted(false)
        reset()
      }, 300)
    })
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof ContactFormData)[] = []
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['firstName', 'lastName']
        break
      case 2:
        fieldsToValidate = ['businessEmail', 'companyName', 'industry', 'companySize']
        break
      case 3:
        fieldsToValidate = ['interestedServices', 'projectTimeline']
        break
      case 4:
        fieldsToValidate = ['budget', 'currentChallenges']
        break
    }

    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

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
          source: 'get_started' // This will help differentiate in the database
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }
      
      console.log('Form submitted successfully:', result)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      // You could add error state handling here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Thank You!
          </h3>
          <p className="text-purple-200 mb-6 leading-relaxed">
            We&apos;ve received your information and will get back to you within 24 hours. 
            Our team is excited to discuss how we can help grow your business!
          </p>
          <Button onClick={handleClose} className="w-full">
            Close
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Get Started"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      step.id <= currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white'
                        : 'border-purple-500/30 text-purple-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {step.id < steps.length && (
                    <div
                      className={`w-16 h-1 ml-2 transition-all ${
                        step.id < currentStep
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                          : 'bg-purple-500/30'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-medium text-white">
              {steps[currentStep - 1].title}
            </h4>
            <p className="text-sm text-purple-300">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {currentStep === 1 && (
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
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
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
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <Select
                  label="Interested Services"
                  placeholder="Select services you're interested in"
                  options={interestedServicesOptions}
                  error={errors.interestedServices?.message}
                  {...register('interestedServices')}
                />
                <Select
                  label="Project Timeline"
                  placeholder="When would you like to start?"
                  options={projectTimelineOptions}
                  error={errors.projectTimeline?.message}
                  {...register('projectTimeline')}
                />
                <div className="bg-slate-800/30 rounded-lg p-4 border border-purple-500/20">
                  <h5 className="font-medium text-white mb-2">Our Services Include:</h5>
                  <ul className="text-sm text-purple-200 space-y-1">
                    <li>• Social Media Management & Strategy</li>
                    <li>• Paid Social Advertising Campaigns</li>
                    <li>• Content Creation & Brand Assets</li>
                    <li>• Analytics & Performance Optimization</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <Select
                  label="Budget Range"
                  placeholder="Select your budget range"
                  options={budgetOptions}
                  error={errors.budget?.message}
                  {...register('budget')}
                />
                <Textarea
                  label="Current Challenges"
                  placeholder="Describe your current marketing challenges, goals, and what you hope to achieve..."
                  error={errors.currentChallenges?.message}
                  {...register('currentChallenges')}
                />
                <Textarea
                  label="Additional Information (Optional)"
                  placeholder="Any additional details you'd like to share..."
                  error={errors.additionalInfo?.message}
                  {...register('additionalInfo')}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-purple-500/20">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            icon={<ChevronLeft className="h-4 w-4" />}
          >
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              icon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isSubmitting}
              icon={!isSubmitting ? <MessageSquare className="h-4 w-4" /> : undefined}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  )
}