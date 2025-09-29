import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Zap
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Social Media Management', href: '/services#social-media-management' },
    { name: 'Paid Social Advertising', href: '/services#paid-advertising' },
    { name: 'Content Creation', href: '/services#content-creation' },
    { name: 'Strategy & Consulting', href: '/services#strategy-consulting' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
  ],
  resources: [
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border-t border-purple-500/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image src="/waverix-logo.svg" alt="Waverix Logo" width={40} height={40} />
              <span className="text-xl font-bold text-white">Waverix</span>
            </Link>
            
            <p className="text-purple-200 mb-6 max-w-md leading-relaxed">
              Next-Gen social media marketing agency helping ambitious businesses 
              create breakthrough digital campaigns that drive real results.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-purple-200">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>hello@waverix.com</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-200">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-200">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-purple-300 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-purple-500/20"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-purple-300 hover:text-cyan-400 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-purple-300 text-sm">
              © {new Date().getFullYear()} Waverix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}