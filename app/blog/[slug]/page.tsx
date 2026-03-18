import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import PortableText from '@/components/PortableText'

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
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B6B67] mb-8">
        <Link href="/" className="hover:text-[#043927]">Home</Link>
        {' / '}
        <Link href="/blog" className="hover:text-[#043927]">Blog</Link>
        {' / '}
        <span className="text-[#1A1A18]">{post.title}</span>
      </nav>

      {/* Categories */}
      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((cat: Record<string, string>) => (
            <span key={cat.slug} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#e8f4ef] text-[#043927]">
              {cat.title}
            </span>
          ))}
        </div>
      )}

      <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#043927] leading-tight mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#E5E5E2]">
        {post.author?.image?.asset && (
          <Image
            src={urlFor(post.author.image).width(48).height(48).url()}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full w-12 h-12 object-cover"
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
            {post.readTime ? ` · ${post.readTime} min read` : ''}
          </div>
        </div>
      </div>

      {/* Hero image */}
      {post.featuredImage?.asset && (
        <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-10 bg-[#e8f4ef]">
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

      {/* FAQ section */}
      {post.faqItems?.length > 0 && (
        <section className="mt-16 border-t border-[#E5E5E2] pt-12">
          <h2 className="font-serif text-3xl font-semibold text-[#043927] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {post.faqItems.map((item: Record<string, unknown>, i: number) => (
              <details key={i} className="group border border-[#E5E5E2] rounded-lg">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-[#043927] hover:bg-[#e8f4ef]/50 rounded-lg transition-colors list-none">
                  {item.question as string}
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

      {/* Related posts */}
      {post.relatedPosts?.length > 0 && (
        <section className="mt-16 border-t border-[#E5E5E2] pt-12">
          <h2 className="font-serif text-2xl font-semibold text-[#043927] mb-6">Related posts</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {post.relatedPosts.map((related: Record<string, unknown>) => (
              <Link
                key={related._id as string}
                href={`/blog/${(related.slug as Record<string, string>).current}`}
                className="group p-5 border border-[#E5E5E2] rounded-xl hover:border-[#043927]/30 transition-colors"
              >
                <h3 className="font-serif font-semibold text-[#043927] group-hover:text-[#DAA520] transition-colors mb-2 line-clamp-2">
                  {related.title as string}
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
          <div className="flex items-start gap-5 p-6 bg-[#e8f4ef]/50 rounded-xl border border-[#E5E5E2]">
            {post.author.image?.asset && (
              <Image
                src={urlFor(post.author.image).width(80).height(80).url()}
                alt={post.author.name}
                width={80}
                height={80}
                className="rounded-full w-20 h-20 object-cover flex-shrink-0"
              />
            )}
            <div>
              <div className="font-semibold text-[#043927] mb-0.5">{post.author.name}</div>
              {post.author.role && <div className="text-sm text-[#6B6B67] mb-2">{post.author.role}</div>}
              {post.author.bio && <p className="text-sm text-[#1A1A18] leading-relaxed">{post.author.bio}</p>}
              <div className="flex gap-3 mt-3">
                {post.author.linkedin && (
                  <Link href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[#DAA520] hover:text-[#b8891a] font-medium">
                    LinkedIn →
                  </Link>
                )}
                {post.author.youtube && (
                  <Link href={post.author.youtube} target="_blank" rel="noopener noreferrer" className="text-xs text-[#DAA520] hover:text-[#b8891a] font-medium">
                    YouTube →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
