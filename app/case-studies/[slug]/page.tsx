import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import PortableText from '@/components/PortableText'

export const revalidate = 3600

export async function generateStaticParams() {
  const all = await getAllCaseStudies().catch(() => [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return all.map((c: any) => ({ slug: c.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cs: any = await getCaseStudyBySlug(slug).catch(() => null)
  if (!cs) return {}
  return {
    title: cs.seo?.metaTitle || cs.title,
    description: cs.seo?.metaDescription || cs.excerpt,
    openGraph: {
      type: 'article',
      title: cs.seo?.metaTitle || cs.title,
      description: cs.seo?.metaDescription || cs.excerpt,
      images: cs.featuredImage?.asset?.url ? [cs.featuredImage.asset.url] : [],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cs: any = await getCaseStudyBySlug(slug).catch(() => null)
  if (!cs) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B6B67] mb-8">
        <Link href="/" className="hover:text-[#043927]">Home</Link>
        {' / '}
        <Link href="/case-studies" className="hover:text-[#043927]">Case Studies</Link>
        {' / '}
        <span className="text-[#1A1A18]">{cs.title}</span>
      </nav>

      {/* Header */}
      {cs.client && (
        <div className="text-sm font-medium text-[#DAA520] uppercase tracking-wider mb-3">{cs.client}</div>
      )}
      <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#043927] leading-tight mb-6">
        {cs.title}
      </h1>
      <p className="text-xl text-[#6B6B67] leading-relaxed mb-10">{cs.excerpt}</p>

      {/* Metrics hero */}
      {cs.heroMetrics?.length > 0 && (
        <div className={`grid grid-cols-${Math.min(cs.heroMetrics.length, 4)} gap-px bg-[#E5E5E2] rounded-xl overflow-hidden border border-[#E5E5E2] mb-10`}>
          {cs.heroMetrics.map((m: any, i: number) => (
            <div key={i} className="bg-[#FDFDFB] px-6 py-5 text-center">
              <div className="font-serif text-3xl font-semibold text-[#043927]">{m.metric}</div>
              <div className="text-sm text-[#6B6B67] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Featured image */}
      {cs.featuredImage?.asset && (
        <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-10 bg-[#e8f4ef]">
          <Image
            src={urlFor(cs.featuredImage).width(900).height(500).url()}
            alt={cs.featuredImage.alt || cs.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      {cs.body && <PortableText value={cs.body} />}

      {/* Testimonial */}
      {cs.testimonial && (
        <div className="mt-12 p-8 bg-[#fdf3d0]/50 border border-[#DAA520]/30 rounded-xl">
          <div className="flex mb-4">
            {Array.from({ length: cs.testimonial.rating || 5 }).map((_: unknown, i: number) => (
              <span key={i} className="text-[#DAA520]">★</span>
            ))}
          </div>
          <blockquote className="font-serif text-xl text-[#1A1A18] leading-relaxed mb-6">
            &ldquo;{cs.testimonial.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            {cs.testimonial.photo?.asset && (
              <Image
                src={urlFor(cs.testimonial.photo).width(56).height(56).url()}
                alt={cs.testimonial.name}
                width={56}
                height={56}
                className="rounded-full w-14 h-14 object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-[#043927]">{cs.testimonial.name}</div>
              {(cs.testimonial.role || cs.testimonial.company) && (
                <div className="text-sm text-[#6B6B67]">
                  {[cs.testimonial.role, cs.testimonial.company].filter(Boolean).join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 p-8 bg-[#043927] rounded-2xl text-center">
        <h2 className="font-serif text-3xl font-semibold text-white mb-3">Want results like this?</h2>
        <p className="text-[#e8f4ef]/80 mb-6">Get the exact systems inside AI Avengers Lab.</p>
        <Link
          href="https://www.skool.com/ai-avengers-3116"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-7 py-3 bg-[#DAA520] text-[#043927] font-bold rounded-lg hover:bg-[#c4941c] transition-colors"
        >
          Join the Lab — $20/mo
        </Link>
      </div>
    </article>
  )
}
