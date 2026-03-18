import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getToolBySlug, getAllTools } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import PortableText from '@/components/PortableText'

export const revalidate = 3600

export async function generateStaticParams() {
  const all = await getAllTools().catch(() => [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return all.map((t: any) => ({ slug: t.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tool: any = await getToolBySlug(slug).catch(() => null)
  if (!tool) return {}
  return {
    title: tool.seo?.metaTitle || `${tool.title} Review`,
    description: tool.seo?.metaDescription || tool.tagline,
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tool: any = await getToolBySlug(slug).catch(() => null)
  if (!tool) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B6B67] mb-8">
        <Link href="/" className="hover:text-[#043927]">Home</Link>
        {' / '}
        <Link href="/tools" className="hover:text-[#043927]">Sovereign Stack</Link>
        {' / '}
        <span className="text-[#1A1A18]">{tool.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        {tool.logo?.asset ? (
          <Image
            src={urlFor(tool.logo).width(80).height(80).url()}
            alt={tool.title}
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl object-contain bg-[#e8f4ef] p-2 flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-[#e8f4ef] flex items-center justify-center text-[#043927] font-bold text-3xl flex-shrink-0">
            {tool.title.charAt(0)}
          </div>
        )}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tool.inSovereignStack && (
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#043927] text-white rounded-full">
                ✓ In our Sovereign Stack
              </span>
            )}
            {tool.pricing && (
              <span className="text-xs font-medium px-2.5 py-1 bg-[#e8f4ef] text-[#043927] rounded-full">
                {tool.pricing}
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl font-semibold text-[#043927] leading-tight">{tool.title}</h1>
          {tool.tagline && <p className="text-lg text-[#6B6B67] mt-2">{tool.tagline}</p>}
        </div>
      </div>

      {/* Rating */}
      {tool.rating && (
        <div className="flex items-center gap-2 mb-8 pb-8 border-b border-[#E5E5E2]">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-2xl ${i < tool.rating ? 'text-[#DAA520]' : 'text-[#E5E5E2]'}`}>★</span>
            ))}
          </div>
          <span className="text-[#6B6B67] text-sm">{tool.rating}/5 — AI Avengers rating</span>
        </div>
      )}

      {/* Pros / Cons */}
      {(tool.pros?.length > 0 || tool.cons?.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {tool.pros?.length > 0 && (
            <div className="p-5 bg-[#f0fdf4] border border-[#22C55E]/20 rounded-xl">
              <h3 className="font-semibold text-[#166534] mb-3">What we like</h3>
              <ul className="space-y-2">
                {tool.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-[#1A1A18]">
                    <span className="text-[#22C55E] flex-shrink-0 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tool.cons?.length > 0 && (
            <div className="p-5 bg-[#fef2f2] border border-[#DC2626]/20 rounded-xl">
              <h3 className="font-semibold text-[#DC2626] mb-3">Watch out for</h3>
              <ul className="space-y-2">
                {tool.cons.map((con: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-[#1A1A18]">
                    <span className="text-[#DC2626] flex-shrink-0 mt-0.5">✕</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Affiliate CTA */}
      {tool.affiliateUrl && (
        <div className="mb-10 p-5 border border-[#DAA520]/40 bg-[#fdf3d0]/40 rounded-xl flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-[#043927]">Try {tool.title}</div>
            <div className="text-sm text-[#6B6B67]">Our recommended link</div>
          </div>
          <Link
            href={tool.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2 bg-[#043927] text-white font-semibold rounded-lg hover:bg-[#032a1e] transition-colors text-sm"
          >
            Get started →
          </Link>
        </div>
      )}

      {/* Body */}
      {tool.body && <PortableText value={tool.body} />}

      {/* FAQ */}
      {tool.faqItems?.length > 0 && (
        <section className="mt-16 border-t border-[#E5E5E2] pt-12">
          <h2 className="font-serif text-3xl font-semibold text-[#043927] mb-8">FAQ</h2>
          <div className="space-y-4">
            {tool.faqItems.map((item: any, i: number) => (
              <details key={i} className="group border border-[#E5E5E2] rounded-lg">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-[#043927] hover:bg-[#e8f4ef]/50 rounded-lg list-none">
                  {item.question}
                  <svg className="w-5 h-5 flex-shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-[#6B6B67] leading-relaxed">
                  {Array.isArray(item.answer) && <PortableText value={item.answer} />}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
