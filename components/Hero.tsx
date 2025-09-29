'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/components/ModalProvider'

const stats = [
  { value: '150%', label: 'Average ROI Increase' },
  { value: '24/7', label: 'Support Available' }
]

const floatingElements = [
  { icon: TrendingUp, position: 'top-20 right-20', delay: 0, id: 'float-1' },
  { icon: Users, position: 'top-40 left-10', delay: 0.5, id: 'float-2' },
  { icon: Zap, position: 'bottom-32 right-16', delay: 1, id: 'float-3' },
]

export const Hero: React.FC = () => {
  const { openGetStartedModal } = useModal()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-cyan-900/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`bg-element-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"
              style={{
                left: `${(i * 13.7) % 100}%`,
                top: `${(i * 7.3) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Icons */}
      {floatingElements.map((element) => {
        const Icon = element.icon
        return (
          <motion.div
            key={element.id}
            className={`absolute ${element.position} hidden lg:block`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: element.delay, duration: 0.8 }}
          >
            <motion.div
              className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-sm rounded-full border border-blue-400/30"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: element.delay
              }}
            >
              <Icon className="h-6 w-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        )
      })}

      <div className="relative z-10 container-custom py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-400/30 mb-8"
          >
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Next-Gen Agency</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Next-Gen{' '}
            <span className="text-gradient">Social Media Agency</span>
            {' '}for Growing Brands
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We partner with ambitious businesses to create breakthrough digital marketing 
            campaigns that drive real results and accelerate growth.
          </motion.p>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-12 max-w-4xl mx-auto"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
              <div className="absolute inset-0 bg-[url('/api/placeholder/800/450')] opacity-30 bg-cover bg-center" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <Play className="h-8 w-8 text-white ml-1" fill="white" />
                </motion.button>
              </div>

              {/* Video Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white font-medium">Watch Our Success Stories</p>
                  <p className="text-purple-200 text-sm">See how we&apos;ve helped brands grow their social presence</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <Button
              size="lg"
              onClick={openGetStartedModal}
              className="w-full sm:w-auto"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View Our Services
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-8 max-w-xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-purple-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}