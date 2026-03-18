import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-serif text-8xl font-semibold text-[#043927] opacity-20 mb-4">404</div>
        <h1 className="font-serif text-3xl font-semibold text-[#043927] mb-3">Page not found</h1>
        <p className="text-[#6B6B67] mb-8">
          This page doesn&apos;t exist — or we moved it. Try the homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#043927] text-white font-semibold rounded-lg hover:bg-[#032a1e] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
