'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/components/ModalProvider'
import { GetStartedModal } from '@/components/GetStartedModal'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { openGetStartedModal, isGetStartedModalOpen, closeGetStartedModal } = useModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-purple-500/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Image src="/waverix-logo.svg" alt="Waverix Logo" width={40} height={40} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xl font-bold text-white">Waverix</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                    pathname === item.href
                      ? 'text-cyan-400'
                      : 'text-purple-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex">
              <Button onClick={openGetStartedModal}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-purple-100 hover:text-white hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20"
            >
              <div className="container-custom py-4">
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-base font-medium transition-colors hover:text-cyan-400 py-2 ${
                        pathname === item.href
                          ? 'text-cyan-400'
                          : 'text-purple-100'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        openGetStartedModal()
                        setIsMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Get Started Modal */}
      <GetStartedModal
        isOpen={isGetStartedModalOpen}
        onClose={closeGetStartedModal}
      />
    </>
  )
}