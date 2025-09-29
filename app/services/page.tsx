'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Camera, 
  BarChart3, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/components/ModalProvider'

const services = [
  {
    id: 'social-media-management',
    icon: Users,
    title: 'Social Media Management',
    subtitle: 'Complete platform management and growth strategies',
    description: 'Transform your social media presence with our comprehensive management services. We handle everything from content creation to community engagement, ensuring your brand maintains a consistent and engaging voice across all platforms.',
    image: '/api/placeholder/600/400',
    features: [
      'Platform optimization and setup',
      'Content creation and curation',
      'Community management and engagement',
      'Analytics and performance reporting',
      'Brand voice development',
      'Hashtag research and strategy',
      'Competitor analysis',
      'Crisis management protocols'
    ],
    benefits: [
      'Increased brand awareness and reach',
      'Higher engagement rates',
      'Consistent brand messaging',
      'Time savings for your team',
      'Professional content quality',
      'Data-driven growth strategies'
    ],
    pricing: 'Starting at $2,500/month',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'paid-advertising',
    icon: Target,
    title: 'Paid Social Advertising',
    subtitle: 'ROI-focused advertising campaigns that convert',
    description: 'Maximize your advertising spend with our strategic approach to paid social media. We create, manage, and optimize campaigns across all major platforms to ensure maximum return on investment and measurable business growth.',
    image: '/api/placeholder/600/400',
    features: [
      'Facebook and Instagram ads',
      'LinkedIn advertising campaigns',
      'TikTok and YouTube ads',
      'Campaign optimization and scaling',
      'A/B testing and analytics',
      'Audience research and targeting',
      'Creative development',
      'Landing page optimization'
    ],
    benefits: [
      'Higher conversion rates',
      'Lower cost per acquisition',
      'Improved targeting precision',
      'Scalable campaign performance',
      'Detailed ROI tracking',
      'Professional ad creative'
    ],
    pricing: 'Starting at $3,500/month',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'content-creation',
    icon: Camera,
    title: 'Content Creation',
    subtitle: 'Professional visual content that tells your story',
    description: 'Elevate your brand with high-quality visual content that captures attention and drives engagement. Our creative team produces professional photography, videography, and graphic design that aligns with your brand identity.',
    image: '/api/placeholder/600/400',
    features: [
      'Professional photography and videography',
      'Graphic design and brand assets',
      'Copywriting and content strategy',
      'Brand storytelling and messaging',
      'User-generated content campaigns',
      'Content calendar planning',
      'Video editing and production',
      'Infographic design'
    ],
    benefits: [
      'Professional brand image',
      'Higher engagement rates',
      'Consistent visual identity',
      'Improved brand storytelling',
      'Content that converts',
      'Time-efficient production'
    ],
    pricing: 'Starting at $2,000/month',
    color: 'from-emerald-500 to-teal-400'
  },
  {
    id: 'strategy-consulting',
    icon: BarChart3,
    title: 'Strategy & Consulting',
    subtitle: 'Data-driven insights for accelerated growth',
    description: 'Get expert guidance and strategic direction for your social media marketing efforts. Our consulting services provide actionable insights and comprehensive strategies to optimize your social media presence and drive business results.',
    image: '/api/placeholder/600/400',
    features: [
      'Social media audits',
      'Competitor analysis and research',
      'Brand positioning and voice development',
      'Growth strategy development',
      'Performance tracking and optimization',
      'Platform-specific strategies',
      'Team training and workshops',
      'Monthly strategy sessions'
    ],
    benefits: [
      'Clear strategic direction',
      'Competitive advantage',
      'Optimized resource allocation',
      'Improved team capabilities',
      'Data-driven decision making',
      'Faster goal achievement'
    ],
    pricing: 'Starting at $1,500/month',
    color: 'from-orange-500 to-red-400'
  }
]

export default function ServicesPage() {
  const { openGetStartedModal } = useModal()

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
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-400/30 mb-6">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Our Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Comprehensive{' '}
              <span className="text-gradient">Social Media Marketing</span>
              {' '}Services
            </h1>
            
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              From strategy to execution, we provide end-to-end social media marketing 
              solutions that drive real business results and accelerate your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Content */}
                    <div className={isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}>
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {service.title}
                      </h2>
                      
                      <p className="text-lg text-cyan-400 mb-6">
                        {service.subtitle}
                      </p>
                      
                      <p className="text-purple-200 mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Key Features:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-3">
                              <CheckCircle className={`h-5 w-5 bg-gradient-to-r ${service.color} rounded-full p-1 text-white flex-shrink-0`} />
                              <span className="text-sm text-purple-200">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Benefits:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center space-x-3">
                              <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0" />
                              <span className="text-sm text-purple-200">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div>
                          <div className="text-2xl font-bold text-gradient mb-1">
                            {service.pricing}
                          </div>
                          <div className="text-sm text-purple-300">
                            Custom packages available
                          </div>
                        </div>
                        
                        <Button onClick={openGetStartedModal}>
                          Get Started
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={isEven ? 'lg:pl-8' : 'lg:pr-8 lg:col-start-1'}>
                      <div className="relative">
                        <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30">
                          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`} />
                          <div className="absolute inset-0 bg-[url('/api/placeholder/600/400')] bg-cover bg-center opacity-50" />
                          
                          {/* Overlay Content */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Icon className="h-16 w-16 text-white mb-4 mx-auto" />
                              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating Element */}
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 2, -2, 0]
                          }}
                          transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800/50 to-purple-900/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s create a custom social media strategy that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" onClick={openGetStartedModal}>
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="secondary">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}