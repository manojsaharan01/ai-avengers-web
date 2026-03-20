import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Manoj Saharan & AI Avengers',
  description:
    'The story behind AI Avengers — why we left GHL, how we replaced $1,100/mo in SaaS, and what we\'re building next.',
  openGraph: {
    type: 'profile',
  },
}

const stats = [
  { metric: '3,000+', label: 'Community members' },
  { metric: '$12,840', label: 'Saved per year vs GHL' },
  { metric: 'Year 1', label: 'Of building in public' },
  { metric: '$20/mo', label: 'Lab founding price' },
]

const stack = [
  { was: 'GHL CRM ($297/mo)', now: 'Jarvis — OpenClaw', cost: 'Free' },
  { was: 'GHL Email', now: 'Resend', cost: '$20/mo' },
  { was: 'GHL SMS', now: 'Twilio direct', cost: '~$15/mo' },
  { was: 'GHL Calendar', now: 'Cal.com', cost: 'Free' },
  { was: 'Voice AI (GHL)', now: 'Retell', cost: 'Usage' },
  { was: 'GHL Database', now: 'DuckDB local', cost: 'Free' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="animate-fade-in-up text-sm font-medium text-[#DAA520] uppercase tracking-wider mb-3">
            AI Avengers / TTW AI
          </div>
          <h1 className="animate-fade-in-up-delay-1 font-serif text-5xl font-semibold text-[#043927] leading-tight mb-6">
            We build in public.<br />We share what works.
          </h1>
          <p className="animate-fade-in-up-delay-2 text-lg text-[#6B6B67] leading-relaxed mb-8">
            AI Avengers started as a community experiment and became a movement. 3,000+ people watching us replace $1,100/mo in SaaS with a $30/mo sovereign stack — and replicating it themselves.
          </p>
          <div className="animate-fade-in-up-delay-3 flex gap-4">
            <Link
              href="https://linkedin.com/in/manojsaharanai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[#043927] text-white font-semibold rounded-lg hover:bg-[#032a1e] transition-all text-sm hover:shadow-md"
            >
              Connect on LinkedIn
            </Link>
            <Link
              href="https://youtube.com/@ManojSaharanAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 border border-[#043927] text-[#043927] font-semibold rounded-lg hover:bg-[#e8f4ef] transition-all text-sm"
            >
              YouTube
            </Link>
          </div>
        </div>
        <div className="relative animate-fade-in-up-delay-2">
          <div className="aspect-square rounded-2xl bg-[#e8f4ef] overflow-hidden border-4 border-white shadow-lg">
            {/* Placeholder — replace with Manoj's photo from Sanity */}
            <div className="w-full h-full flex flex-col items-center justify-center text-[#043927]/30 gap-2 bg-gradient-to-br from-[#e8f4ef] to-[#d4e8dc]">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              <span className="text-sm font-medium">Manoj Saharan</span>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 bg-[#DAA520] text-white rounded-xl px-4 py-2 shadow-lg animate-pulse-gold">
            <div className="font-serif text-xl font-semibold">Year 1</div>
            <div className="text-xs opacity-90">Building in public</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E5E5E2] rounded-xl overflow-hidden border border-[#E5E5E2] mb-20">
        {stats.map(({ metric, label }) => (
          <div key={label} className="bg-[#FDFDFB] px-6 py-5 text-center transition-all duration-200 hover:bg-[#e8f4ef]/50 group cursor-default">
            <div className="font-serif text-2xl font-semibold text-[#043927] transition-transform duration-200 group-hover:scale-110">{metric}</div>
            <div className="text-xs text-[#6B6B67] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Story */}
      <section className="mb-20">
        <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-8">The honest story</h2>
        <div className="prose prose-lg max-w-none text-[#1A1A18] space-y-6">
          <p>
            In March 2026, we ran the numbers. GHL was costing $1,100/month — $13,200/year — for a platform we were fundamentally fighting against. CRM tools designed to lock you in. Workflows that couldn&apos;t be exported. Data you didn&apos;t truly own.
          </p>
          <p>
            So we left. In public. And we documented every step.
          </p>
          <p>
            The result: a sovereign AI stack that costs ~$30/month, gives us full data ownership, and runs entirely on open-source tools. We called it Jarvis. And 3,000 people watched us build it.
          </p>
          <p>
            That&apos;s what AI Avengers is. Not a course. Not a guru selling dreams. A community of professionals watching real businesses be built in real time — and building their own alongside.
          </p>
        </div>
      </section>

      {/* Sovereign Stack comparison */}
      <section className="mb-20">
        <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-3">The stack we replaced</h2>
        <p className="text-[#6B6B67] mb-8">$1,100/mo → ~$35/mo. Every dollar accounted for.</p>

        <div className="border border-[#E5E5E2] rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 bg-[#043927] text-white text-sm font-semibold px-4 py-3">
            <div>Was (GHL)</div>
            <div>Now</div>
            <div className="text-right">Cost</div>
          </div>
          {stack.map(({ was, now, cost }, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFDFB]'} border-t border-[#E5E5E2] transition-colors duration-150 hover:bg-[#e8f4ef]/30`}
            >
              <div className="text-[#6B6B67] line-through">{was}</div>
              <div className="font-medium text-[#043927]">{now}</div>
              <div className="text-right font-semibold text-[#22C55E]">{cost}</div>
            </div>
          ))}
          <div className="grid grid-cols-3 px-4 py-4 text-sm bg-[#e8f4ef] border-t-2 border-[#043927] font-bold">
            <div className="text-[#6B6B67]">Total: ~$1,100/mo</div>
            <div className="text-[#043927]">Sovereign Stack</div>
            <div className="text-right text-[#043927] text-lg">~$35/mo</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-20">
        <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-8">The team</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              name: 'Manoj Saharan',
              role: 'CEO — Personal Brand, Revenue, Jarvis',
              bio: 'Building AI systems in public. Replaced GHL with open source. Runs the community, campaigns, and CRM.',
              linkedin: 'https://linkedin.com/in/manojsaharanai/',
              youtube: 'https://youtube.com/@ManojSaharanAI',
            },
            {
              name: 'John Park',
              role: 'Co-founder — Sales & Deals',
              bio: 'Closes deals, builds YouTube demos, runs the Lead Sniper partnership. Based in Australia → Thailand.',
              linkedin: null,
              youtube: null,
            },
            {
              name: 'Andy',
              role: 'Co-founder — Production & Automation',
              bio: 'Webinars, LinkedIn, content production. The engine behind AI Avengers content system.',
              linkedin: null,
              youtube: null,
            },
          ].map(({ name, role, bio, linkedin, youtube }) => (
            <div key={name} className="p-5 border border-[#E5E5E2] rounded-xl bg-white transition-lift group">
              <div className="w-12 h-12 rounded-full bg-[#e8f4ef] flex items-center justify-center text-[#043927] font-bold text-lg mb-4 transition-transform duration-200 group-hover:scale-110 ring-2 ring-transparent group-hover:ring-[#DAA520]/30">
                {name.charAt(0)}
              </div>
              <div className="font-semibold text-[#043927] mb-1">{name}</div>
              <div className="text-xs text-[#DAA520] font-medium mb-3">{role}</div>
              <p className="text-sm text-[#6B6B67] leading-relaxed mb-4">{bio}</p>
              <div className="flex gap-3">
                {linkedin && (
                  <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#043927] hover:text-[#DAA520] link-underline transition-colors">
                    LinkedIn →
                  </Link>
                )}
                {youtube && (
                  <Link href={youtube} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#043927] hover:text-[#DAA520] link-underline transition-colors">
                    YouTube →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#043927] rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(218,165,32,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <h2 className="font-serif text-4xl font-semibold text-white mb-4 relative z-10">Build alongside us.</h2>
        <p className="text-[#e8f4ef]/80 text-lg mb-8 leading-relaxed relative z-10">
          The founding window is open for 7 more days. $20/mo while it lasts — $89/mo after.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            href="https://www.skool.com/ai-avengers-3116"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 bg-[#DAA520] text-[#043927] font-bold rounded-lg hover:bg-[#c4941c] transition-all hover:shadow-lg"
          >
            Join AI Avengers Lab
          </Link>
          <Link
            href="https://skool.com/ai-avengers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
          >
            Free community →
          </Link>
        </div>
      </div>
    </div>
  )
}
