import { client } from './sanity'

// ── Site Settings ──────────────────────────────────────────────────────────
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    siteTitle, siteDescription, logoText, contactEmail, analyticsId,
    logo { asset->{ url }, alt },
    defaultOgImage { asset->{ url } },
    nav[] { label, url, external },
    footerLinks[] { label, url },
    social { linkedin, youtube, twitter, skool, instagram }
  }`)
}

// ── Posts ──────────────────────────────────────────────────────────────────
export async function getAllPosts() {
  return client.fetch(`*[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, readTime,
    featuredImage { asset->{ url }, alt },
    author->{ name, slug, image { asset->{ url } } },
    categories[]->{ title, slug, color }
  }`)
}

export async function getPostBySlug(slug: string) {
  return client.fetch(`*[_type == "post" && slug.current == $slug && status == "published"][0]{
    _id, title, slug, publishedAt, excerpt, readTime, body,
    featuredImage { asset->{ url, _id }, alt, caption },
    author->{ name, slug, role, bio, image { asset->{ url } }, linkedin, youtube, twitter },
    categories[]->{ title, slug, color },
    relatedPosts[]->{ title, slug, excerpt, featuredImage { asset->{ url }, alt } },
    faqItems[] { question, answer },
    seo { metaTitle, metaDescription, ogImage { asset->{ url } }, canonicalUrl, noIndex, jsonLd }
  }`, { slug })
}

export async function getRecentPosts(limit = 3) {
  return client.fetch(`*[_type == "post" && status == "published"] | order(publishedAt desc) [0...$limit] {
    _id, title, slug, publishedAt, excerpt, readTime,
    featuredImage { asset->{ url }, alt },
    author->{ name },
    categories[]->{ title, color }
  }`, { limit })
}

// ── Case Studies ───────────────────────────────────────────────────────────
export async function getAllCaseStudies() {
  return client.fetch(`*[_type == "caseStudy"] | order(publishedAt desc) {
    _id, title, slug, client, industry, excerpt, publishedAt,
    heroMetrics[] { metric, label },
    featuredImage { asset->{ url }, alt }
  }`)
}

export async function getCaseStudyBySlug(slug: string) {
  return client.fetch(`*[_type == "caseStudy" && slug.current == $slug][0]{
    _id, title, slug, client, industry, excerpt, publishedAt, body,
    heroMetrics[] { metric, label },
    featuredImage { asset->{ url }, alt },
    testimonial->{ name, role, company, quote, photo { asset->{ url } }, rating },
    categories[]->{ title, slug },
    seo { metaTitle, metaDescription, ogImage { asset->{ url } }, canonicalUrl, noIndex }
  }`, { slug })
}

// ── Tool Pages ─────────────────────────────────────────────────────────────
export async function getAllTools() {
  return client.fetch(`*[_type == "toolPage"] | order(inSovereignStack desc, title asc) {
    _id, title, slug, tagline, category, pricing, rating, inSovereignStack,
    logo { asset->{ url } }
  }`)
}

export async function getToolBySlug(slug: string) {
  return client.fetch(`*[_type == "toolPage" && slug.current == $slug][0]{
    _id, title, slug, tagline, category, pricing, rating, inSovereignStack,
    affiliateUrl, pros, cons, body,
    logo { asset->{ url } },
    faqItems[] { question, answer },
    seo { metaTitle, metaDescription, ogImage { asset->{ url } }, canonicalUrl, noIndex }
  }`, { slug })
}

// ── Offers ─────────────────────────────────────────────────────────────────
export async function getActiveOffers() {
  return client.fetch(`*[_type == "offer" && status != "closed"] | order(_createdAt asc) {
    _id, title, slug, status, price, originalPrice, tagline, description,
    features[] { feature, included },
    cta { label, url, style },
    skoolUrl,
    image { asset->{ url } }
  }`)
}

// ── Testimonials ───────────────────────────────────────────────────────────
export async function getFeaturedTestimonials() {
  return client.fetch(`*[_type == "testimonial" && featured == true] | order(_createdAt asc) {
    _id, name, role, company, quote, rating, source,
    photo { asset->{ url } }
  }`)
}

// ── Homepage data (parallel fetch) ─────────────────────────────────────────
export async function getHomepageData() {
  const [settings, recentPosts, featuredTestimonials, offers, caseStudies] = await Promise.all([
    getSiteSettings(),
    getRecentPosts(3),
    getFeaturedTestimonials(),
    getActiveOffers(),
    client.fetch(`*[_type == "caseStudy"] | order(publishedAt desc) [0...2] {
      _id, title, slug, client, excerpt,
      heroMetrics[0...2] { metric, label },
      featuredImage { asset->{ url }, alt }
    }`),
  ])
  return { settings, recentPosts, featuredTestimonials, offers, caseStudies }
}
