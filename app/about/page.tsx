'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Lightbulb,
  ArrowRight,
  Linkedin,
  Twitter
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/components/ModalProvider'

const values = [
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'Every strategy we develop is designed with one goal in mind: delivering measurable results that drive your business forward.',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our success. We build long-term partnerships based on trust, transparency, and exceptional service.',
    color: 'from-red-500 to-pink-400'
  },
  {
    icon: Lightbulb,
    title: 'Innovation-Driven',
    description: 'We stay ahead of social media trends and leverage cutting-edge tools to keep your brand at the forefront.',
    color: 'from-yellow-500 to-orange-400'
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We work as an extension of your team, fostering open communication and collaborative decision-making.',
    color: 'from-blue-500 to-cyan-400'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Former social media director at Fortune 500 companies with 8+ years of experience in digital marketing strategy.',
    image: '/api/placeholder/300/300',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Creative Director',
    bio: 'Next-Gen creative professional specializing in visual storytelling and brand development for social media.',
    image: '/api/placeholder/300/300',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Emily Thompson',
    role: 'Strategy Lead',
    bio: 'Data-driven strategist with expertise in social media analytics and performance optimization across all platforms.',
    image: '/api/placeholder/300/300',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'David Kim',
    role: 'Paid Media Specialist',
    bio: 'Certified advertising expert managing millions in ad spend with proven track record of delivering exceptional ROI.',
    image: '/api/placeholder/300/300',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  }
]

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About{' '}
              <span className="text-gradient">Waverix</span>
            </h1>
            
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              We&apos;re a team of passionate social media experts dedicated to helping 
              businesses create authentic connections and drive meaningful growth through strategic digital marketing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Our Mission
              </h2>
              
              <p className="text-purple-200 leading-relaxed">
                To empower businesses of all sizes with innovative social media marketing strategies 
                that drive authentic engagement, build lasting relationships, and deliver measurable 
                business growth in an ever-evolving digital landscape.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Our Vision
              </h2>
              
              <p className="text-purple-200 leading-relaxed">
                To be the leading social media marketing agency that transforms how businesses 
                connect with their audiences, setting new standards for creativity, performance, 
                and client success in the digital marketing industry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our{' '}
              <span className="text-gradient">Core Values</span>
            </h2>
            
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do and shape how we approach every client partnership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-purple-200 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Meet Our{' '}
              <span className="text-gradient">Expert Team</span>
            </h2>
            
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Our diverse team brings together years of experience in social media marketing, 
              creative design, and strategic consulting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 text-center"
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-colors duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Users className="h-10 w-10 text-purple-300" />
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-cyan-400 font-medium text-sm mb-4">
                  {member.role}
                </p>
                
                <p className="text-purple-200 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="text-purple-300 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-purple-500/20"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-purple-300 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-purple-500/20"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            
            <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our team can help accelerate your social media growth 
              and achieve your business objectives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" onClick={openGetStartedModal}>
                Start Your Project
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="secondary">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}