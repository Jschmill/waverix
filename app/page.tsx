import React from 'react'
import { Hero } from '@/components/Hero'
import { ServicesGrid } from '@/components/ServicesGrid'
import { WhyChooseUs } from '@/components/WhyChooseUs'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
    </div>
  )
}