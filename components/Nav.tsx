'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { label: 'Jarvis', href: '/jarvis' },
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#FDFDFB]/95 backdrop-blur-sm border-b border-[#E5E5E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#043927] rounded-md flex items-center justify-center">
            <span className="text-[#DAA520] text-sm font-bold font-mono">AA</span>
          </div>
          <span className="font-serif font-semibold text-[#043927] text-lg leading-none">
            AI Avengers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#6B6B67] hover:text-[#043927] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://skool.com/ai-avengers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#6B6B67] hover:text-[#043927] transition-colors"
          >
            Free Community
          </Link>
          <Link
            href="https://www.skool.com/ai-avengers-3116"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#043927] text-white text-sm font-semibold rounded-md hover:bg-[#032a1e] transition-colors"
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
      {open && (
        <div className="md:hidden border-t border-[#E5E5E2] bg-[#FDFDFB] px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#1A1A18] py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://www.skool.com/ai-avengers-3116"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex justify-center px-4 py-2 bg-[#043927] text-white text-sm font-semibold rounded-md"
          >
            Join the Lab — $20/mo
          </Link>
        </div>
      )}
    </header>
  )
}
