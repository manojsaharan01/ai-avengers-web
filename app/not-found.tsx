import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-serif text-8xl font-semibold text-[#043927] opacity-15 mb-4 select-none animate-drift">404</div>
        <h1 className="font-serif text-3xl font-semibold text-[#043927] mb-3 animate-fade-in-up">Page not found</h1>
        <p className="text-[#6B6B67] mb-8 animate-fade-in-up-delay-1">
          This page doesn&apos;t exist — or we moved it. Try the homepage.
        </p>
        <Link
          href="/"
          className="animate-fade-in-up-delay-2 inline-flex items-center px-6 py-3 bg-[#043927] text-white font-semibold rounded-lg hover:bg-[#032a1e] transition-all hover:shadow-md"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
