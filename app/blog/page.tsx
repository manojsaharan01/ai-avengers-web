import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Frameworks, systems, and real stories from building AI businesses.',
}

export const revalidate = 3600

export default async function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await getAllPosts().catch(() => [])

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-5xl font-semibold text-[#043927] mb-4">
          Blog
          <span className="block h-1 w-16 bg-[#DAA520] rounded-full mt-3" />
        </h1>
        <p className="text-lg text-[#6B6B67]">
          Real stories, frameworks, and lessons from building AI businesses.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-[#E5E5E2] rounded-2xl">
          <div className="font-serif text-7xl text-[#043927]/10 mb-4 select-none">AA</div>
          <p className="font-serif text-2xl text-[#043927] mb-2">First posts coming soon.</p>
          <p className="text-[#6B6B67]">We&apos;re documenting live builds — check back shortly.</p>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featuredPost && (
            <Link href={`/blog/${(featuredPost.slug as Record<string, string>).current}`} className="group block mb-10">
              <article className="bg-white rounded-xl border border-[#E5E5E2] overflow-hidden transition-lift">
                <div className="grid md:grid-cols-2">
                  {featuredPost.featuredImage?.asset ? (
                    <div className="relative h-64 md:h-80 bg-[#e8f4ef] overflow-hidden">
                      <Image
                        src={urlFor(featuredPost.featuredImage as Parameters<typeof urlFor>[0]).width(800).height(500).url()}
                        alt={(featuredPost.featuredImage.alt as string) || (featuredPost.title as string)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-64 md:h-80 bg-[#e8f4ef] flex items-center justify-center">
                      <span className="font-serif text-6xl text-[#043927]/15">AA</span>
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-[#DAA520] uppercase tracking-wider mb-3">Latest</span>
                    {featuredPost.categories && (featuredPost.categories as Array<Record<string, string>>).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(featuredPost.categories as Array<Record<string, string>>).slice(0, 2).map((cat) => (
                          <span
                            key={cat.slug}
                            className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#e8f4ef] text-[#043927]"
                          >
                            {cat.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-serif font-semibold text-[#043927] text-2xl md:text-3xl leading-snug mb-3 group-hover:text-[#DAA520] transition-colors line-clamp-3">
                      {featuredPost.title as string}
                    </h2>
                    <p className="text-[#6B6B67] leading-relaxed line-clamp-3 mb-4">
                      {featuredPost.excerpt as string}
                    </p>
                    <div className="text-xs text-[#6B6B67]">
                      {featuredPost.publishedAt
                        ? new Date(featuredPost.publishedAt as string).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })
                        : ''}
                      {featuredPost.readTime != null && ` · ${String(featuredPost.readTime)} min read`}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Remaining posts */}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post: any) => {
                const slug = (post.slug as Record<string, string>).current
                const image = post.featuredImage as Record<string, unknown> | undefined
                const categories = post.categories as Array<Record<string, string>> | undefined
                return (
                  <Link key={post._id as string} href={`/blog/${slug}`} className="group">
                    <article className="h-full bg-white rounded-xl border border-[#E5E5E2] overflow-hidden transition-lift">
                      {image?.asset ? (
                        <div className="relative h-48 bg-[#e8f4ef] overflow-hidden">
                          <Image
                            src={urlFor(image as Parameters<typeof urlFor>[0]).width(600).height(400).url()}
                            alt={(image.alt as string) || (post.title as string)}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-[#e8f4ef] flex items-center justify-center">
                          <span className="font-serif text-4xl text-[#043927]/15">AA</span>
                        </div>
                      )}
                      <div className="p-6">
                        {categories && categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {categories.slice(0, 2).map((cat) => (
                              <span
                                key={cat.slug}
                                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#e8f4ef] text-[#043927]"
                              >
                                {cat.title}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="font-serif font-semibold text-[#043927] text-xl leading-snug mb-2 group-hover:text-[#DAA520] transition-colors line-clamp-2">
                          {post.title as string}
                        </h2>
                        <p className="text-sm text-[#6B6B67] line-clamp-3 mb-4 leading-relaxed">
                          {post.excerpt as string}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#6B6B67]">
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt as string).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric',
                                })
                              : ''}
                          </span>
                          {post.readTime != null && <span>{String(post.readTime)} min read</span>}
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
