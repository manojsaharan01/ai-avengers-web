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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-5xl font-semibold text-[#043927] mb-4">Blog</h1>
        <p className="text-lg text-[#6B6B67]">
          Real stories, frameworks, and lessons from building AI businesses.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-[#6B6B67]">
          <p className="text-lg">First posts coming soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => {
            const slug = (post.slug as Record<string, string>).current
            const image = post.featuredImage as Record<string, unknown> | undefined
            const categories = post.categories as Array<Record<string, string>> | undefined
            return (
              <Link key={post._id as string} href={`/blog/${slug}`} className="group">
                <article className="h-full bg-white rounded-xl border border-[#E5E5E2] overflow-hidden hover:border-[#043927]/30 transition-colors">
                  {image?.asset ? (
                    <div className="relative h-48 bg-[#e8f4ef]">
                      <Image
                        src={urlFor(image as Parameters<typeof urlFor>[0]).width(600).height(400).url()}
                        alt={(image.alt as string) || (post.title as string)}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-[#e8f4ef] flex items-center justify-center">
                      <span className="font-serif text-4xl text-[#043927]/20">AA</span>
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
    </div>
  )
}
