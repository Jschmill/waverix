'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Calendar,
  Plus,
  Minus
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'hello@waverix.com',
    description: 'Send us an email and we\'ll respond within 24 hours',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+1 (555) 123-4567',
    description: 'Speak with our team Monday to Friday, 9AM-6PM PST',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Mon-Fri 9AM-6PM PST',
    description: 'We\'re here when you need us most',
    color: 'from-orange-500 to-red-400'
  }
]

const faqs = [
  {
    question: 'How quickly can you start working on our social media?',
    answer: 'We can typically begin work within 1-2 weeks of signing the agreement. This includes initial strategy development, account audits, and content planning.'
  },
  {
    question: 'What platforms do you specialize in?',
    answer: 'We work across all major social media platforms including Facebook, Instagram, LinkedIn, Twitter, TikTok, and YouTube. We recommend platforms based on your target audience and business goals.'
  },
  {
    question: 'Do you provide content creation services?',
    answer: 'Yes! We offer comprehensive content creation including professional photography, videography, graphic design, copywriting, and content strategy development.'
  },
  {
    question: 'How do you measure success?',
    answer: 'We track key performance indicators (KPIs) aligned with your business goals, including engagement rates, follower growth, website traffic, lead generation, and conversion rates.'
  },
  {
    question: 'What is your typical contract length?',
    answer: 'We offer flexible contract terms ranging from 3-12 months. Most clients see optimal results with 6-month engagements, allowing time for strategy implementation and optimization.'
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Absolutely! We collaborate seamlessly with your internal marketing team, providing training, strategy guidance, and ongoing support as needed.'
  }
]

const FAQItem: React.FC<{ faq: typeof faqs[0], index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-500/10 transition-colors"
      >
        <h3 className="text-lg font-medium text-white pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus className="h-5 w-5 text-cyan-400" />
          ) : (
            <Plus className="h-5 w-5 text-cyan-400" />
          )}
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4">
          <p className="text-purple-200 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in{' '}
              <span className="text-gradient">Touch</span>
            </h1>
            
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your social media presence? Let&apos;s discuss how we can help 
              accelerate your growth and achieve your business objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 text-center group hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {info.title}
                  </h3>
                  
                  <p className="text-cyan-400 font-medium mb-2">
                    {info.details}
                  </p>
                  
                  <p className="text-sm text-purple-300">
                    {info.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Send Us a Message
                </h2>
                <p className="text-purple-200">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
              
              <ContactForm />
            </div>

            {/* Quick Actions & FAQ */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Prefer to Talk First?
                </h3>
                
                <div className="space-y-4">
                  <Button size="lg" className="w-full">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule a Free Consultation
                  </Button>
                  
                  <Button size="lg" variant="secondary" className="w-full">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Live Chat
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg border border-blue-400/20">
                  <p className="text-sm text-cyan-300 font-medium mb-1">
                    Quick Response Guarantee
                  </p>
                  <p className="text-xs text-purple-300">
                    We respond to all inquiries within 2 hours during business hours.
                  </p>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}