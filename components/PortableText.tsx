import { PortableText as SanityPortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const components = {
  types: {
    image: ({ value }: { value: { asset: { url: string }; alt?: string; caption?: string } }) => (
      <figure className="my-10">
        <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            width={900}
            height={600}
            className="w-full object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-[#6B6B67] italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: ({ value }: { value: { type: string; text: string } }) => {
      const styles: Record<string, string> = {
        info: 'border-[#043927] bg-[#e8f4ef] text-[#043927]',
        warning: 'border-[#DAA520] bg-[#fdf3d0] text-[#7a5a00]',
        success: 'border-[#22C55E] bg-[#f0fdf4] text-[#166534]',
        tip: 'border-[#6366f1] bg-[#eef2ff] text-[#3730a3]',
      }
      const icons: Record<string, string> = {
        info: 'ℹ️',
        warning: '⚠️',
        success: '✅',
        tip: '💡',
      }
      return (
        <div className={`my-8 border-l-[5px] rounded-r-xl p-5 ${styles[value.type] || styles.info}`}>
          <span className="mr-2 text-lg">{icons[value.type] || icons.info}</span>
          {value.text}
        </div>
      )
    },
    codeBlock: ({ value }: { value: { language: string; code: string; filename?: string } }) => (
      <div className="my-8">
        {value.filename && (
          <div className="bg-[#043927]/90 text-[#DAA520] text-xs font-mono px-4 py-2 rounded-t-xl flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {value.filename}
          </div>
        )}
        <pre className={`bg-[#043927] text-[#e8f4ef] p-5 rounded-xl overflow-x-auto text-sm font-mono shadow-[var(--shadow-card)] ${value.filename ? 'rounded-tl-none rounded-tr-none' : ''}`}>
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  marks: {
    link: ({ value, children }: { value?: { href: string }; children: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-[#DAA520] underline underline-offset-2 hover:text-[#b8891a] transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableText({ value }: { value: unknown[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      <SanityPortableText value={value as Parameters<typeof SanityPortableText>[0]['value']} components={components} />
    </div>
  )
}
