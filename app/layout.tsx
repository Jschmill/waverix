import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ModalProvider } from '@/components/ModalProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Waverix - Next-Gen Social Media Marketing Agency',
  description: 'We partner with ambitious businesses to create breakthrough digital marketing campaigns that drive real results. Expert social media management, paid advertising, and content creation.',
  keywords: ['social media marketing', 'digital marketing', 'social media management', 'paid advertising', 'content creation', 'SMMA'],
  authors: [{ name: 'Waverix Team' }],
  creator: 'Waverix',
  publisher: 'Waverix',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waverix.com',
    title: 'Waverix - Next-Gen Social Media Growth Agency',
    description: 'We partner with ambitious businesses to create breakthrough digital marketing campaigns that drive real results.',
    siteName: 'Waverix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waverix - Next-Gen Social Media Growth Agency',
    description: 'We partner with ambitious businesses to create breakthrough digital marketing campaigns that drive real results.',
    creator: '@waverix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ModalProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ModalProvider>
      </body>
    </html>
  )
}