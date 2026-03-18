import type { Metadata } from 'next'
import { Source_Serif_4, Public_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
})

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'AI Avengers — Build Real AI Businesses',
    template: '%s | AI Avengers',
  },
  description:
    'Join 3,000+ professionals and business owners learning to build real AI businesses. Community, tools, and frameworks that actually work.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiavengers.io'),
  openGraph: {
    type: 'website',
    siteName: 'AI Avengers',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ManojSaharanAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${publicSans.variable}`}>
      <body className="antialiased font-sans bg-[#FDFDFB] text-[#1A1A18]">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
