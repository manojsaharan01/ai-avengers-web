import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import PortableText from '@/components/PortableText'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => [])
  return posts.map((p: Record<string, unknown>) => ({
    slug: (p.slug as Record<string, string>).current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return {}
  const seo = post.seo || {}
  return {
    title: seo.metaTitle || post.title,
    description: seo.metaDescription || post.excerpt,
    openGraph: {
      type: 'article',
      title: seo.metaTitle || post.title,
      description: seo.metaDescription || post.excerpt,
      publishedTime: post.publishedAt,
      images: seo.ogImage?.asset?.url
        ? [seo.ogImage.asset.url]
        : post.featuredImage?.asset?.url
          ? [post.featuredImage.asset.url]
          : [],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  return (
    <>
      <ReadingProgress />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#6B6B67] mb-8 animate-fade-in-up">
          <Link href="/" className="hover:text-[#043927] transition-colors">Home</Link>
          {' / '}
          <Link href="/blog" className="hover:text-[#043927] transition-colors">Blog</Link>
          {' / '}
          <span className="text-[#1A1A18]">{post.title}</span>
        </nav>

        {/* Categories */}
        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up-delay-1">
            {post.categories.map((cat: Record<string, string>) => (
              <span key={cat.slug} className="text-xs font-medium px-3 py-1 rounded-full bg-[#e8f4ef] text-[#043927] border border-[#043927]/10">
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h1 className="animate-fade-in-up-delay-1 font-serif text-4xl sm:text-5xl font-semibold text-[#043927] leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta — pill style */}
        <div className="animate-fade-in-up-delay-2 flex items-center gap-4 mb-8 pb-8 border-b border-[#E5E5E2]">
          <div className="flex items-center gap-3 bg-[#e8f4ef]/50 rounded-full px-4 py-2 border border-[#E5E5E2]">
            {post.author?.image?.asset && (
              <Image
                src={urlFor(post.author.image).width(40).height(40).url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-sm text-[#043927]">{post.author?.name}</div>
              <div className="text-xs text-[#6B6B67]">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })
                  : ''}
              </div>
            </div>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1.5 text-sm text-[#6B6B67]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {post.readTime} min read
            </div>
          )}
        </div>

        {/* Hero image */}
        {post.featuredImage?.asset && (
          <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-10 bg-[#e8f4ef] shadow-[var(--shadow-card)]">
            <Image
              src={urlFor(post.featuredImage).width(900).height(500).url()}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Body */}
        {post.body && <PortableText value={post.body} />}

        {/* Share buttons */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E2]">
          <ShareButtons title={post.title} slug={slug} />
        </div>

        {/* FAQ section */}
        {post.faqItems?.length > 0 && (
          <section className="mt-16 border-t border-[#E5E5E2] pt-12">
            <h2 className="font-serif text-3xl font-semibold text-[#043927] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faqItems.map((item: Record<string, unknown>, i: number) => (
                <details key={i} className="group border border-[#E5E5E2] rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-[#043927] hover:bg-[#e8f4ef]/50 transition-colors list-none">
                    {item.question as string}
                    <svg className="w-5 h-5 flex-shrink-0 text-[#DAA520] group-open:rotate-180 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[#6B6B67] leading-relaxed border-t border-[#E5E5E2]">
                    {Array.isArray(item.answer) && <PortableText value={item.answer} />}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related posts */}
        {post.relatedPosts?.length > 0 && (
          <section className="mt-16 border-t border-[#E5E5E2] pt-12">
            <h2 className="font-serif text-2xl font-semibold text-[#043927] mb-6">Related posts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {post.relatedPosts.map((related: Record<string, unknown>) => (
                <Link
                  key={related._id as string}
                  href={`/blog/${(related.slug as Record<string, string>).current}`}
                  className="group p-5 border border-[#E5E5E2] rounded-xl transition-lift"
                >
                  <h3 className="font-serif font-semibold text-[#043927] group-hover:text-[#DAA520] transition-colors mb-2 line-clamp-2 flex items-start gap-2">
                    <span className="flex-1">{related.title as string}</span>
                    <svg className="w-4 h-4 mt-1 flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#DAA520]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </h3>
                  <p className="text-sm text-[#6B6B67] line-clamp-2">{related.excerpt as string}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Author bio */}
        {post.author && (
          <section className="mt-16 border-t border-[#E5E5E2] pt-12">
            <div className="flex items-start gap-5 p-6 bg-[#e8f4ef]/50 rounded-xl border border-[#E5E5E2] transition-all duration-200 hover:shadow-md">
              {post.author.image?.asset && (
                <div className="relative flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full w-20 h-20 object-cover ring-2 ring-[#DAA520]/20 ring-offset-2"
                  />
                </div>
              )}
              <div>
                <div className="font-semibold text-[#043927] mb-0.5">{post.author.name}</div>
                {post.author.role && <div className="text-sm text-[#DAA520] font-medium mb-2">{post.author.role}</div>}
                {post.author.bio && <p className="text-sm text-[#1A1A18] leading-relaxed">{post.author.bio}</p>}
                <div className="flex gap-3 mt-3">
                  {post.author.linkedin && (
                    <Link href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[#043927] hover:text-[#DAA520] font-medium link-underline transition-colors">
                      LinkedIn →
                    </Link>
                  )}
                  {post.author.youtube && (
                    <Link href={post.author.youtube} target="_blank" rel="noopener noreferrer" className="text-xs text-[#043927] hover:text-[#DAA520] font-medium link-underline transition-colors">
                      YouTube →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
