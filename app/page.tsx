import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts, getFeaturedTestimonials, getActiveOffers } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export const revalidate = 3600

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, testimonials, offers]: any[] = await Promise.all([
    getRecentPosts(3).catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getActiveOffers().catch(() => []),
  ])

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-[#e8f4ef] border border-[#043927]/20 rounded-full px-4 py-1.5 mb-6 animate-pulse-gold">
            <span className="w-2 h-2 rounded-full bg-[#DAA520] animate-pulse inline-block" />
            <span className="text-sm font-medium text-[#043927]">Founding window open — $20/mo locks in forever</span>
          </div>

          <h1 className="animate-fade-in-up-delay-1 font-serif text-5xl sm:text-6xl font-semibold text-[#043927] leading-tight mb-6">
            Stop studying AI.<br />
            <em className="not-italic text-gradient-gold">Start owning it.</em>
          </h1>

          <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-[#6B6B67] max-w-2xl mx-auto leading-relaxed mb-10">
            AI Avengers Lab is a private community for professionals and business owners who are done watching and ready to build. Live AI builds, sovereign stack tools, and people who actually ship.
          </p>

          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://www.skool.com/ai-avengers-3116"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-[#043927] text-white font-semibold rounded-lg hover:bg-[#032a1e] transition-all text-base shadow-sm hover:shadow-md"
            >
              Join AI Avengers Lab — $20/mo
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/jarvis"
              className="inline-flex items-center px-8 py-3.5 border border-[#043927] text-[#043927] font-semibold rounded-lg hover:bg-[#e8f4ef] transition-all text-base"
            >
              Meet Jarvis →
            </Link>
          </div>
          <p className="animate-fade-in-up-delay-4 mt-4 text-sm text-[#6B6B67]">Founding price closes in 7 days. Then $89/mo.</p>
        </div>

        {/* Stats bar */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E5E5E2] rounded-xl overflow-hidden border border-[#E5E5E2]">
          {[
            { metric: '3,000+', label: 'AI builders in community' },
            { metric: '$12,840', label: 'Saved per year vs GHL' },
            { metric: '$0', label: 'Jarvis CRM cost' },
            { metric: '$20/mo', label: 'Lab founding price' },
          ].map(({ metric, label }) => (
            <div key={label} className="bg-[#FDFDFB] px-6 py-5 text-center transition-all duration-200 hover:bg-[#e8f4ef]/50 group cursor-default">
              <div className="font-serif text-2xl font-semibold text-[#043927] transition-transform duration-200 group-hover:scale-110">{metric}</div>
              <div className="text-xs text-[#6B6B67] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What Lab members get ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#043927]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-semibold text-white mb-3">
              What happens inside the Lab
            </h2>
            <p className="text-[#e8f4ef]/70 text-lg max-w-xl mx-auto">
              Not a course. Not a Slack group. A live operating room where AI businesses get built.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🔴', title: 'Live builds', desc: 'Watch real campaigns, real CRM setups, real client builds run in real time. Follow along and replicate.' },
              { icon: '🤖', title: 'Jarvis CRM', desc: 'The full sovereign stack guide. Replaces GHL for ~$35/mo. Runs locally. You own it forever.' },
              { icon: '📐', title: 'Frameworks', desc: 'Weekly teardowns of what\'s working — outreach systems, AI agents, lead gen — from people running them.' },
              { icon: '🎯', title: 'Direct access', desc: 'Manoj, John, and Andy are inside. Ask questions on actual builds, not theory.' },
              { icon: '📊', title: 'Case studies', desc: 'Real results with real numbers. What was built, what it cost, what changed.' },
              { icon: '🏗️', title: 'Build your lane', desc: 'Lone wolves model — everyone ships their own thing. No group projects. No waiting on others.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-5 bg-white/5 border border-white/10 rounded-xl transition-all duration-200 hover:bg-white/[0.08] hover:border-[#DAA520]/30 group">
                <span className="text-2xl mb-3 block transition-transform duration-200 group-hover:scale-110">{icon}</span>
                <h3 className="font-semibold text-[#DAA520] mb-2">{title}</h3>
                <p className="text-sm text-[#e8f4ef]/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jarvis teaser ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 border-b border-[#E5E5E2]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold text-[#DAA520] uppercase tracking-wider mb-3">Included with Lab membership</div>
            <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-5 leading-tight">
              Jarvis — the CRM that belongs to you.
            </h2>
            <p className="text-[#6B6B67] text-lg leading-relaxed mb-6">
              Local-first AI CRM built on OpenClaw (MIT). Replaces GHL for $0. One command to install. Runs on your Mac. Your data never leaves your machine.
            </p>
            <div className="bg-[#043927] rounded-xl px-5 py-3 font-mono text-[#e8f4ef] text-sm mb-6 inline-block shadow-md">
              <span className="text-[#DAA520]">$</span> npx openclaw
            </div>
            <div className="block">
              <Link
                href="/jarvis"
                className="inline-flex items-center text-[#043927] font-semibold hover:text-[#DAA520] transition-colors link-underline"
              >
                See everything Jarvis does →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'CRM', val: '$0', sub: 'replaces $297/mo GHL' },
              { label: 'Email via Resend', val: '$20/mo', sub: 'replaces $150/mo GHL' },
              { label: 'SMS via Twilio', val: '~$15/mo', sub: 'replaces $100/mo GHL' },
              { label: 'Calendar Cal.com', val: '$0', sub: 'replaces $50/mo GHL' },
            ].map(({ label, val, sub }) => (
              <div key={label} className="p-4 border border-[#E5E5E2] rounded-xl bg-white transition-all duration-200 hover:shadow-md hover:border-[#043927]/20">
                <div className="text-xs text-[#6B6B67] mb-1">{label}</div>
                <div className="font-serif text-xl font-semibold text-[#043927]">{val}</div>
                <div className="text-xs text-[#6B6B67] line-through mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offers ──────────────────────────────────────────────────── */}
      {offers.length > 0 && (
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-4xl font-semibold text-[#043927] mb-3">Join the Lab</h2>
              <p className="text-[#6B6B67] text-lg">Founding window is open. It will not reopen.</p>
            </div>
            {offers.map((offer: any) => (
              <div
                key={offer._id}
                className="rounded-xl border-2 border-[#DAA520] bg-[#fdf3d0]/20 p-8 sm:p-10 shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 bg-[#DAA520] text-white text-xs font-semibold rounded-full mb-3 animate-pulse-gold">
                      Founding window — closes in 7 days
                    </span>
                    <h3 className="font-serif text-3xl font-semibold text-[#043927]">{offer.title}</h3>
                    <p className="text-[#6B6B67] mt-1">{offer.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-4xl font-bold text-[#043927]">{offer.price}</div>
                    {offer.originalPrice && (
                      <div className="text-[#6B6B67] text-sm line-through">{offer.originalPrice} after</div>
                    )}
                  </div>
                </div>
                <p className="text-[#6B6B67] leading-relaxed mb-6">{offer.description}</p>
                {offer.features?.length > 0 && (
                  <ul className="space-y-2 mb-8">
                    {offer.features.filter((f: any) => f.included).map((f: any) => (
                      <li key={f.feature} className="flex items-center gap-3 text-sm text-[#1A1A18]">
                        <span className="text-[#22C55E] font-bold flex-shrink-0">✓</span>
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                )}
                {offer.cta && (
                  <Link
                    href={offer.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full justify-center px-8 py-4 bg-[#043927] text-white font-bold rounded-lg hover:bg-[#032a1e] transition-all text-lg hover:shadow-lg"
                  >
                    {offer.cta.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Testimonials ────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-[#e8f4ef]/30 border-y border-[#E5E5E2]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-4xl font-semibold text-[#043927] text-center mb-12">
              From people already inside
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t: any) => (
                <div key={t._id} className="bg-white rounded-xl p-6 border border-[#E5E5E2] transition-lift relative">
                  {/* Decorative quote */}
                  <div className="absolute top-3 right-4 font-serif text-5xl text-[#DAA520] opacity-15 leading-none select-none">&ldquo;</div>
                  <div className="flex mb-3">
                    {Array.from({ length: Number(t.rating) || 5 }).map((_: unknown, i: number) => (
                      <span key={i} className="text-[#DAA520] text-sm">★</span>
                    ))}
                  </div>
                  <blockquote className="text-[#1A1A18] text-sm leading-relaxed mb-4 relative z-10">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    {t.photo?.asset && (
                      <Image
                        src={urlFor(t.photo).width(48).height(48).url()}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="rounded-full w-12 h-12 object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-sm text-[#043927]">{t.name}</div>
                      {(t.role || t.company) && (
                        <div className="text-xs text-[#6B6B67]">
                          {[t.role, t.company].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recent posts ────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-4xl font-semibold text-[#043927]">From the Lab</h2>
              <Link href="/blog" className="text-sm font-medium text-[#DAA520] hover:text-[#b8891a] transition-colors link-underline">
                All posts →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => {
                const slug = post.slug.current
                return (
                  <Link key={post._id} href={`/blog/${slug}`} className="group">
                    <article className="h-full bg-white rounded-xl border border-[#E5E5E2] overflow-hidden transition-lift">
                      {post.featuredImage?.asset && (
                        <div className="relative h-44 bg-[#e8f4ef] overflow-hidden">
                          <Image
                            src={urlFor(post.featuredImage).width(600).height(350).url()}
                            alt={post.featuredImage.alt || post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-serif font-semibold text-[#043927] text-lg leading-snug mb-2 group-hover:text-[#DAA520] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#6B6B67] line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="text-xs text-[#6B6B67]">
                          {post.readTime ? `${post.readTime} min read` : ''}
                          {post.publishedAt
                            ? ` · ${new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                            : ''}
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#043927] rounded-2xl p-10 sm:p-14 relative overflow-hidden">
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(218,165,32,0.15)_0%,_transparent_60%)] pointer-events-none" />
            <h2 className="font-serif text-4xl font-semibold text-white mb-4 relative z-10">
              The window closes in 7 days.
            </h2>
            <p className="text-[#e8f4ef]/80 text-lg mb-3 leading-relaxed relative z-10">
              $20/mo locks in permanently. When the founding window closes, new members pay $89/mo — forever.
            </p>
            <p className="text-[#e8f4ef]/60 text-sm mb-8 relative z-10">
              This is the only time this price will exist.
            </p>
            <Link
              href="https://www.skool.com/ai-avengers-3116"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center px-8 py-4 bg-[#DAA520] text-[#043927] font-bold rounded-lg hover:bg-[#c4941c] transition-all text-lg hover:shadow-lg"
            >
              Join AI Avengers Lab — $20/mo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
