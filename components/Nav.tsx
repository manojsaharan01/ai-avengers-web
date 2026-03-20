'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Jarvis', href: '/jarvis' },
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className={`sticky top-0 z-50 bg-[#FDFDFB]/95 backdrop-blur-sm border-b border-[#E5E5E2] transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#043927] rounded-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <span className="text-[#DAA520] text-sm font-bold font-mono">AA</span>
          </div>
          <span className="font-serif font-semibold text-[#043927] text-lg leading-none">
            AI Avengers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors py-1 ${
                  isActive
                    ? 'text-[#043927]'
                    : 'text-[#6B6B67] hover:text-[#043927]'
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#DAA520] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://skool.com/ai-avengers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#6B6B67] hover:text-[#043927] transition-colors link-underline"
          >
            Free Community
          </Link>
          <Link
            href="https://www.skool.com/ai-avengers-3116"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#043927] text-white text-sm font-semibold rounded-md hover:bg-[#032a1e] transition-all hover:shadow-md"
          >
            Join the Lab
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#043927]"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-[#E5E5E2] bg-[#FDFDFB] overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium py-1 transition-colors ${
                  isActive ? 'text-[#043927] font-semibold' : 'text-[#1A1A18]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] inline-block mr-2" />}
                {l.label}
              </Link>
            )
          })}
          <Link
            href="https://www.skool.com/ai-avengers-3116"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex justify-center px-4 py-2 bg-[#043927] text-white text-sm font-semibold rounded-md"
          >
            Join the Lab — $20/mo
          </Link>
        </div>
      </div>
    </header>
  )
}
