import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jarvis — AI-Native CRM for AI Avengers Lab Members',
  description:
    'Jarvis is a local-first AI CRM built on open source. Replaces $1,100/mo GHL with a $0 sovereign stack. One command to install. Yours forever.',
  openGraph: {
    title: 'Jarvis — The AI-Native CRM',
    description: 'Local-first. Open source. Replaces GHL for $0. One command install.',
  },
}

const stackItems = [
  { tool: 'Jarvis CRM', replaces: 'GHL CRM ($297/mo)', cost: '$0', icon: '🤖' },
  { tool: 'DuckDB', replaces: 'GHL Database', cost: '$0', icon: '🗄️' },
  { tool: 'Resend', replaces: 'GHL Email ($150/mo)', cost: '$20/mo', icon: '📧' },
  { tool: 'Twilio Direct', replaces: 'GHL SMS ($100/mo)', cost: '~$15/mo', icon: '💬' },
  { tool: 'Cal.com', replaces: 'GHL Calendar ($50/mo)', cost: '$0', icon: '📅' },
  { tool: 'Retell', replaces: 'GHL Voice AI ($200/mo)', cost: 'Usage', icon: '🎙️' },
]

const capabilities = [
  {
    icon: '⚡',
    title: 'Local-first. Your data never leaves your machine.',
    desc: 'Jarvis runs on your Mac. DuckDB stores everything locally. No cloud vendor owns your contacts, your conversations, or your pipeline. Ever.',
  },
  {
    icon: '🧠',
    title: 'AI that acts — not just answers.',
    desc: 'Ask Jarvis to find leads, enrich contacts, send outreach, and analyze your pipeline in plain English. It executes. Not suggests.',
  },
  {
    icon: '📊',
    title: 'Live analytics from your own data.',
    desc: 'Pipeline breakdown, outreach activity, conversion metrics — all running directly from your local DuckDB. RAM-speed queries, no latency.',
  },
  {
    icon: '🔗',
    title: 'Connect everything you already use.',
    desc: 'GHL export, Google Drive, LinkedIn, Twilio, Resend, Cal.com — Jarvis imports your data from anywhere and treats it as one unified CRM.',
  },
  {
    icon: '🔄',
    title: 'Campaigns that run themselves.',
    desc: 'Build email and SMS sequences in Jarvis. Schedule them. Jarvis executes via Resend and Twilio directly — no middleman markup, no shared sending pools.',
  },
  {
    icon: '🏗️',
    title: 'Open source at the core. Extensible forever.',
    desc: 'Built on OpenClaw (MIT license). Add skills, build automations, fork it, own it. No pricing changes. No sunset risk. Your stack, your rules.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Install in one command',
    code: 'npx openclaw',
    desc: 'Bootstraps Jarvis on your Mac in under 60 seconds. Node 22+ required.',
  },
  {
    num: '02',
    title: 'Open the web UI',
    code: 'open http://localhost:3100',
    desc: 'Full CRM interface runs locally. Contacts, pipeline, campaigns, analytics — all there.',
  },
  {
    num: '03',
    title: 'Import your contacts',
    code: '# Export from GHL → import to Jarvis\nnode jarvis_sync.js',
    desc: 'Export your GHL contacts as CSV. Jarvis syncs them into DuckDB and segments them automatically.',
  },
  {
    num: '04',
    title: 'Connect email and SMS',
    code: 'RESEND_API_KEY=re_xxx\nTWILIO_SID=ACxxx',
    desc: 'Add your Resend and Twilio credentials. Jarvis routes all outreach through your accounts — no shared pools.',
  },
]

export default function JarvisPage() {
  return (
    <div className="bg-[#FDFDFB]">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-24 px-4 sm:px-6 border-b border-[#E5E5E2]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#043927] text-white rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#DAA520] inline-block" />
            Open source · MIT license · Lab members only
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-[#043927] leading-tight mb-6">
            The CRM that belongs<br />
            <em className="not-italic text-[#DAA520]">to you. Not them.</em>
          </h1>

          <p className="text-xl text-[#6B6B67] max-w-2xl mx-auto leading-relaxed mb-4">
            Jarvis is an AI-native CRM that runs locally on your Mac. No subscriptions. No data sharing. No pricing surprises. One command to install — yours forever.
          </p>
          <p className="text-base text-[#6B6B67] max-w-xl mx-auto mb-10">
            Built on OpenClaw (MIT). The same stack we use at AI Avengers to manage 3,000+ contacts, run campaigns, and close deals — for $35/mo total.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center gap-4 bg-[#043927] text-white rounded-xl px-6 py-4 font-mono text-lg mb-8 shadow-lg">
            <span className="text-[#DAA520]">$</span>
            <span>npx openclaw</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://www.skool.com/ai-avengers-3116"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-[#DAA520] text-[#043927] font-bold rounded-lg hover:bg-[#c4941c] transition-colors text-base"
            >
              Get Jarvis via AI Avengers Lab
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="https://github.com/denchhq/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 border border-[#043927] text-[#043927] font-semibold rounded-lg hover:bg-[#e8f4ef] transition-colors text-base gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          <p className="mt-5 text-sm text-[#6B6B67]">
            Full setup walkthrough inside AI Avengers Lab · $20/mo founding price
          </p>
        </div>
      </section>

      {/* ── Savings proof ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-[#043927]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-semibold text-white mb-2">
              What Jarvis replaces
            </h2>
            <p className="text-[#e8f4ef]/70">$1,100/mo in rented software → $35/mo sovereign stack</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stackItems.map(({ tool, replaces, cost, icon }) => (
              <div key={tool} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-semibold text-[#DAA520] bg-[#DAA520]/10 px-2 py-0.5 rounded-full">
                    {cost}
                  </span>
                </div>
                <div className="font-semibold text-white mb-1">{tool}</div>
                <div className="text-sm text-[#e8f4ef]/50 line-through">{replaces}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-white/5 border border-[#DAA520]/30 rounded-xl text-center">
            <span className="font-serif text-3xl font-semibold text-[#DAA520]">$12,840</span>
            <span className="text-[#e8f4ef]/80 ml-3 text-lg">saved per year. Not because we cut — because we stopped renting.</span>
          </div>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-3">
              What Jarvis actually does
            </h2>
            <p className="text-[#6B6B67] text-lg max-w-xl mx-auto">
              Not a wrapper. Not a dashboard. An AI that executes on your data, your contacts, your pipeline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ icon, title, desc }) => (
              <div key={title} className="p-6 border border-[#E5E5E2] rounded-xl bg-white hover:border-[#043927]/20 hover:shadow-sm transition-all">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-serif font-semibold text-[#043927] mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-[#6B6B67] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Install steps ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#e8f4ef]/30 border-y border-[#E5E5E2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-3">
              From zero to live CRM in 4 steps
            </h2>
            <p className="text-[#6B6B67] text-lg">No DevOps. No cloud accounts. Just your Mac and a terminal.</p>
          </div>

          <div className="space-y-6">
            {steps.map(({ num, title, code, desc }) => (
              <div key={num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#043927] flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-[#DAA520]">{num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#043927] text-lg mb-2">{title}</h3>
                  <pre className="bg-[#043927] text-[#e8f4ef] rounded-lg px-5 py-3 text-sm font-mono mb-2 overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                  <p className="text-sm text-[#6B6B67]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plain English actions ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-6 leading-tight">
                Tell it what to do.<br />In plain English.
              </h2>
              <p className="text-[#6B6B67] text-lg leading-relaxed mb-8">
                Jarvis understands context. Ask it to find leads, segment your list, draft an outreach campaign, or analyse why your last sequence underperformed. It executes — not just suggests.
              </p>
              <div className="space-y-3">
                {[
                  'Find all contacts who opened my last email but didn\'t reply',
                  'Segment my list by industry and create a campaign for agency owners',
                  'Show me pipeline conversion from cold to booked this month',
                  'Send follow-up SMS to everyone who replied "interested" in the last 7 days',
                  'Export my top 50 hottest leads to a Google Sheet',
                ].map((cmd) => (
                  <div key={cmd} className="flex items-start gap-3 p-3 bg-[#e8f4ef]/50 rounded-lg border border-[#E5E5E2]">
                    <span className="text-[#DAA520] font-mono text-sm mt-0.5 flex-shrink-0">›</span>
                    <span className="text-sm text-[#1A1A18] font-medium">{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#043927] rounded-2xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-white/40 text-xs">Jarvis — localhost:3100</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="text-[#DAA520]">$ jarvis</div>
                <div className="text-white/60">Connecting to workspace... ✓</div>
                <div className="text-white/60">Loading 3,005 contacts... ✓</div>
                <div className="text-white/60">DuckDB ready (RAM-speed) ✓</div>
                <div className="mt-4 text-white">You: Find agency owners who opened last week&apos;s email</div>
                <div className="text-[#DAA520] mt-2">Jarvis: Running query...</div>
                <div className="text-white/60">→ Filtering by tag: agency</div>
                <div className="text-white/60">→ Cross-referencing open events</div>
                <div className="text-[#22C55E] mt-2">✓ Found 47 contacts matching criteria</div>
                <div className="text-white/60">→ Marcus T. (Agency Owner, Canada) — opened 3x</div>
                <div className="text-white/60">→ Sarah K. (E-commerce, UK) — opened 2x</div>
                <div className="text-white/60">→ +45 more...</div>
                <div className="mt-4 text-white">You: Draft a follow-up sequence for these 47</div>
                <div className="text-[#DAA520] mt-2">Jarvis: Generating 3-step sequence...</div>
                <div className="text-[#22C55E]">✓ Sequence ready. Preview? [Y/n]</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#043927]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-semibold text-white mb-3">
              Built for people who are done renting.
            </h2>
            <p className="text-[#e8f4ef]/70 text-lg">
              Jarvis is not for everyone. It&apos;s for the ones who want to own.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                type: 'Agency Operators',
                desc: 'Running GHL for clients and bleeding margin on SaaS. Jarvis lets you build the same systems for a fraction — and own the IP.',
                fit: 'Perfect fit',
              },
              {
                type: 'Business Owners',
                desc: 'You have a list, you need a CRM, and you don\'t want to pay $500/mo. Jarvis is a one-time setup that costs you almost nothing.',
                fit: 'Perfect fit',
              },
              {
                type: 'AI Builders',
                desc: 'You want to build on top of your CRM — custom agents, automations, integrations. Jarvis is open source. Fork it. Own it.',
                fit: 'Built for you',
              },
            ].map(({ type, desc, fit }) => (
              <div key={type} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-xs font-semibold text-[#DAA520] uppercase tracking-wider mb-3">{fit}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{type}</h3>
                <p className="text-sm text-[#e8f4ef]/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-4">
            Get Jarvis inside AI Avengers Lab.
          </h2>
          <p className="text-[#6B6B67] text-lg leading-relaxed mb-3">
            The full Jarvis setup guide — every screen, every credential, every config — is inside AI Avengers Lab. We walk you through the install live and troubleshoot your specific setup.
          </p>
          <p className="text-[#6B6B67] mb-10">
            Founding price: <strong className="text-[#043927]">$20/mo</strong> — closes soon. Then $89/mo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://www.skool.com/ai-avengers-3116"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#043927] text-white font-bold rounded-lg hover:bg-[#032a1e] transition-colors text-lg"
            >
              Join Lab — $20/mo founding
            </Link>
            <a
              href="https://github.com/denchhq/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-[#043927] text-[#043927] font-semibold rounded-lg hover:bg-[#e8f4ef] transition-colors text-lg gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View source (MIT)
            </a>
          </div>

          <p className="mt-8 text-sm text-[#6B6B67]">
            Jarvis is built on OpenClaw — MIT licensed, open source, community-maintained.
            <br />It&apos;s free to self-install. The Lab gives you the setup walkthrough, live support, and the full AI Avengers community.
          </p>
        </div>
      </section>
    </div>
  )
}
