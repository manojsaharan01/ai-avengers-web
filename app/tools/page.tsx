import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllTools } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Sovereign Stack — Tools We Use',
  description:
    'The exact tools AI Avengers uses to replace $1,100/mo in SaaS. Reviewed, rated, and battle-tested.',
}

export const revalidate = 3600

const categoryLabels: Record<string, string> = {
  crm: 'CRM',
  email: 'Email',
  sms: 'SMS',
  'ai-agent': 'AI Agent',
  database: 'Database',
  calendar: 'Calendar',
  'voice-ai': 'Voice AI',
  automation: 'Automation',
  analytics: 'Analytics',
  community: 'Community',
  other: 'Other',
}

export default async function ToolsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: any[] = await getAllTools().catch(() => [])

  const sovereignStack = tools.filter((t) => t.inSovereignStack)
  const otherTools = tools.filter((t) => !t.inSovereignStack)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif text-5xl font-semibold text-[#043927] mb-4">
          The Sovereign Stack
          <span className="block h-1 w-16 bg-[#DAA520] rounded-full mt-3" />
        </h1>
        <p className="text-lg text-[#6B6B67] max-w-2xl leading-relaxed">
          We replaced $1,100/month in GHL with a $30/mo open-source stack. Every tool here is reviewed, rated, and actively used — no affiliate fluff.
        </p>
      </div>

      {/* Savings banner */}
      <div className="mt-8 mb-14 p-6 bg-[#043927] rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(218,165,32,0.12)_0%,_transparent_50%)] pointer-events-none" />
        <div className="relative z-10">
          <div className="font-serif text-3xl font-semibold text-[#DAA520]">$12,840/year saved</div>
          <div className="text-[#e8f4ef]/80 mt-1">GHL ($1,100/mo) → Sovereign Stack (~$30/mo)</div>
        </div>
        <Link
          href="https://www.skool.com/ai-avengers-3116"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex-shrink-0 px-6 py-2.5 bg-[#DAA520] text-[#043927] font-bold rounded-lg hover:bg-[#c4941c] transition-all text-sm hover:shadow-lg"
        >
          Get the full stack guide
        </Link>
      </div>

      {/* Sovereign Stack */}
      {sovereignStack.length > 0 && (
        <section className="mb-14">
          <h2 className="font-serif text-3xl font-semibold text-[#043927] mb-2">
            In the Sovereign Stack
          </h2>
          <p className="text-[#6B6B67] mb-7">What we actually run. Curated, opinionated, battle-tested.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sovereignStack.map((tool: any) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Other tools */}
      {otherTools.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl font-semibold text-[#043927] mb-2">Also reviewed</h2>
          <p className="text-[#6B6B67] mb-7">Tools we&apos;ve evaluated — some good, some not.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherTools.map((tool: any) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {tools.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed border-[#E5E5E2] rounded-2xl">
          <div className="font-serif text-7xl text-[#043927]/10 mb-4 select-none">AA</div>
          <p className="font-serif text-2xl text-[#043927] mb-3">Stack reviews dropping soon.</p>
          <p className="text-[#6B6B67]">We&apos;re writing up every tool we use — check back shortly.</p>
        </div>
      )}
    </div>
  )
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link href={`/tools/${tool.slug.current}`} className="group">
      <div className="h-full bg-white border border-[#E5E5E2] rounded-xl p-5 transition-lift group-hover:border-[#043927]/20">
        <div className="flex items-start gap-3 mb-4">
          {tool.logo?.asset ? (
            <Image
              src={urlFor(tool.logo).width(48).height(48).url()}
              alt={tool.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-contain bg-[#e8f4ef] p-1"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-[#e8f4ef] flex items-center justify-center text-[#043927] font-bold text-lg transition-transform duration-200 group-hover:scale-110">
              {tool.title.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#043927] group-hover:text-[#DAA520] transition-colors truncate">
              {tool.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {tool.category && (
                <span className="text-xs text-[#6B6B67]">{categoryLabels[tool.category] || tool.category}</span>
              )}
              {tool.pricing && (
                <span className="text-xs font-medium text-[#043927] bg-[#e8f4ef] px-2 py-0.5 rounded-full">
                  {tool.pricing}
                </span>
              )}
            </div>
          </div>
        </div>

        {tool.tagline && (
          <p className="text-sm text-[#6B6B67] leading-relaxed line-clamp-2 mb-3">{tool.tagline}</p>
        )}

        <div className="flex items-center justify-between">
          {tool.rating && (
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-base ${i < tool.rating ? 'text-[#DAA520]' : 'text-[#E5E5E2]'}`}>
                  ★
                </span>
              ))}
            </div>
          )}
          {tool.inSovereignStack && (
            <span className="text-xs font-medium text-[#043927] bg-[#e8f4ef] px-2 py-0.5 rounded-full">
              ✓ We use this
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
