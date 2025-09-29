'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Camera, 
  BarChart3, 
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const services = [
  {
    icon: Users,
    title: 'Social Media Management',
    description: 'Complete social media strategy, content creation, and community management across all major platforms.',
    features: ['Content Planning & Creation', 'Community Engagement', 'Brand Voice Development', 'Performance Analytics'],
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Target,
    title: 'Paid Social Advertising',
    description: 'Strategic ad campaigns that convert. We optimize for maximum ROI across Facebook, Instagram, LinkedIn, and more.',
    features: ['Campaign Strategy & Setup', 'A/B Testing & Optimization', 'Audience Targeting', 'ROI Tracking'],
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: Camera,
    title: 'Content Creation',
    description: 'Professional visual content that tells your brand story and engages your audience effectively.',
    features: ['Photography & Videography', 'Graphic Design', 'Brand Asset Creation', 'Content Strategy'],
    color: 'from-emerald-500 to-teal-400'
  },
  {
    icon: BarChart3,
    title: 'Strategy & Consulting',
    description: 'Data-driven insights and strategic guidance to accelerate your social media growth and brand presence.',
    features: ['Social Media Audits', 'Competitor Analysis', 'Growth Strategy', 'Performance Optimization'],
    color: 'from-orange-500 to-red-400'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-400/30 mb-6">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Our Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Dominate Social Media</span>
          </h2>
          
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            From strategy to execution, we provide comprehensive social media marketing 
            services that drive engagement, growth, and conversions for your brand.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-purple-200 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3 text-sm text-purple-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium group-hover:translate-x-1 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Ready to Transform Your Social Media Presence?
            </h3>
            <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s create a custom strategy that aligns with your business goals 
              and drives measurable results across all social platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg">
                View All Services
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="secondary">
                Get Free Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}