'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Zap, 
  MessageCircle, 
  Scale,
  Award,
  Clock
} from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'Results-Driven Approach',
    description: 'We focus on metrics that matter - engagement, conversions, and ROI. Every campaign is optimized for measurable business growth.',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: Zap,
    title: 'Startup Mindset',
    description: 'We move fast, think creatively, and adapt quickly. Our agile approach ensures your brand stays ahead of social media trends.',
    color: 'from-yellow-500 to-orange-400'
  },
  {
    icon: MessageCircle,
    title: 'Transparent Communication',
    description: 'Regular reports, open communication, and full transparency. You\'ll always know exactly how your campaigns are performing.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Scale,
    title: 'Scalable Solutions',
    description: 'Whether you\'re a startup or enterprise, our strategies scale with your business growth and evolving needs.',
    color: 'from-purple-500 to-pink-400'
  }
]

const stats = [
  {
    icon: Award,
    value: '98%',
    label: 'Client Satisfaction Rate',
    description: 'Consistently delivering exceptional results'
  },
  {
    icon: Clock,
    value: '24h',
    label: 'Average Response Time',
    description: 'Quick support when you need it most'
  },
  {
    icon: TrendingUp,
    value: '150%',
    label: 'Average Growth Rate',
    description: 'Accelerated social media performance'
  }
]

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Partner with{' '}
            <span className="text-gradient">Waverix</span>?
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            We combine creativity with data-driven strategies to deliver social media 
            marketing that actually moves the needle for your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-purple-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Proven Track Record
            </h3>
            <p className="text-purple-200 max-w-2xl mx-auto">
              Our commitment to excellence is reflected in the results we deliver 
              and the relationships we build with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  
                  <div className="text-lg font-medium text-white mb-2">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-purple-300">
                    {stat.description}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}