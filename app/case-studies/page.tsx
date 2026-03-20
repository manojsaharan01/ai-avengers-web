import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCaseStudies } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real results from real AI implementations — metrics, stories, and lessons.',
}

export const revalidate = 3600

const industryLabels: Record<string, string> = {
  legal: 'Legal',
  'real-estate': 'Real Estate',
  finance: 'Finance',
  agency: 'Agency',
  ecommerce: 'E-Commerce',
  other: 'Other',
}

export default async function CaseStudiesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const caseStudies: any[] = await getAllCaseStudies().catch(() => [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-5xl font-semibold text-[#043927] mb-4">
          Case Studies
          <span className="block h-1 w-16 bg-[#DAA520] rounded-full mt-3" />
        </h1>
        <p className="text-lg text-[#6B6B67] max-w-2xl">
          Real implementations with real numbers. No vague testimonials — just what was built, how it works, and what changed.
        </p>
      </div>

      {caseStudies.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-[#E5E5E2] rounded-2xl">
          <div className="font-serif text-7xl text-[#043927]/10 mb-4 select-none">AA</div>
          <p className="font-serif text-2xl text-[#043927] mb-3">First case studies dropping soon.</p>
          <p className="text-[#6B6B67]">We&apos;re documenting live builds — check back after launch.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {caseStudies.map((cs: any) => (
            <Link
              key={cs._id}
              href={`/case-studies/${cs.slug.current}`}
              className="group block bg-white border border-[#E5E5E2] rounded-xl overflow-hidden transition-lift"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                {cs.featuredImage?.asset ? (
                  <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-[#e8f4ef] overflow-hidden">
                    <Image
                      src={urlFor(cs.featuredImage).width(400).height(300).url()}
                      alt={cs.featuredImage.alt || cs.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-[#e8f4ef] flex items-center justify-center">
                    <span className="font-serif text-5xl text-[#043927]/15">AA</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {cs.industry && (
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#e8f4ef] text-[#043927]">
                          {industryLabels[cs.industry] || cs.industry}
                        </span>
                      )}
                      {cs.client && (
                        <span className="text-xs text-[#6B6B67]">{cs.client}</span>
                      )}
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#043927] group-hover:text-[#DAA520] transition-colors mb-2 leading-snug">
                      {cs.title}
                    </h2>
                    <p className="text-[#6B6B67] text-sm leading-relaxed line-clamp-2">{cs.excerpt}</p>
                  </div>

                  {/* Metrics */}
                  {cs.heroMetrics?.length > 0 && (
                    <div className="flex flex-wrap gap-6 mt-5 pt-5 border-t border-[#E5E5E2]">
                      {cs.heroMetrics.map((m: any, i: number) => (
                        <div key={i}>
                          <div className="font-serif text-2xl font-semibold text-gradient-gold">{m.metric}</div>
                          <div className="text-xs text-[#6B6B67]">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 p-8 bg-[#043927] rounded-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(218,165,32,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <h2 className="font-serif text-3xl font-semibold text-white mb-3 relative z-10">
          Want results like these?
        </h2>
        <p className="text-[#e8f4ef]/80 mb-6 relative z-10">
          Join AI Avengers Lab and get the exact systems, tools, and frameworks we use.
        </p>
        <Link
          href="https://www.skool.com/ai-avengers-3116"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center px-7 py-3 bg-[#DAA520] text-[#043927] font-bold rounded-lg hover:bg-[#c4941c] transition-all hover:shadow-lg"
        >
          Join the Lab — $20/mo
        </Link>
      </div>
    </div>
  )
}
