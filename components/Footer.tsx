import Link from 'next/link'

const footerLinks = {
  Product: [
    { label: 'AI Avengers Lab', href: 'https://www.skool.com/ai-avengers-3116' },
    { label: 'Jarvis CRM', href: '/jarvis' },
    { label: 'Sovereign Stack', href: '/tools' },
  ],
  Content: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'YouTube', href: 'https://youtube.com/@ManojSaharanAI' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/manojsaharanai/' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: 'mailto:manoj@aiavengers.team' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-gradient-top bg-[#FDFDFB] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-[#043927] rounded-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <span className="text-[#DAA520] text-sm font-bold font-mono">AA</span>
              </div>
              <span className="font-serif font-semibold text-[#043927] text-lg">AI Avengers</span>
            </Link>
            <p className="text-sm text-[#6B6B67] leading-relaxed max-w-xs">
              A community of professionals building real AI businesses. Not theory. Not hype. Just what works.
            </p>
            <p className="mt-4 text-xs text-[#6B6B67]">
              TTW AI Pty Ltd
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold text-[#043927] uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B6B67] hover:text-[#043927] transition-colors link-underline inline-block"
                      {...(link.href.startsWith('http') || link.href.startsWith('mailto')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#E5E5E2] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B6B67]">
          <p>© {new Date().getFullYear()} AI Avengers / TTW AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
            Built with Next.js + Sanity
          </p>
        </div>
      </div>
    </footer>
  )
}
